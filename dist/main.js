/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */





function bootstrap() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__.NestFactory.create(_app_app_module__WEBPACK_IMPORTED_MODULE_4__.AppModule);
        const config = yield app.get('ConfigService');
        const globalPrefix = 'auth';
        console.log('the config', config);
        app.connectMicroservice({
            transport: _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__.Transport.TCP,
            options: {
                host: config.get('auth'),
                port: config.get('auth.msPort'),
            },
        });
        yield app.startAllMicroservicesAsync();
        _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.log('Auth microservice running');
        app.setGlobalPrefix(globalPrefix);
        // const port = config.get('auth.msApiPort') || 4444;
    });
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => /* binding */ AppModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46);







const ormConfig = {
    type: 'postgres',
    // url: 'postgres://msuser:msuserpass@postgres/msuser',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRESS_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'msuser',
    password: process.env.POSTGRES_PASSWORD || 'msuserpass',
    database: process.env.POSTGRES_DB || 'msuser',
    synchronize: true,
    ssl: false,
    entities: [_auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__.AuthUser],
    connectTimeoutMS: 2000,
    logNotifications: true,
};
console.log(ormConfig);
let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_2__.ConfigModule.forRoot({
                load: [_configuration__WEBPACK_IMPORTED_MODULE_6__.default],
                envFilePath: 'development.env',
                ignoreEnvVars: process.env.NODE_ENV === 'development',
                ignoreEnvFile: process.env.NODE_ENV !== 'development',
            }),
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.TypeOrmModule.forRoot(ormConfig),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_5__.AuthModule,
        ],
        controllers: [],
        providers: [_nestjs_config__WEBPACK_IMPORTED_MODULE_2__.ConfigService],
    })
], AppModule);



/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");;

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthUser": () => /* binding */ AuthUser
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
var _a, _b;





let AuthUser = class AuthUser {
    hashPassword() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.password = yield (0,bcrypt__WEBPACK_IMPORTED_MODULE_1__.hash)(this.password, 10);
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.PrimaryGeneratedColumn)('uuid'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AuthUser.prototype, "authId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AuthUser.prototype, "_id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AuthUser.prototype, "username", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Column)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.Min)(8),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AuthUser.prototype, "password", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Column)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsEmail)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AuthUser.prototype, "email", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.CreateDateColumn)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AuthUser.prototype, "createdAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.UpdateDateColumn)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AuthUser.prototype, "updatedAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.BeforeInsert)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], AuthUser.prototype, "hashPassword", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Column)('enum', { default: [_core_lib__WEBPACK_IMPORTED_MODULE_4__.bcRoles.guest], array: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__.BC_ROLES }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], AuthUser.prototype, "roles", void 0);
AuthUser = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Entity)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Unique)(['username']),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_3__.Unique)(['email'])
], AuthUser);



/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("class-validator");;

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("typeorm");;

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => /* reexport safe */ _lib_core__WEBPACK_IMPORTED_MODULE_0__.core,
/* harmony export */   "ACCOUNT_TYPES": () => /* reexport safe */ _lib_models_account_model__WEBPACK_IMPORTED_MODULE_1__.ACCOUNT_TYPES,
/* harmony export */   "ApiDefaults": () => /* reexport safe */ _lib_models_api_defaults_model__WEBPACK_IMPORTED_MODULE_6__.ApiDefaults,
/* harmony export */   "AUTH_CLIENT": () => /* reexport safe */ _lib_tokens_auth_tokens_constant__WEBPACK_IMPORTED_MODULE_7__.AUTH_CLIENT,
/* harmony export */   "BC_ROLES": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.BC_ROLES,
/* harmony export */   "MEDIA_CATEGORY": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.MEDIA_CATEGORY,
/* harmony export */   "Model": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.Model,
/* harmony export */   "PLAYLIST_CATEGORY": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.PLAYLIST_CATEGORY,
/* harmony export */   "Roles": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.Roles,
/* harmony export */   "bcRoles": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.bcRoles,
/* harmony export */   "mediaCategories": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.mediaCategories,
/* harmony export */   "playlistCategories": () => /* reexport safe */ _lib_models__WEBPACK_IMPORTED_MODULE_8__.playlistCategories,
/* harmony export */   "MEDIA_ITEM_ENTITY": () => /* reexport safe */ _lib_tokens__WEBPACK_IMPORTED_MODULE_9__.MEDIA_ITEM_ENTITY,
/* harmony export */   "PLAYLIST_ENTITY": () => /* reexport safe */ _lib_tokens__WEBPACK_IMPORTED_MODULE_9__.PLAYLIST_ENTITY,
/* harmony export */   "PLAYLIST_ID": () => /* reexport safe */ _lib_tokens__WEBPACK_IMPORTED_MODULE_9__.PLAYLIST_ID
/* harmony export */ });
/* harmony import */ var _lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _lib_models_account_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _lib_models_feed_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _lib_models_profile_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _lib_models_stats_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _lib_models_tag_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _lib_models_api_defaults_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);
/* harmony import */ var _lib_tokens_auth_tokens_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _lib_models__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _lib_tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _lib_types___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(38);













/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => /* binding */ core
/* harmony export */ });
function core() {
    return 'core';
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACCOUNT_TYPES": () => /* binding */ ACCOUNT_TYPES
/* harmony export */ });
const ACCOUNT_TYPES = [
    'Email',
    'Google',
    'Facebook',
    'Instagram',
];


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

/* Use users/id/shared to get the shared items */


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiDefaults": () => /* binding */ ApiDefaults
/* harmony export */ });
class ApiDefaults {
    static get nameString() {
        return {
            min: 2,
            max: 50,
        };
    }
    static get string() {
        return {
            min: 2,
            max: 100,
        };
    }
    static get longString() {
        return {
            min: 10,
            max: 255,
        };
    }
}


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTH_CLIENT": () => /* binding */ AUTH_CLIENT
/* harmony export */ });
const AUTH_CLIENT = 'AUTH_CLIENT';



/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEDIA_CATEGORY": () => /* reexport safe */ _categories_model__WEBPACK_IMPORTED_MODULE_3__.MEDIA_CATEGORY,
/* harmony export */   "PLAYLIST_CATEGORY": () => /* reexport safe */ _categories_model__WEBPACK_IMPORTED_MODULE_3__.PLAYLIST_CATEGORY,
/* harmony export */   "mediaCategories": () => /* reexport safe */ _categories_model__WEBPACK_IMPORTED_MODULE_3__.mediaCategories,
/* harmony export */   "playlistCategories": () => /* reexport safe */ _categories_model__WEBPACK_IMPORTED_MODULE_3__.playlistCategories,
/* harmony export */   "ApiDefaults": () => /* reexport safe */ _api_defaults_model__WEBPACK_IMPORTED_MODULE_7__.ApiDefaults,
/* harmony export */   "ACCOUNT_TYPES": () => /* reexport safe */ _account_model__WEBPACK_IMPORTED_MODULE_8__.ACCOUNT_TYPES,
/* harmony export */   "BC_ROLES": () => /* reexport safe */ _roles_enum__WEBPACK_IMPORTED_MODULE_12__.BC_ROLES,
/* harmony export */   "bcRoles": () => /* reexport safe */ _roles_enum__WEBPACK_IMPORTED_MODULE_12__.bcRoles,
/* harmony export */   "Roles": () => /* reexport safe */ _roles_model__WEBPACK_IMPORTED_MODULE_13__.Roles,
/* harmony export */   "Model": () => /* reexport safe */ _abstract_model__WEBPACK_IMPORTED_MODULE_17__.Model
/* harmony export */ });
/* harmony import */ var _playlistItem_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _bc_base_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _auth_user_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _categories_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _feed_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _profile_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var _api_defaults_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19);
/* harmony import */ var _account_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _tag_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _user_interface__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(27);
/* harmony import */ var _stats_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
/* harmony import */ var _roles_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _roles_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29);
/* harmony import */ var _abstract_orderable_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(30);
/* harmony import */ var _abstract_metadata_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(31);
/* harmony import */ var _abstract_media_interface__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(32);
/* harmony import */ var _abstract_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(33);
/* harmony import */ var _playlist_interface__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(34);





















/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playlistCategories": () => /* binding */ playlistCategories,
/* harmony export */   "mediaCategories": () => /* binding */ mediaCategories,
/* harmony export */   "MEDIA_CATEGORY": () => /* binding */ MEDIA_CATEGORY,
/* harmony export */   "PLAYLIST_CATEGORY": () => /* binding */ PLAYLIST_CATEGORY
/* harmony export */ });
const PLAYLIST_CATEGORY = ['rehab', 'builder', 'warmup'];
const [rehab, builder, warmup] = PLAYLIST_CATEGORY;
const MEDIA_CATEGORY = ['strength', 'flexibility', 'endurance'];
const [strength, flexibility, endurance] = MEDIA_CATEGORY;
const playlistCategories = { rehab, builder, warmup };
const mediaCategories = { strength, flexibility, endurance };



/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const nameString = {
    min: 2,
    max: 50,
};
const VALIDATORS = [nameString.constructor.name, 'longString', 'shortString'];

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


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bcRoles": () => /* binding */ bcRoles,
/* harmony export */   "BC_ROLES": () => /* binding */ BC_ROLES
/* harmony export */ });
const BC_ROLES = ['guest', 'user', 'admin'];
const [guest, user, admin] = BC_ROLES;
const bcRoles = { guest, user, admin };



/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Roles": () => /* binding */ Roles
/* harmony export */ });
const roleTypes = ['user', 'subscribed', 'admin'];
class Roles {
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => /* binding */ Model
/* harmony export */ });
class Model {
    constructor(model) {
        if (model)
            Object.assign(this, model);
    }
}


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTH_CLIENT": () => /* reexport safe */ _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__.AUTH_CLIENT,
/* harmony export */   "PLAYLIST_ID": () => /* reexport safe */ _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__.PLAYLIST_ID,
/* harmony export */   "MEDIA_ITEM_ENTITY": () => /* reexport safe */ _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__.MEDIA_ITEM_ENTITY,
/* harmony export */   "PLAYLIST_ENTITY": () => /* reexport safe */ _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__.PLAYLIST_ENTITY
/* harmony export */ });
/* harmony import */ var _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);





/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PLAYLIST_ID": () => /* binding */ PLAYLIST_ID
/* harmony export */ });
const [PLAYLIST_ID] = ['playlistId'];



/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PLAYLIST_ENTITY": () => /* binding */ PLAYLIST_ENTITY,
/* harmony export */   "MEDIA_ITEM_ENTITY": () => /* binding */ MEDIA_ITEM_ENTITY
/* harmony export */ });
const [PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY] = ['playlist', 'media_item'];



/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constructor_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _configEnum_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _id_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);





/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthModule": () => /* binding */ AuthModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_user_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__);







let AuthModule = class AuthModule {
};
AuthModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_3__.Module)({
        imports: [
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__.TypeOrmModule.forFeature([_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__.AuthUser]),
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__.JwtModule.register({
                secret: process.env.SESSION_SECRET || 'this-is-my-secret-key',
                signOptions: { expiresIn: '10h' },
            }),
        ],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_1__.AuthController],
        providers: [_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService],
    })
], AuthModule);



/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthController": () => /* binding */ AuthController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
var _a;




let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    loggedIn(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            try {
                console.log(data.jwt);
                // const res = this.authService.validateToken(data.jwt);
                const res = { username: 'admin@example.com', _id: '123123123' };
                return res;
            }
            catch (e) {
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.log(e);
                return false;
            }
        });
    }
    validateUser(data) {
        return true;
        return this.authService.validateToken(data.token);
    }
    loginUser(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { username, password } = data;
            const user = yield this.authService.validateUser({ username, password });
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.log(user);
            if (!user)
                return null;
            return yield this.authService.login(user, user.authId);
        });
    }
    createUser(data) {
        return this.authService.createUser(data);
    }
    setRoles(data) {
        return this.authService.updateRoles(data);
    }
    getUser(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const _a = yield this.authService.getUser(data), { password } = _a, user = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(_a, ["password"]);
            return user;
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'check' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], AuthController.prototype, "loggedIn", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'validate' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], AuthController.prototype, "validateUser", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'login' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'create' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'setRoles' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], AuthController.prototype, "setRoles", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.MessagePattern)({ role: 'auth', cmd: 'get' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
AuthController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService) === "function" ? _a : Object])
], AuthController);



/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => /* binding */ AuthService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
var _a, _b;







let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    validateUser(userToCheck) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { username, password } = userToCheck;
            const user = yield this.userRepository.findOne({ username });
            if ((user === null || user === void 0 ? void 0 : user.password) === password)
                return user;
            if ((0,bcrypt__WEBPACK_IMPORTED_MODULE_4__.compareSync)(password, user === null || user === void 0 ? void 0 : user.password)) {
                return user;
            }
            return null;
        });
    }
    createUser(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { username, password, _id } = user;
            const createdAt = new Date();
            const email = username;
            try {
                /**
                 * Perform all needed checks
                 */
                const userEntity = this.userRepository.create({
                    email,
                    password,
                    createdAt,
                    username,
                    _id,
                });
                const res = yield this.userRepository.insert(userEntity);
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.log('createUser - Created user');
                return res;
            }
            catch (e) {
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.log(e);
                throw e;
            }
        });
    }
    login(user, _id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const payload = { user, sub: _id };
            const { password } = user, userFields = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(user, ["password"]);
            return Object.assign(Object.assign({}, userFields), { accessToken: this.jwtService.sign(payload) });
        });
    }
    validateToken(jwt) {
        const jwtResult = this.jwtService.verify(jwt);
        const { user: { username = null, _id = null }, } = jwtResult;
        const hasUser = !!jwtResult;
        return hasUser ? { username, _id } : null;
    }
    updateRoles(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { _id, roles } = user;
            return yield this.userRepository.update({ _id }, { roles });
        });
    }
    getUser(user) {
        const { _id } = user;
        // TODO: Switch this back or make the hardcoded user configurable
        return this.userRepository.findOne({ email: 'admin@example.com' });
    }
};
AuthService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_auth_user_entity__WEBPACK_IMPORTED_MODULE_6__.AuthUser)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__.Repository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__.Repository) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__.JwtService !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__.JwtService) === "function" ? _b : Object])
], AuthService);



/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_nestjs_config__WEBPACK_IMPORTED_MODULE_0__.registerAs)('auth', () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRESS_PORT || 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [_auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_1__.AuthUser],
    msPort: process.env.MS_PORT,
    msHost: process.env.MS_HOST,
    msApiPort: process.env.MS_API_PORT,
})));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;