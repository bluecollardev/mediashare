export const promiseWrapperFunctor = <E extends Object>(object: E) => {
  return () => new Promise<E>((resolve) => resolve(object));
};
