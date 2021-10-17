/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
export type SnakeCaseToCamelCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Lowercase<FirstWord>}${SnakeCaseToPascalCase<Rest>}`
  : `${Lowercase<S>}`;

export type SnakeCaseToPascalCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? // eslint-disable-next-line no-undef
    `${Capitalize<Lowercase<FirstWord>>}${SnakeCaseToPascalCase<Rest>}`
  : Capitalize<Lowercase<S>>;

export function snakeCaseToCamelCase<S extends string>(snakeCaseString: S): SnakeCaseToCamelCase<S> {
  if (!snakeCaseString) {
    return;
  }
  return snakeCaseString
    .split('_')
    .map((word, i) => (i === 0 ? word.toLowerCase() : word && word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join('') as SnakeCaseToCamelCase<S>;
}

export const validate = (values) => {
  const error = {} as any;
  error.email = '';
  error.name = '';
  let ema = values.email;
  let nm = values.name;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.name === undefined) {
    nm = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (nm.length > 8) {
    error.name = 'max 8 characters';
  }
  return error;
};

// TODO: Move out! Is there a good util lib that does this?
// Shorten a string to less than maxLen characters without truncating words.
export function shortenText(str, maxLen, separator: RegExp = undefined) {
  separator = separator || /\W/;
  if (str.length <= maxLen) {
    return str;
  }
  const idx = str.slice(maxLen).search(separator);
  return `${str.substring(0, idx < 0 ? idx : idx + maxLen)}...`;
}

export function getUserFullName(user) {
  if (!user) {
    return 'Unknown';
  }
  const { firstName = '', lastName = '' } = user;
  return !!firstName || !!lastName ? `${firstName} ${lastName}` : 'Unknown';
}

export function getAuthorText(user) {
  return `${getUserFullName(user)}`;
}

export function getUsername(user = { username: 'Unknown' }) {
  return user.username ? `@${user.username}` : '@anonymous';
}

export function findInArray(arr, fieldName, value) {
  return arr.find((item) => item[fieldName] === value);
}
