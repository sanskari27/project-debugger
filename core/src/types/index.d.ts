export interface TrackingVariables {
  rid: string;
  sid: string;
  uid: string;
  origin: string;
  event: string;
  channel: string;
}

export interface APIEventCommon {
  type: 'api-call';
  rid?: string;
  url: string;
  method: string;
}
export interface APIRequestEvent extends APIEventCommon {
  body: any;
  query: any;
  headers: any;
}

export interface APIResponseEvent extends APIEventCommon {
  status: number;
}

export interface DOMEvent {
  type: 'dom-update';
  event: any;
}

export type APIEvent = APIRequestEvent | APIResponseEvent;
export type EventType = 'api-call' | 'dom-update' | 'console-log';
export type Event = APIRequestEvent | APIResponseEvent | DOMEvent;
