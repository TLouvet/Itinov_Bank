export class Response<T> {
  private data: T;
  private message: string;
  withData(data: T) {
    this.data = data;
    return this;
  }

  withMessage(message: string) {
    this.message = message;
    return this;
  }

  build() {
    return {
      data: this.data,
      message: this.message,
    };
  }
}
