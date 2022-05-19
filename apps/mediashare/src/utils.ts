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

// Shorten a string to less than maxLen characters without truncating words.
export function shortenText(str, maxLen, separator: RegExp = undefined) {
  separator = separator || /\W/;
  if (str.length <= maxLen) {
    return str;
  }
  const idx = str.slice(maxLen).search(separator);
  return `${str.substring(0, idx < 0 ? idx : idx + maxLen)}...`;
}

/**
 * @deprecated Remove this when we've finished implementing authorProfile
 * @param user
 */
export function getUserFullName(user) {
  if (!user) {
    return 'Unknown';
  }
  const { firstName = '', lastName = '' } = user;
  return !!firstName || !!lastName ? `${firstName} ${lastName}` : 'Unknown';
}

/**
 * @deprecated Remove this when we've finished implementing authorProfile
 * @param user
 */
export function getAuthorText(user) {
  return `${getUserFullName(user)}`;
}

/**
 * @deprecated Remove this when we've finished implementing authorProfile
 * @param user
 */
export function getUsername(user = { username: 'Unknown' }) {
  return user.username ? `${user.username}` : 'anonymous';
}

export function findInArray(arr, fieldName, value) {
  return arr.find((item) => item[fieldName] === value);
}

export const filterUnique = (arr, key) =>
  arr.reduce((acc, cur) => {
    if (!acc.find((item) => item[key] === cur[key])) {
      acc.push(cur);
    }
    return acc;
  }, []);
