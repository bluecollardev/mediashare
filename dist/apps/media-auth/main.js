(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/media-auth/src/app/app.module.ts":
/*!***********************************************!*\
  !*** ./apps/media-auth/src/app/app.module.ts ***!
  \***********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth-user.entity */ "./apps/media-auth/src/app/auth/auth-user.entity.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth.module */ "./apps/media-auth/src/app/auth/auth.module.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configuration */ "./apps/media-auth/src/app/configuration.ts");







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
    entities: [_auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__["AuthUser"]],
    connectTimeoutMS: 2000,
    logNotifications: true,
};
console.log(ormConfig);
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_2__["ConfigModule"].forRoot({
                load: [_configuration__WEBPACK_IMPORTED_MODULE_6__["default"]],
                envFilePath: 'development.env',
                ignoreEnvVars: "development" === 'development',
                ignoreEnvFile: "development" !== 'development',
            }),
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["TypeOrmModule"].forRoot(ormConfig),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_5__["AuthModule"],
        ],
        controllers: [],
        providers: [_nestjs_config__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]],
    })
], AppModule);



/***/ }),

/***/ "./apps/media-auth/src/app/auth/auth-user.entity.ts":
/*!**********************************************************!*\
  !*** ./apps/media-auth/src/app/auth/auth-user.entity.ts ***!
  \**********************************************************/
/*! exports provided: AuthUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthUser", function() { return AuthUser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
var _a, _b;





let AuthUser = class AuthUser {
    hashPassword() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.password = yield Object(bcrypt__WEBPACK_IMPORTED_MODULE_1__["hash"])(this.password, 10);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["PrimaryGeneratedColumn"])('uuid'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthUser.prototype, "authId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthUser.prototype, "_id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthUser.prototype, "username", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Min"])(8),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthUser.prototype, "password", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsEmail"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AuthUser.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["CreateDateColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AuthUser.prototype, "createdAt", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["UpdateDateColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AuthUser.prototype, "updatedAt", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["BeforeInsert"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthUser.prototype, "hashPassword", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Column"])('enum', { default: [_core_lib__WEBPACK_IMPORTED_MODULE_4__["bcRoles"].guest], array: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__["BC_ROLES"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], AuthUser.prototype, "roles", void 0);
AuthUser = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Entity"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Unique"])(['username']),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["Unique"])(['email'])
], AuthUser);



/***/ }),

/***/ "./apps/media-auth/src/app/auth/auth.controller.ts":
/*!*********************************************************!*\
  !*** ./apps/media-auth/src/app/auth/auth.controller.ts ***!
  \*********************************************************/
/*! exports provided: AuthController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthController", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./apps/media-auth/src/app/auth/auth.service.ts");
var _a;




let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    loggedIn(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                console.log(data.jwt);
                // const res = this.authService.validateToken(data.jwt);
                const res = { username: 'admin@example.com', _id: '123123123' };
                return res;
            }
            catch (e) {
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log(e);
                return false;
            }
        });
    }
    validateUser(data) {
        return true;
        return this.authService.validateToken(data.token);
    }
    loginUser(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { username, password } = data;
            const user = yield this.authService.validateUser({ username, password });
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log(user);
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
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const _a = yield this.authService.getUser(data), { password } = _a, user = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["password"]);
            return user;
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'check' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "loggedIn", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'validate' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AuthController.prototype, "validateUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'login' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'create' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'setRoles' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AuthController.prototype, "setRoles", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["MessagePattern"])({ role: 'auth', cmd: 'get' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
AuthController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]) === "function" ? _a : Object])
], AuthController);



/***/ }),

/***/ "./apps/media-auth/src/app/auth/auth.module.ts":
/*!*****************************************************!*\
  !*** ./apps/media-auth/src/app/auth/auth.module.ts ***!
  \*****************************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.controller */ "./apps/media-auth/src/app/auth/auth.controller.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./apps/media-auth/src/app/auth/auth.service.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_user_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-user.entity */ "./apps/media-auth/src/app/auth/auth-user.entity.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__);







let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Module"])({
        imports: [
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__["TypeOrmModule"].forFeature([_auth_user_entity__WEBPACK_IMPORTED_MODULE_4__["AuthUser"]]),
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_6__["JwtModule"].register({
                secret: process.env.SESSION_SECRET || 'this-is-my-secret-key',
                signOptions: { expiresIn: '10h' },
            }),
        ],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_1__["AuthController"]],
        providers: [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]],
    })
], AuthModule);



/***/ }),

/***/ "./apps/media-auth/src/app/auth/auth.service.ts":
/*!******************************************************!*\
  !*** ./apps/media-auth/src/app/auth/auth.service.ts ***!
  \******************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth-user.entity */ "./apps/media-auth/src/app/auth/auth-user.entity.ts");
var _a, _b;







let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    validateUser(userToCheck) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { username, password } = userToCheck;
            const user = yield this.userRepository.findOne({ username });
            if ((user === null || user === void 0 ? void 0 : user.password) === password)
                return user;
            if (Object(bcrypt__WEBPACK_IMPORTED_MODULE_4__["compareSync"])(password, user === null || user === void 0 ? void 0 : user.password)) {
                return user;
            }
            return null;
        });
    }
    createUser(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('createUser - Created user');
                return res;
            }
            catch (e) {
                _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log(e);
                throw e;
            }
        });
    }
    login(user, _id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const payload = { user, sub: _id };
            const { password } = user, userFields = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(user, ["password"]);
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
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_auth_user_entity__WEBPACK_IMPORTED_MODULE_6__["AuthUser"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__["Repository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__["Repository"]) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"]) === "function" ? _b : Object])
], AuthService);



/***/ }),

/***/ "./apps/media-auth/src/app/configuration.ts":
/*!**************************************************!*\
  !*** ./apps/media-auth/src/app/configuration.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/auth-user.entity */ "./apps/media-auth/src/app/auth/auth-user.entity.ts");


/* harmony default export */ __webpack_exports__["default"] = (Object(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__["registerAs"])('auth', () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRESS_PORT || 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: "development" !== 'production',
    entities: [_auth_auth_user_entity__WEBPACK_IMPORTED_MODULE_1__["AuthUser"]],
    msPort: process.env.MS_PORT,
    msHost: process.env.MS_HOST,
    msApiPort: process.env.MS_API_PORT,
})));


/***/ }),

/***/ "./apps/media-auth/src/main.ts":
/*!*************************************!*\
  !*** ./apps/media-auth/src/main.ts ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./apps/media-auth/src/app/app.module.ts");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */





function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"]);
        const config = yield app.get('ConfigService');
        const globalPrefix = 'auth';
        console.log('the config', config);
        app.connectMicroservice({
            transport: _nestjs_microservices__WEBPACK_IMPORTED_MODULE_3__["Transport"].TCP,
            options: {
                host: config.get('auth'),
                port: config.get('auth.msPort'),
            },
        });
        yield app.startAllMicroservicesAsync();
        _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('Auth microservice running');
        app.setGlobalPrefix(globalPrefix);
        // const port = config.get('auth.msApiPort') || 4444;
    });
}
bootstrap();


/***/ }),

/***/ "./libs/core/src/index.ts":
/*!********************************!*\
  !*** ./libs/core/src/index.ts ***!
  \********************************/
/*! exports provided: core, ACCOUNT_TYPES, ApiDefaults, AUTH_CLIENT, playlistCategories, mediaCategories, MEDIA_CATEGORY, PLAYLIST_CATEGORY, bcRoles, BC_ROLES, Roles, Model, PLAYLIST_ID, PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/core */ "./libs/core/src/lib/core.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "core", function() { return _lib_core__WEBPACK_IMPORTED_MODULE_0__["core"]; });

/* harmony import */ var _lib_models_account_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/models/account.model */ "./libs/core/src/lib/models/account.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_TYPES", function() { return _lib_models_account_model__WEBPACK_IMPORTED_MODULE_1__["ACCOUNT_TYPES"]; });

/* harmony import */ var _lib_models_feed_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/models/feed.model */ "./libs/core/src/lib/models/feed.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_models_profile_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/models/profile.model */ "./libs/core/src/lib/models/profile.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_models_stats_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/models/stats.model */ "./libs/core/src/lib/models/stats.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_models_tag_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/models/tag.model */ "./libs/core/src/lib/models/tag.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_models_api_defaults_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/models/api-defaults.model */ "./libs/core/src/lib/models/api-defaults.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiDefaults", function() { return _lib_models_api_defaults_model__WEBPACK_IMPORTED_MODULE_6__["ApiDefaults"]; });

/* harmony import */ var _lib_tokens_auth_tokens_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/tokens/auth-tokens.constant */ "./libs/core/src/lib/tokens/auth-tokens.constant.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUTH_CLIENT", function() { return _lib_tokens_auth_tokens_constant__WEBPACK_IMPORTED_MODULE_7__["AUTH_CLIENT"]; });

/* harmony import */ var _lib_models__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/models */ "./libs/core/src/lib/models/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "playlistCategories", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["playlistCategories"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mediaCategories", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["mediaCategories"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_CATEGORY", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["MEDIA_CATEGORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_CATEGORY", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["PLAYLIST_CATEGORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bcRoles", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["bcRoles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BC_ROLES", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["BC_ROLES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["Roles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return _lib_models__WEBPACK_IMPORTED_MODULE_8__["Model"]; });

/* harmony import */ var _lib_tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/tokens */ "./libs/core/src/lib/tokens/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ID", function() { return _lib_tokens__WEBPACK_IMPORTED_MODULE_9__["PLAYLIST_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ENTITY", function() { return _lib_tokens__WEBPACK_IMPORTED_MODULE_9__["PLAYLIST_ENTITY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_ITEM_ENTITY", function() { return _lib_tokens__WEBPACK_IMPORTED_MODULE_9__["MEDIA_ITEM_ENTITY"]; });

/* harmony import */ var _lib_types___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/types/ */ "./libs/core/src/lib/types/index.ts");
/* empty/unused harmony star reexport */












/***/ }),

/***/ "./libs/core/src/lib/core.ts":
/*!***********************************!*\
  !*** ./libs/core/src/lib/core.ts ***!
  \***********************************/
/*! exports provided: core */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "core", function() { return core; });
function core() {
    return 'core';
}


/***/ }),

/***/ "./libs/core/src/lib/models/abstract/media.interface.ts":
/*!**************************************************************!*\
  !*** ./libs/core/src/lib/models/abstract/media.interface.ts ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/abstract/metadata.model.ts":
/*!*************************************************************!*\
  !*** ./libs/core/src/lib/models/abstract/metadata.model.ts ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/abstract/model.ts":
/*!****************************************************!*\
  !*** ./libs/core/src/lib/models/abstract/model.ts ***!
  \****************************************************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
class Model {
    constructor(model) {
        if (model)
            Object.assign(this, model);
    }
}


/***/ }),

/***/ "./libs/core/src/lib/models/abstract/orderable.model.ts":
/*!**************************************************************!*\
  !*** ./libs/core/src/lib/models/abstract/orderable.model.ts ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/account.model.ts":
/*!***************************************************!*\
  !*** ./libs/core/src/lib/models/account.model.ts ***!
  \***************************************************/
/*! exports provided: ACCOUNT_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_TYPES", function() { return ACCOUNT_TYPES; });
const ACCOUNT_TYPES = [
    'Email',
    'Google',
    'Facebook',
    'Instagram',
];


/***/ }),

/***/ "./libs/core/src/lib/models/api-defaults.model.ts":
/*!********************************************************!*\
  !*** ./libs/core/src/lib/models/api-defaults.model.ts ***!
  \********************************************************/
/*! exports provided: ApiDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiDefaults", function() { return ApiDefaults; });
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

/***/ "./libs/core/src/lib/models/auth-user.interface.ts":
/*!*********************************************************!*\
  !*** ./libs/core/src/lib/models/auth-user.interface.ts ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/bc-base.interface.ts":
/*!*******************************************************!*\
  !*** ./libs/core/src/lib/models/bc-base.interface.ts ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/categories.model.ts":
/*!******************************************************!*\
  !*** ./libs/core/src/lib/models/categories.model.ts ***!
  \******************************************************/
/*! exports provided: playlistCategories, mediaCategories, MEDIA_CATEGORY, PLAYLIST_CATEGORY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playlistCategories", function() { return playlistCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediaCategories", function() { return mediaCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_CATEGORY", function() { return MEDIA_CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_CATEGORY", function() { return PLAYLIST_CATEGORY; });
const PLAYLIST_CATEGORY = ['rehab', 'builder', 'warmup'];
const [rehab, builder, warmup] = PLAYLIST_CATEGORY;
const MEDIA_CATEGORY = ['strength', 'flexibility', 'endurance'];
const [strength, flexibility, endurance] = MEDIA_CATEGORY;
const playlistCategories = { rehab, builder, warmup };
const mediaCategories = { strength, flexibility, endurance };



/***/ }),

/***/ "./libs/core/src/lib/models/feed.model.ts":
/*!************************************************!*\
  !*** ./libs/core/src/lib/models/feed.model.ts ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/* Use users/id/shared to get the shared items */


/***/ }),

/***/ "./libs/core/src/lib/models/index.ts":
/*!*******************************************!*\
  !*** ./libs/core/src/lib/models/index.ts ***!
  \*******************************************/
/*! exports provided: playlistCategories, mediaCategories, MEDIA_CATEGORY, PLAYLIST_CATEGORY, ApiDefaults, ACCOUNT_TYPES, bcRoles, BC_ROLES, Roles, Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playlistItem_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlistItem.interface */ "./libs/core/src/lib/models/playlistItem.interface.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _bc_base_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bc-base.interface */ "./libs/core/src/lib/models/bc-base.interface.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _auth_user_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-user.interface */ "./libs/core/src/lib/models/auth-user.interface.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _categories_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./categories.model */ "./libs/core/src/lib/models/categories.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "playlistCategories", function() { return _categories_model__WEBPACK_IMPORTED_MODULE_3__["playlistCategories"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mediaCategories", function() { return _categories_model__WEBPACK_IMPORTED_MODULE_3__["mediaCategories"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_CATEGORY", function() { return _categories_model__WEBPACK_IMPORTED_MODULE_3__["MEDIA_CATEGORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_CATEGORY", function() { return _categories_model__WEBPACK_IMPORTED_MODULE_3__["PLAYLIST_CATEGORY"]; });

/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ "./libs/core/src/lib/models/validators.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _feed_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feed.model */ "./libs/core/src/lib/models/feed.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _profile_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.model */ "./libs/core/src/lib/models/profile.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _api_defaults_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api-defaults.model */ "./libs/core/src/lib/models/api-defaults.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiDefaults", function() { return _api_defaults_model__WEBPACK_IMPORTED_MODULE_7__["ApiDefaults"]; });

/* harmony import */ var _account_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./account.model */ "./libs/core/src/lib/models/account.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_TYPES", function() { return _account_model__WEBPACK_IMPORTED_MODULE_8__["ACCOUNT_TYPES"]; });

/* harmony import */ var _tag_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tag.model */ "./libs/core/src/lib/models/tag.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _user_interface__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./user.interface */ "./libs/core/src/lib/models/user.interface.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _stats_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stats.model */ "./libs/core/src/lib/models/stats.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _roles_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./roles.enum */ "./libs/core/src/lib/models/roles.enum.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bcRoles", function() { return _roles_enum__WEBPACK_IMPORTED_MODULE_12__["bcRoles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BC_ROLES", function() { return _roles_enum__WEBPACK_IMPORTED_MODULE_12__["BC_ROLES"]; });

/* harmony import */ var _roles_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./roles.model */ "./libs/core/src/lib/models/roles.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return _roles_model__WEBPACK_IMPORTED_MODULE_13__["Roles"]; });

/* harmony import */ var _abstract_orderable_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./abstract/orderable.model */ "./libs/core/src/lib/models/abstract/orderable.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _abstract_metadata_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./abstract/metadata.model */ "./libs/core/src/lib/models/abstract/metadata.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _abstract_media_interface__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./abstract/media.interface */ "./libs/core/src/lib/models/abstract/media.interface.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _abstract_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./abstract/model */ "./libs/core/src/lib/models/abstract/model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return _abstract_model__WEBPACK_IMPORTED_MODULE_17__["Model"]; });

/* harmony import */ var _playlist_interface__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./playlist.interface */ "./libs/core/src/lib/models/playlist.interface.ts");
/* empty/unused harmony star reexport */




















/***/ }),

/***/ "./libs/core/src/lib/models/playlist.interface.ts":
/*!********************************************************!*\
  !*** ./libs/core/src/lib/models/playlist.interface.ts ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/playlistItem.interface.ts":
/*!************************************************************!*\
  !*** ./libs/core/src/lib/models/playlistItem.interface.ts ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/profile.model.ts":
/*!***************************************************!*\
  !*** ./libs/core/src/lib/models/profile.model.ts ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/roles.enum.ts":
/*!************************************************!*\
  !*** ./libs/core/src/lib/models/roles.enum.ts ***!
  \************************************************/
/*! exports provided: bcRoles, BC_ROLES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bcRoles", function() { return bcRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BC_ROLES", function() { return BC_ROLES; });
const BC_ROLES = ['guest', 'user', 'admin'];
const [guest, user, admin] = BC_ROLES;
const bcRoles = { guest, user, admin };



/***/ }),

/***/ "./libs/core/src/lib/models/roles.model.ts":
/*!*************************************************!*\
  !*** ./libs/core/src/lib/models/roles.model.ts ***!
  \*************************************************/
/*! exports provided: Roles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return Roles; });
const roleTypes = ['user', 'subscribed', 'admin'];
class Roles {
}


/***/ }),

/***/ "./libs/core/src/lib/models/stats.model.ts":
/*!*************************************************!*\
  !*** ./libs/core/src/lib/models/stats.model.ts ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/tag.model.ts":
/*!***********************************************!*\
  !*** ./libs/core/src/lib/models/tag.model.ts ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/user.interface.ts":
/*!****************************************************!*\
  !*** ./libs/core/src/lib/models/user.interface.ts ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/models/validators.ts":
/*!************************************************!*\
  !*** ./libs/core/src/lib/models/validators.ts ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./libs/core/src/lib/tokens/auth-tokens.constant.ts":
/*!**********************************************************!*\
  !*** ./libs/core/src/lib/tokens/auth-tokens.constant.ts ***!
  \**********************************************************/
/*! exports provided: AUTH_CLIENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTH_CLIENT", function() { return AUTH_CLIENT; });
const AUTH_CLIENT = 'AUTH_CLIENT';



/***/ }),

/***/ "./libs/core/src/lib/tokens/entity-tokens.const.ts":
/*!*********************************************************!*\
  !*** ./libs/core/src/lib/tokens/entity-tokens.const.ts ***!
  \*********************************************************/
/*! exports provided: PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ENTITY", function() { return PLAYLIST_ENTITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_ITEM_ENTITY", function() { return MEDIA_ITEM_ENTITY; });
const [PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY] = ['playlist', 'media_item'];



/***/ }),

/***/ "./libs/core/src/lib/tokens/index.ts":
/*!*******************************************!*\
  !*** ./libs/core/src/lib/tokens/index.ts ***!
  \*******************************************/
/*! exports provided: AUTH_CLIENT, PLAYLIST_ID, PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-tokens.constant */ "./libs/core/src/lib/tokens/auth-tokens.constant.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUTH_CLIENT", function() { return _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__["AUTH_CLIENT"]; });

/* harmony import */ var _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path-segment-variable-tokens.constant */ "./libs/core/src/lib/tokens/path-segment-variable-tokens.constant.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ID", function() { return _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__["PLAYLIST_ID"]; });

/* harmony import */ var _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity-tokens.const */ "./libs/core/src/lib/tokens/entity-tokens.const.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ENTITY", function() { return _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__["PLAYLIST_ENTITY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEDIA_ITEM_ENTITY", function() { return _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__["MEDIA_ITEM_ENTITY"]; });






/***/ }),

/***/ "./libs/core/src/lib/tokens/path-segment-variable-tokens.constant.ts":
/*!***************************************************************************!*\
  !*** ./libs/core/src/lib/tokens/path-segment-variable-tokens.constant.ts ***!
  \***************************************************************************/
/*! exports provided: PLAYLIST_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYLIST_ID", function() { return PLAYLIST_ID; });
const [PLAYLIST_ID] = ['playlistId'];



/***/ }),

/***/ "./libs/core/src/lib/types/configEnum.type.ts":
/*!****************************************************!*\
  !*** ./libs/core/src/lib/types/configEnum.type.ts ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/types/constructor.type.ts":
/*!*****************************************************!*\
  !*** ./libs/core/src/lib/types/constructor.type.ts ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/types/id.type.ts":
/*!********************************************!*\
  !*** ./libs/core/src/lib/types/id.type.ts ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/core/src/lib/types/index.ts":
/*!******************************************!*\
  !*** ./libs/core/src/lib/types/index.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constructor_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructor.type */ "./libs/core/src/lib/types/constructor.type.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _configEnum_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configEnum.type */ "./libs/core/src/lib/types/configEnum.type.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _id_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id.type */ "./libs/core/src/lib/types/id.type.ts");
/* empty/unused harmony star reexport */




/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./apps/media-auth/src/main.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/sean/projects/mediashare/apps/media-auth/src/main.ts */"./apps/media-auth/src/main.ts");


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map