export class CPromise<T> {
  private canceled = false;
  private loading = false;
  private cancelHandler: () => void;

  constructor(private executor: () => Promise<T>) {}

  run(resolve, reject?, onCancel?) {
    this.cancelHandler = onCancel;
    this.loading = true;
    this.canceled = false;
    this.executor().then(
      (data) => {
        this.loading = false;
        if (!this.canceled) {
          resolve(data);
        }
      },
      (data) => {
        console.log("err", data);
        this.loading = false;
        !this.canceled && reject && reject(data);
      },
    );
  }

  isLoading = () => this.loading;
  cancel = () => {
    this.canceled = true;
    if (this.cancelHandler) {
      this.cancelHandler();
    }
  };
}
