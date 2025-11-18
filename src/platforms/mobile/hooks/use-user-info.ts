import type { IUserInfo } from '@mobile/customize';
import { selectUserInfo, setUserInfo as setUserInfoAction } from '@mobile/model/app/slice';
import { useMinimalAppSelector } from '@mobile/model/minimal-store';

export function useUserInfo() {
  const userInfo = useMinimalAppSelector(selectUserInfo);

  return {
    userInfo,
    setUserInfo(newValue: IUserInfo) {
      setUserInfoAction(newValue);
    },
  };
}
