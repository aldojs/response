
HTTP(S) response utilities to use in conjuction to [@aldojs/http](https://www.npmjs.com/package/@aldojs/http) module.

## Install

```sh
$ npm add @aldojs/response
```

## Example

```js
let { createServer } = require('@aldojs/http')
let { createTextResponse } = require('@aldojs/response')

// handler
let handler = () => createTextResponse("Hello world!")

// server
let server = createServer(handler)

// start
await server.start(3000)
```

The response whould be

```http
HTTP-1.1 200 OK
Content-Type: plain/text
Content-Length: 12
Date: ...

Hello world!
```

## Response

The response instance let you construct a complex response with status code, body and headers.

```ts
declare class Response {
  body: any;
  statusCode: number;
  statusMessage: string;
  headers: http.OutgoingHttpHeaders;

  constructor(body?: any);

  type(value: string): this; // set the `Content-Type` header
  etag(value: string): this; // set the `ETag` header
  length(value: number): this; // set the `Content-Length` header
  location(url: string): this; // set the `Location` header
  has(header: string): boolean; // check the given header is already set
  remove(header: string): this; // remove the give header
  setCookie(value: string): this; // append a `Set-Cookie` header
  vary(...headers: string[]): this; // append a `Vary` header
  send(res: http.ServerResponse): any; // send the response to the client
  lastModified(value: string | Date): this; // set the `Last-Modfied` header
  status(code: number, message?: string): this; // set the status code and message
  append(header: string, value: string | string[]): this; // append a header value
  get(header: string): string | number | string[] | undefined; // get the header value
  set(header: string, value: string | number | string[]): this; // set the header value
  set(headers: { [field: string]: string | number | string[]; }): this; // set multiple headers
  reset(headers?: { [field: string]: string | number | string[]; }): this; // reset the headers
}
```

To create [Response](#response) instances, you may use one of the available factories:
- `createRespnse(content?)` to create a response based on the given content.
- `createEmptyResponse()` to create an empty response (default status code `204`).
- `createHtmlResponse(html)` to create a HTML response, sets the `Content-Type` header to `text/html; charset=utf-8` and the `Content-Length` header.
- `createTextResponse(text)` to create a text response, sets the `Content-Type` header to `text/plain; charset=utf-8` and the `Content-Length` header.
- `createBufferResponse(buff)` to create a buffered response, sets the `Content-Type` header to `application/octet-stream` and the `Content-Length` header.
- `createStreamResponse(stream)` to create a streamed response, sets the `Content-Type` header to `application/octet-stream`.
- `createJsonResponse(object)` to create a JSON response, sets the `Content-Type` header to `application/json; charset=utf-8` and the `Content-Length` header.

