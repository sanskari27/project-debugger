import EventsManager from '../EventsManager';
import { generateRandomId } from '../lib/utils';

(() => {
  // Intercept fetch
  const originalFetch = window.fetch;

  window.fetch = async (
    ...args: Parameters<typeof fetch>
  ): Promise<Response> => {
    const [input, init] = args;
    const url = typeof input === 'string' ? input : (input as Request).url;
    const rid = generateRandomId();

    EventsManager.on('api-call', {
      type: 'api-call',
      url,
      rid,
      method: init?.method || 'GET',
      body: init?.body || null,
      headers: init?.headers || {},
      query: url.split('?')[1] || '',
    });

    const response = await originalFetch(...args);
    const cloned = response.clone();

    cloned
      .text()
      .then(() => {
        EventsManager.on('api-call', {
          type: 'api-call',
          url,
          rid,
          method: init?.method || 'GET',
          status: response.status,
        });
      })
      .catch(err => console.error('[fetch response error]', err));

    return response;
  };

  // Intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  interface ExtendedXHR extends XMLHttpRequest {
    _method?: string;
    _url?: string;
    _headers?: any;
    _rid?: string;
  }

  XMLHttpRequest.prototype.open = function (
    this: ExtendedXHR,
    method: string,
    url: string,
    async?: boolean,
    user?: string | null,
    password?: string | null
  ): void {
    this._method = method;
    this._url = url;
    this._headers = {};
    this._rid = generateRandomId();

    return originalXHROpen.call(
      this,
      method,
      url,
      async || false,
      user,
      password
    );
  };

  XMLHttpRequest.prototype.setRequestHeader = function (
    header: string,
    value: string
  ) {
    if (!(this as ExtendedXHR)._headers) {
      (this as ExtendedXHR)._headers = {};
    }
    (this as ExtendedXHR)._headers[header] = value;
    return originalSetRequestHeader.apply(this, arguments as any);
  };

  XMLHttpRequest.prototype.send = function (
    this: ExtendedXHR,
    body?:
      | Document
      | string
      | Blob
      | ArrayBufferView<ArrayBufferLike>
      | ArrayBuffer
      | FormData
      | URLSearchParams
      | null
      | undefined
  ): void {
    const url = this._url || '';
    const method = this._method || 'GET';
    const rid = this._rid || '';
    EventsManager.on('api-call', {
      type: 'api-call',
      url: url,
      rid,
      method: method,
      body: body || null,
      headers: {},
      query: this._url?.split('?')[1] || '',
    });

    this.addEventListener('load', function () {
      EventsManager.on('api-call', {
        type: 'api-call',
        url: url,
        rid,
        method: method,
        status: this.status,
      });
    });

    return originalXHRSend.call(this, body);
  };
})();
