import { minLength } from '../../core/lib/Validators';

export const titleValidator = function (title) {
  if (!title) {
    return true;
  }
  return minLength(3)(title);
};
export const descriptionValidator = function (desc) {
  if (!desc) {
    return true;
  }
  return minLength(3)(desc);
};

export const categoryValidator = function (category) {
  if (!category) {
    return true;
  }
  return minLength(1)(category);
};
