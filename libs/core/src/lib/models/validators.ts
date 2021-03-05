import { registerDecorator, ValidationOptions, ValidationArguments, minLength, maxLength } from 'class-validator';
import * as R from 'remeda';

type Gconstructor<T = {}> = new (...args: any[]) => T;

type BaseConstructor = Gconstructor;

const nameString = {
  min: 2,
  max: 50,
};

const VALIDATORS = [nameString.constructor.name, 'longString', 'shortString'] as const;

// type ValidatorsKeyType = typeof VALIDATORS[number];

// const makeValidator = (key: ValidatorsKeyType) => ({ key });

// function minValidatorMixin<TBase extends BaseConstructor>(Base: TBase) {
//   return class {
//     constructor ( private length: number ) {

//     }
//   };
// }

// const shortStringMin = makeValidator('string');

// // const nameString: readonly [ number, number ] = [ 2, 50 ] as const;

// const validators = [nameString] as const;

// type ValidatorTypes = keyof typeof validators;

// // function makeStringValidator(type: ValidatorTypes) {
// //   const min = validators[type].min;
// //   const max = validators[type].max;
// //   return function (validationOptions?: ValidationOptions) {
// //     // eslint-disable-next-line @typescript-eslint/ban-types
// //     return function (object: Object, propertyName: string) {
// //       registerDecorator({
// //         name: 'isBcString',
// //         target: object.constructor,
// //         propertyName: propertyName,
// //         options: validationOptions,
// //         validator: {
// //           validate(value: any, args: ValidationArguments) {
// //             const isLongerThan = minLength(value, min);
// //             const isShorterThan = maxLength(value, max);

// //             return isLongerThan && isShorterThan;
// //           },
// //         },
// //       });
// //     };
// //   };
// // }

// const validatorsArray = R.map(validators, (validator) => Object.create(validator));

// export { validators };
