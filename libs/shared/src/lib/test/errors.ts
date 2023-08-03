export const throwValidationError = (errors) => {
  throw new Error(`Validation errors detected: ${JSON.stringify(errors, null, 2)}`);
};
