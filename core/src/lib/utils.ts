import { TrackingVariables } from '../types';

export function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export function generateTrackingHeaders(trackingVariables: TrackingVariables) {
  return {
    'X-ORIGIN': trackingVariables.origin,
    'X-RID': trackingVariables.rid || generateRandomId(),
    'X-SID': trackingVariables.sid,
    'X-UID': trackingVariables.uid,
    'X-EVENT': trackingVariables.event,
    'X-CHANNEL': trackingVariables.channel,
  };
}
