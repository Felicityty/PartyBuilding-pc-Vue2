const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const academic = require('./academic')
const development = require('./development')
const speciality = require('./speciality')
const Activity = require('./Activity')
const Thought = require('./Thought')
const UserManage = require('./UserManage')
const Coordination = require('./Coordination')

const mocks = [
  ...user,
  ...academic,
  ...development,
  ...speciality,
  ...Activity,
  ...Thought,
  ...UserManage,
  ...Coordination
]

function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

