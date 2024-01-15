import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withAuthentication from '@app/HOFs/server/withAuthentication';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import EventModel from '@app/resources/event/schema';

const getEvent = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const event = await EventModel.findOne({ _id: context.params.id });

    if (!event) {
      return apiResponse({
        status: 404,
        message: 'Event not found',
      });
    }

    return apiResponse({
      status: 200,
      message: 'SUCCESS',
      data: event,
    });
  } catch (error) {
    return apiResponse({
      status: 500,
      data: error || 'Internal server error',
    });
  }
};

const GET = withDbConnection(getEvent);

export { GET };
