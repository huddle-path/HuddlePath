import { GET as getAllEvents, POST as postEvent } from '@app/api/events/route';
import EventModel from '@app/resources/event/schema';
import { apiResponse } from '@app/handlers/api-response/response-handler';

jest.mock('@app/resources/event/schema');
jest.mock('@app/handlers/api-response/response-handler');
jest.mock('@app/HOFs/server/withDbConnection', () => (fn: any) => fn);
jest.mock('@app/HOFs/server/withAuthentication', () => (fn: any) => fn);
jest.mock('next/server', () => ({
  NextResponse: class MockNextResponse {},
}));

const mockedEventModel = EventModel as jest.Mocked<typeof EventModel>;
const mockedApiResponse = apiResponse as jest.Mocked<typeof apiResponse>;

class MockNextResponse {}

describe('Events API', () => {
  let findMock: any;

  beforeEach(() => {
    jest.clearAllMocks();

    findMock = jest.fn().mockReturnThis();
    findMock.populate = jest.fn().mockReturnThis();
    findMock.sort = jest.fn().mockReturnThis();
    findMock.collation = jest.fn().mockReturnThis();
    findMock.skip = jest.fn().mockReturnThis();
    findMock.limit = jest.fn().mockReturnThis();
    findMock.lean = jest.fn().mockResolvedValue([
      {
        _id: 'event123',
        title: 'Event 1',
        createdBy: 'user123',
      },
    ]);
    mockedEventModel.find.mockImplementation(() => findMock);

    mockedEventModel.create.mockResolvedValue({
      _id: 'newEvent123',
      title: 'New Event',
      createdBy: 'user123',
    } as any);
  });

  test('getAllEvents should return events data', async () => {
    const mockReq = {
      auth: { user: { _id: 'user123' } },
      nextUrl: 'http://localhost?sort_by=createdAt&limit=10',
    } as any;
    const mockRes = new MockNextResponse() as any;

    await getAllEvents(mockReq, mockRes);

    expect(mockedEventModel.find).toHaveBeenCalledWith(expect.any(Object));
    expect(findMock.populate).toHaveBeenCalledWith([{ path: 'createdBy' }]);
    expect(mockedApiResponse).toHaveBeenCalledWith({
      status: 200,
      message: 'User OK',
      data: {
        data: expect.any(Array),
        totalRecords: expect.any(Number),
        currentPage: expect.any(Number),
        totalPages: expect.any(Number),
        totalRecordsPerPage: expect.any(Number),
      },
    });
  }, 10000);

  test('postEvent should create a new event', async () => {
    const eventPayload = {
      date: '2024-01-15',
      description: 'New Event Description',
      imageUrl: 'http://example.com/image.jpg',
      tag: 'Community',
      title: 'New Event',
      location: 'City Center',
    };

    const mockReq = {
      auth: { user: { _id: 'user123' } },
      json: jest.fn().mockResolvedValue(eventPayload),
    } as any;
    const mockRes = new MockNextResponse() as any;

    await postEvent(mockReq, mockRes);

    expect(mockReq.json).toHaveBeenCalled();
    expect(mockedEventModel.create).toHaveBeenCalledWith({
      createdBy: 'user123',
      ...eventPayload,
    });
    expect(mockedApiResponse).toHaveBeenCalledWith({
      status: 201,
      message: 'SUCCESS',
      data: expect.any(Object),
    });
  });
});
