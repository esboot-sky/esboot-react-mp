import { useMinimalAppDispatch, useMinimalAppSelector } from '@mobile/model/minimal-store';
import { IStandardAppUserConfig, selectUserConfig, setUserConfig } from '@mobile/model/app/slice';

export function useUserConfig() {
  const userConfig = useMinimalAppSelector(selectUserConfig);
  const dispatch = useMinimalAppDispatch();

  return {
    userConfig,
    setUserConfig(newValue: IStandardAppUserConfig) {
      dispatch(setUserConfig(newValue));
    },
  };
}
