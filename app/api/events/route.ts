import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withAuthentication from '@app/HOFs/server/withAuthentication';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import EventModel from '@app/resources/event/schema';
import { NextRequest } from '@next';
import { IEvent, TEventQuery } from '@app/resources/event/types';
import { IQuery } from '@app/handlers/api-response/types';
import mongoose from 'mongoose';

const splitHelperAndObjectify = (property: string) => {
  const ids: any = property.split(',');
  ids.forEach((program: string, index: number) => {
    ids[index] = new mongoose.Types.ObjectId(program);
  });

  return {
    $in: ids,
  };
};

const eventFormatter = (query: IQuery<TEventQuery>) => {
  const filter: any = {};

  if (query.search_value) {
    filter['$or'] = [
      {
        title: {
          $regex: query.search_value,
          $options: 'i',
        },
      },
    ];
  }

  if (query.createdBy) {
    filter.createdBy = splitHelperAndObjectify(
      query.createdBy as unknown as string
    );
  }

  return filter;
};

const getAllEvents = async (req: NextRequest, res: NextResponse) => {
  const queryParams = Object.fromEntries(
    new URL(req.nextUrl).searchParams
  ) as unknown as IQuery<TEventQuery>;

  const query: IQuery<TEventQuery> = {
    ...queryParams,
  };

  const { limit = 10, page = 1 } = query;
  const currentPage = +page;
  const skip = (currentPage - 1) * +limit;

  const formattedQuery = {
    ...eventFormatter(query),
  };

  const allData = await EventModel.find(formattedQuery);
  const data = await EventModel.find(formattedQuery)
    .populate([{ path: 'createdBy' }])
    .sort({ [query.sort_by || 'updatedAt']: -1 })
    .collation({ locale: 'en', caseLevel: true })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalPages = Math.ceil(allData.length / +limit);

  return apiResponse({
    status: 200,
    message: 'User OK',
    data: {
      data: data as IEvent[],
      totalRecords: allData.length,
      currentPage,
      totalPages,
      totalRecordsPerPage: +limit,
    },
  });
};

const postEvent = async (req: NextRequest, res: NextResponse) => {
  try {
    const payload = await req.json();

    const parsedCredentials = z
      .object({
        date: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        tag: z.string(),
        title: z.string(),
        location: z.string(),
      })
      .safeParse(payload);

    if (!parsedCredentials.success) {
      const validationErrors = parsedCredentials.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      return apiResponse({
        status: 400,
        message: 'Validation errors',
        data: validationErrors,
      });
    }

    const event = await EventModel.create({
      createdBy: req.auth.user._id,
      ...parsedCredentials.data,
    });

    return apiResponse({
      status: 201,
      message: 'SUCCESS',
      data: event,
    });
  } catch (error) {
    return apiResponse({
      status: 500,
      message: 'SERVER_ERROR',
      data: error,
    });
  }
};

const GET = withDbConnection(getAllEvents);
const POST = withDbConnection(withAuthentication(postEvent));

export { GET, POST };
