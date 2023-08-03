const throwValidationError = (errors) => {
  throw new Error(`Validation errors detected: ${JSON.stringify(errors, null, 2)}`);
};
const throwInvalidMediaItemDtoError = () => {
  throw new Error(`Response was not a valid MediaItemDto`);
};
