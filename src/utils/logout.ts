import { GlobalEvents, globalEventsCenter } from '@/global-events';

export function logout() {
  globalEventsCenter.emit(GlobalEvents.LOGIN_EXPIRED);
}
