export class ApiException extends Error {
  constructor(
    message: string,
    private statusCode: number,
  ) {
    super(message);
    this.name = 'Api Exception';
  }
}
