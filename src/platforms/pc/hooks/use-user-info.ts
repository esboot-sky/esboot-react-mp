import type { UserInfo } from '@pc/types';
import { selectUserInfo, setUserInfo } from '@pc/model/app/slice';

import { useMinimalAppDispatch, useMinimalAppSelector } from '@pc/model/minimal-store';

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
