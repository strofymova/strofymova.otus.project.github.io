import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Profile } from 'src/entities/profile.types';

const ADMIN_LOGIN = 'sunlight-vrn@mail.ru';

export const useAdminRight = (profile: Profile) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);

        if (profile?.email) {
          setIsAdmin(profile.email === ADMIN_LOGIN);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        message.error('Failed to verify admin privileges');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [profile?.email]);

  return {
    isAdmin,
    isLoading,
  };
};
