import { GET as getAuthenticatedUser } from '@app/api/users/me/route';
import UserModel from '@app/resources/user/schema';
import { apiResponse } from '@app/handlers/api-response/response-handler';

jest.mock('@app/resources/user/schema');
jest.mock('@app/handlers/api-response/response-handler');
jest.mock('@app/HOFs/server/withDbConnection', () => (fn: any) => fn);
jest.mock('@app/HOFs/server/withAuthentication', () => (fn: any) => fn);

jest.mock('next/server', () => ({
  NextResponse: class MockNextResponse {},
}));

const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>;
const mockedApiResponse = apiResponse as jest.Mocked<typeof apiResponse>;

class MockNextResponse {}

describe('User API - /user/me', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const selectMock = jest.fn().mockReturnThis();
    const leanMock = jest.fn().mockReturnThis();

    mockedUserModel.findOne.mockImplementation(
      () =>
        ({
          select: selectMock,
          lean: leanMock,
          exec: jest.fn().mockResolvedValue({
            _id: 'user123',
            email: 'test@example.com',
            name: 'Test User',
          }),
        } as any)
    );
  });

  test('should return authenticated user data', async () => {
    const mockReq = { auth: { user: { _id: 'user123' } } } as any;
    const mockRes = new MockNextResponse() as any;

    await getAuthenticatedUser(mockReq, mockRes);

    expect(mockedUserModel.findOne).toHaveBeenCalledWith({ _id: 'user123' });
    expect(mockedUserModel.findOne().select).toHaveBeenCalledWith(
      '-passwordHash'
    );
    expect(mockedApiResponse).toHaveBeenCalledWith({
      status: 200,
      message: 'SUCCESS',
      data: expect.anything(),
    });
  });
});
