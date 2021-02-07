export class Model<T> {
  constructor(model?: Partial<T>) {
    if (model) Object.assign(this, model);
  }
}
