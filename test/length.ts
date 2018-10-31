
import 'mocha'
import assert from 'assert'
import { createResponse } from '../src'

describe('response.length(value)', () => {
  it('should set the headers', () => {
    let response = createResponse()

    response.length(1024)

    assert.equal(response.get('Content-Length'), 1024)
  })
})
