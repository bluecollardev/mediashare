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

/***/ "./apps/media-api/src/app/app.controller.ts":
/*!**************************************************!*\
  !*** ./apps/media-api/src/app/app.controller.ts ***!
  \**************************************************/
/*! exports provided: AppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);



Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiTags"])('Main');
let AppController = class AppController {
    constructor() { }
    isOnline() {
        return true;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiResponse"])({ description: 'Used to validate that the app is online and connectivity is enabled', status: 200 }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('online-status'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "isOnline", null);
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], AppController);



/***/ }),

/***/ "./apps/media-api/src/app/app.module.ts":
/*!**********************************************!*\
  !*** ./apps/media-api/src/app/app.module.ts ***!
  \**********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/media-api/src/app/modules/auth/auth.module.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.controller */ "./apps/media-api/src/app/app.controller.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.service */ "./apps/media-api/src/app/app.service.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _controllers_user_user_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers/user/user.module */ "./apps/media-api/src/app/controllers/user/user.module.ts");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _controllers_media_item_media_item_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/media-item/media-item.module */ "./apps/media-api/src/app/controllers/media-item/media-item.module.ts");
/* harmony import */ var _controllers_profile_profile_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controllers/profile/profile.module */ "./apps/media-api/src/app/controllers/profile/profile.module.ts");
/* harmony import */ var _controllers_playlist_playlist_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./controllers/playlist/playlist.module */ "./apps/media-api/src/app/controllers/playlist/playlist.module.ts");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _controllers_share_items_share_items_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./controllers/share-items/share-items.module */ "./apps/media-api/src/app/controllers/share-items/share-items.module.ts");
/* harmony import */ var _modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/app-config.module.ts/app-config.module */ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.module.ts");
/* harmony import */ var _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/app-config.module.ts/app-config.provider */ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.provider.ts");
var _a;















let AppModule = class AppModule {
    constructor(appConfigService) {
        this.appConfigService = appConfigService;
    }
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Module"])({
        imports: [
            _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_1__["AuthModule"],
            _modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__["AppConfigModule"],
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__["TypeOrmModule"].forRootAsync({
                imports: [_modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__["AppConfigModule"]],
                useFactory: (configService) => ({
                    autoLoadEntities: true,
                    type: configService.db('type'),
                    url: configService.db('url'),
                    username: configService.db('username'),
                    password: configService.db('password'),
                    database: configService.db('database'),
                    entities: configService.db('entities'),
                    synchronize: configService.db('synchronize'),
                    ssl: configService.db('ssl'),
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                }),
                inject: [_modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__["AppConfigService"]],
            }),
            _controllers_user_user_module__WEBPACK_IMPORTED_MODULE_6__["UserModule"],
            nestjs_pino__WEBPACK_IMPORTED_MODULE_7__["LoggerModule"].forRoot({
                pinoHttp: {
                    prettyPrint: {
                        colorize: true,
                        levelFirst: true,
                        translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
                    },
                },
            }),
            _controllers_media_item_media_item_module__WEBPACK_IMPORTED_MODULE_8__["MediaItemModule"],
            _controllers_profile_profile_module__WEBPACK_IMPORTED_MODULE_9__["ProfileModule"],
            _controllers_playlist_playlist_module__WEBPACK_IMPORTED_MODULE_10__["PlaylistModule"],
            _nestjs_passport__WEBPACK_IMPORTED_MODULE_11__["PassportModule"],
            _controllers_share_items_share_items_module__WEBPACK_IMPORTED_MODULE_12__["ShareItemsModule"],
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"]],
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__["AppConfigService"] !== "undefined" && _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__["AppConfigService"]) === "function" ? _a : Object])
], AppModule);



/***/ }),

/***/ "./apps/media-api/src/app/app.service.ts":
/*!***********************************************!*\
  !*** ./apps/media-api/src/app/app.service.ts ***!
  \***********************************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
    getData() {
        return { message: 'Welcome to media-api!' };
    }
    constructor() { }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], AppService);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/dto/create-media-item.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/dto/create-media-item.dto.ts ***!
  \************************************************************************************/
/*! exports provided: CreateMediaItemDto, AdditionalMediaItemDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateMediaItemDto", function() { return CreateMediaItemDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditionalMediaItemDto", function() { return AdditionalMediaItemDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
var _a, _b;






// const CreateKeys:  Readonly<keyof MediaItem[]> = [ 'summary', 'isPlayable', 'description', 'title', 'category', 'userId' ] as const;
const OPTIONAL_MEDIA_DTO_KEYS = ['_id', 'displayFileName', 'thumbnail', 'uri', 'updatedDate'];
class CreateMediaItemDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["OmitType"])(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__["MediaItem"], [...OPTIONAL_MEDIA_DTO_KEYS]) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsBoolean"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiProperty"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], CreateMediaItemDto.prototype, "isPlayable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsString"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiProperty"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateMediaItemDto.prototype, "summary", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsString"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MinLength"])(_core_lib__WEBPACK_IMPORTED_MODULE_4__["ApiDefaults"].longString.min),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MaxLength"])(_core_lib__WEBPACK_IMPORTED_MODULE_4__["ApiDefaults"].longString.max),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiProperty"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateMediaItemDto.prototype, "description", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__["ApiObjectId"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof NonNullable !== "undefined" && NonNullable) === "function" ? _a : Object)
], CreateMediaItemDto.prototype, "userId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsString"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MinLength"])(_core_lib__WEBPACK_IMPORTED_MODULE_4__["ApiDefaults"].longString.min),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["MaxLength"])(_core_lib__WEBPACK_IMPORTED_MODULE_4__["ApiDefaults"].longString.max),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiProperty"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateMediaItemDto.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiProperty"])({ required: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__["MEDIA_CATEGORY"] }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsIn"])(_core_lib__WEBPACK_IMPORTED_MODULE_4__["MEDIA_CATEGORY"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_4__["MediaCategoryType"] !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_4__["MediaCategoryType"]) === "function" ? _b : Object)
], CreateMediaItemDto.prototype, "category", void 0);
class AdditionalMediaItemDto extends CreateMediaItemDto {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__["ApiString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AdditionalMediaItemDto.prototype, "displayFileName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__["ApiUriString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AdditionalMediaItemDto.prototype, "thumbnail", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__["ApiUriString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], AdditionalMediaItemDto.prototype, "uri", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/dto/media-item.dto.ts":
/*!*****************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/dto/media-item.dto.ts ***!
  \*****************************************************************************/
/*! exports provided: MediaItemDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaItemDto", function() { return MediaItemDto; });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-media-item.dto */ "./apps/media-api/src/app/controllers/media-item/dto/create-media-item.dto.ts");


class MediaItemDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__["IntersectionType"])(_create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__["CreateMediaItemDto"], _create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__["AdditionalMediaItemDto"]) {
}


/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/dto/update-media-item.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/dto/update-media-item.dto.ts ***!
  \************************************************************************************/
/*! exports provided: UpdateMediaItemDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMediaItemDto", function() { return UpdateMediaItemDto; });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");


class UpdateMediaItemDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__["PartialType"])(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__["MediaItem"]) {
}


/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts":
/*!*************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts ***!
  \*************************************************************************************/
/*! exports provided: MEDIA_TOKEN, MediaItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_TOKEN", function() { return MEDIA_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaItem", function() { return MediaItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_7__);
var _a, _b, _c;








const MEDIA_TOKEN = _core_lib__WEBPACK_IMPORTED_MODULE_2__["MEDIA_ITEM_ENTITY"];
let MediaItem = class MediaItem extends _api__WEBPACK_IMPORTED_MODULE_1__["BcEntity"] {
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_5__["IsBoolean"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiProperty"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], MediaItem.prototype, "isPlayable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiObjectId"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Index"])('userId'),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])({ nullable: false, unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_6__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_6__["ObjectId"]) === "function" ? _a : Object)
], MediaItem.prototype, "userId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiLongString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "summary", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiString"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "description", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiString"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])({ nullable: true, type: 'text' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiString"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "displayFileName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiUriString"])({ required: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "thumbnail", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiUriString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], MediaItem.prototype, "uri", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiProperty"])({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__["MEDIA_CATEGORY"] }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_5__["IsArray"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_5__["IsIn"])(_core_lib__WEBPACK_IMPORTED_MODULE_2__["MEDIA_CATEGORY"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_2__["MediaCategoryType"] !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_2__["MediaCategoryType"]) === "function" ? _b : Object)
], MediaItem.prototype, "category", void 0);
MediaItem = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Entity"])(MEDIA_TOKEN),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object])
], MediaItem);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/media-item.controller.ts":
/*!********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/media-item.controller.ts ***!
  \********************************************************************************/
/*! exports provided: MediaItemController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaItemController", function() { return MediaItemController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _media_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media-item.service */ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts");
/* harmony import */ var _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dto/create-media-item.dto */ "./apps/media-api/src/app/controllers/media-item/dto/create-media-item.dto.ts");
/* harmony import */ var _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dto/update-media-item.dto */ "./apps/media-api/src/app/controllers/media-item/dto/update-media-item.dto.ts");
/* harmony import */ var _core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/functors/http-errors.functor */ "./apps/media-api/src/app/core/functors/http-errors.functor.ts");
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/share-item/services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/auth/guards/jwt-auth.guard */ "./apps/media-api/src/app/modules/auth/guards/jwt-auth.guard.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _media_item_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./media-item.decorator */ "./apps/media-api/src/app/controllers/media-item/media-item.decorator.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/decorators/create-dto.decorator */ "./apps/media-api/src/app/core/decorators/create-dto.decorator.ts");
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../modules/app-config.module.ts/constants/open-api.constants */ "./apps/media-api/src/app/modules/app-config.module.ts/constants/open-api.constants.ts");
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/decorators/user.decorator */ "./apps/media-api/src/app/core/decorators/user.decorator.ts");
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../modules/share-item/entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;


















let MediaItemController = class MediaItemController {
    constructor(mediaItemService, shareItemService) {
        this.mediaItemService = mediaItemService;
        this.shareItemService = shareItemService;
    }
    /**
     * Create a new user
  
     *
     * @param {CreateMediaItemDto} createMediaItemDto
     * @param {SessionUserInterface} user
     * @return {*}
     * @memberof MediaItemController
     */
    create(createMediaItemDto) {
        return this.mediaItemService.create(createMediaItemDto);
    }
    /* TODO: findout what this needs to be */
    findAll() {
        return this.mediaItemService.findAll();
    }
    getCategories() {
        return _core_lib__WEBPACK_IMPORTED_MODULE_10__["MEDIA_CATEGORY"];
    }
    findOne(mediaId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const mediaItem = yield this.mediaItemService.findOne(mediaId);
            if (!mediaItem)
                throw Object(_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__["notFoundResponse"])('mediaItem', { args: { mediaId } });
            return mediaItem;
        });
    }
    update(mediaId, updateMediaItemDto) {
        return this.mediaItemService.update(mediaId, updateMediaItemDto);
    }
    remove(mediaId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const deleted = yield this.mediaItemService.remove(mediaId);
            if (!deleted)
                throw Object(_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__["notFoundResponse"])(mediaId);
            return deleted;
        });
    }
    share(mediaId, userId, createdBy, response) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('the id', mediaId);
            const { title } = yield this.mediaItemService.findOne(mediaId);
            if (!title && !createdBy)
                return response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].NOT_FOUND);
            const shareItem = yield this.shareItemService.createMediaShareItem({
                createdBy,
                userId,
                mediaId,
                title,
            });
            response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].CREATED);
            return response.send(shareItem);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(),
    Object(_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__["MediaPostResponse"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__["CreateDto"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__["CreateMediaItemDto"] !== "undefined" && _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__["CreateMediaItemDto"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MediaItemController.prototype, "create", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__["MediaGetResponse"])({ isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MediaItemController.prototype, "findAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('categories'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MediaItemController.prototype, "getCategories", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__["MediaGetResponse"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__["default"].MEDIA_ITEM_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'mediaId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('mediaId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], MediaItemController.prototype, "findOne", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__["MediaPostResponse"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Put"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__["default"].MEDIA_ITEM_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'mediaId', type: String, required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiBody"])({ type: _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__["UpdateMediaItemDto"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('mediaId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__["ObjectIdPipe"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"]) === "function" ? _c : Object, typeof (_d = typeof _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__["UpdateMediaItemDto"] !== "undefined" && _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__["UpdateMediaItemDto"]) === "function" ? _d : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], MediaItemController.prototype, "update", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__["JwtAuthGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__["default"].MEDIA_ITEM_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'mediaId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('mediaId')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], MediaItemController.prototype, "remove", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(':mediaId/share/:userId'),
    Object(_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__["MediaPostResponse"])({ type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_17__["ShareItem"] }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'mediaId', type: String, required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('mediaId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_16__["GetUserId"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Res"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"]) === "function" ? _e : Object, typeof (_f = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"]) === "function" ? _f : Object, typeof (_g = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__["ObjectId"]) === "function" ? _g : Object, typeof (_h = typeof express__WEBPACK_IMPORTED_MODULE_2__["Response"] !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__["Response"]) === "function" ? _h : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], MediaItemController.prototype, "share", null);
MediaItemController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiTags"])('media-items'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('media-items'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_j = typeof _media_item_service__WEBPACK_IMPORTED_MODULE_4__["MediaItemService"] !== "undefined" && _media_item_service__WEBPACK_IMPORTED_MODULE_4__["MediaItemService"]) === "function" ? _j : Object, typeof (_k = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__["ShareItemService"] !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__["ShareItemService"]) === "function" ? _k : Object])
], MediaItemController);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/media-item.decorator.ts":
/*!*******************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/media-item.decorator.ts ***!
  \*******************************************************************************/
/*! exports provided: MediaGetResponse, MediaPostResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaGetResponse", function() { return MediaGetResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaPostResponse", function() { return MediaPostResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dto/create-media-item.dto */ "./apps/media-api/src/app/controllers/media-item/dto/create-media-item.dto.ts");
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");




function MediaPostResponse({ isArray = false, type = _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__["MediaItem"], description } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ description, type, status: 201, isArray }), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiBody"])({ type: _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_2__["CreateMediaItemDto"] }));
}
const MediaGetResponse = function ({ isArray = false, type = _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__["MediaItem"] } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, isArray, status: 200 }));
};



/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/media-item.module.ts":
/*!****************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/media-item.module.ts ***!
  \****************************************************************************/
/*! exports provided: MediaItemModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaItemModule", function() { return MediaItemModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _media_item_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./media-item.service */ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts");
/* harmony import */ var _media_item_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media-item.controller */ "./apps/media-api/src/app/controllers/media-item/media-item.controller.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/share-item/share-item.module */ "./apps/media-api/src/app/modules/share-item/share-item.module.ts");
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/auth/auth.module */ "./apps/media-api/src/app/modules/auth/auth.module.ts");








let MediaItemModule = class MediaItemModule {
};
MediaItemModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__["TypeOrmModule"].forFeature([_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_5__["MediaItem"]]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_6__["ShareItemModule"], _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_7__["AuthModule"]],
        controllers: [_media_item_controller__WEBPACK_IMPORTED_MODULE_3__["MediaItemController"]],
        providers: [_media_item_service__WEBPACK_IMPORTED_MODULE_2__["MediaItemService"]],
    })
], MediaItemModule);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts":
/*!*****************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/media-item/media-item.service.ts ***!
  \*****************************************************************************/
/*! exports provided: MediaItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaItemService", function() { return MediaItemService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! remeda */ "remeda");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_7__);
var _a, _b;








let MediaItemService = class MediaItemService extends _api__WEBPACK_IMPORTED_MODULE_1__["DataService"] {
    constructor(mediaRepository, logger) {
        super(mediaRepository, logger);
    }
    findPlaylistMedia(idStrings) {
        return this.repository.find({
            where: {
                $or: remeda__WEBPACK_IMPORTED_MODULE_7__["map"](idStrings, (id) => ({
                    _id: id,
                })),
            },
        });
    }
    findMediaItemsByUserId(userId) {
        return this.repository.find({ userId });
    }
};
MediaItemService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__["MediaItem"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"]) === "function" ? _b : Object])
], MediaItemService);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/dto/create-playlist-response.dto.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/dto/create-playlist-response.dto.ts ***!
  \*****************************************************************************************/
/*! exports provided: Playlist, CreatePlaylistResponseDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePlaylistResponseDto", function() { return CreatePlaylistResponseDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Playlist", function() { return _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"]; });

var _a;



class CreatePlaylistResponseDto {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ readOnly: true, type: _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"] !== "undefined" && _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"]) === "function" ? _a : Object)
], CreatePlaylistResponseDto.prototype, "playlist", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], CreatePlaylistResponseDto.prototype, "playlistItems", void 0);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/dto/create-playlist.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/dto/create-playlist.dto.ts ***!
  \********************************************************************************/
/*! exports provided: CreatePlaylistDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePlaylistDto", function() { return CreatePlaylistDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
var _a;




class CreatePlaylistDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["PickType"])(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__["Playlist"], ['category', 'title', 'createdBy', 'userId']) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ isArray: true, type: 'string', writeOnly: true, required: true }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsArray"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Readonly !== "undefined" && Readonly) === "function" ? _a : Object)
], CreatePlaylistDto.prototype, "mediaIds", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/dto/playlist-response-item.dto.ts":
/*!***************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/dto/playlist-response-item.dto.ts ***!
  \***************************************************************************************/
/*! exports provided: PlaylistItemResponseDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistItemResponseDto", function() { return PlaylistItemResponseDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../modules/playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../media-item/entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
var _a;







class PlaylistItemCreatedBy extends _api__WEBPACK_IMPORTED_MODULE_1__["BcEntity"] {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], PlaylistItemCreatedBy.prototype, "username", void 0);
class PlaylistItemResponseDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["IntersectionType"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["OmitType"])(_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__["MediaItem"], ['createdBy']), _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_5__["PlaylistItem"]) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _a : Object)
], PlaylistItemResponseDto.prototype, "playlistItemId", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/dto/playlist-response.dto.ts":
/*!**********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/dto/playlist-response.dto.ts ***!
  \**********************************************************************************/
/*! exports provided: PlaylistItemResponseDto, PlaylistResponseDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistResponseDto", function() { return PlaylistResponseDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playlist-response-item.dto */ "./apps/media-api/src/app/controllers/playlist/dto/playlist-response-item.dto.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlaylistItemResponseDto", function() { return _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__["PlaylistItemResponseDto"]; });





class PlaylistResponseDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["PickType"])(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"], ['_id']) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ name: 'playlist media items for user', type: () => _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__["PlaylistItemResponseDto"], description: 'Playlist response DTO' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], PlaylistResponseDto.prototype, "mediaItems", void 0);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/dto/update-playlist.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/dto/update-playlist.dto.ts ***!
  \********************************************************************************/
/*! exports provided: UpdatePlaylistDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePlaylistDto", function() { return UpdatePlaylistDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");




class UpdatePlaylistDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["PickType"])(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__["Playlist"], ['title', 'category']) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ required: false }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsArray"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], UpdatePlaylistDto.prototype, "items", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts":
/*!*********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts ***!
  \*********************************************************************************/
/*! exports provided: Playlist, PlaylistByUserResponseDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Playlist", function() { return Playlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistByUserResponseDto", function() { return PlaylistByUserResponseDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../modules/playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
var _a, _b, _c;









let Playlist = class Playlist extends _api__WEBPACK_IMPORTED_MODULE_1__["BcEntity"] {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])('title'),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], Playlist.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiObjectId"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])('userId'),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Index"])('userId', { unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_6__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_6__["ObjectId"]) === "function" ? _a : Object)
], Playlist.prototype, "userId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Column"])({ type: 'enum', enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__["PLAYLIST_CATEGORY"] }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiProperty"])({ required: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__["PLAYLIST_CATEGORY"] }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_5__["IsIn"])(_core_lib__WEBPACK_IMPORTED_MODULE_2__["PLAYLIST_CATEGORY"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_2__["PlaylistCategoryType"] !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_2__["PlaylistCategoryType"]) === "function" ? _b : Object)
], Playlist.prototype, "category", void 0);
Playlist = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_7__["Entity"])('playlist')
], Playlist);

class PlaylistResponseFields {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiProperty"])({ type: _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_8__["PlaylistItem"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof Readonly !== "undefined" && Readonly) === "function" ? _c : Object)
], PlaylistResponseFields.prototype, "playlistItems", void 0);
class PlaylistByUserResponseDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["IntersectionType"])(PlaylistResponseFields, Playlist) {
}


/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/playlist.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/playlist.controller.ts ***!
  \****************************************************************************/
/*! exports provided: PlaylistController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistController", function() { return PlaylistController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dto/create-playlist.dto */ "./apps/media-api/src/app/controllers/playlist/dto/create-playlist.dto.ts");
/* harmony import */ var _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dto/update-playlist.dto */ "./apps/media-api/src/app/controllers/playlist/dto/update-playlist.dto.ts");
/* harmony import */ var _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/playlist.service */ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts");
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/share-item/services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/decorators/user.decorator */ "./apps/media-api/src/app/core/decorators/user.decorator.ts");
/* harmony import */ var _playlist_decorator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./playlist.decorator */ "./apps/media-api/src/app/controllers/playlist/playlist.decorator.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../modules/share-item/entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");
/* harmony import */ var _dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dto/playlist-response.dto */ "./apps/media-api/src/app/controllers/playlist/dto/playlist-response.dto.ts");
/* harmony import */ var _dto_create_playlist_response_dto__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dto/create-playlist-response.dto */ "./apps/media-api/src/app/controllers/playlist/dto/create-playlist-response.dto.ts");
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/decorators/create-dto.decorator */ "./apps/media-api/src/app/core/decorators/create-dto.decorator.ts");
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../modules/playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;


















const PLAYLIST_ID_TOKEN = ':playlistId';
let PlaylistController = class PlaylistController {
    constructor(playlistService, shareItemService) {
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
    }
    create(createPlaylistDto, userId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('dto', createPlaylistDto);
            return yield this.playlistService.createPlaylistWithItems(Object.assign(Object.assign({}, createPlaylistDto), { userId }));
        });
    }
    findAll() {
        return this.playlistService.findAll();
    }
    getCategories() {
        return { categories: _core_lib__WEBPACK_IMPORTED_MODULE_9__["PLAYLIST_CATEGORY"] };
    }
    findOne(playlistId) {
        return this.playlistService.getPlaylistById({ playlistId });
    }
    update(playlistId, userId, updatePlaylistDto) {
        const rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(updatePlaylistDto, []);
        return this.playlistService.update(playlistId, Object.assign(Object.assign({}, rest), { userId }));
    }
    remove(playlistId) {
        return this.playlistService.remove(playlistId);
    }
    share(playlistId, userId, createdBy, response) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const shareItem = yield this.shareItemService.createPlaylistShareItem({ createdBy, userId, playlistId });
            return response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].CREATED).send(shareItem);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__["PlaylistPostResponse"])({ type: _dto_create_playlist_response_dto__WEBPACK_IMPORTED_MODULE_15__["CreatePlaylistResponseDto"] }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiBody"])({ type: _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__["CreatePlaylistDto"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_16__["CreateDto"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__["GetUserId"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__["CreatePlaylistDto"] !== "undefined" && _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__["CreatePlaylistDto"]) === "function" ? _a : Object, typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], PlaylistController.prototype, "create", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__["PlaylistGetResponse"])({ isArray: true, type: _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_17__["PlaylistItem"] }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], PlaylistController.prototype, "findAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('categories'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], PlaylistController.prototype, "getCategories", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__["PlaylistGetResponse"])({ type: _dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_14__["PlaylistResponseDto"] }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({
        name: 'playlistId',
        required: true,
        type: 'string',
        example: new mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]().toHexString(),
    }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(PLAYLIST_ID_TOKEN),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'playlistId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], PlaylistController.prototype, "findOne", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Put"])(PLAYLIST_ID_TOKEN),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'playlistId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__["ObjectIdPipe"]())), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__["GetUserId"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_d = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _d : Object, typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _e : Object, typeof (_f = typeof _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__["UpdatePlaylistDto"] !== "undefined" && _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__["UpdatePlaylistDto"]) === "function" ? _f : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], PlaylistController.prototype, "update", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(PLAYLIST_ID_TOKEN)
    // @UseJwtGuard()
    ,
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'playlistId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('playlistId')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], PlaylistController.prototype, "remove", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])([':playlistId', ' share', ':userId']),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'playlistId', type: String, required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__["PlaylistPostResponse"])({ type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__["ShareItem"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__["GetUserId"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Res"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_g = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _g : Object, typeof (_h = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _h : Object, typeof (_j = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _j : Object, typeof (_k = typeof express__WEBPACK_IMPORTED_MODULE_2__["Response"] !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__["Response"]) === "function" ? _k : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], PlaylistController.prototype, "share", null);
PlaylistController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiTags"])('playlists'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('playlists'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_l = typeof _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__["PlaylistService"] !== "undefined" && _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__["PlaylistService"]) === "function" ? _l : Object, typeof (_m = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__["ShareItemService"] !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__["ShareItemService"]) === "function" ? _m : Object])
], PlaylistController);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/playlist.decorator.ts":
/*!***************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/playlist.decorator.ts ***!
  \***************************************************************************/
/*! exports provided: PlaylistPostResponse, PlaylistGetResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistPostResponse", function() { return PlaylistPostResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistGetResponse", function() { return PlaylistGetResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");



function PlaylistPostResponse({ isArray = false, type = _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"], description } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ description, type, status: 201, isArray }));
}
const PlaylistGetResponse = function ({ isArray = false, type = _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__["Playlist"] } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, isArray, status: 200 }));
};



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/playlist.module.ts":
/*!************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/playlist.module.ts ***!
  \************************************************************************/
/*! exports provided: PlaylistModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistModule", function() { return PlaylistModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _playlist_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist.controller */ "./apps/media-api/src/app/controllers/playlist/playlist.controller.ts");
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_playlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/playlist.service */ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts");
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../media-item/entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/playlist-item/services/playlist-item.service */ "./apps/media-api/src/app/modules/playlist-item/services/playlist-item.service.ts");
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/share-item/share-item.module */ "./apps/media-api/src/app/modules/share-item/share-item.module.ts");
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/auth/auth.module */ "./apps/media-api/src/app/modules/auth/auth.module.ts");











let PlaylistModule = class PlaylistModule {
};
PlaylistModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__["TypeOrmModule"].forFeature([_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__["Playlist"], _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__["MediaItem"], _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_7__["PlaylistItem"]]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_9__["ShareItemModule"], _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_10__["AuthModule"]],
        controllers: [_playlist_controller__WEBPACK_IMPORTED_MODULE_2__["PlaylistController"]],
        providers: [_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__["PlaylistService"], _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__["PlaylistItemService"]],
    })
], PlaylistModule);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts":
/*!**********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts ***!
  \**********************************************************************************/
/*! exports provided: PlaylistService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistService", function() { return PlaylistService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_playlist_item_functors_map_playlist_item_functor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../modules/playlist-item/functors/map-playlist-item.functor */ "./apps/media-api/src/app/modules/playlist-item/functors/map-playlist-item.functor.ts");
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../modules/playlist-item/services/playlist-item.service */ "./apps/media-api/src/app/modules/playlist-item/services/playlist-item.service.ts");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! remeda */ "remeda");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../modules/auth/user.service */ "./apps/media-api/src/app/modules/auth/user.service.ts");
var _a, _b, _c, _d;











let PlaylistService = class PlaylistService extends _api__WEBPACK_IMPORTED_MODULE_1__["DataService"] {
    constructor(repository, logger, userService, playlistItemService) {
        super(repository, logger);
        this.userService = userService;
        this.playlistItemService = playlistItemService;
    }
    /**
     *
     *
     * @param {{ mediaIds: string[]; userId: ObjectId }} { userId, mediaIds }
     * @memberof PlaylistService
     */
    createPlaylistWithItems({ createdBy, userId, mediaIds, title = '' }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!userId || typeof userId === 'string')
                throw new Error('userId is string in createPlaylistWithItems');
            const playlist = yield this.create({ userId, title, createdBy });
            const { _id: playlistId } = playlist;
            const playlistItems = yield this.createPlaylistItems({
                playlistId,
                createdBy,
                items: Object(_modules_playlist_item_functors_map_playlist_item_functor__WEBPACK_IMPORTED_MODULE_6__["mapPlaylistItems"])(mediaIds, { userId, playlistId }),
            });
            return { playlist, playlistItems };
        });
    }
    /**
     *
     *
     * @param {{ playlistId: ObjectId; items: Partial<PlaylistItem>[] }} { playlistId, items }
     * @return {*}
     * @memberof PlaylistService
     */
    createPlaylistItems({ playlistId, items, createdBy }) {
        if (!items || items.length < 1)
            throw new Error('no items in createPlaylistItems');
        if (!playlistId || typeof playlistId === 'string')
            throw new Error('wrong type in createPlaylistItems.id');
        const mappedItems = items.map((item) => (Object.assign(Object.assign({}, item), { playlistId, createdBy })));
        return this.playlistItemService.insertMany(mappedItems);
    }
    findPlaylistsByList(ObjectIds) {
        return this.repository
            .aggregate([
            {
                $match: {
                    where: {
                        $or: remeda__WEBPACK_IMPORTED_MODULE_9__["map"](ObjectIds, (id) => ({
                            _id: id,
                        })),
                    },
                },
            },
        ])
            .toArray();
    }
    queryPlaylistsById(playlistIds) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    $or: remeda__WEBPACK_IMPORTED_MODULE_9__["map"](playlistIds, (id) => ({
                        _id: id,
                    })),
                },
            });
        });
    }
    /* FIXME: hack-around for getting a user when one doesn't exist */
    getPlaylistByUserId({ userId } = { userId: null }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (userId === null || !userId) {
                const defaultUsername = 'admin@example.com';
                const user = yield this.userService.findByQuery({ username: defaultUsername });
                return yield this.playlistItemService.aggregatePlaylistAndItemByIdField({ userId: user._id });
            }
            return yield this.playlistItemService.aggregatePlaylistAndItemByIdField({ userId });
        });
    }
    getPlaylistById({ playlistId }) {
        return this.playlistItemService.aggregatePlaylistAndItemByIdField({
            playlistId,
        });
    }
    findall() {
        return this.playlistItemService.findAll();
    }
};
PlaylistService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__["Playlist"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"]) === "function" ? _b : Object, typeof (_c = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"] !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"]) === "function" ? _c : Object, typeof (_d = typeof _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__["PlaylistItemService"] !== "undefined" && _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__["PlaylistItemService"]) === "function" ? _d : Object])
], PlaylistService);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/profile/entities/profile.entity.ts":
/*!*******************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/profile/entities/profile.entity.ts ***!
  \*******************************************************************************/
/*! exports provided: Profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");



let Profile = class Profile extends _api__WEBPACK_IMPORTED_MODULE_2__["BcBaseEntity"] {
};
Profile = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])()
], Profile);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/profile/profile.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/profile/profile.controller.ts ***!
  \**************************************************************************/
/*! exports provided: ProfileController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileController", function() { return ProfileController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _profile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.service */ "./apps/media-api/src/app/controllers/profile/profile.service.ts");
var _a;



let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
};
ProfileController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('profile'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _profile_service__WEBPACK_IMPORTED_MODULE_2__["ProfileService"] !== "undefined" && _profile_service__WEBPACK_IMPORTED_MODULE_2__["ProfileService"]) === "function" ? _a : Object])
], ProfileController);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/profile/profile.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/profile/profile.module.ts ***!
  \**********************************************************************/
/*! exports provided: ProfileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _profile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.service */ "./apps/media-api/src/app/controllers/profile/profile.service.ts");
/* harmony import */ var _profile_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.controller */ "./apps/media-api/src/app/controllers/profile/profile.controller.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_profile_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/profile.entity */ "./apps/media-api/src/app/controllers/profile/entities/profile.entity.ts");






let ProfileModule = class ProfileModule {
};
ProfileModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__["TypeOrmModule"].forFeature([_entities_profile_entity__WEBPACK_IMPORTED_MODULE_5__["Profile"]])],
        controllers: [_profile_controller__WEBPACK_IMPORTED_MODULE_3__["ProfileController"]],
        providers: [_profile_service__WEBPACK_IMPORTED_MODULE_2__["ProfileService"]],
    })
], ProfileModule);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/profile/profile.service.ts":
/*!***********************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/profile/profile.service.ts ***!
  \***********************************************************************/
/*! exports provided: ProfileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_profile_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entities/profile.entity */ "./apps/media-api/src/app/controllers/profile/entities/profile.entity.ts");
var _a, _b;







let ProfileService = class ProfileService extends _api__WEBPACK_IMPORTED_MODULE_1__["DataService"] {
    constructor(userRepository, logger) {
        super(userRepository, logger);
    }
};
ProfileService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_entities_profile_entity__WEBPACK_IMPORTED_MODULE_6__["Profile"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"]) === "function" ? _b : Object])
], ProfileService);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/share-items/share-items.controller.ts":
/*!**********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/share-items/share-items.controller.ts ***!
  \**********************************************************************************/
/*! exports provided: ShareItemsController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemsController", function() { return ShareItemsController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/share-item/services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/decorators/user.decorator */ "./apps/media-api/src/app/core/decorators/user.decorator.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _share_items_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./share-items.decorator */ "./apps/media-api/src/app/controllers/share-items/share-items.decorator.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/app-config.module.ts/constants/open-api.constants */ "./apps/media-api/src/app/modules/app-config.module.ts/constants/open-api.constants.ts");
var _a, _b, _c, _d;









let ShareItemsController = class ShareItemsController {
    constructor(shareItemService) {
        this.shareItemService = shareItemService;
    }
    findAll(userId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const [sharedMedia, sharedPlaylists] = yield Promise.all(this.shareItemService.findShareItemsByUserId(userId));
            return { sharedMedia, sharedPlaylists };
        });
    }
    findOne(shareId) {
        return this.shareItemService.findOne(shareId);
    }
    remove(shareId) {
        return this.shareItemService.remove(shareId);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__["ShareItemGetResponse"])({ isArray: true }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_3__["GetUserId"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], ShareItemsController.prototype, "findAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__["ShareItemGetResponse"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_8__["default"].SHARE_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'shareId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], ShareItemsController.prototype, "findOne", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__["ShareItemGetResponse"])(),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(':shareId'),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'shareId', type: String, required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__["ObjectIdPipe"]())),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], ShareItemsController.prototype, "remove", null);
ShareItemsController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiTags"])('share-items'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('share-items'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_d = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__["ShareItemService"] !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__["ShareItemService"]) === "function" ? _d : Object])
], ShareItemsController);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/share-items/share-items.decorator.ts":
/*!*********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/share-items/share-items.decorator.ts ***!
  \*********************************************************************************/
/*! exports provided: ShareItemPostResponse, ShareItemGetResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemPostResponse", function() { return ShareItemPostResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemGetResponse", function() { return ShareItemGetResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/share-item/entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");



function ShareItemPostResponse({ isArray = false, type = _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__["ShareItem"], description } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ description, type, status: 201, isArray }));
}
const ShareItemGetResponse = function ({ isArray = false, type = _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__["ShareItem"] } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, isArray, status: 200 }));
};



/***/ }),

/***/ "./apps/media-api/src/app/controllers/share-items/share-items.module.ts":
/*!******************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/share-items/share-items.module.ts ***!
  \******************************************************************************/
/*! exports provided: ShareItemsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemsModule", function() { return ShareItemsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _share_items_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./share-items.controller */ "./apps/media-api/src/app/controllers/share-items/share-items.controller.ts");
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/share-item/share-item.module */ "./apps/media-api/src/app/modules/share-item/share-item.module.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_auth_jwt_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/auth/jwt.strategy */ "./apps/media-api/src/app/modules/auth/jwt.strategy.ts");
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/auth/auth.module */ "./apps/media-api/src/app/modules/auth/auth.module.ts");
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/share-item/entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");








let ShareItemsModule = class ShareItemsModule {
};
ShareItemsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_3__["ShareItemModule"], _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__["TypeOrmModule"].forFeature([_modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__["ShareItem"]]), _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_6__["AuthModule"]],
        controllers: [_share_items_controller__WEBPACK_IMPORTED_MODULE_2__["ShareItemsController"]],
        providers: [_modules_auth_jwt_strategy__WEBPACK_IMPORTED_MODULE_5__["JwtStrategy"]],
    })
], ShareItemsModule);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/decorators/user-response.decorator.ts":
/*!***************************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/decorators/user-response.decorator.ts ***!
  \***************************************************************************************/
/*! exports provided: UserPostResponse, UserGetResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPostResponse", function() { return UserPostResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGetResponse", function() { return UserGetResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dto/create-user.dto */ "./apps/media-api/src/app/controllers/user/dto/create-user.dto.ts");



function UserPostResponse({ isArray = false, type = _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["UserDto"], description } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ description, type, status: 201, isArray }));
}
const UserGetResponse = function ({ isArray = false, type = _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["UserDto"] } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, isArray, status: 200 }));
};



/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/dto/create-user-response.dto.ts":
/*!*********************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/dto/create-user-response.dto.ts ***!
  \*********************************************************************************/
/*! exports provided: createUserResponseDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserResponseDto", function() { return createUserResponseDto; });
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remeda */ "remeda");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_user_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-user.dto */ "./apps/media-api/src/app/controllers/user/dto/create-user.dto.ts");


function createUserResponseDto(profile, user) {
    const pickFields = [
        'authId',
        'username',
        'email',
        'createdAt',
        '_id',
        'firstName',
        'lastName',
    ];
    const merged = remeda__WEBPACK_IMPORTED_MODULE_0__["merge"](profile, user);
    const pickedFields = remeda__WEBPACK_IMPORTED_MODULE_0__["pick"](merged, pickFields);
    const userDto = new _create_user_dto__WEBPACK_IMPORTED_MODULE_1__["UserDto"](pickedFields);
    Object.assign(userDto, merged);
    return userDto;
}


/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/dto/create-user.dto.ts":
/*!************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/dto/create-user.dto.ts ***!
  \************************************************************************/
/*! exports provided: CreateUserDto, UserAuthFieldsDto, UserDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateUserDto", function() { return CreateUserDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAuthFieldsDto", function() { return UserAuthFieldsDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDto", function() { return UserDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _login_dto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login.dto */ "./apps/media-api/src/app/controllers/user/dto/login.dto.ts");
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");
var _a, _b, _c, _d;







const uuidExample = '1731ee8a-8f27-53af-805d-2ee2e705f0e2';
class CreateUserDto extends _login_dto__WEBPACK_IMPORTED_MODULE_5__["LoginDto"] {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiName"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiName"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
class UserAuthFieldsDto {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiObjectId"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Readonly !== "undefined" && Readonly) === "function" ? _a : Object)
], UserAuthFieldsDto.prototype, "_id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({
        type: String,
        readOnly: true,
        example: uuidExample,
        maxLength: uuidExample.length,
        minLength: uuidExample.length,
    }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsUUID"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof Readonly !== "undefined" && Readonly) === "function" ? _b : Object)
], UserAuthFieldsDto.prototype, "authId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiEmail"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof Readonly !== "undefined" && Readonly) === "function" ? _c : Object)
], UserAuthFieldsDto.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__["ApiPastDate"])({ readOnly: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_d = typeof Readonly !== "undefined" && Readonly) === "function" ? _d : Object)
], UserAuthFieldsDto.prototype, "createdAt", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__["BC_ROLES"] }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsArray"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], UserAuthFieldsDto.prototype, "roles", void 0);
class UserDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["IntersectionType"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["OmitType"])(_entities_user_entity__WEBPACK_IMPORTED_MODULE_6__["User"], ['_id', 'userId']), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["OmitType"])(UserAuthFieldsDto, ['_id'])) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiHideProperty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], UserDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/dto/login.dto.ts":
/*!******************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/dto/login.dto.ts ***!
  \******************************************************************/
/*! exports provided: LoginDto, LoginResponseDto, TokenDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDto", function() { return LoginDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginResponseDto", function() { return LoginResponseDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenDto", function() { return TokenDto; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../media-item/entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../playlist/entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");
var _a;







const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJ1c2VyIjp7ImF1dGhJZCI6ImEwMWM4ZDhjLWExYTMtNDdjMS05MGVjLTY0ZmRkOTFiYjYxMSIsInVzZXJuYW1lIjoiTmFkaWExMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRQy9KYXlWeDhYOHZYVUhjUmpSSWZPLmdXaGQ1U0FEYmFNbC9CeXgvUjdvVGJYSzRnQ1IyLiIsImVtYWlsIjoiTmFkaWExMkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTA1VDEyOjA2OjMzLjgzMVoiLCJfaWQiOiI2MDQyMWVjOTdiYmVlYTA2ZGZiZjI2ZGEiLCJyb2xlcyI6WyJndWVzdCJdfSwic3ViIjoiYTAxYzhkOGMtYTFhMy00N2MxLTkwZWMtNjRmZGQ5MWJiNjExIiwiaWF0IjoxNjE0OTQ2MDI4LCJleHAiOjE2MTQ5ODIwMjh9.ZK5s6OFB8zQ0yL3SgzYZXpjTMJyptXv5FouDyqQVlg';
class LoginDto {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__["ApiEmail"])({ required: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LoginDto.prototype, "username", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ required: true }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["IsString"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["MinLength"])(8),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["MaxLength"])(20),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiHideProperty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LoginDto.prototype, "password", void 0);
class LoginResponseDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["OmitType"])(_entities_user_entity__WEBPACK_IMPORTED_MODULE_6__["User"], ['_id', 'userId', 'sharedMediaItems', 'sharedPlaylists']) {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({
        type: String,
        pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
        example: exampleToken,
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], LoginResponseDto.prototype, "accessToken", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: Date }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LoginResponseDto.prototype, "updatedAt", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: String }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LoginResponseDto.prototype, "_id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__["MediaItem"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], LoginResponseDto.prototype, "sharedMediaItems", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__["Playlist"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], LoginResponseDto.prototype, "sharedPlaylists", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__["MediaItem"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], LoginResponseDto.prototype, "mediaItems", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__["Playlist"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], LoginResponseDto.prototype, "playlists", void 0);
class TokenDto {
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({
        type: String,
        example: exampleToken,
        pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
    }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["IsJWT"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], TokenDto.prototype, "token", void 0);


/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/dto/update-user.dto.ts":
/*!************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/dto/update-user.dto.ts ***!
  \************************************************************************/
/*! exports provided: UpdateUserDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateUserDto", function() { return UpdateUserDto; });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");


class UpdateUserDto extends Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__["PartialType"])(_entities_user_entity__WEBPACK_IMPORTED_MODULE_1__["User"]) {
}


/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts":
/*!*************************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/entities/user.entity.ts ***!
  \*************************************************************************/
/*! exports provided: BaseUser, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUser", function() { return BaseUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core */ "./apps/media-api/src/app/core/index.ts");



class BaseUser {
}
let User = class User extends _core__WEBPACK_IMPORTED_MODULE_2__["BcEntity"] {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "username", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "firstName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "lastName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ array: true, nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], User.prototype, "sharedPlaylists", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ array: true, nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], User.prototype, "sharedMediaItems", void 0);
User = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])()
], User);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/user.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/user.controller.ts ***!
  \********************************************************************/
/*! exports provided: UserController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserController", function() { return UserController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/decorators/user.decorator */ "./apps/media-api/src/app/core/decorators/user.decorator.ts");
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/auth/guards/jwt-auth.guard */ "./apps/media-api/src/app/modules/auth/guards/jwt-auth.guard.ts");
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/auth/user.service */ "./apps/media-api/src/app/modules/auth/user.service.ts");
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../playlist/services/playlist.service */ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts");
/* harmony import */ var _decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./decorators/user-response.decorator */ "./apps/media-api/src/app/controllers/user/decorators/user-response.decorator.ts");
/* harmony import */ var _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dto/login.dto */ "./apps/media-api/src/app/controllers/user/dto/login.dto.ts");
/* harmony import */ var _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/models/auth-user.model */ "./apps/media-api/src/app/core/models/auth-user.model.ts");
/* harmony import */ var _media_item_dto_media_item_dto__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../media-item/dto/media-item.dto */ "./apps/media-api/src/app/controllers/media-item/dto/media-item.dto.ts");
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../modules/share-item/services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../modules/share-item/entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");
/* harmony import */ var _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../media-item/media-item.service */ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _modules_auth_guards_local_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../modules/auth/guards/local.guard */ "./apps/media-api/src/app/modules/auth/guards/local.guard.ts");
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../playlist/entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;


















let UserController = class UserController {
    constructor(userService, playlistService, shareItemService, mediaItemService) {
        this.userService = userService;
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
        this.mediaItemService = mediaItemService;
    }
    getUser(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { _id = null } = user;
            const [mongoUser, authUser] = yield Promise.all([this.userService.findOne(_id), this.userService.getAuthUser({ _id })]);
            return Object.assign(Object.assign({}, authUser), mongoUser);
        });
    }
    login(req) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const expressUser = req.user;
            const user = yield this.userService.findByQuery({ username: req.body.username });
            return Object.assign(Object.assign({}, expressUser), user);
        });
    }
    logout(req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                req.logout();
            }
            catch (_a) {
                return res.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].OK).send();
            }
        });
    }
    getPlaylists(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield this.playlistService.getPlaylistByUserId({ userId: user._id });
            console.log(result);
            return result;
        });
    }
    getMediaItems(userId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield this.mediaItemService.findMediaItemsByUserId(userId);
            return result;
        });
    }
    getSharedMediaItems(user = null) {
        const { _id: userId } = user;
        return this.shareItemService.aggregateSharedMediaItems({ userId });
    }
    getMyShareItems(user = null) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { _id: userId } = user;
            return yield this.shareItemService.aggregateSharedPlaylists({ userId });
        });
    }
    authorize(id, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { token = null } = body;
            const valid = yield this.userService.validateUser({ token, _id: id });
            if (!valid)
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UnauthorizedException"]();
            return valid;
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__["UserGetResponse"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__["GetUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"] !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "getUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpCode"])(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].OK),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_local_guard__WEBPACK_IMPORTED_MODULE_16__["LocalGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('login'),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiBody"])({ type: _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__["LoginDto"], required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiResponse"])({ type: _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__["LoginResponseDto"], status: 200 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Req"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof express__WEBPACK_IMPORTED_MODULE_2__["Request"] !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__["Request"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "login", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__["JwtAuthGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('logout'),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiBearerAuth"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Req"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Res"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof express__WEBPACK_IMPORTED_MODULE_2__["Request"] !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__["Request"]) === "function" ? _c : Object, typeof (_d = typeof express__WEBPACK_IMPORTED_MODULE_2__["Response"] !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__["Response"]) === "function" ? _d : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "logout", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('playlists'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__["UserGetResponse"])({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_17__["Playlist"], status: 200 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__["GetUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"] !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"]) === "function" ? _e : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "getPlaylists", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('media-items'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__["UserGetResponse"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__["GetUserId"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_f = typeof mongodb__WEBPACK_IMPORTED_MODULE_15__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_15__["ObjectId"]) === "function" ? _f : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "getMediaItems", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('media-items/shared'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__["UserGetResponse"])({ type: _media_item_dto_media_item_dto__WEBPACK_IMPORTED_MODULE_11__["MediaItemDto"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__["GetUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_g = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"] !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"]) === "function" ? _g : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], UserController.prototype, "getSharedMediaItems", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('playlists/shared'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__["UserGetResponse"])({ isArray: true, type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__["ShareItem"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__["GetUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_h = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"] !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__["SessionUserInterface"]) === "function" ? _h : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "getMyShareItems", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__["JwtAuthGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpCode"])(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].OK),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('authorize'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])(':id')), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String, typeof (_j = typeof _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__["TokenDto"] !== "undefined" && _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__["TokenDto"]) === "function" ? _j : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UserController.prototype, "authorize", null);
UserController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["ApiTags"])('user'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])({ path: ['user', 'share', 'media-items', 'playlists'] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_k = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"] !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"]) === "function" ? _k : Object, typeof (_l = typeof _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__["PlaylistService"] !== "undefined" && _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__["PlaylistService"]) === "function" ? _l : Object, typeof (_m = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__["ShareItemService"] !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__["ShareItemService"]) === "function" ? _m : Object, typeof (_o = typeof _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__["MediaItemService"] !== "undefined" && _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__["MediaItemService"]) === "function" ? _o : Object])
], UserController);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/user.module.ts":
/*!****************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/user.module.ts ***!
  \****************************************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.controller */ "./apps/media-api/src/app/controllers/user/user.controller.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.controller */ "./apps/media-api/src/app/controllers/user/users.controller.ts");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../playlist/services/playlist.service */ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts");
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../playlist/entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/playlist-item/services/playlist-item.service */ "./apps/media-api/src/app/modules/playlist-item/services/playlist-item.service.ts");
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
/* harmony import */ var _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../media-item/media-item.service */ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts");
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../media-item/entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../modules/share-item/share-item.module */ "./apps/media-api/src/app/modules/share-item/share-item.module.ts");
/* harmony import */ var _core_middleware_jwt_decode_middleware__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/middleware/jwt-decode.middleware */ "./apps/media-api/src/app/core/middleware/jwt-decode.middleware.ts");
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../modules/auth/auth.module */ "./apps/media-api/src/app/modules/auth/auth.module.ts");















let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply(_core_middleware_jwt_decode_middleware__WEBPACK_IMPORTED_MODULE_13__["JwtDecodeMiddleware"]).forRoutes(_users_controller__WEBPACK_IMPORTED_MODULE_3__["UsersController"]);
    }
};
UserModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Module"])({
        imports: [_modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_14__["AuthModule"], _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__["TypeOrmModule"].forFeature([_entities_user_entity__WEBPACK_IMPORTED_MODULE_5__["User"], _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__["Playlist"], _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__["PlaylistItem"], _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_11__["MediaItem"]]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_12__["ShareItemModule"]],
        controllers: [_user_controller__WEBPACK_IMPORTED_MODULE_1__["UserController"], _users_controller__WEBPACK_IMPORTED_MODULE_3__["UsersController"]],
        providers: [_playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_6__["PlaylistService"], _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__["PlaylistItemService"], _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_10__["MediaItemService"]],
        exports: [],
    })
], UserModule);



/***/ }),

/***/ "./apps/media-api/src/app/controllers/user/users.controller.ts":
/*!*********************************************************************!*\
  !*** ./apps/media-api/src/app/controllers/user/users.controller.ts ***!
  \*********************************************************************/
/*! exports provided: UsersController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersController", function() { return UsersController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dto/create-user.dto */ "./apps/media-api/src/app/controllers/user/dto/create-user.dto.ts");
/* harmony import */ var _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dto/update-user.dto */ "./apps/media-api/src/app/controllers/user/dto/update-user.dto.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../playlist/services/playlist.service */ "./apps/media-api/src/app/controllers/playlist/services/playlist.service.ts");
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/share-item/services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/functors/http-errors.functor */ "./apps/media-api/src/app/core/functors/http-errors.functor.ts");
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/auth/guards/jwt-auth.guard */ "./apps/media-api/src/app/modules/auth/guards/jwt-auth.guard.ts");
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/auth/user.service */ "./apps/media-api/src/app/modules/auth/user.service.ts");
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core-lib */ "./libs/core/src/index.ts");
/* harmony import */ var _decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./decorators/user-response.decorator */ "./apps/media-api/src/app/controllers/user/decorators/user-response.decorator.ts");
/* harmony import */ var _dto_create_user_response_dto__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dto/create-user-response.dto */ "./apps/media-api/src/app/controllers/user/dto/create-user-response.dto.ts");
/* harmony import */ var _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/models/auth-user.model */ "./apps/media-api/src/app/core/models/auth-user.model.ts");
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/decorators/user.decorator */ "./apps/media-api/src/app/core/decorators/user.decorator.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../core/decorators/create-dto.decorator */ "./apps/media-api/src/app/core/decorators/create-dto.decorator.ts");
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../modules/app-config.module.ts/constants/open-api.constants */ "./apps/media-api/src/app/modules/app-config.module.ts/constants/open-api.constants.ts");
/* harmony import */ var _playlist_dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../playlist/dto/playlist-response.dto */ "./apps/media-api/src/app/controllers/playlist/dto/playlist-response.dto.ts");
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;




















let UsersController = class UsersController {
    constructor(userService, playlistService, shareItemService) {
        this.userService = userService;
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
    }
    create(createUserDto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { username, password } = createUserDto, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(createUserDto, ["username", "password"]);
            const existingUser = yield this.userService.checkIfUserExists(username);
            if (existingUser)
                throw Object(_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_8__["conflictResponse"])(username);
            const mongoUser = yield this.userService.create(Object.assign(Object.assign({}, rest), { username }));
            const postgresUser = yield this.userService.createUser({ username, password, _id: mongoUser._id.toHexString() });
            return Object(_dto_create_user_response_dto__WEBPACK_IMPORTED_MODULE_13__["createUserResponseDto"])(mongoUser, postgresUser);
        });
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(userId) {
        return this.userService.findOne(userId);
    }
    update(userId, updateUserDto) {
        return this.userService.update(userId, updateUserDto);
    }
    remove(userId) {
        return this.userService.remove(userId);
    }
    getPlaylists(userId) {
        return this.playlistService.getPlaylistByUserId({ userId });
    }
    setRoles(id, params) {
        const { roles = [] } = params;
        return this.userService.setRoles(id, roles);
    }
    /* shared with others */
    readSharedItem(shareId, user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const sharedItem = yield this.shareItemService.update(shareId, { read: true });
            return sharedItem;
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiResponse"])({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["UserDto"], status: 201, isArray: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_17__["CreateDto"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["CreateUserDto"] !== "undefined" && _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["CreateUserDto"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "create", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__["UserGetResponse"])({ isArray: true }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "findAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_18__["default"].USER_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__["UserGetResponse"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_16__["ObjectIdPipe"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "findOne", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Put"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_18__["default"].USER_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__["UserPostResponse"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_16__["ObjectIdPipe"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _e : Object, typeof (_f = typeof _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__["UpdateUserDto"] !== "undefined" && _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__["UpdateUserDto"]) === "function" ? _f : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "update", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_18__["default"].USER_ID),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__["JwtAuthGuard"]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "remove", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(':userId/playlists'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__["UserGetResponse"])({ type: _playlist_dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_19__["PlaylistResponseDto"], isArray: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'userId', type: String, required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiHideProperty"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_16__["ObjectIdPipe"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_j = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _j : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], UsersController.prototype, "getPlaylists", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Put"])(':userId/roles'),
    Object(_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__["UserPostResponse"])({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["UserDto"] }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiBody"])({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_11__["BC_ROLES"], isArray: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('userId')), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], UsersController.prototype, "setRoles", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpCode"])(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].OK),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__["JwtAuthGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('shared-items/:shareId'),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiParam"])({ name: 'shareId', type: String, required: true }),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiResponse"])({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__["UserDto"], status: 200 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_16__["ObjectIdPipe"]())), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_15__["GetUser"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_k = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__["ObjectId"]) === "function" ? _k : Object, typeof (_l = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_14__["SessionUserInterface"] !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_14__["SessionUserInterface"]) === "function" ? _l : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "readSharedItem", null);
UsersController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__["ApiTags"])('users'),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('users'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_m = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"] !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"]) === "function" ? _m : Object, typeof (_o = typeof _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__["PlaylistService"] !== "undefined" && _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__["PlaylistService"]) === "function" ? _o : Object, typeof (_p = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__["ShareItemService"] !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__["ShareItemService"]) === "function" ? _p : Object])
], UsersController);



/***/ }),

/***/ "./apps/media-api/src/app/core/decorators/create-dto.decorator.ts":
/*!************************************************************************!*\
  !*** ./apps/media-api/src/app/core/decorators/create-dto.decorator.ts ***!
  \************************************************************************/
/*! exports provided: CreateDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDto", function() { return CreateDto; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @util-lib */ "./libs/utility/src/index.ts");


const CreateDto = Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["createParamDecorator"])((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return Object.assign(Object.assign({}, ctx.body), { createdBy: Object(_util_lib__WEBPACK_IMPORTED_MODULE_1__["ObjectIdGuard"])(user === null || user === void 0 ? void 0 : user._id) });
});


/***/ }),

/***/ "./apps/media-api/src/app/core/decorators/user.decorator.ts":
/*!******************************************************************!*\
  !*** ./apps/media-api/src/app/core/decorators/user.decorator.ts ***!
  \******************************************************************/
/*! exports provided: GetUser, GetUserId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetUser", function() { return GetUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetUserId", function() { return GetUserId; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @util-lib */ "./libs/utility/src/index.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_2__);



const GetUser = Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["createParamDecorator"])((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return user ? Object.assign(Object.assign({}, user), { _id: new mongodb__WEBPACK_IMPORTED_MODULE_2__["ObjectId"](user._id) }) : {};
});
const GetUserId = Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["createParamDecorator"])((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return (user === null || user === void 0 ? void 0 : user._id) ? Object(_util_lib__WEBPACK_IMPORTED_MODULE_1__["ObjectIdGuard"])(user._id) : {};
});


/***/ }),

/***/ "./apps/media-api/src/app/core/entities/base.entity.ts":
/*!*************************************************************!*\
  !*** ./apps/media-api/src/app/core/entities/base.entity.ts ***!
  \*************************************************************/
/*! exports provided: BcBaseEntity, BcEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BcBaseEntity", function() { return BcBaseEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BcEntity", function() { return BcEntity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bson */ "bson");
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bson__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
var _a, _b, _c, _d, _e, _f;





class BcBaseEntity {
    constructor(model) {
        Object.assign(this, model);
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["ObjectIdColumn"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _a : Object)
], BcBaseEntity.prototype, "_id", void 0);
let BcEntity = class BcEntity {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["ObjectIdColumn"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__["ApiObjectId"])({ type: 'uuid' }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _b : Object)
], BcEntity.prototype, "_id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["CreateDateColumn"])(),
    Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__["ApiProperty"])({ readOnly: true, type: Date }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BcEntity.prototype, "createdAt", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["UpdateDateColumn"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__["ApiPastDate"])({ readOnly: true, type: Date, required: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BcEntity.prototype, "updatedDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__["ApiObjectId"])({
        description: 'Created by type is generated by the @CreateDto decorator',
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_e = typeof Readonly !== "undefined" && Readonly) === "function" ? _e : Object)
], BcEntity.prototype, "createdBy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__["ApiObjectId"])({
        description: 'Created by type is generated by the @CreateDto decorator',
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_f = typeof bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _f : Object)
], BcEntity.prototype, "userId", void 0);
BcEntity = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Entity"])()
], BcEntity);



/***/ }),

/***/ "./apps/media-api/src/app/core/functors/http-errors.functor.ts":
/*!*********************************************************************!*\
  !*** ./apps/media-api/src/app/core/functors/http-errors.functor.ts ***!
  \*********************************************************************/
/*! exports provided: badRequestResponse, notFoundResponse, conflictResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "badRequestResponse", function() { return badRequestResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFoundResponse", function() { return notFoundResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conflictResponse", function() { return conflictResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Return a new exception when the request is a bad request.
 *
 * @param {string} error
 * @return Http Exception with status of 400
 */
function badRequestResponse(error) {
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpException"]({ status: _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpStatus"].BAD_REQUEST, error }, _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpStatus"].BAD_REQUEST);
}
/**
 * Return a new exception when resource not found
 *
 * @param {string} entity
 * @param {{ args?: any }} [opts]
 * @return Http Exception with status of 404
 */
function notFoundResponse(entity, opts) {
    const { args = null } = opts;
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpException"](Object.assign({ status: _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpStatus"].NOT_FOUND, error: `${entity} was not found` }, (args !== null && args !== void 0 ? args : args)), _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["HttpStatus"].NOT_FOUND);
}
function conflictResponse(id) {
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["ConflictException"](id, 'Resource already exists.');
}



/***/ }),

/***/ "./apps/media-api/src/app/core/index.ts":
/*!**********************************************!*\
  !*** ./apps/media-api/src/app/core/index.ts ***!
  \**********************************************/
/*! exports provided: BcBaseEntity, BcEntity, DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/base.entity */ "./apps/media-api/src/app/core/entities/base.entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BcBaseEntity", function() { return _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__["BcBaseEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BcEntity", function() { return _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__["BcEntity"]; });

/* harmony import */ var _models_data_provider_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/data-provider.model */ "./apps/media-api/src/app/core/models/data-provider.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return _models_data_provider_model__WEBPACK_IMPORTED_MODULE_1__["DataService"]; });





/***/ }),

/***/ "./apps/media-api/src/app/core/middleware/jwt-decode.middleware.ts":
/*!*************************************************************************!*\
  !*** ./apps/media-api/src/app/core/middleware/jwt-decode.middleware.ts ***!
  \*************************************************************************/
/*! exports provided: JwtDecodeMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtDecodeMiddleware", function() { return JwtDecodeMiddleware; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let JwtDecodeMiddleware = class JwtDecodeMiddleware {
    use(req, res, next) {
        _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].warn('Request...' + req);
        next();
    }
};
JwtDecodeMiddleware = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], JwtDecodeMiddleware);



/***/ }),

/***/ "./apps/media-api/src/app/core/models/auth-user.model.ts":
/*!***************************************************************!*\
  !*** ./apps/media-api/src/app/core/models/auth-user.model.ts ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./apps/media-api/src/app/core/models/data-provider.model.ts":
/*!*******************************************************************!*\
  !*** ./apps/media-api/src/app/core/models/data-provider.model.ts ***!
  \*******************************************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! remeda */ "remeda");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @util-lib */ "./libs/utility/src/index.ts");
var _a;





/**
 * Base class to extend for interacting with the database through a repository pattern.
 *
 * Add new standard database interaction methods here. Abstract away complex & nonstandard ones
 * @export
 * @class DataService
 * @template E - Model extends MsBaseEntity
 * @template R - repository extends MongoRepository<Model>
 */
let DataService = class DataService {
    constructor(repository, logger) {
        this.repository = repository;
        this.logger = logger;
    }
    /**
     * Create a repository item
     *
     * @param {E} dto
     * @return {*}
     * @memberof DataService
     */
    create(dto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.create props`, dto);
            try {
                const created = yield this.repository.save(Object.assign({}, dto));
                this.logger.info(`${this.constructor.name}.create result`, created);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](created);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.create ${error}`);
            }
        });
    }
    /**
     * Find a document by Id
     *
     * @param {string} id
     * @return {*}
     * @memberof DataService
     */
    findOne(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}findOne props`, id);
            const _id = Object(_util_lib__WEBPACK_IMPORTED_MODULE_4__["StringIdGuard"])(id);
            try {
                const document = yield this.repository.findOne(_id);
                this.logger.info('${this.constructor.name}findOne result', document);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](document);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.findOne ${error}`);
            }
        });
    }
    /**
     * update a document by Id with deep  partial
     *
     * @param {string} id
     * @param {Partial<E>} dto
     * @return {*}
     * @memberof DataService
     */
    update(_id, dto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info('update props', _id, dto);
            try {
                const update = yield this.repository.findOneAndUpdate({ _id }, { $set: dto }, { returnOriginal: false });
                this.logger.info('update result', update);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](update.value);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.update ${error}`);
            }
        });
    }
    /**
     * Remove document by Id
     *
     * @param {string} id
     * @return {*}
     * @memberof DataService
     */
    remove(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.logger.info('remove props', id);
                const removed = yield this.repository.delete(Object(_util_lib__WEBPACK_IMPORTED_MODULE_4__["ObjectIdGuard"])(id).toHexString());
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](removed);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.remove ${error}`);
            }
        });
    }
    /**
     * Findall documents in collection
     *
     * @return {*}
     * @memberof DataService
     */
    findAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.findAll`);
            try {
                const findAll = yield this.repository.find();
                this.logger.info('findAll result', findAll);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](findAll);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.findAll ${error}`);
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('InternalServerErrorException', _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpStatus"].INTERNAL_SERVER_ERROR);
            }
        });
    }
    /**
     * Find document by any partial query of the entity.
     *
     * @param {Partial<E>} query
     * @return {*}
     * @memberof DataService
     */
    findByQuery(query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.findByQuery`);
            try {
                const findByQuery = yield this.repository.findOne(query);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](findByQuery);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.findOne ${error}`);
            }
        });
    }
    insertMany(items) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.insertMany`);
            try {
                const inserted = yield this.repository.save(items);
                this.logger.info(`${this.constructor.name}.insertMany result`, inserted);
                return remeda__WEBPACK_IMPORTED_MODULE_3__["clone"](inserted);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.insertMany failed with: ${error}`);
            }
        });
    }
};
DataService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Boolean, typeof (_a = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_2__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_2__["PinoLogger"]) === "function" ? _a : Object])
], DataService);



/***/ }),

/***/ "./apps/media-api/src/app/index.ts":
/*!*****************************************!*\
  !*** ./apps/media-api/src/app/index.ts ***!
  \*****************************************/
/*! exports provided: BcBaseEntity, BcEntity, DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./apps/media-api/src/app/core/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BcBaseEntity", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["BcBaseEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BcEntity", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["BcEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["DataService"]; });




/***/ }),

/***/ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.module.ts":
/*!**********************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/app-config.module.ts/app-config.module.ts ***!
  \**********************************************************************************/
/*! exports provided: AppConfigModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigModule", function() { return AppConfigModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration */ "./apps/media-api/src/app/modules/app-config.module.ts/configuration.ts");
/* harmony import */ var _app_config_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-config.provider */ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.provider.ts");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _database_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./database.configuration */ "./apps/media-api/src/app/modules/app-config.module.ts/database.configuration.ts");






/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_4__["ConfigModule"].forRoot({
                envFilePath: 'development.env',
                load: [_configuration__WEBPACK_IMPORTED_MODULE_2__["default"], _database_configuration__WEBPACK_IMPORTED_MODULE_5__["default"]],
                validationSchema: _configuration__WEBPACK_IMPORTED_MODULE_2__["appValidationSchema"],
                cache: true,
                ignoreEnvFile: "development" === 'production',
                ignoreEnvVars: "development" !== 'production',
            }),
        ],
        providers: [_nestjs_config__WEBPACK_IMPORTED_MODULE_4__["ConfigService"], _app_config_provider__WEBPACK_IMPORTED_MODULE_3__["AppConfigService"]],
        exports: [_nestjs_config__WEBPACK_IMPORTED_MODULE_4__["ConfigService"], _app_config_provider__WEBPACK_IMPORTED_MODULE_3__["AppConfigService"]],
    })
], AppConfigModule);



/***/ }),

/***/ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.provider.ts":
/*!************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/app-config.module.ts/app-config.provider.ts ***!
  \************************************************************************************/
/*! exports provided: AppConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigService", function() { return AppConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_2__);
var _a;



/**
 * Service dealing with app config based operations.
 *
 * @class
 */
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get(key) {
        return this.configService.get('app.' + key);
    }
    db(key) {
        return this.configService.get('db.' + key);
    }
    get isDev() {
        return this.env === 'development';
    }
};
AppConfigService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _nestjs_config__WEBPACK_IMPORTED_MODULE_2__["ConfigService"] !== "undefined" && _nestjs_config__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]) === "function" ? _a : Object])
], AppConfigService);



/***/ }),

/***/ "./apps/media-api/src/app/modules/app-config.module.ts/configuration.ts":
/*!******************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/app-config.module.ts/configuration.ts ***!
  \******************************************************************************/
/*! exports provided: appValidationSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appValidationSchema", function() { return appValidationSchema; });
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! joi */ "joi");
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);


// console.log(process.env.NODE_ENV);
const appValidationSchema = joi__WEBPACK_IMPORTED_MODULE_1__["object"]({
    APP_NAME: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('MediashareApi'),
    APP_ENV: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().valid('development', 'production', 'test', 'provision').default('development'),
    NODE_ENV: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().valid('development', 'production', 'test', 'provision').default('development'),
    APP_PORT: joi__WEBPACK_IMPORTED_MODULE_1__["number"]().default(3333),
    APP_PREFIX: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('api'),
    APP_TITLE: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('Mediashare'),
    DB_URL: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('mongodb://localhost:27017/'),
    SESSION_DB_NAME: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('api-session'),
    SESSION_DB_COLLECTION: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('session'),
    SESSION_SECRET: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('this-is-my-secret-key'),
    APP_HOST: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('localhost'),
    DB_TYPE: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('mongodb'),
    DB: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('mediashare'),
    DB_SSL: joi__WEBPACK_IMPORTED_MODULE_1__["boolean"]().default(false),
    DB_SYNCHRONIZE: joi__WEBPACK_IMPORTED_MODULE_1__["boolean"]().default(false),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    DB_USERNAME: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('mongodb'),
    DB_PASSWORD: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default(''),
    AUTH_PORT: joi__WEBPACK_IMPORTED_MODULE_1__["number"]().default(4000),
    AUTH_HOST: joi__WEBPACK_IMPORTED_MODULE_1__["string"]().default('localhost'),
});
/* harmony default export */ __webpack_exports__["default"] = (Object(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__["registerAs"])('app', () => ({
    host: process.env.APP_HOST,
    env: "development",
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    globalPrefix: process.env.APP_PREFIX,
    title: process.env.APP_TITLE,
    sessionDb: process.env.DB_URL,
    sessionDbName: process.env.SESSION_DB_NAME,
    sessionSecret: process.env.SESSION_SECRET,
    sessionCollection: process.env.SESSION_DB_COLLECTION,
    authPort: process.env.AUTH_PORT,
    authHost: process.env.AUTH_HOST,
})));


/***/ }),

/***/ "./apps/media-api/src/app/modules/app-config.module.ts/constants/open-api.constants.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/app-config.module.ts/constants/open-api.constants.ts ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const RouteTokens = {
    USER_ID: ':userId',
    SHARE_ID: ':shareId',
    MEDIA_ITEM_ID: ':mediaId',
};
/* harmony default export */ __webpack_exports__["default"] = (RouteTokens);


/***/ }),

/***/ "./apps/media-api/src/app/modules/app-config.module.ts/database.configuration.ts":
/*!***************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/app-config.module.ts/database.configuration.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (Object(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__["registerAs"])('db', () => ({
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: "development" !== 'production',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    url: process.env.DB_URL,
    type: process.env.DB_TYPE,
    database: process.env.DB,
    ssl: process.env.DB_SSL === 'true',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})));


/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/auth.module.ts":
/*!************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/auth.module.ts ***!
  \************************************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _controllers_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/media-item/entities/media-item.entity */ "./apps/media-api/src/app/controllers/media-item/entities/media-item.entity.ts");
/* harmony import */ var _controllers_media_item_media_item_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controllers/media-item/media-item.service */ "./apps/media-api/src/app/controllers/media-item/media-item.service.ts");
/* harmony import */ var _controllers_playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../controllers/playlist/entities/playlist.entity */ "./apps/media-api/src/app/controllers/playlist/entities/playlist.entity.ts");
/* harmony import */ var _controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../controllers/user/entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");
/* harmony import */ var _app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../app-config.module.ts/app-config.module */ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.module.ts");
/* harmony import */ var _app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../app-config.module.ts/app-config.provider */ "./apps/media-api/src/app/modules/app-config.module.ts/app-config.provider.ts");
/* harmony import */ var _playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../playlist-item/entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
/* harmony import */ var _share_item_share_item_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../share-item/share-item.module */ "./apps/media-api/src/app/modules/share-item/share-item.module.ts");
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./jwt.strategy */ "./apps/media-api/src/app/modules/auth/jwt.strategy.ts");
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./local.strategy */ "./apps/media-api/src/app/modules/auth/local.strategy.ts");
/* harmony import */ var _session_serializer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./session.serializer */ "./apps/media-api/src/app/modules/auth/session.serializer.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./user.service */ "./apps/media-api/src/app/modules/auth/user.service.ts");
















let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_8__["AppConfigModule"],
            _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["ClientsModule"].registerAsync([
                {
                    imports: [_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_8__["AppConfigModule"]],
                    name: 'AUTH_CLIENT',
                    useFactory: (configService) => ({
                        transport: _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["Transport"].TCP,
                        options: {
                            host: configService.get('authHost'),
                            port: configService.get('authPort'),
                        },
                    }),
                    inject: [_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_9__["AppConfigService"]],
                },
            ]),
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["TypeOrmModule"].forFeature([_controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_7__["User"], _controllers_playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_6__["Playlist"], _playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_10__["PlaylistItem"], _controllers_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__["MediaItem"]]),
            _share_item_share_item_module__WEBPACK_IMPORTED_MODULE_11__["ShareItemModule"],
        ],
        controllers: [],
        providers: [_local_strategy__WEBPACK_IMPORTED_MODULE_13__["LocalStrategy"], _session_serializer__WEBPACK_IMPORTED_MODULE_14__["SessionSerializer"], _jwt_strategy__WEBPACK_IMPORTED_MODULE_12__["JwtStrategy"], _controllers_media_item_media_item_service__WEBPACK_IMPORTED_MODULE_5__["MediaItemService"], _user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"], _user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"]],
        exports: [
            _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__["ClientsModule"],
            _session_serializer__WEBPACK_IMPORTED_MODULE_14__["SessionSerializer"],
            _local_strategy__WEBPACK_IMPORTED_MODULE_13__["LocalStrategy"],
            _session_serializer__WEBPACK_IMPORTED_MODULE_14__["SessionSerializer"],
            _jwt_strategy__WEBPACK_IMPORTED_MODULE_12__["JwtStrategy"],
            _controllers_media_item_media_item_service__WEBPACK_IMPORTED_MODULE_5__["MediaItemService"],
            _user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"],
            _user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"],
        ],
    })
], AuthModule);



/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/guards/jwt-auth.guard.ts":
/*!**********************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/guards/jwt-auth.guard.ts ***!
  \**********************************************************************/
/*! exports provided: JwtAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtAuthGuard", function() { return JwtAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let JwtAuthGuard = class JwtAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('jwt') {
    canActivate(context) {
        return super.canActivate(context);
        // console.log(can);
        //
        // return can;
    }
};
JwtAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], JwtAuthGuard);



/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/guards/local.guard.ts":
/*!*******************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/guards/local.guard.ts ***!
  \*******************************************************************/
/*! exports provided: LocalGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalGuard", function() { return LocalGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalGuard = class LocalGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('local') {
    canActivate(context) {
        const _super = Object.create(null, {
            canActivate: { get: () => super.canActivate },
            logIn: { get: () => super.logIn }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = (yield _super.canActivate.call(this, context));
            const request = context.switchToHttp().getRequest();
            console.log('🚀 ---------------------------------------------------------------------------------');
            console.log('🚀 ~ file: local.guard.ts ~ line 11 ~ LocalGuard ~ canActivate ~ request', request);
            console.log('🚀 ---------------------------------------------------------------------------------');
            const loggedIn = yield _super.logIn.call(this, request);
            console.log(loggedIn);
            return result;
        });
    }
};
LocalGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LocalGuard);



/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/jwt.strategy.ts":
/*!*************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/jwt.strategy.ts ***!
  \*************************************************************/
/*! exports provided: JwtStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtStrategy", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-jwt */ "passport-jwt");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_2__);



class JwtStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__["PassportStrategy"])(passport_jwt__WEBPACK_IMPORTED_MODULE_2__["Strategy"]) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_2__["ExtractJwt"].fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'this-is-my-secret-key',
        });
    }
    validate(payload) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return { userId: payload.sub, username: payload.username };
        });
    }
}


/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/local.strategy.ts":
/*!***************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/local.strategy.ts ***!
  \***************************************************************/
/*! exports provided: LocalStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStrategy", function() { return LocalStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ "passport-local");
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.service */ "./apps/media-api/src/app/modules/auth/user.service.ts");
var _a;





let LocalStrategy = class LocalStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_local__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    validate(username, password) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.userService.loginUser({ username, password });
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_3__["UnauthorizedException"]();
            }
            return user;
        });
    }
};
LocalStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] !== "undefined" && _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]) === "function" ? _a : Object])
], LocalStrategy);



/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/session.serializer.ts":
/*!*******************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/session.serializer.ts ***!
  \*******************************************************************/
/*! exports provided: SessionSerializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionSerializer", function() { return SessionSerializer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);



let SessionSerializer = class SessionSerializer extends _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__["PassportSerializer"] {
    serializeUser(user, done) {
        done(null, user);
    }
    deserializeUser(payload, done) {
        done(null, payload);
    }
};
SessionSerializer = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], SessionSerializer);



/***/ }),

/***/ "./apps/media-api/src/app/modules/auth/user.service.ts":
/*!*************************************************************!*\
  !*** ./apps/media-api/src/app/modules/auth/user.service.ts ***!
  \*************************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../controllers/user/entities/user.entity */ "./apps/media-api/src/app/controllers/user/entities/user.entity.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_10__);
var _a, _b, _c;











let UserService = class UserService extends _api__WEBPACK_IMPORTED_MODULE_5__["DataService"] {
    constructor(repository, logger, client) {
        super(repository, logger);
        this.client = client;
    }
    checkIfUserExists(username) {
        const _super = Object.create(null, {
            findByQuery: { get: () => super.findByQuery }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield _super.findByQuery.call(this, { username });
            return user;
        });
    }
    getUserByUsername(username) {
        return super.findByQuery({ username });
    }
    createUser(user) {
        return this.client
            .send({ role: 'auth', cmd: 'create' }, user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["timeout"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["catchError"])((err) => {
            if (err instanceof rxjs__WEBPACK_IMPORTED_MODULE_8__["TimeoutError"]) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["throwError"])(new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["RequestTimeoutException"]());
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["throwError"])(err);
        }))
            .toPromise();
    }
    loginUser(login) {
        return this.client.send({ role: 'auth', cmd: 'login' }, login).toPromise();
    }
    validateUser(params) {
        return this.client.send({ role: 'auth', cmd: 'validate' }, params);
    }
    findAllSharedMediaItemsByUserId(_id) {
        const userId = typeof _id === 'string' ? new mongodb__WEBPACK_IMPORTED_MODULE_10__["ObjectId"](_id) : _id;
        return this.findByQuery({ _id: userId });
    }
    setRoles(_id, roles) {
        return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
    }
    getAuthUser(user) {
        return this.client.send({ role: 'auth', cmd: 'get' }, user).toPromise();
    }
    aggregatePlaylistsByUser({ userId }) { }
};
UserService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__["InjectRepository"])(_controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_9__["User"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Inject"])('AUTH_CLIENT')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_3__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_3__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"]) === "function" ? _b : Object, typeof (_c = typeof _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__["ClientProxy"] !== "undefined" && _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__["ClientProxy"]) === "function" ? _c : Object])
], UserService);



/***/ }),

/***/ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts":
/*!***************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts ***!
  \***************************************************************************************/
/*! exports provided: PlaylistItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistItem", function() { return PlaylistItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
var _a, _b, _c;





let PlaylistItem = class PlaylistItem extends _api__WEBPACK_IMPORTED_MODULE_1__["BcBaseEntity"] {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Index"])('mediaId'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _a : Object)
], PlaylistItem.prototype, "mediaId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Index"])('userId', { unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _b : Object)
], PlaylistItem.prototype, "userId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Index"])('playlistId', { unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]) === "function" ? _c : Object)
], PlaylistItem.prototype, "playlistId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Column"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], PlaylistItem.prototype, "sortIndex", void 0);
PlaylistItem = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["Entity"])()
], PlaylistItem);



/***/ }),

/***/ "./apps/media-api/src/app/modules/playlist-item/functors/map-playlist-item.functor.ts":
/*!********************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/playlist-item/functors/map-playlist-item.functor.ts ***!
  \********************************************************************************************/
/*! exports provided: mapPlaylistItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapPlaylistItems", function() { return mapPlaylistItems; });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

function mapPlaylistItems(ids, params) {
    const { userId, playlistId } = params;
    return ids.map((id) => ({
        userId,
        mediaId: new mongodb__WEBPACK_IMPORTED_MODULE_0__["ObjectId"](id),
        playlistId,
    }));
}



/***/ }),

/***/ "./apps/media-api/src/app/modules/playlist-item/services/playlist-item.service.ts":
/*!****************************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/playlist-item/services/playlist-item.service.ts ***!
  \****************************************************************************************/
/*! exports provided: PlaylistItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistItemService", function() { return PlaylistItemService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities/playlist-item.entity */ "./apps/media-api/src/app/modules/playlist-item/entities/playlist-item.entity.ts");
var _a, _b;







let PlaylistItemService = class PlaylistItemService extends _api__WEBPACK_IMPORTED_MODULE_1__["DataService"] {
    constructor(repository, logger) {
        super(repository, logger);
        this.repository = repository;
    }
    get playlistAggregationPipeline() {
        return [
            {
                $lookup: {
                    from: 'media_item',
                    localField: 'mediaId',
                    foreignField: '_id',
                    as: 'mediaItems',
                },
            },
            {
                $unwind: {
                    path: '$mediaItems',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{ playlistItemId: '$_id', mediaId: '$mediaId', playlistId: '$playlistId', userId: 0 }, '$mediaItems'],
                    },
                },
            },
            {
                $lookup: {
                    from: 'playlist',
                    localField: 'playlistId',
                    foreignField: '_id',
                    as: 'playlist',
                },
            },
            {
                $unwind: {
                    path: '$playlist',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        _id: '$mediaId',
                        playlistId: '$playlistId',
                        userId: '$userId',
                        playlistItemId: '$playlistItemId',
                        summary: '$summary',
                        isPlayable: '$isPlayable',
                        description: '$description',
                        category: '$category',
                        title: '$title',
                        playlistTitle: '$playlist.title',
                    },
                },
            },
            {
                $group: { _id: '$playlistId', title: { $first: '$playlistTitle' }, mediaItems: { $push: '$$ROOT' } },
            },
        ];
    }
    aggregatePlaylistAndItemByIdField(params) {
        return this.repository
            .aggregate([
            {
                $match: Object.assign({}, params),
            },
            {
                $lookup: {
                    from: 'playlist',
                    localField: 'playlistId',
                    foreignField: '_id',
                    as: 'playlist',
                },
            },
            {
                $unwind: { path: '$playlist' },
            },
            {
                $lookup: {
                    from: 'media_item',
                    localField: 'mediaId',
                    foreignField: '_id',
                    as: 'mediaItems',
                },
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: { path: '$mediaItems' } },
            { $unwind: { path: '$user' } },
            {
                $group: {
                    _id: '$playlist._id',
                    title: { $first: '$playlist.title' },
                    userId: { $first: '$playlist.userId' },
                    mediaItems: {
                        $push: { $mergeObjects: ['$mediaItems', { playlistItemId: '$_id' }] },
                    },
                },
            },
        ])
            .toArray();
    }
    aggregatePlaylistAndItem() {
        return this.repository.find();
    }
};
PlaylistItemService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_6__["PlaylistItem"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["PinoLogger"]) === "function" ? _b : Object])
], PlaylistItemService);



/***/ }),

/***/ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts":
/*!*********************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts ***!
  \*********************************************************************************/
/*! exports provided: ShareItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItem", function() { return ShareItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
var _a, _b, _c;






let ShareItem = class ShareItem extends _api__WEBPACK_IMPORTED_MODULE_1__["BcEntity"] {
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Column"])({ name: 'userId' }),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])({ readOnly: true }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Index"])('userId', { unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _a : Object)
], ShareItem.prototype, "userId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Column"])('playlistId'),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])({ required: false }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Index"])('playlistId', { unique: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _b : Object)
], ShareItem.prototype, "playlistId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Column"])({ name: 'mediaId', unique: false }),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"])({ required: false }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Index"])('mediaId'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"] !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"]) === "function" ? _c : Object)
], ShareItem.prototype, "mediaId", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Column"])({ name: 'read', unique: false }),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["IsBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], ShareItem.prototype, "read", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Column"])({ name: 'title', unique: false }),
    Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__["ApiString"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], ShareItem.prototype, "title", void 0);
ShareItem = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["Entity"])()
], ShareItem);



/***/ }),

/***/ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts":
/*!**********************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/share-item/services/share-item.service.ts ***!
  \**********************************************************************************/
/*! exports provided: QueryBuilder, ShareItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryBuilder", function() { return QueryBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemService", function() { return ShareItemService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api */ "./apps/media-api/src/app/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");
var _a, _b;








class QueryBuilder {
    match({ userId }) {
        return { $match: { $and: [{ userId }, { mediaId: { $exists: true } }] } };
    }
}
let ShareItemService = class ShareItemService extends _api__WEBPACK_IMPORTED_MODULE_1__["DataService"] {
    constructor(repository, logger) {
        super(repository, logger);
    }
    findShareItemsByUserId(userId) {
        return [this.aggregateSharedMediaItems({ userId }), this.aggregateSharedPlaylists({ userId })];
    }
    aggregateSharedPlaylistItems({ userId }) {
        const query = this.repository.aggregate([
            {
                $match: { where: { userId, playlistId: { $exists: true } } },
            },
            {
                $lookup: { from: 'playlist_item', localField: 'playlistId', foreignField: 'playlistId', as: 'playlistItems' },
            },
        ]);
        return query.toArray();
    }
    aggregateSharedMediaItems({ userId }) {
        const query = this.repository.aggregate([
            { $match: { $and: [{ userId: userId }, { mediaId: { $exists: true } }] } },
            { $lookup: { from: 'media_item', localField: 'mediaId', foreignField: '_id', as: 'mediaItem' } },
            { $unwind: { path: '$mediaItem' } },
            {
                $lookup: {
                    from: 'user',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdBy',
                },
            },
            { $unwind: { path: '$createdBy' } },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{ userId: 0, playlistId: 0, mediaId: 0 }, '$mediaItem', { createdBy: '$createdBy' }],
                    },
                },
            },
        ]);
        return query.toArray();
    }
    aggregateSharedPlaylists({ userId }) {
        return this.repository
            .aggregate([
            { $match: { $and: [{ userId }, { playlistId: { $exists: true } }] } },
            { $lookup: { from: 'user', localField: 'userId', foreignField: '_id', as: 'createdByUser' } },
            {
                $lookup: {
                    from: 'playlist_item',
                    localField: 'playlistId',
                    foreignField: 'playlistId',
                    as: 'playlistItems',
                },
            },
            { $unwind: '$playlistItems' },
            { $unwind: '$createdByUser' },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            { shareItem: { _id: '$_id', createdBy: '$createdByUser', userId: '$userId' } },
                            '$playlistItems',
                        ],
                    },
                },
            },
            { $lookup: { from: 'media_item', localField: 'mediaId', foreignField: '_id', as: 'mediaItems' } },
            { $unwind: '$mediaItems' },
            { $unwind: '$shareItem' },
            { $lookup: { from: 'playlist', localField: 'playlistId', foreignField: '_id', as: 'playlist' } },
            { $unwind: '$playlist' },
            {
                $group: {
                    _id: '$playlistId',
                    shareId: { $first: '$shareItem._id' },
                    title: { $first: '$playlist.title' },
                    category: { $first: '$playlist.category' },
                    createdBy: { $first: '$shareItem.createdBy' },
                    mediaItems: { $push: { $mergeObjects: ['$mediaItems', { playlistItemId: 'playlistItem._id' }] } },
                },
            },
        ])
            .toArray();
    }
    getCreatedByUser(userId) {
        return this.repository
            .aggregate([
            {
                $lookup: {
                    from: 'user',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdBy',
                },
            },
            { $unwind: { path: '$createdBy' } },
        ])
            .toArray();
    }
    /**
     * Create a new share media item. This inserts a record into the mongo database in the shape of the share item.
     *
     * @param {CreateMediaShareItemInput} params
     * @return {ShareItem}
     * @memberof ShareItemService
     */
    createMediaShareItem(params) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { userId: userIdStr, mediaId: mediaIdStr, createdBy: createdByStr, title } = params;
            const item = yield this.create({
                userId: new mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"](userIdStr),
                mediaId: new mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"](mediaIdStr),
                createdBy: new mongodb__WEBPACK_IMPORTED_MODULE_4__["ObjectId"](createdByStr),
                title,
                read: false,
            });
            return item;
        });
    }
    createPlaylistShareItem({ userId, playlistId, createdBy }) {
        return this.create({
            userId,
            playlistId,
            createdBy,
            read: false,
        });
    }
};
ShareItemService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__["InjectRepository"])(_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__["ShareItem"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_6__["MongoRepository"] !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_6__["MongoRepository"]) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_5__["PinoLogger"] !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_5__["PinoLogger"]) === "function" ? _b : Object])
], ShareItemService);



/***/ }),

/***/ "./apps/media-api/src/app/modules/share-item/share-item.module.ts":
/*!************************************************************************!*\
  !*** ./apps/media-api/src/app/modules/share-item/share-item.module.ts ***!
  \************************************************************************/
/*! exports provided: ShareItemModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareItemModule", function() { return ShareItemModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_share_item_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/share-item.entity */ "./apps/media-api/src/app/modules/share-item/entities/share-item.entity.ts");
/* harmony import */ var _services_share_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/share-item.service */ "./apps/media-api/src/app/modules/share-item/services/share-item.service.ts");





let ShareItemModule = class ShareItemModule {
};
ShareItemModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__["TypeOrmModule"].forFeature([_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_3__["ShareItem"]])],
        providers: [_services_share_item_service__WEBPACK_IMPORTED_MODULE_4__["ShareItemService"]],
        exports: [_services_share_item_service__WEBPACK_IMPORTED_MODULE_4__["ShareItemService"]],
    })
], ShareItemModule);



/***/ }),

/***/ "./apps/media-api/src/main.ts":
/*!************************************!*\
  !*** ./apps/media-api/src/main.ts ***!
  \************************************/
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
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/app.module */ "./apps/media-api/src/app/app.module.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mediashare/shared */ "./libs/shared/src/index.ts");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! connect-mongo */ "connect-mongo");
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(connect_mongo__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_11__);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */












const port = process.env.PORT || 3456;
function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_5__["AppModule"]);
        const appConfig = app.get('AppConfigService');
        app.useLogger(app.get(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__["Logger"]));
        app.useGlobalPipes(new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["ValidationPipe"]());
        const [host, globalPrefix, title, mongoUrl, dbName, collectionName, secret, isDev] = [
            appConfig.get('host'),
            appConfig.get('globalPrefix'),
            appConfig.get('title'),
            appConfig.get('sessionDb'),
            appConfig.get('sessionDbName'),
            appConfig.get('sessionCollection'),
            appConfig.get('sessionSecret'),
            appConfig.get('env') === 'development'
        ];
        app.setGlobalPrefix(globalPrefix);
        /* PASSPORT & SESSION */
        /* SWAGGER */
        const config = Object(_mediashare_shared__WEBPACK_IMPORTED_MODULE_8__["DocumentBuilderFactory"])({ title }).build();
        const document = _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["SwaggerModule"].createDocument(app, config);
        _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__["SwaggerModule"].setup(globalPrefix, app, document, { explorer: isDev });
        app.use(passport__WEBPACK_IMPORTED_MODULE_7__["initialize"]());
        app.use(passport__WEBPACK_IMPORTED_MODULE_7__["session"]());
        app.use(compression__WEBPACK_IMPORTED_MODULE_11__());
        app.use(express_session__WEBPACK_IMPORTED_MODULE_9__({
            store: connect_mongo__WEBPACK_IMPORTED_MODULE_10___default.a.create({
                mongoUrl,
                dbName,
                collectionName
            }),
            secret,
            resave: false
        }));
        console.log('is dev? ', isDev);
        if (isDev) {
            console.log('writing swagger definitions');
            Object(fs__WEBPACK_IMPORTED_MODULE_6__["writeFileSync"])('./swagger-spec.json', JSON.stringify(document, null, 2));
        }
        yield app.listen(port, () => {
            console.log(`Listening at ${host}:${port}/${globalPrefix}`);
        });
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

/***/ "./libs/shared/src/index.ts":
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
/*! exports provided: SessionStoreFactory, DocumentBuilderFactory, ObjectIdPipe, ObjectIdToStringPipe, ObjectIdParameters, apiDecoratorDefaults, ApiGetResponse, ApiPostResponse, ApiPastDate, ApiObjectId, ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString, ApiLongString, ApiArray, ObjectIdArray, CreatedBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./libs/shared/src/lib/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SessionStoreFactory", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["SessionStoreFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentBuilderFactory", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["DocumentBuilderFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdPipe", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ObjectIdPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdToStringPipe", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ObjectIdToStringPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdParameters", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ObjectIdParameters"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apiDecoratorDefaults", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["apiDecoratorDefaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiGetResponse", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiGetResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPostResponse", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiPostResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPastDate", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiPastDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiObjectId", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiObjectId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiEmail", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUsername", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiUsername"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiName", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiString", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUriString", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiUriString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiLongString", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiLongString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiArray", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ApiArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdArray", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["ObjectIdArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreatedBy", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["CreatedBy"]; });




/***/ }),

/***/ "./libs/shared/src/lib/decorators/api-array.decorator.ts":
/*!***************************************************************!*\
  !*** ./libs/shared/src/lib/decorators/api-array.decorator.ts ***!
  \***************************************************************/
/*! exports provided: ApiArray, ObjectIdArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiArray", function() { return ApiArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectIdArray", function() { return ObjectIdArray; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models */ "./libs/shared/src/lib/models/index.ts");





const objectId = new mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]();
const ApiArray = function ({ required, type, example = ['item'], readOnly, } = _models__WEBPACK_IMPORTED_MODULE_4__["apiDecoratorDefaults"]) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsArray"])(), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ type: type, required, isArray: true, example, readOnly }));
};
const ObjectIdArray = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_4__["apiDecoratorDefaults"]) {
    return ApiArray({ required, type: mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"], example: [objectId] });
};



/***/ }),

/***/ "./libs/shared/src/lib/decorators/api-date.decorator.ts":
/*!**************************************************************!*\
  !*** ./libs/shared/src/lib/decorators/api-date.decorator.ts ***!
  \**************************************************************/
/*! exports provided: ApiPastDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiPastDate", function() { return ApiPastDate; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models */ "./libs/shared/src/lib/models/index.ts");




// const paramsType =   { required } =  apiDecoratorDefaults;
const ApiPastDate = function ({ required, readOnly } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsDateString"])(), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ type: Date, required, readOnly, default: new Date() }));
};


/***/ }),

/***/ "./libs/shared/src/lib/decorators/api-object-id.decorator.ts":
/*!*******************************************************************!*\
  !*** ./libs/shared/src/lib/decorators/api-object-id.decorator.ts ***!
  \*******************************************************************/
/*! exports provided: ApiObjectId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiObjectId", function() { return ApiObjectId; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models */ "./libs/shared/src/lib/models/index.ts");





const example = new mongodb__WEBPACK_IMPORTED_MODULE_3__["ObjectId"]().toHexString();
const ApiObjectId = function ({ required, readOnly = false, description } = _models__WEBPACK_IMPORTED_MODULE_4__["apiDecoratorDefaults"]) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsMongoId"])(), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ type: String, required, example, readOnly, description }));
};



/***/ }),

/***/ "./libs/shared/src/lib/decorators/api-response.decorator.ts":
/*!******************************************************************!*\
  !*** ./libs/shared/src/lib/decorators/api-response.decorator.ts ***!
  \******************************************************************/
/*! exports provided: ApiGetResponse, ApiPostResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiGetResponse", function() { return ApiGetResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiPostResponse", function() { return ApiPostResponse; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);


const ApiGetResponse = function ({ type, isArray } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, status: 200, isArray }));
};
const ApiPostResponse = function ({ type, isArray } = {}) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiResponse"])({ type, status: 201, isArray }));
};



/***/ }),

/***/ "./libs/shared/src/lib/decorators/api-string.decorator.ts":
/*!****************************************************************!*\
  !*** ./libs/shared/src/lib/decorators/api-string.decorator.ts ***!
  \****************************************************************/
/*! exports provided: ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString, ApiLongString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiEmail", function() { return ApiEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUsername", function() { return ApiUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiName", function() { return ApiName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiString", function() { return ApiString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUriString", function() { return ApiUriString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiLongString", function() { return ApiLongString; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models */ "./libs/shared/src/lib/models/index.ts");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! remeda */ "remeda");
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_4__);
// @ApiProperty({ type: 'string' })





const baseStringValidators = (min, max) => [Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsString"])(), Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["Length"])(min, max)];
const lengthFn = function (minLength, maxLength) {
    return { maxLength, minLength };
};
const ApiEmail = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    const length = [5, 50];
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])(Object.assign({ required, type: String, example: 'test@example.com' }, lengthFn(...length))), Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsEmail"])());
};
const ApiUsername = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(ApiEmail({ required }));
};
const ApiName = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    const length = [3, 30];
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(...baseStringValidators(...length), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])(Object.assign({ required, type: String, example: 'Jose' }, lengthFn(...length))));
};
const ApiString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    const length = [5, 255];
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(...baseStringValidators(...length), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])(Object.assign({ required, type: String, example: remeda__WEBPACK_IMPORTED_MODULE_4__["randomString"](125) }, lengthFn(...length))));
};
const ApiUriString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    const [min, max] = [5, 255];
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["IsUrl"])(), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({
        required,
        type: String,
        example: 'http://ihila.sh/ruabcos',
        maxLength: max,
        minLength: min,
    }));
};
const ApiLongString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__["apiDecoratorDefaults"]) {
    return Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__["applyDecorators"])(...baseStringValidators(5, 700), Object(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__["ApiProperty"])({ required, type: String, example: remeda__WEBPACK_IMPORTED_MODULE_4__["randomString"](300) }));
};



/***/ }),

/***/ "./libs/shared/src/lib/decorators/index.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/lib/decorators/index.ts ***!
  \*************************************************/
/*! exports provided: ApiGetResponse, ApiPostResponse, ApiPastDate, ApiObjectId, ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString, ApiLongString, ApiArray, ObjectIdArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-response.decorator */ "./libs/shared/src/lib/decorators/api-response.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiGetResponse", function() { return _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__["ApiGetResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPostResponse", function() { return _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__["ApiPostResponse"]; });

/* harmony import */ var _api_date_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-date.decorator */ "./libs/shared/src/lib/decorators/api-date.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPastDate", function() { return _api_date_decorator__WEBPACK_IMPORTED_MODULE_1__["ApiPastDate"]; });

/* harmony import */ var _api_object_id_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-object-id.decorator */ "./libs/shared/src/lib/decorators/api-object-id.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiObjectId", function() { return _api_object_id_decorator__WEBPACK_IMPORTED_MODULE_2__["ApiObjectId"]; });

/* harmony import */ var _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api-string.decorator */ "./libs/shared/src/lib/decorators/api-string.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiEmail", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUsername", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiUsername"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiName", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiString", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUriString", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiUriString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiLongString", function() { return _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__["ApiLongString"]; });

/* harmony import */ var _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api-array.decorator */ "./libs/shared/src/lib/decorators/api-array.decorator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiArray", function() { return _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__["ApiArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdArray", function() { return _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__["ObjectIdArray"]; });








/***/ }),

/***/ "./libs/shared/src/lib/factories/document-builder.factory.ts":
/*!*******************************************************************!*\
  !*** ./libs/shared/src/lib/factories/document-builder.factory.ts ***!
  \*******************************************************************/
/*! exports provided: DocumentBuilderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentBuilderFactory", function() { return DocumentBuilderFactory; });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);

const DocumentBuilderFactory = function ({ title }) {
    return new _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__["DocumentBuilder"]()
        .setTitle(title)
        .setDescription('Media Share API')
        .setVersion('1.0')
        .addServer('http://localhost:3333', 'development server')
        .addBearerAuth();
};



/***/ }),

/***/ "./libs/shared/src/lib/factories/index.ts":
/*!************************************************!*\
  !*** ./libs/shared/src/lib/factories/index.ts ***!
  \************************************************/
/*! exports provided: SessionStoreFactory, DocumentBuilderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _session_store_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session-store.factory */ "./libs/shared/src/lib/factories/session-store.factory.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SessionStoreFactory", function() { return _session_store_factory__WEBPACK_IMPORTED_MODULE_0__["SessionStoreFactory"]; });

/* harmony import */ var _document_builder_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./document-builder.factory */ "./libs/shared/src/lib/factories/document-builder.factory.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentBuilderFactory", function() { return _document_builder_factory__WEBPACK_IMPORTED_MODULE_1__["DocumentBuilderFactory"]; });





/***/ }),

/***/ "./libs/shared/src/lib/factories/session-store.factory.ts":
/*!****************************************************************!*\
  !*** ./libs/shared/src/lib/factories/session-store.factory.ts ***!
  \****************************************************************/
/*! exports provided: SessionStoreFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStoreFactory", function() { return SessionStoreFactory; });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! connect-mongo */ "connect-mongo");
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(connect_mongo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_2__);



const SessionStoreFactory = function ({ mongoUrl, dbName, collectionName, secret }) {
    if (!mongoUrl || !dbName || !collectionName || !secret)
        _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Logger"].error('invalid arguments in SessionStoreFactory');
    const store = connect_mongo__WEBPACK_IMPORTED_MODULE_1___default.a.create({ mongoUrl, dbName, collectionName });
    const [resave, saveUninitialized] = [false, false];
    return () => express_session__WEBPACK_IMPORTED_MODULE_2__({
        store,
        secret,
        resave,
        saveUninitialized,
    });
};



/***/ }),

/***/ "./libs/shared/src/lib/index.ts":
/*!**************************************!*\
  !*** ./libs/shared/src/lib/index.ts ***!
  \**************************************/
/*! exports provided: SessionStoreFactory, DocumentBuilderFactory, ObjectIdPipe, ObjectIdToStringPipe, ObjectIdParameters, apiDecoratorDefaults, ApiGetResponse, ApiPostResponse, ApiPastDate, ApiObjectId, ApiEmail, ApiUsername, ApiName, ApiString, ApiUriString, ApiLongString, ApiArray, ObjectIdArray, CreatedBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories */ "./libs/shared/src/lib/factories/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SessionStoreFactory", function() { return _factories__WEBPACK_IMPORTED_MODULE_0__["SessionStoreFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentBuilderFactory", function() { return _factories__WEBPACK_IMPORTED_MODULE_0__["DocumentBuilderFactory"]; });

/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipes */ "./libs/shared/src/lib/pipes/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdPipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_1__["ObjectIdPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdToStringPipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_1__["ObjectIdToStringPipe"]; });

/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ "./libs/shared/src/lib/models/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdParameters", function() { return _models__WEBPACK_IMPORTED_MODULE_2__["ObjectIdParameters"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apiDecoratorDefaults", function() { return _models__WEBPACK_IMPORTED_MODULE_2__["apiDecoratorDefaults"]; });

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators */ "./libs/shared/src/lib/decorators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiGetResponse", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiGetResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPostResponse", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiPostResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPastDate", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiPastDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiObjectId", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiObjectId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiEmail", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUsername", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiUsername"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiName", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiString", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUriString", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiUriString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiLongString", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiLongString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiArray", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ApiArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdArray", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["ObjectIdArray"]; });

/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptors */ "./libs/shared/src/lib/interceptors/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreatedBy", function() { return _interceptors__WEBPACK_IMPORTED_MODULE_4__["CreatedBy"]; });








/***/ }),

/***/ "./libs/shared/src/lib/interceptors/created-by.interceptor.ts":
/*!********************************************************************!*\
  !*** ./libs/shared/src/lib/interceptors/created-by.interceptor.ts ***!
  \********************************************************************/
/*! exports provided: CreatedBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatedBy", function() { return CreatedBy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let CreatedBy = class CreatedBy {
    intercept(context, next) {
        var _a, _b, _c;
        const ctx = context.switchToHttp().getRequest();
        const { _id } = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
        ctx.body = Object.assign(Object.assign({}, ctx.body), { createdBy: _id });
        return next.handle();
    }
};
CreatedBy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], CreatedBy);



/***/ }),

/***/ "./libs/shared/src/lib/interceptors/index.ts":
/*!***************************************************!*\
  !*** ./libs/shared/src/lib/interceptors/index.ts ***!
  \***************************************************/
/*! exports provided: CreatedBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _created_by_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./created-by.interceptor */ "./libs/shared/src/lib/interceptors/created-by.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreatedBy", function() { return _created_by_interceptor__WEBPACK_IMPORTED_MODULE_0__["CreatedBy"]; });




/***/ }),

/***/ "./libs/shared/src/lib/models/api-decorator-defaults.model.ts":
/*!********************************************************************!*\
  !*** ./libs/shared/src/lib/models/api-decorator-defaults.model.ts ***!
  \********************************************************************/
/*! exports provided: apiDecoratorDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiDecoratorDefaults", function() { return apiDecoratorDefaults; });
const apiDecoratorDefaults = {
    required: true,
};



/***/ }),

/***/ "./libs/shared/src/lib/models/api-decorator-options.interface.ts":
/*!***********************************************************************!*\
  !*** ./libs/shared/src/lib/models/api-decorator-options.interface.ts ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/shared/src/lib/models/api-decorator.model.ts":
/*!***********************************************************!*\
  !*** ./libs/shared/src/lib/models/api-decorator.model.ts ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/shared/src/lib/models/api-parameters.model.ts":
/*!************************************************************!*\
  !*** ./libs/shared/src/lib/models/api-parameters.model.ts ***!
  \************************************************************/
/*! exports provided: ObjectIdParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectIdParameters", function() { return ObjectIdParameters; });
class ObjectIdParameters {
}



/***/ }),

/***/ "./libs/shared/src/lib/models/api-response.model.ts":
/*!**********************************************************!*\
  !*** ./libs/shared/src/lib/models/api-response.model.ts ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/shared/src/lib/models/api-uuid.model.ts":
/*!******************************************************!*\
  !*** ./libs/shared/src/lib/models/api-uuid.model.ts ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}



/***/ }),

/***/ "./libs/shared/src/lib/models/index.ts":
/*!*********************************************!*\
  !*** ./libs/shared/src/lib/models/index.ts ***!
  \*********************************************/
/*! exports provided: ObjectIdParameters, apiDecoratorDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_parameters_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-parameters.model */ "./libs/shared/src/lib/models/api-parameters.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdParameters", function() { return _api_parameters_model__WEBPACK_IMPORTED_MODULE_0__["ObjectIdParameters"]; });

/* harmony import */ var _api_response_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-response.model */ "./libs/shared/src/lib/models/api-response.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _api_decorator_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-decorator.model */ "./libs/shared/src/lib/models/api-decorator.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _api_uuid_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api-uuid.model */ "./libs/shared/src/lib/models/api-uuid.model.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _api_decorator_defaults_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api-decorator-defaults.model */ "./libs/shared/src/lib/models/api-decorator-defaults.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apiDecoratorDefaults", function() { return _api_decorator_defaults_model__WEBPACK_IMPORTED_MODULE_4__["apiDecoratorDefaults"]; });

/* harmony import */ var _api_decorator_options_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api-decorator-options.interface */ "./libs/shared/src/lib/models/api-decorator-options.interface.ts");
/* empty/unused harmony star reexport */







/***/ }),

/***/ "./libs/shared/src/lib/pipes/index.ts":
/*!********************************************!*\
  !*** ./libs/shared/src/lib/pipes/index.ts ***!
  \********************************************/
/*! exports provided: ObjectIdPipe, ObjectIdToStringPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object-id.pipe */ "./libs/shared/src/lib/pipes/object-id.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdPipe", function() { return _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__["ObjectIdPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdToStringPipe", function() { return _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__["ObjectIdToStringPipe"]; });




/***/ }),

/***/ "./libs/shared/src/lib/pipes/object-id.pipe.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/lib/pipes/object-id.pipe.ts ***!
  \*****************************************************/
/*! exports provided: ObjectIdPipe, ObjectIdToStringPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectIdPipe", function() { return ObjectIdPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectIdToStringPipe", function() { return ObjectIdToStringPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_2__);



let ObjectIdPipe = class ObjectIdPipe {
    transform(value, metadata) {
        return typeof value === 'string' ? new mongodb__WEBPACK_IMPORTED_MODULE_2__["ObjectId"](value) : value;
    }
};
ObjectIdPipe = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ObjectIdPipe);

let ObjectIdToStringPipe = class ObjectIdToStringPipe {
    transform(value, metadata) {
        return typeof value !== 'string' ? value.toHexString() : value;
    }
};
ObjectIdToStringPipe = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ObjectIdToStringPipe);



/***/ }),

/***/ "./libs/utility/src/functors/object-id.guard.ts":
/*!******************************************************!*\
  !*** ./libs/utility/src/functors/object-id.guard.ts ***!
  \******************************************************/
/*! exports provided: ObjectIdGuard, StringIdGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectIdGuard", function() { return ObjectIdGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringIdGuard", function() { return StringIdGuard; });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

const ObjectIdGuard = function (value) {
    return typeof value === 'string' ? new mongodb__WEBPACK_IMPORTED_MODULE_0__["ObjectID"](value) : value;
};
const StringIdGuard = function (value) {
    return typeof value === 'string' ? value : value.toHexString();
};



/***/ }),

/***/ "./libs/utility/src/functors/promise-wrapper.functor.ts":
/*!**************************************************************!*\
  !*** ./libs/utility/src/functors/promise-wrapper.functor.ts ***!
  \**************************************************************/
/*! exports provided: promiseWrapperFunctor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseWrapperFunctor", function() { return promiseWrapperFunctor; });
const promiseWrapperFunctor = (object) => {
    return () => new Promise((resolve) => resolve(object));
};


/***/ }),

/***/ "./libs/utility/src/index.ts":
/*!***********************************!*\
  !*** ./libs/utility/src/index.ts ***!
  \***********************************/
/*! exports provided: UtilityModule, UtilityService, STRING, NUMBER, BOOLEAN, isString, isBoolean, isNumber, promiseWrapperFunctor, ObjectIdGuard, StringIdGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.module */ "./libs/utility/src/utility.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UtilityModule", function() { return _utility_module__WEBPACK_IMPORTED_MODULE_0__["UtilityModule"]; });

/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility.service */ "./libs/utility/src/utility.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UtilityService", function() { return _utility_service__WEBPACK_IMPORTED_MODULE_1__["UtilityService"]; });

/* harmony import */ var _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/primitive-keys.model */ "./libs/utility/src/models/primitive-keys.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STRING", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["STRING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NUMBER", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOLEAN", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["isBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__["isNumber"]; });

/* harmony import */ var _types_type_names_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/type-names.type */ "./libs/utility/src/types/type-names.type.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _functors_promise_wrapper_functor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functors/promise-wrapper.functor */ "./libs/utility/src/functors/promise-wrapper.functor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseWrapperFunctor", function() { return _functors_promise_wrapper_functor__WEBPACK_IMPORTED_MODULE_4__["promiseWrapperFunctor"]; });

/* harmony import */ var _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functors/object-id.guard */ "./libs/utility/src/functors/object-id.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectIdGuard", function() { return _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__["ObjectIdGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StringIdGuard", function() { return _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__["StringIdGuard"]; });

/* harmony import */ var _types___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types/ */ "./libs/utility/src/types/index.ts");
/* empty/unused harmony star reexport */








/***/ }),

/***/ "./libs/utility/src/models/primitive-keys.model.ts":
/*!*********************************************************!*\
  !*** ./libs/utility/src/models/primitive-keys.model.ts ***!
  \*********************************************************/
/*! exports provided: STRING, NUMBER, BOOLEAN, isString, isBoolean, isNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING", function() { return STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER", function() { return NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOLEAN", function() { return BOOLEAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
const PRIMITIVE_KEY_VALUES = ['string', 'number', 'boolean'];
const [STRING, NUMBER, BOOLEAN] = PRIMITIVE_KEY_VALUES;
const isString = (key) => key === 'string';
const isBoolean = (key) => key === 'boolean';
const isNumber = (key) => key === 'number';



/***/ }),

/***/ "./libs/utility/src/types/id.type.ts":
/*!*******************************************!*\
  !*** ./libs/utility/src/types/id.type.ts ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/utility/src/types/index.ts":
/*!*****************************************!*\
  !*** ./libs/utility/src/types/index.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id.type */ "./libs/utility/src/types/id.type.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _type_names_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-names.type */ "./libs/utility/src/types/type-names.type.ts");
/* empty/unused harmony star reexport */



/***/ }),

/***/ "./libs/utility/src/types/type-names.type.ts":
/*!***************************************************!*\
  !*** ./libs/utility/src/types/type-names.type.ts ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/utility/src/utility.module.ts":
/*!********************************************!*\
  !*** ./libs/utility/src/utility.module.ts ***!
  \********************************************/
/*! exports provided: UtilityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilityModule", function() { return UtilityModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility.service */ "./libs/utility/src/utility.service.ts");



let UtilityModule = class UtilityModule {
};
UtilityModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [_utility_service__WEBPACK_IMPORTED_MODULE_2__["UtilityService"]],
        exports: [_utility_service__WEBPACK_IMPORTED_MODULE_2__["UtilityService"]],
    })
], UtilityModule);



/***/ }),

/***/ "./libs/utility/src/utility.service.ts":
/*!*********************************************!*\
  !*** ./libs/utility/src/utility.service.ts ***!
  \*********************************************/
/*! exports provided: UtilityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilityService", function() { return UtilityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let UtilityService = class UtilityService {
};
UtilityService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], UtilityService);



/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./apps/media-api/src/main.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/sean/projects/mediashare/apps/media-api/src/main.ts */"./apps/media-api/src/main.ts");


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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bson":
/*!***********************!*\
  !*** external "bson" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bson");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "nestjs-pino":
/*!******************************!*\
  !*** external "nestjs-pino" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nestjs-pino");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "remeda":
/*!*************************!*\
  !*** external "remeda" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("remeda");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

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