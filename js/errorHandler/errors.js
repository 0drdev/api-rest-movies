const createErrorFactory = function (name) {
  return class BusinessError extends Error {
    constructor(message) {
      super(message)
      this.name = name
      this.stack = '' // Opcional, según si deseas o no rastrear el stack.
    }
  }
}
const ConnectionError = createErrorFactory('ConnectionError')
const ValidationMovie = createErrorFactory('ValidationMovie')

module.exports = { ConnectionError, ValidationMovie }
