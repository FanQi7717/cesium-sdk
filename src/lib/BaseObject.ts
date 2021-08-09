export class BaseObject {
  private _disposed: boolean;

  constructor() {
    this.disposed = false;
  }

  get disposed(): boolean {
    return this._disposed;
  }

  set disposed(disposed: boolean) {
    this._disposed = disposed;
  }

  dispose(): void {
    this.disposed = true;
    this._disposeInternal();
  }

  protected _disposeInternal(): void {}
}
