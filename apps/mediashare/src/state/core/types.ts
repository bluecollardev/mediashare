// eslint-disable-next-line no-undef
export type SnakeCaseToCamelCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? `${Lowercase<FirstWord>}${SnakeCaseToPascalCase<Rest>}`
  : // eslint-disable-next-line no-undef
    `${Lowercase<S>}`;

export type SnakeCaseToPascalCase<S extends string> = S extends `${infer FirstWord}_${infer Rest}`
  ? // eslint-disable-next-line no-undef
    `${Capitalize<Lowercase<FirstWord>>}${SnakeCaseToPascalCase<Rest>}`
  : Capitalize<Lowercase<S>>;

export function snakeCaseToCamelCase<S extends string>(snakeCaseString: S): SnakeCaseToCamelCase<S> {
  return snakeCaseString
    .split('_')
    .map((word, i) => (i === 0 ? word.toLowerCase() : word && word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join('') as SnakeCaseToCamelCase<S>;
}

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
