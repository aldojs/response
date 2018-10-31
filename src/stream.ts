
import { Response } from './base'
import is from '@sindresorhus/is'
import { ServerResponse } from 'http'
import { Stream, Writable } from 'stream'

export class StreamResponse extends Response {
  /**
   * Create a new empty response
   * 
   * @param stream The response stream
   * @constructor
   * @public
   */
  public constructor (stream: Stream) {
    super(stream, { 'Content-Type': 'application/octet-stream' })
  }

  /**
   * Send the response and terminate the stream
   * 
   * @param res The response stream
   * @public
   */
  send (res: ServerResponse): any {
    if (!this._isWritable(res)) return

    this._writeHeaders(res)

    return _pipe(this.body, res)
  }
}

/**
 * Pipe streams and return a promise
 * 
 * @param source 
 * @param destination 
 * @private
 */
function _pipe (source: Stream, destination: Writable): Promise<void> {
  let promise = _toPromise(source)

  source.pipe(destination)

  return promise
}

/**
 * Return a promise that resolves when the stream is finished,
 * or rejects when the `error` event is emitted
 * 
 * @param stream The stream object
 * @private
 */
function _toPromise (stream: Stream): Promise<void> {
  return new Promise((resolve, reject) => {
    let event = _isReadable(stream) ? 'end' : 'finish'

    stream.once('close', resolve)
    stream.once('error', reject)
    stream.once(event, resolve)
  })
}

/**
 * Check if the given stream is readable
 * 
 * @param stream The stream object
 * @private
 */
function _isReadable (stream: any): boolean {
  return stream.readable || is.function_(stream._read)
}
