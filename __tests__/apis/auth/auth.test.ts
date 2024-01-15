import { register, login } from '@app/api/auth/route';
import UserModel from '@app/resources/user/schema';
import AuthModel from '@app/resources/auth/schema';
import bcrypt from 'bcrypt';

jest.mock('@app/resources/user/schema');
jest.mock('@app/resources/auth/schema');
jest.mock('bcrypt');

const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>;
const mockedAuthModel = AuthModel as jest.Mocked<typeof AuthModel>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('Auth Route Tests', () => {
  const mockUser = {
    email: 'test@example.com',
    password: 'password123',
    _id: 'user123',
  };

  const credentials = {
    email: mockUser.email,
    password: mockUser.password,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register should create a new user', async () => {
    const mockUser = { _id: 'mockUserId', email: 'test@example.com' };
    const mockAuth = {
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      user: mockUser._id,
    };

    mockedUserModel.create.mockResolvedValue(mockUser as any);
    mockedAuthModel.create.mockResolvedValue(mockAuth as any);
    mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);

    const result = await register({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toBeDefined();
    expect(UserModel.create).toHaveBeenCalledWith(expect.any(Object));
    expect(AuthModel.create).toHaveBeenCalledWith(expect.any(Object));
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  });

  test('login should authenticate user with valid credentials', async () => {
    mockedAuthModel.findOne.mockResolvedValue({
      email: credentials.email,
      passwordHash: 'hashedPassword',
    } as any);
    mockedBcrypt.compare.mockResolvedValue(true as never);

    const result = await login(credentials);

    expect(mockedAuthModel.findOne).toHaveBeenCalledWith({
      email: credentials.email,
    });
    expect(mockedBcrypt.compare).toHaveBeenCalledWith(
      credentials.password,
      'hashedPassword'
    );
    expect(result).toBeDefined();
  });
});
