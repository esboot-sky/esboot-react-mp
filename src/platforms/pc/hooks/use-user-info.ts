import type { UserInfo } from '@pc/types';
import { selectUserInfo, setUserInfo as setUserInfoAction } from '@pc/model/app/slice';

import { useMinimalAppSelector } from '@pc/model/minimal-store';

export function useUserInfo() {
  const userInfo = useMinimalAppSelector(selectUserInfo);

  return {
    userInfo,
    setUserInfo(newValue: UserInfo) {
      setUserInfoAction(newValue);
    },
  };
}
