export class ApiDefaults {
  static get nameString() {
    return {
      min: 2,
      max: 50,
    };
  }

  static get string() {
    return {
      min: 10,
      max: 100,
    };
  }

  static get longString() {
    return {
      min: 10,
      max: 255,
    };
  }
}
