import { minLength } from '../../lib/Validators';

export const titleValidator = function (title) {
  if (!title) {
    return true;
  }
  return minLength(5)(title);
};
export const descriptionValidator = function (desc) {
  if (!desc) {
    return true;
  }
  return minLength(12)(desc);
};

export const categoryValidator = function (category) {
  if (!category) {
    return true;
  }
  return minLength(1)(category);
};
