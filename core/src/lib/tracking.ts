import { TRACKING_VARIABLES } from './constants';
import { generateRandomId } from './utils';

export function getSessionId() {
  let sid = sessionStorage.getItem(TRACKING_VARIABLES.SESSION_ID);
  if (!sid) {
    sid = generateRandomId();
    sessionStorage.setItem(TRACKING_VARIABLES.SESSION_ID, sid);
  }
  return sid;
}
