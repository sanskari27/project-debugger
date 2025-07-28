(() => {
  // Intercept fetch
  const originalFetch = window.fetch;

  window.fetch = async (
    ...args: Parameters<typeof fetch>
  ): Promise<Response> => {
    const [input, init] = args;
    const url = typeof input === 'string' ? input : (input as Request).url;

    console.log('[fetch]', init?.method || 'GET', url, init?.body || null);

    const response = await originalFetch(...args);
    const cloned = response.clone();

    cloned
      .text()
      .then(body => {
        console.log('[fetch response]', response.status, response.url, body);
      })
      .catch(err => console.error('[fetch response error]', err));

    return response;
  };

  // Intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  interface ExtendedXHR extends XMLHttpRequest {
    _method?: string;
    _url?: string;
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
    return originalXHROpen.call(
      this,
      method,
      url,
      async || false,
      user,
      password
    );
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
    console.log('[xhr]', this._method, this._url, body || null);

    this.addEventListener('load', function () {
      console.log(
        '[xhr response]',
        this.status,
        this.responseURL,
        this.responseText
      );
    });

    return originalXHRSend.call(this, body);
  };
})();
