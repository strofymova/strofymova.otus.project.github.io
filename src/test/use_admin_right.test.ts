import { renderHook } from '@testing-library/react';
import { Profile } from 'src/entities/profile.types';
import { useAdminRight } from 'src/shared/hooks/useAdminRight';

jest.mock('antd', () => ({
  message: {
    error: jest.fn(),
  },
}));

describe('useAdminRight hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return isAdmin true', () => {
    const adminProfile: Profile = {
      email: 'sunlight-vrn@mail.ru',
    } as Profile;

    const { result } = renderHook(() => useAdminRight(adminProfile));

    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return isAdmin false', () => {
    const userProfile: Profile = {
      email: 'user@example.com',
    } as Profile;

    const { result } = renderHook(() => useAdminRight(userProfile));

    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return isAdmin false, profile is undefined', () => {
    const { result } = renderHook(() => useAdminRight(undefined as unknown as Profile));

    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});