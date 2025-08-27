import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Profile } from 'src/entities/profile.types';

export const useAdminRight = (profile: Profile) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        
        // const service = await AccountService();

        if (profile?.email) {
          setIsAdmin(true);
        //   const user = service.getUser(profile.email);
        //   setIsAdmin(user?.type === UserType.admin);
        // } else {
        //   setIsAdmin(false);
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
