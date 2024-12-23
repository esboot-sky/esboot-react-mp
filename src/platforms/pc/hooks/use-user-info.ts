import { selectUserInfo, setUserInfo } from '@pc/model/app/slice';
import { useMinimalAppDispatch, useMinimalAppSelector } from '@pc/model/minimal-store';

import type { UserInfo } from '@pc/types';

export function useUserInfo() {
  const userInfo = useMinimalAppSelector(selectUserInfo);
  const dispatch = useMinimalAppDispatch();

  return {
    userInfo,
    setUserInfo(newValue: UserInfo) {
      dispatch(setUserInfo(newValue));
    },
  };
}
