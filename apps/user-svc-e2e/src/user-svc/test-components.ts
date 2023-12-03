import { clone } from 'remeda';

export const testAndCloneUser = (user, expected) => {
  expect(user._id).toBeDefined();
  expect(user.sub).toBeDefined();
  expect(user.username).toEqual(expected.username);
  expect(user.email).toEqual(expected.email);
  expect(user.firstName).toEqual(expected.firstName);
  expect(user.lastName).toEqual(expected.lastName);
  expect(user.createdAt).toBeDefined();
  expect(user.updatedDate).toBeDefined();
  return clone(user);
};
