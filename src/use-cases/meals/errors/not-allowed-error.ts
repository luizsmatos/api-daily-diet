export class NotAllowedError extends Error {
  constructor() {
    super('Not Allowed.')
    this.name = 'NotAllowedError'
  }
}
