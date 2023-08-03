export const allValidations = [
  {
    "target": {
      "firstName": "J"
    },
    "property": "sub",
    "children": [],
    "constraints": {
      "isString": "sub must be a string",
      "isLength": "sub must be longer than or equal to 0 characters"
    }
  },
  {
    "target": {
      "firstName": "J"
    },
    "property": "username",
    "children": [],
    "constraints": {
      "isString": "username must be a string",
      "isLength": "username must be longer than or equal to 2 characters"
    }
  },
  {
    "target": {
      "firstName": "J"
    },
    "property": "email",
    "children": [],
    "constraints": {
      "isEmail": "email must be an email",
      "isLength": "email must be longer than or equal to 6 characters"
    }
  },
  {
    "target": {
      "firstName": "J"
    },
    "value": "J",
    "property": "firstName",
    "children": [],
    "constraints": {
      "isLength": "firstName must be longer than or equal to 2 characters"
    }
  },
  {
    "target": {
      "firstName": "J"
    },
    "property": "lastName",
    "children": [],
    "constraints": {
      "isString": "lastName must be a string",
      "isLength": "lastName must be longer than or equal to 2 characters"
    }
  }
];
