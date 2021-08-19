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
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(148);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(149);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(connect_mongo__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(150);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_10__);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */











const port = process.env.PORT || 3456;
function bootstrap() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__.NestFactory.create(_app_app_module__WEBPACK_IMPORTED_MODULE_5__.AppModule);
        const appConfig = app.get('AppConfigService');
        app.useLogger(app.get(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.Logger));
        app.useGlobalPipes(new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.ValidationPipe());
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
        const config = new _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.DocumentBuilder()
            .setTitle(title)
            .setDescription('Media Share API')
            .setVersion('1.0')
            .addServer(isDev ? `http://localhost:${port}` : `https://bcdevmediashare.herokuapp.com`, 'development server')
            .addBearerAuth()
            .build();
        const document = _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.SwaggerModule.createDocument(app, config);
        _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.SwaggerModule.setup(globalPrefix, app, document, { explorer: isDev });
        app.use(passport__WEBPACK_IMPORTED_MODULE_7__.initialize());
        app.use(passport__WEBPACK_IMPORTED_MODULE_7__.session());
        app.use(compression__WEBPACK_IMPORTED_MODULE_10__());
        app.use(express_session__WEBPACK_IMPORTED_MODULE_8__({
            store: connect_mongo__WEBPACK_IMPORTED_MODULE_9___default().create({
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
            (0,fs__WEBPACK_IMPORTED_MODULE_6__.writeFileSync)('./swagger-spec.json', JSON.stringify(document, null, 2));
        }
        yield app.listen(port, () => {
            console.log(`Listening at ${host}:${port}/${globalPrefix}`);
        });
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

module.exports = require("@nestjs/swagger");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("nestjs-pino");;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => /* binding */ AppModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(105);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(106);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _controllers_user_user_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(107);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _controllers_media_item_media_item_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(131);
/* harmony import */ var _controllers_profile_profile_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(135);
/* harmony import */ var _controllers_playlist_playlist_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(139);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _controllers_share_items_share_items_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(145);
/* harmony import */ var _modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(87);
/* harmony import */ var _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(91);
var _a;















let AppModule = class AppModule {
    constructor(appConfigService) {
        this.appConfigService = appConfigService;
    }
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Module)({
        imports: [
            _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_1__.AuthModule,
            _modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__.AppConfigModule,
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_5__.TypeOrmModule.forRootAsync({
                imports: [_modules_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_13__.AppConfigModule],
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
                inject: [_modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__.AppConfigService],
            }),
            _controllers_user_user_module__WEBPACK_IMPORTED_MODULE_6__.UserModule,
            nestjs_pino__WEBPACK_IMPORTED_MODULE_7__.LoggerModule.forRoot({
                pinoHttp: {
                    prettyPrint: {
                        colorize: true,
                        levelFirst: true,
                        translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
                    },
                },
            }),
            _controllers_media_item_media_item_module__WEBPACK_IMPORTED_MODULE_8__.MediaItemModule,
            _controllers_profile_profile_module__WEBPACK_IMPORTED_MODULE_9__.ProfileModule,
            _controllers_playlist_playlist_module__WEBPACK_IMPORTED_MODULE_10__.PlaylistModule,
            _nestjs_passport__WEBPACK_IMPORTED_MODULE_11__.PassportModule,
            _controllers_share_items_share_items_module__WEBPACK_IMPORTED_MODULE_12__.ShareItemsModule,
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__.AppController],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__.AppService],
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__.AppConfigService !== "undefined" && _modules_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_14__.AppConfigService) === "function" ? _a : Object])
], AppModule);



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthModule": () => /* binding */ AuthModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _controllers_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _controllers_playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83);
/* harmony import */ var _controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(85);
/* harmony import */ var _app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(87);
/* harmony import */ var _app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(91);
/* harmony import */ var _playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84);
/* harmony import */ var _share_item_share_item_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(93);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(96);
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(98);
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(101);
/* harmony import */ var _session_serializer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(104);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(103);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(97);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_16__);

















let AuthModule = class AuthModule {
};
AuthModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [
            _app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_7__.AppConfigModule,
            _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.ClientsModule.registerAsync([
                {
                    imports: [_app_config_module_ts_app_config_module__WEBPACK_IMPORTED_MODULE_7__.AppConfigModule],
                    name: 'AUTH_CLIENT',
                    useFactory: (configService) => ({
                        transport: _nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.Transport.TCP,
                        options: {
                            host: configService.get('authHost'),
                            port: configService.get('authPort')
                        }
                    }),
                    inject: [_app_config_module_ts_app_config_provider__WEBPACK_IMPORTED_MODULE_8__.AppConfigService]
                }
            ]),
            _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.TypeOrmModule.forFeature([_controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_6__.User, _controllers_playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__.Playlist, _playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__.PlaylistItem, _controllers_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__.MediaItem]),
            _share_item_share_item_module__WEBPACK_IMPORTED_MODULE_10__.ShareItemModule,
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_16__.JwtModule.register({
                secret: process.env.SESSION_SECRET || 'this-is-my-secret-key',
                signOptions: { expiresIn: '10h' }
            })
        ],
        controllers: [],
        providers: [_local_strategy__WEBPACK_IMPORTED_MODULE_13__.LocalStrategy, _session_serializer__WEBPACK_IMPORTED_MODULE_14__.SessionSerializer, _jwt_strategy__WEBPACK_IMPORTED_MODULE_12__.JwtStrategy, _auth_service__WEBPACK_IMPORTED_MODULE_11__.AuthService, _user_service__WEBPACK_IMPORTED_MODULE_15__.UserService],
        exports: [_nestjs_microservices__WEBPACK_IMPORTED_MODULE_2__.ClientsModule, _session_serializer__WEBPACK_IMPORTED_MODULE_14__.SessionSerializer, _local_strategy__WEBPACK_IMPORTED_MODULE_13__.LocalStrategy, _auth_service__WEBPACK_IMPORTED_MODULE_11__.AuthService, _user_service__WEBPACK_IMPORTED_MODULE_15__.UserService]
    })
], AuthModule);



/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");;

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEDIA_TOKEN": () => /* binding */ MEDIA_TOKEN,
/* harmony export */   "MediaItem": () => /* binding */ MediaItem
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_7__);
var _a, _b, _c;








const MEDIA_TOKEN = _core_lib__WEBPACK_IMPORTED_MODULE_2__.MEDIA_ITEM_ENTITY;
let MediaItem = class MediaItem extends _api__WEBPACK_IMPORTED_MODULE_1__.BcEntity {
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_5__.IsBoolean)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiProperty)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Boolean)
], MediaItem.prototype, "isPlayable", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiObjectId)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Index)('userId'),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)({ nullable: false, unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_6__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_6__.ObjectId) === "function" ? _a : Object)
], MediaItem.prototype, "userId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiLongString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "summary", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "description", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)({ nullable: true, type: 'text' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "title", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "displayFileName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiUriString)({ required: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "thumbnail", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiUriString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], MediaItem.prototype, "uri", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiProperty)({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CATEGORY }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_5__.IsArray)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_5__.IsIn)(_core_lib__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CATEGORY),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_2__.MediaCategoryType !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_2__.MediaCategoryType) === "function" ? _b : Object)
], MediaItem.prototype, "category", void 0);
MediaItem = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Entity)(MEDIA_TOKEN),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object])
], MediaItem);



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BcBaseEntity": () => /* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.BcBaseEntity,
/* harmony export */   "BcEntity": () => /* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.BcEntity,
/* harmony export */   "DataService": () => /* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.DataService
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BcBaseEntity": () => /* reexport safe */ _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__.BcBaseEntity,
/* harmony export */   "BcEntity": () => /* reexport safe */ _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__.BcEntity,
/* harmony export */   "DataService": () => /* reexport safe */ _models_data_provider_model__WEBPACK_IMPORTED_MODULE_1__.DataService
/* harmony export */ });
/* harmony import */ var _entities_base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _models_data_provider_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);




/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BcBaseEntity": () => /* binding */ BcBaseEntity,
/* harmony export */   "BcEntity": () => /* binding */ BcEntity
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bson__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
var _a, _b, _c, _d, _e, _f;





class BcBaseEntity {
    constructor(model) {
        Object.assign(this, model);
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.ObjectIdColumn)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _a : Object)
], BcBaseEntity.prototype, "_id", void 0);
let BcEntity = class BcEntity {
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.ObjectIdColumn)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__.ApiObjectId)({ type: 'uuid' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _b : Object)
], BcEntity.prototype, "_id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.CreateDateColumn)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ readOnly: true, type: Date }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BcEntity.prototype, "createdAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.UpdateDateColumn)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__.ApiPastDate)({ readOnly: true, type: Date, required: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BcEntity.prototype, "updatedDate", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__.ApiObjectId)({
        description: 'Created by type is generated by the @CreateDto decorator',
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_e = typeof Readonly !== "undefined" && Readonly) === "function" ? _e : Object)
], BcEntity.prototype, "createdBy", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__.ApiObjectId)({
        description: 'Created by type is generated by the @CreateDto decorator',
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_f = typeof bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && bson__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _f : Object)
], BcEntity.prototype, "userId", void 0);
BcEntity = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Entity)()
], BcEntity);



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiArray": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiArray,
/* harmony export */   "ApiEmail": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiEmail,
/* harmony export */   "ApiGetResponse": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiGetResponse,
/* harmony export */   "ApiLongString": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiLongString,
/* harmony export */   "ApiName": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiName,
/* harmony export */   "ApiObjectId": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiObjectId,
/* harmony export */   "ApiPastDate": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiPastDate,
/* harmony export */   "ApiPostResponse": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiPostResponse,
/* harmony export */   "ApiString": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiString,
/* harmony export */   "ApiUriString": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiUriString,
/* harmony export */   "ApiUsername": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ApiUsername,
/* harmony export */   "CreatedBy": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.CreatedBy,
/* harmony export */   "DocumentBuilderFactory": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.DocumentBuilderFactory,
/* harmony export */   "ObjectIdArray": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ObjectIdArray,
/* harmony export */   "ObjectIdParameters": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ObjectIdParameters,
/* harmony export */   "ObjectIdPipe": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ObjectIdPipe,
/* harmony export */   "ObjectIdToStringPipe": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ObjectIdToStringPipe,
/* harmony export */   "SessionStoreFactory": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.SessionStoreFactory,
/* harmony export */   "apiDecoratorDefaults": () => /* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.apiDecoratorDefaults
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentBuilderFactory": () => /* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_0__.DocumentBuilderFactory,
/* harmony export */   "SessionStoreFactory": () => /* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_0__.SessionStoreFactory,
/* harmony export */   "ObjectIdPipe": () => /* reexport safe */ _pipes__WEBPACK_IMPORTED_MODULE_1__.ObjectIdPipe,
/* harmony export */   "ObjectIdToStringPipe": () => /* reexport safe */ _pipes__WEBPACK_IMPORTED_MODULE_1__.ObjectIdToStringPipe,
/* harmony export */   "ObjectIdParameters": () => /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_2__.ObjectIdParameters,
/* harmony export */   "apiDecoratorDefaults": () => /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_2__.apiDecoratorDefaults,
/* harmony export */   "ApiArray": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiArray,
/* harmony export */   "ApiEmail": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiEmail,
/* harmony export */   "ApiGetResponse": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiGetResponse,
/* harmony export */   "ApiLongString": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiLongString,
/* harmony export */   "ApiName": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiName,
/* harmony export */   "ApiObjectId": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiObjectId,
/* harmony export */   "ApiPastDate": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiPastDate,
/* harmony export */   "ApiPostResponse": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiPostResponse,
/* harmony export */   "ApiString": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiString,
/* harmony export */   "ApiUriString": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiUriString,
/* harmony export */   "ApiUsername": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ApiUsername,
/* harmony export */   "ObjectIdArray": () => /* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_3__.ObjectIdArray,
/* harmony export */   "CreatedBy": () => /* reexport safe */ _interceptors__WEBPACK_IMPORTED_MODULE_4__.CreatedBy
/* harmony export */ });
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);







/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionStoreFactory": () => /* reexport safe */ _session_store_factory__WEBPACK_IMPORTED_MODULE_0__.SessionStoreFactory,
/* harmony export */   "DocumentBuilderFactory": () => /* reexport safe */ _document_builder_factory__WEBPACK_IMPORTED_MODULE_1__.DocumentBuilderFactory
/* harmony export */ });
/* harmony import */ var _session_store_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _document_builder_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);




/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionStoreFactory": () => /* binding */ SessionStoreFactory
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var connect_mongo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(connect_mongo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_2__);



const SessionStoreFactory = function ({ mongoUrl, dbName, collectionName, secret }) {
    if (!mongoUrl || !dbName || !collectionName || !secret)
        _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.Logger.error('invalid arguments in SessionStoreFactory');
    const store = connect_mongo__WEBPACK_IMPORTED_MODULE_1___default().create({ mongoUrl, dbName, collectionName });
    const [resave, saveUninitialized] = [false, false];
    return () => express_session__WEBPACK_IMPORTED_MODULE_2__({
        store,
        secret,
        resave,
        saveUninitialized,
    });
};



/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("connect-mongo");;

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("express-session");;

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentBuilderFactory": () => /* binding */ DocumentBuilderFactory
/* harmony export */ });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);

const DocumentBuilderFactory = function ({ title }) {
    return new _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__.DocumentBuilder()
        .setTitle(title)
        .setDescription('Media Share API')
        .setVersion('1.0')
        .addServer('http://localhost:3333', 'development server')
        .addBearerAuth();
};



/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectIdPipe": () => /* reexport safe */ _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__.ObjectIdPipe,
/* harmony export */   "ObjectIdToStringPipe": () => /* reexport safe */ _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__.ObjectIdToStringPipe
/* harmony export */ });
/* harmony import */ var _object_id_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);



/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectIdPipe": () => /* binding */ ObjectIdPipe,
/* harmony export */   "ObjectIdToStringPipe": () => /* binding */ ObjectIdToStringPipe
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_2__);



let ObjectIdPipe = class ObjectIdPipe {
    transform(value, metadata) {
        return typeof value === 'string' ? new mongodb__WEBPACK_IMPORTED_MODULE_2__.ObjectId(value) : value;
    }
};
ObjectIdPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], ObjectIdPipe);

let ObjectIdToStringPipe = class ObjectIdToStringPipe {
    transform(value, metadata) {
        return typeof value !== 'string' ? value.toHexString() : value;
    }
};
ObjectIdToStringPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], ObjectIdToStringPipe);



/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("mongodb");;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectIdParameters": () => /* reexport safe */ _api_parameters_model__WEBPACK_IMPORTED_MODULE_0__.ObjectIdParameters,
/* harmony export */   "apiDecoratorDefaults": () => /* reexport safe */ _api_decorator_defaults_model__WEBPACK_IMPORTED_MODULE_4__.apiDecoratorDefaults
/* harmony export */ });
/* harmony import */ var _api_parameters_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _api_response_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _api_decorator_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _api_uuid_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _api_decorator_defaults_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var _api_decorator_options_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);








/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectIdParameters": () => /* binding */ ObjectIdParameters
/* harmony export */ });
class ObjectIdParameters {
}



/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}



/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiDecoratorDefaults": () => /* binding */ apiDecoratorDefaults
/* harmony export */ });
const apiDecoratorDefaults = {
    required: true,
};



/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiGetResponse": () => /* reexport safe */ _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__.ApiGetResponse,
/* harmony export */   "ApiPostResponse": () => /* reexport safe */ _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__.ApiPostResponse,
/* harmony export */   "ApiPastDate": () => /* reexport safe */ _api_date_decorator__WEBPACK_IMPORTED_MODULE_1__.ApiPastDate,
/* harmony export */   "ApiObjectId": () => /* reexport safe */ _api_object_id_decorator__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId,
/* harmony export */   "ApiEmail": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiEmail,
/* harmony export */   "ApiLongString": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiLongString,
/* harmony export */   "ApiName": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiName,
/* harmony export */   "ApiString": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiString,
/* harmony export */   "ApiUriString": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiUriString,
/* harmony export */   "ApiUsername": () => /* reexport safe */ _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__.ApiUsername,
/* harmony export */   "ApiArray": () => /* reexport safe */ _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__.ApiArray,
/* harmony export */   "ObjectIdArray": () => /* reexport safe */ _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__.ObjectIdArray
/* harmony export */ });
/* harmony import */ var _api_response_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _api_date_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _api_object_id_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var _api_string_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _api_array_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38);







/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiGetResponse": () => /* binding */ ApiGetResponse,
/* harmony export */   "ApiPostResponse": () => /* binding */ ApiPostResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);


const ApiGetResponse = function ({ type, isArray } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, status: 200, isArray }));
};
const ApiPostResponse = function ({ type, isArray } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, status: 201, isArray }));
};



/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiPastDate": () => /* binding */ ApiPastDate
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);




// const paramsType =   { required } =  apiDecoratorDefaults;
const ApiPastDate = function ({ required, readOnly } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsDateString)(), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ type: Date, required, readOnly, default: new Date() }));
};


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("class-validator");;

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiObjectId": () => /* binding */ ApiObjectId
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);





const example = new mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId().toHexString();
const ApiObjectId = function ({ required, readOnly = false, description } = _models__WEBPACK_IMPORTED_MODULE_4__.apiDecoratorDefaults) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsMongoId)(), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ type: String, required, example, readOnly, description }));
};



/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiEmail": () => /* binding */ ApiEmail,
/* harmony export */   "ApiUsername": () => /* binding */ ApiUsername,
/* harmony export */   "ApiName": () => /* binding */ ApiName,
/* harmony export */   "ApiString": () => /* binding */ ApiString,
/* harmony export */   "ApiUriString": () => /* binding */ ApiUriString,
/* harmony export */   "ApiLongString": () => /* binding */ ApiLongString
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_4__);
// @ApiProperty({ type: 'string' })





const baseStringValidators = (min, max) => [(0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsString)(), (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.Length)(min, max)];
const lengthFn = function (minLength, maxLength) {
    return { maxLength, minLength };
};
const ApiEmail = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    const length = [5, 50];
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(Object.assign({ required, type: String, example: 'test@example.com' }, lengthFn(...length))), (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsEmail)());
};
const ApiUsername = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)(ApiEmail({ required }));
};
const ApiName = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    const length = [3, 30];
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)(...baseStringValidators(...length), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(Object.assign({ required, type: String, example: 'Jose' }, lengthFn(...length))));
};
const ApiString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    const length = [5, 255];
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)(...baseStringValidators(...length), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(Object.assign({ required, type: String, example: remeda__WEBPACK_IMPORTED_MODULE_4__.randomString(125) }, lengthFn(...length))));
};
const ApiUriString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    const [min, max] = [5, 255];
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsUrl)(), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({
        required,
        type: String,
        example: 'http://ihila.sh/ruabcos',
        maxLength: max,
        minLength: min,
    }));
};
const ApiLongString = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_3__.apiDecoratorDefaults) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)(...baseStringValidators(5, 700), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ required, type: String, example: remeda__WEBPACK_IMPORTED_MODULE_4__.randomString(300) }));
};



/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("remeda");;

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiArray": () => /* binding */ ApiArray,
/* harmony export */   "ObjectIdArray": () => /* binding */ ObjectIdArray
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);





const objectId = new mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId();
const ApiArray = function ({ required, type, example = ['item'], readOnly, } = _models__WEBPACK_IMPORTED_MODULE_4__.apiDecoratorDefaults) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsArray)(), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ type: type, required, isArray: true, example, readOnly }));
};
const ObjectIdArray = function ({ required } = _models__WEBPACK_IMPORTED_MODULE_4__.apiDecoratorDefaults) {
    return ApiArray({ required, type: mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId, example: [objectId] });
};



/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatedBy": () => /* reexport safe */ _created_by_interceptor__WEBPACK_IMPORTED_MODULE_0__.CreatedBy
/* harmony export */ });
/* harmony import */ var _created_by_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);



/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatedBy": () => /* binding */ CreatedBy
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
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
CreatedBy = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], CreatedBy);



/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("bson");;

/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("typeorm");;

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => /* binding */ DataService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.create props`, dto);
            try {
                const created = yield this.repository.save(Object.assign({}, dto));
                this.logger.info(`${this.constructor.name}.create result`, created);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(created);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}findOne props`, id);
            const _id = (0,_util_lib__WEBPACK_IMPORTED_MODULE_4__.StringIdGuard)(id);
            try {
                const document = yield this.repository.findOne(_id);
                this.logger.info('${this.constructor.name}findOne result', document);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(document);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info('update props', _id, dto);
            try {
                const update = yield this.repository.findOneAndUpdate({ _id }, { $set: dto }, { returnOriginal: false });
                this.logger.info('update result', update);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(update.value);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            try {
                this.logger.info('remove props', id);
                const removed = yield this.repository.delete((0,_util_lib__WEBPACK_IMPORTED_MODULE_4__.ObjectIdGuard)(id).toHexString());
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(removed);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.findAll`);
            try {
                const findAll = yield this.repository.find();
                this.logger.info('findAll result', findAll);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(findAll);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.findAll ${error}`);
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpException('InternalServerErrorException', _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.INTERNAL_SERVER_ERROR);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.findByQuery`);
            try {
                const findByQuery = yield this.repository.findOne(query);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(findByQuery);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.findOne ${error}`);
            }
        });
    }
    insertMany(items) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`${this.constructor.name}.insertMany`);
            try {
                const inserted = yield this.repository.save(items);
                this.logger.info(`${this.constructor.name}.insertMany result`, inserted);
                return remeda__WEBPACK_IMPORTED_MODULE_3__.clone(inserted);
            }
            catch (error) {
                this.logger.error(`${this.constructor.name}.insertMany failed with: ${error}`);
            }
        });
    }
};
DataService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [Boolean, typeof (_a = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_2__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_2__.PinoLogger) === "function" ? _a : Object])
], DataService);



/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilityModule": () => /* reexport safe */ _utility_module__WEBPACK_IMPORTED_MODULE_0__.UtilityModule,
/* harmony export */   "UtilityService": () => /* reexport safe */ _utility_service__WEBPACK_IMPORTED_MODULE_1__.UtilityService,
/* harmony export */   "BOOLEAN": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.BOOLEAN,
/* harmony export */   "NUMBER": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.NUMBER,
/* harmony export */   "STRING": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.STRING,
/* harmony export */   "isBoolean": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.isBoolean,
/* harmony export */   "isNumber": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.isNumber,
/* harmony export */   "isString": () => /* reexport safe */ _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__.isString,
/* harmony export */   "promiseWrapperFunctor": () => /* reexport safe */ _functors_promise_wrapper_functor__WEBPACK_IMPORTED_MODULE_4__.promiseWrapperFunctor,
/* harmony export */   "ObjectIdGuard": () => /* reexport safe */ _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__.ObjectIdGuard,
/* harmony export */   "StringIdGuard": () => /* reexport safe */ _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__.StringIdGuard
/* harmony export */ });
/* harmony import */ var _utility_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _models_primitive_keys_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var _types_type_names_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48);
/* harmony import */ var _functors_promise_wrapper_functor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49);
/* harmony import */ var _functors_object_id_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50);
/* harmony import */ var _types___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);









/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilityModule": () => /* binding */ UtilityModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);



let UtilityModule = class UtilityModule {
};
UtilityModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        providers: [_utility_service__WEBPACK_IMPORTED_MODULE_2__.UtilityService],
        exports: [_utility_service__WEBPACK_IMPORTED_MODULE_2__.UtilityService],
    })
], UtilityModule);



/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilityService": () => /* binding */ UtilityService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let UtilityService = class UtilityService {
};
UtilityService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], UtilityService);



/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STRING": () => /* binding */ STRING,
/* harmony export */   "NUMBER": () => /* binding */ NUMBER,
/* harmony export */   "BOOLEAN": () => /* binding */ BOOLEAN,
/* harmony export */   "isString": () => /* binding */ isString,
/* harmony export */   "isBoolean": () => /* binding */ isBoolean,
/* harmony export */   "isNumber": () => /* binding */ isNumber
/* harmony export */ });
const PRIMITIVE_KEY_VALUES = ['string', 'number', 'boolean'];
const [STRING, NUMBER, BOOLEAN] = PRIMITIVE_KEY_VALUES;
const isString = (key) => key === 'string';
const isBoolean = (key) => key === 'boolean';
const isNumber = (key) => key === 'number';



/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promiseWrapperFunctor": () => /* binding */ promiseWrapperFunctor
/* harmony export */ });
const promiseWrapperFunctor = (object) => {
    return () => new Promise((resolve) => resolve(object));
};


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectIdGuard": () => /* binding */ ObjectIdGuard,
/* harmony export */   "StringIdGuard": () => /* binding */ StringIdGuard
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

const ObjectIdGuard = function (value) {
    return typeof value === 'string' ? new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectID(value) : value;
};
const StringIdGuard = function (value) {
    return typeof value === 'string' ? value : value.toHexString();
};



/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _type_names_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);




/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 53 */
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
/* harmony import */ var _lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _lib_models_account_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55);
/* harmony import */ var _lib_models_feed_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);
/* harmony import */ var _lib_models_profile_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* harmony import */ var _lib_models_stats_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58);
/* harmony import */ var _lib_models_tag_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(59);
/* harmony import */ var _lib_models_api_defaults_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60);
/* harmony import */ var _lib_tokens_auth_tokens_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(61);
/* harmony import */ var _lib_models__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(62);
/* harmony import */ var _lib_tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);
/* harmony import */ var _lib_types___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(79);













/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => /* binding */ core
/* harmony export */ });
function core() {
    return 'core';
}


/***/ }),
/* 55 */
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
/* 56 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

/* Use users/id/shared to get the shared items */


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 60 */
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
/* 61 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTH_CLIENT": () => /* binding */ AUTH_CLIENT
/* harmony export */ });
const AUTH_CLIENT = 'AUTH_CLIENT';



/***/ }),
/* 62 */
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
/* harmony import */ var _playlistItem_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var _bc_base_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
/* harmony import */ var _auth_user_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var _categories_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67);
/* harmony import */ var _feed_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56);
/* harmony import */ var _profile_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57);
/* harmony import */ var _api_defaults_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60);
/* harmony import */ var _account_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(55);
/* harmony import */ var _tag_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(59);
/* harmony import */ var _user_interface__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(68);
/* harmony import */ var _stats_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(58);
/* harmony import */ var _roles_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(69);
/* harmony import */ var _roles_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(70);
/* harmony import */ var _abstract_orderable_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(71);
/* harmony import */ var _abstract_metadata_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(72);
/* harmony import */ var _abstract_media_interface__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(73);
/* harmony import */ var _abstract_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(74);
/* harmony import */ var _playlist_interface__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(75);





















/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 66 */
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
/* 67 */
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
/* 68 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 69 */
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
/* 70 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Roles": () => /* binding */ Roles
/* harmony export */ });
const roleTypes = ['user', 'subscribed', 'admin'];
class Roles {
}


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 74 */
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
/* 75 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTH_CLIENT": () => /* reexport safe */ _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__.AUTH_CLIENT,
/* harmony export */   "PLAYLIST_ID": () => /* reexport safe */ _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__.PLAYLIST_ID,
/* harmony export */   "MEDIA_ITEM_ENTITY": () => /* reexport safe */ _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__.MEDIA_ITEM_ENTITY,
/* harmony export */   "PLAYLIST_ENTITY": () => /* reexport safe */ _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__.PLAYLIST_ENTITY
/* harmony export */ });
/* harmony import */ var _auth_tokens_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _path_segment_variable_tokens_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);
/* harmony import */ var _entity_tokens_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);





/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PLAYLIST_ID": () => /* binding */ PLAYLIST_ID
/* harmony export */ });
const [PLAYLIST_ID] = ['playlistId'];



/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PLAYLIST_ENTITY": () => /* binding */ PLAYLIST_ENTITY,
/* harmony export */   "MEDIA_ITEM_ENTITY": () => /* binding */ MEDIA_ITEM_ENTITY
/* harmony export */ });
const [PLAYLIST_ENTITY, MEDIA_ITEM_ENTITY] = ['playlist', 'media_item'];



/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constructor_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80);
/* harmony import */ var _configEnum_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81);
/* harmony import */ var _id_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(82);





/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Playlist": () => /* binding */ Playlist,
/* harmony export */   "PlaylistByUserResponseDto": () => /* binding */ PlaylistByUserResponseDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84);
var _a, _b, _c;









let Playlist = class Playlist extends _api__WEBPACK_IMPORTED_MODULE_1__.BcEntity {
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)('title'),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], Playlist.prototype, "title", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiObjectId)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)('userId'),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Index)('userId', { unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_6__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_6__.ObjectId) === "function" ? _a : Object)
], Playlist.prototype, "userId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Column)({ type: 'enum', enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__.PLAYLIST_CATEGORY }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiProperty)({ required: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_2__.PLAYLIST_CATEGORY }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_5__.IsIn)(_core_lib__WEBPACK_IMPORTED_MODULE_2__.PLAYLIST_CATEGORY),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_2__.PlaylistCategoryType !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_2__.PlaylistCategoryType) === "function" ? _b : Object)
], Playlist.prototype, "category", void 0);
Playlist = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_7__.Entity)('playlist')
], Playlist);

class PlaylistResponseFields {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiProperty)({ type: _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_8__.PlaylistItem, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof Readonly !== "undefined" && Readonly) === "function" ? _c : Object)
], PlaylistResponseFields.prototype, "playlistItems", void 0);
class PlaylistByUserResponseDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.IntersectionType)(PlaylistResponseFields, Playlist) {
}


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistItem": () => /* binding */ PlaylistItem
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
var _a, _b, _c;





let PlaylistItem = class PlaylistItem extends _api__WEBPACK_IMPORTED_MODULE_1__.BcBaseEntity {
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Index)('mediaId'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _a : Object)
], PlaylistItem.prototype, "mediaId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Index)('userId', { unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _b : Object)
], PlaylistItem.prototype, "userId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Index)('playlistId', { unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId) === "function" ? _c : Object)
], PlaylistItem.prototype, "playlistId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Number)
], PlaylistItem.prototype, "sortIndex", void 0);
PlaylistItem = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_4__.Entity)()
], PlaylistItem);



/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => /* binding */ User
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_4__);





let User = class User extends _core__WEBPACK_IMPORTED_MODULE_3__.BcEntity {
    hashPassword() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.password = yield (0,bcrypt__WEBPACK_IMPORTED_MODULE_4__.hash)(this.password, 10);
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], User.prototype, "username", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], User.prototype, "firstName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], User.prototype, "lastName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)({ nullable: true }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.Min)(8),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], User.prototype, "password", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)({ array: true, nullable: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], User.prototype, "sharedPlaylists", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Column)({ array: true, nullable: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], User.prototype, "sharedMediaItems", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.BeforeInsert)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_2__.Entity)()
], User);



/***/ }),
/* 86 */
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfigModule": () => /* binding */ AppConfigModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);
/* harmony import */ var _app_config_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _database_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92);






/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_4__.ConfigModule.forRoot({
                envFilePath: 'development.env',
                load: [_configuration__WEBPACK_IMPORTED_MODULE_2__.default, _database_configuration__WEBPACK_IMPORTED_MODULE_5__.default],
                validationSchema: _configuration__WEBPACK_IMPORTED_MODULE_2__.appValidationSchema,
                cache: true,
                ignoreEnvFile: process.env.NODE_ENV === 'production',
                ignoreEnvVars: process.env.NODE_ENV !== 'production',
            }),
        ],
        providers: [_nestjs_config__WEBPACK_IMPORTED_MODULE_4__.ConfigService, _app_config_provider__WEBPACK_IMPORTED_MODULE_3__.AppConfigService],
        exports: [_nestjs_config__WEBPACK_IMPORTED_MODULE_4__.ConfigService, _app_config_provider__WEBPACK_IMPORTED_MODULE_3__.AppConfigService],
    })
], AppConfigModule);



/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appValidationSchema": () => /* binding */ appValidationSchema,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);


// console.log(process.env.NODE_ENV);
const appValidationSchema = joi__WEBPACK_IMPORTED_MODULE_1__.object({
    APP_NAME: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('MediashareApi'),
    APP_ENV: joi__WEBPACK_IMPORTED_MODULE_1__.string().valid('development', 'production', 'test', 'provision').default('development'),
    NODE_ENV: joi__WEBPACK_IMPORTED_MODULE_1__.string().valid('development', 'production', 'test', 'provision').default('development'),
    APP_PORT: joi__WEBPACK_IMPORTED_MODULE_1__.number().default(3333),
    APP_PREFIX: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('api'),
    APP_TITLE: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('Mediashare'),
    DB_URL: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('mongodb://localhost:27017/'),
    SESSION_DB_NAME: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('api-session'),
    SESSION_DB_COLLECTION: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('session'),
    SESSION_SECRET: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('this-is-my-secret-key'),
    APP_HOST: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('localhost'),
    DB_TYPE: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('mongodb'),
    DB: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('mediashare'),
    DB_SSL: joi__WEBPACK_IMPORTED_MODULE_1__.boolean().default(false),
    DB_SYNCHRONIZE: joi__WEBPACK_IMPORTED_MODULE_1__.boolean().default(false),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    DB_USERNAME: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('mongodb'),
    DB_PASSWORD: joi__WEBPACK_IMPORTED_MODULE_1__.string().default(''),
    AUTH_PORT: joi__WEBPACK_IMPORTED_MODULE_1__.number().default(4000),
    AUTH_HOST: joi__WEBPACK_IMPORTED_MODULE_1__.string().default('localhost'),
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_nestjs_config__WEBPACK_IMPORTED_MODULE_0__.registerAs)('app', () => ({
    host: process.env.APP_HOST,
    env: process.env.NODE_ENV,
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
/* 89 */
/***/ ((module) => {

module.exports = require("@nestjs/config");;

/***/ }),
/* 90 */
/***/ ((module) => {

module.exports = require("joi");;

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfigService": () => /* binding */ AppConfigService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89);
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
AppConfigService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _nestjs_config__WEBPACK_IMPORTED_MODULE_2__.ConfigService !== "undefined" && _nestjs_config__WEBPACK_IMPORTED_MODULE_2__.ConfigService) === "function" ? _a : Object])
], AppConfigService);



/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_nestjs_config__WEBPACK_IMPORTED_MODULE_0__.registerAs)('db', () => ({
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
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
/* 93 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShareItemModule": () => /* binding */ ShareItemModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_share_item_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);
/* harmony import */ var _services_share_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95);





let ShareItemModule = class ShareItemModule {
};
ShareItemModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__.TypeOrmModule.forFeature([_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_3__.ShareItem])],
        providers: [_services_share_item_service__WEBPACK_IMPORTED_MODULE_4__.ShareItemService],
        exports: [_services_share_item_service__WEBPACK_IMPORTED_MODULE_4__.ShareItemService],
    })
], ShareItemModule);



/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShareItem": () => /* binding */ ShareItem
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
var _a, _b, _c;






let ShareItem = class ShareItem extends _api__WEBPACK_IMPORTED_MODULE_1__.BcEntity {
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Column)({ name: 'userId' }),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)({ readOnly: true }),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Index)('userId', { unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _a : Object)
], ShareItem.prototype, "userId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Column)('playlistId'),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)({ required: false }),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Index)('playlistId', { unique: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _b : Object)
], ShareItem.prototype, "playlistId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Column)({ name: 'mediaId', unique: false }),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)({ required: false }),
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Index)('mediaId'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _c : Object)
], ShareItem.prototype, "mediaId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Column)({ name: 'read', unique: false }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_3__.IsBoolean)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Boolean)
], ShareItem.prototype, "read", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Column)({ name: 'title', unique: false }),
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], ShareItem.prototype, "title", void 0);
ShareItem = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_5__.Entity)()
], ShareItem);



/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryBuilder": () => /* binding */ QueryBuilder,
/* harmony export */   "ShareItemService": () => /* binding */ ShareItemService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94);
var _a, _b;








class QueryBuilder {
    match({ userId }) {
        return { $match: { $and: [{ userId }, { mediaId: { $exists: true } }] } };
    }
}
let ShareItemService = class ShareItemService extends _api__WEBPACK_IMPORTED_MODULE_1__.DataService {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { userId: userIdStr, mediaId: mediaIdStr, createdBy: createdByStr, title } = params;
            const item = yield this.create({
                userId: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(userIdStr),
                mediaId: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(mediaIdStr),
                createdBy: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(createdByStr),
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
ShareItemService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__.ShareItem)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_6__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_6__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_5__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_5__.PinoLogger) === "function" ? _b : Object])
], ShareItemService);



/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => /* binding */ AuthService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
var _a;



let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        // super(userRepository, logger);
    }
    sign(user, _id) {
        const payload = { user, sub: _id };
        const { password } = user, userFields = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(user, ["password"]);
        return Object.assign(Object.assign({}, userFields), { accessToken: this.jwtService.sign(payload) });
    }
    validateToken(jwt) {
        const jwtResult = this.jwtService.verify(jwt);
        const { user: { username = null, _id = null } } = jwtResult;
        const hasUser = !!jwtResult;
        return hasUser ? { username, _id } : null;
    }
};
AuthService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__.JwtService !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__.JwtService) === "function" ? _a : Object])
], AuthService);



/***/ }),
/* 97 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtStrategy": () => /* binding */ JwtStrategy
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_2__);



class JwtStrategy extends (0,_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__.PassportStrategy)(passport_jwt__WEBPACK_IMPORTED_MODULE_2__.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_2__.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'this-is-my-secret-key',
        });
    }
    validate(payload) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return { userId: payload.sub, username: payload.username };
        });
    }
}


/***/ }),
/* 99 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");;

/***/ }),
/* 100 */
/***/ ((module) => {

module.exports = require("passport-jwt");;

/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStrategy": () => /* binding */ LocalStrategy
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(102);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(103);
var _a;





let LocalStrategy = class LocalStrategy extends (0,_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__.PassportStrategy)(passport_local__WEBPACK_IMPORTED_MODULE_1__.Strategy) {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    validate(username, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.userService.loginUser({ username, password });
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_3__.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_3__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _user_service__WEBPACK_IMPORTED_MODULE_4__.UserService !== "undefined" && _user_service__WEBPACK_IMPORTED_MODULE_4__.UserService) === "function" ? _a : Object])
], LocalStrategy);



/***/ }),
/* 102 */
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => /* binding */ UserService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(96);
var _a, _b, _c, _d;










let UserService = class UserService extends _api__WEBPACK_IMPORTED_MODULE_5__.DataService {
    constructor(repository, logger, client, authSvc) {
        super(repository, logger);
        this.client = client;
        this.authSvc = authSvc;
    }
    checkIfUserExists(username) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findByQuery({ username });
            return !!user;
        });
    }
    loginUser(login) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { username, password } = login;
            const user = yield this.validateUser({ username, password });
            if (!user)
                return null;
            return yield this.login(user, user._id);
        });
    }
    validateUser({ username, password }) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findByQuery({ username });
            if ((user === null || user === void 0 ? void 0 : user.password) === password)
                return user;
            if ((0,bcrypt__WEBPACK_IMPORTED_MODULE_8__.compareSync)(password, user === null || user === void 0 ? void 0 : user.password)) {
                return user;
            }
            return null;
        });
    }
    validateToken({ token, _id }) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return this.authSvc.validateToken(token);
        });
    }
    setRoles(_id, roles) {
        return this.client.send({ role: 'auth', cmd: 'setRoles' }, { _id, roles }).toPromise();
    }
    getAuthUser(user) {
        return this.client.send({ role: 'auth', cmd: 'get' }, user).toPromise();
    }
    createUser(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const userEntity = yield this.create(user);
            return userEntity;
        });
    }
    login(user, _id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const payload = { user, sub: _id };
            const { password } = user, userFields = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(user, ["password"]);
            return Object.assign(Object.assign({}, userFields), { accessToken: this.authSvc.sign(payload, _id) });
        });
    }
};
UserService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_2__.InjectRepository)(_controllers_user_entities_user_entity__WEBPACK_IMPORTED_MODULE_7__.User)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(2, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Inject)('AUTH_CLIENT')),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_3__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_3__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger) === "function" ? _b : Object, typeof (_c = typeof _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__.ClientProxy !== "undefined" && _nestjs_microservices__WEBPACK_IMPORTED_MODULE_6__.ClientProxy) === "function" ? _c : Object, typeof (_d = typeof _auth_service__WEBPACK_IMPORTED_MODULE_9__.AuthService !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_9__.AuthService) === "function" ? _d : Object])
], UserService);



/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionSerializer": () => /* binding */ SessionSerializer
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);



let SessionSerializer = class SessionSerializer extends _nestjs_passport__WEBPACK_IMPORTED_MODULE_1__.PassportSerializer {
    serializeUser(user, done) {
        done(null, user);
    }
    deserializeUser(payload, done) {
        done(null, payload);
    }
};
SessionSerializer = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], SessionSerializer);



/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppController": () => /* binding */ AppController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);



(0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiTags)('Main');
let AppController = class AppController {
    constructor() { }
    isOnline() {
        return true;
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiResponse)({ description: 'Used to validate that the app is online and connectivity is enabled', status: 200 }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('online-status'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], AppController.prototype, "isOnline", null);
AppController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [])
], AppController);



/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppService": () => /* binding */ AppService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
    getData() {
        return { message: 'Welcome to media-api!' };
    }
    constructor() { }
};
AppService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [])
], AppService);



/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserModule": () => /* binding */ UserModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(108);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85);
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(112);
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83);
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(114);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84);
/* harmony import */ var _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(121);
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(10);
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(93);
/* harmony import */ var _core_middleware_jwt_decode_middleware__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(130);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7);















let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply(_core_middleware_jwt_decode_middleware__WEBPACK_IMPORTED_MODULE_13__.JwtDecodeMiddleware).forRoutes(_users_controller__WEBPACK_IMPORTED_MODULE_3__.UsersController);
    }
};
UserModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Module)({
        imports: [_modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_14__.AuthModule, _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__.TypeOrmModule.forFeature([_entities_user_entity__WEBPACK_IMPORTED_MODULE_5__.User, _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__.Playlist, _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_9__.PlaylistItem, _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_11__.MediaItem]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_12__.ShareItemModule],
        controllers: [_user_controller__WEBPACK_IMPORTED_MODULE_1__.UserController, _users_controller__WEBPACK_IMPORTED_MODULE_3__.UsersController],
        providers: [_playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_6__.PlaylistService, _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__.PlaylistItemService, _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_10__.MediaItemService],
        exports: [],
    })
], UserModule);



/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserController": () => /* binding */ UserController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(109);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(110);
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(111);
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(103);
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(112);
/* harmony import */ var _decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(115);
/* harmony import */ var _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(117);
/* harmony import */ var _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(118);
/* harmony import */ var _media_item_dto_media_item_dto__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(119);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(95);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(94);
/* harmony import */ var _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(121);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _modules_auth_guards_local_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(122);
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(83);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;


















let UserController = class UserController {
    constructor(userService, playlistService, shareItemService, mediaItemService) {
        this.userService = userService;
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
        this.mediaItemService = mediaItemService;
    }
    getUser(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { _id = null } = user;
            const [mongoUser, authUser] = yield Promise.all([this.userService.findOne(_id), this.userService.getAuthUser({ _id })]);
            return Object.assign(Object.assign({}, authUser), mongoUser);
        });
    }
    login(req) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const expressUser = req.user;
            const user = yield this.userService.findByQuery({ username: req.body.username });
            return Object.assign(Object.assign({}, expressUser), user);
        });
    }
    logout(req, res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            try {
                req.logout();
            }
            catch (_a) {
                return res.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.OK).send();
            }
        });
    }
    getPlaylists(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.playlistService.getPlaylistByUserId({ userId: user._id });
            console.log(result);
            return result;
        });
    }
    getMediaItems(userId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.mediaItemService.findMediaItemsByUserId(userId);
            return result;
        });
    }
    getSharedMediaItems(user = null) {
        const { _id: userId } = user;
        return this.shareItemService.aggregateSharedMediaItems({ userId });
    }
    getMyShareItems(user = null) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { _id: userId } = user;
            return yield this.shareItemService.aggregateSharedPlaylists({ userId });
        });
    }
    authorize(id, body) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { token = null } = body;
            const valid = yield this.userService.validateToken({ token, _id: id });
            if (!valid)
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UnauthorizedException();
            return valid;
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__.UserGetResponse)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__.GetUser)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface) === "function" ? _a : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "getUser", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpCode)(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.OK),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_local_guard__WEBPACK_IMPORTED_MODULE_16__.LocalGuard),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)('login'),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiBody)({ type: _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__.LoginDto, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiResponse)({ type: _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__.LoginResponseDto, status: 200 }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Req)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_b = typeof express__WEBPACK_IMPORTED_MODULE_2__.Request !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__.Request) === "function" ? _b : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "login", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__.JwtAuthGuard),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)('logout'),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiBearerAuth)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Req)()), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Res)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof express__WEBPACK_IMPORTED_MODULE_2__.Request !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__.Request) === "function" ? _c : Object, typeof (_d = typeof express__WEBPACK_IMPORTED_MODULE_2__.Response !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__.Response) === "function" ? _d : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "logout", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('playlists'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__.UserGetResponse)({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_17__.Playlist, status: 200 }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__.GetUser)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_e = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface) === "function" ? _e : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "getPlaylists", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('media-items'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__.UserGetResponse)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__.GetUserId)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_f = typeof mongodb__WEBPACK_IMPORTED_MODULE_15__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_15__.ObjectId) === "function" ? _f : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "getMediaItems", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('media-items/shared'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__.UserGetResponse)({ type: _media_item_dto_media_item_dto__WEBPACK_IMPORTED_MODULE_11__.MediaItemDto, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__.GetUser)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_g = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface) === "function" ? _g : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], UserController.prototype, "getSharedMediaItems", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('playlists/shared'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_8__.UserGetResponse)({ isArray: true, type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__.ShareItem }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_4__.GetUser)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_h = typeof _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface !== "undefined" && _core_models_auth_user_model__WEBPACK_IMPORTED_MODULE_10__.SessionUserInterface) === "function" ? _h : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "getMyShareItems", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_5__.JwtAuthGuard),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpCode)(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.OK),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)('authorize'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)(':id')), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Body)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [String, typeof (_j = typeof _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__.TokenDto !== "undefined" && _dto_login_dto__WEBPACK_IMPORTED_MODULE_9__.TokenDto) === "function" ? _j : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UserController.prototype, "authorize", null);
UserController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiTags)('user'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)({ path: ['user', 'share', 'media-items', 'playlists'] }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_k = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService) === "function" ? _k : Object, typeof (_l = typeof _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__.PlaylistService !== "undefined" && _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_7__.PlaylistService) === "function" ? _l : Object, typeof (_m = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__.ShareItemService !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_12__.ShareItemService) === "function" ? _m : Object, typeof (_o = typeof _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__.MediaItemService !== "undefined" && _media_item_media_item_service__WEBPACK_IMPORTED_MODULE_14__.MediaItemService) === "function" ? _o : Object])
], UserController);



/***/ }),
/* 109 */
/***/ ((module) => {

module.exports = require("express");;

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetUser": () => /* binding */ GetUser,
/* harmony export */   "GetUserId": () => /* binding */ GetUserId
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_2__);



const GetUser = (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.createParamDecorator)((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return user ? Object.assign(Object.assign({}, user), { _id: new mongodb__WEBPACK_IMPORTED_MODULE_2__.ObjectId(user._id) }) : {};
});
const GetUserId = (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.createParamDecorator)((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return (user === null || user === void 0 ? void 0 : user._id) ? (0,_util_lib__WEBPACK_IMPORTED_MODULE_1__.ObjectIdGuard)(user._id) : {};
});


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtAuthGuard": () => /* binding */ JwtAuthGuard
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let JwtAuthGuard = class JwtAuthGuard extends (0,_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__.AuthGuard)('jwt') {
    canActivate(context) {
        return super.canActivate(context);
        // console.log(can);
        //
        // return can;
    }
};
JwtAuthGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], JwtAuthGuard);



/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistService": () => /* binding */ PlaylistService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_playlist_item_functors_map_playlist_item_functor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(113);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83);
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(114);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(37);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(103);
var _a, _b, _c, _d;











let PlaylistService = class PlaylistService extends _api__WEBPACK_IMPORTED_MODULE_1__.DataService {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            if (!userId || typeof userId === 'string')
                throw new Error('userId is string in createPlaylistWithItems');
            const playlist = yield this.create({ userId, title, createdBy });
            const { _id: playlistId } = playlist;
            const playlistItems = yield this.createPlaylistItems({
                playlistId,
                createdBy,
                items: (0,_modules_playlist_item_functors_map_playlist_item_functor__WEBPACK_IMPORTED_MODULE_6__.mapPlaylistItems)(mediaIds, { userId, playlistId }),
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
                        $or: remeda__WEBPACK_IMPORTED_MODULE_9__.map(ObjectIds, (id) => ({
                            _id: id,
                        })),
                    },
                },
            },
        ])
            .toArray();
    }
    queryPlaylistsById(playlistIds) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    $or: remeda__WEBPACK_IMPORTED_MODULE_9__.map(playlistIds, (id) => ({
                        _id: id,
                    })),
                },
            });
        });
    }
    /* FIXME: hack-around for getting a user when one doesn't exist */
    getPlaylistByUserId({ userId } = { userId: null }) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
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
PlaylistService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_7__.Playlist)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger) === "function" ? _b : Object, typeof (_c = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__.UserService !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__.UserService) === "function" ? _c : Object, typeof (_d = typeof _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__.PlaylistItemService !== "undefined" && _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__.PlaylistItemService) === "function" ? _d : Object])
], PlaylistService);



/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapPlaylistItems": () => /* binding */ mapPlaylistItems
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

function mapPlaylistItems(ids, params) {
    const { userId, playlistId } = params;
    return ids.map((id) => ({
        userId,
        mediaId: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(id),
        playlistId,
    }));
}



/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistItemService": () => /* binding */ PlaylistItemService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(84);
var _a, _b;







let PlaylistItemService = class PlaylistItemService extends _api__WEBPACK_IMPORTED_MODULE_1__.DataService {
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
PlaylistItemService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_6__.PlaylistItem)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger) === "function" ? _b : Object])
], PlaylistItemService);



/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPostResponse": () => /* binding */ UserPostResponse,
/* harmony export */   "UserGetResponse": () => /* binding */ UserGetResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116);



function UserPostResponse({ isArray = false, type = _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.UserDto, description } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ description, type, status: 201, isArray }));
}
const UserGetResponse = function ({ isArray = false, type = _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.UserDto } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, isArray, status: 200 }));
};



/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateUserDto": () => /* binding */ CreateUserDto,
/* harmony export */   "UserAuthFieldsDto": () => /* binding */ UserAuthFieldsDto,
/* harmony export */   "UserDto": () => /* binding */ UserDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _login_dto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(117);
var _a, _b, _c, _d, _e, _f, _g;







const uuidExample = '1731ee8a-8f27-53af-805d-2ee2e705f0e2';
class CreateUserDto extends _login_dto__WEBPACK_IMPORTED_MODULE_6__.LoginDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiName)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiName)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
class UserAuthFieldsDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiObjectId)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof Readonly !== "undefined" && Readonly) === "function" ? _a : Object)
], UserAuthFieldsDto.prototype, "_id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({
        type: String,
        readOnly: true,
        example: uuidExample,
        maxLength: uuidExample.length,
        minLength: uuidExample.length
    }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsUUID)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof Readonly !== "undefined" && Readonly) === "function" ? _b : Object)
], UserAuthFieldsDto.prototype, "authId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiEmail)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof Readonly !== "undefined" && Readonly) === "function" ? _c : Object)
], UserAuthFieldsDto.prototype, "email", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiPastDate)({ readOnly: false }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_d = typeof Readonly !== "undefined" && Readonly) === "function" ? _d : Object)
], UserAuthFieldsDto.prototype, "createdAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__.BC_ROLES }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsArray)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], UserAuthFieldsDto.prototype, "roles", void 0);
class UserDto {
    constructor(user) {
        Object.assign(this, user);
    }
    hashPassword() {
        throw new Error('Method not implemented.');
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiHideProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], UserDto.prototype, "password", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], UserDto.prototype, "username", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], UserDto.prototype, "firstName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], UserDto.prototype, "lastName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], UserDto.prototype, "sharedPlaylists", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], UserDto.prototype, "sharedMediaItems", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiObjectId)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_5__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_5__.ObjectId) === "function" ? _e : Object)
], UserDto.prototype, "_id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiPastDate)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], UserDto.prototype, "createdAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_3__.ApiPastDate)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], UserDto.prototype, "updatedDate", void 0);


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginDto": () => /* binding */ LoginDto,
/* harmony export */   "LoginResponseDto": () => /* binding */ LoginResponseDto,
/* harmony export */   "TokenDto": () => /* binding */ TokenDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83);
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(85);
var _a;







const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJ1c2VyIjp7ImF1dGhJZCI6ImEwMWM4ZDhjLWExYTMtNDdjMS05MGVjLTY0ZmRkOTFiYjYxMSIsInVzZXJuYW1lIjoiTmFkaWExMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRQy9KYXlWeDhYOHZYVUhjUmpSSWZPLmdXaGQ1U0FEYmFNbC9CeXgvUjdvVGJYSzRnQ1IyLiIsImVtYWlsIjoiTmFkaWExMkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTA1VDEyOjA2OjMzLjgzMVoiLCJfaWQiOiI2MDQyMWVjOTdiYmVlYTA2ZGZiZjI2ZGEiLCJyb2xlcyI6WyJndWVzdCJdfSwic3ViIjoiYTAxYzhkOGMtYTFhMy00N2MxLTkwZWMtNjRmZGQ5MWJiNjExIiwiaWF0IjoxNjE0OTQ2MDI4LCJleHAiOjE2MTQ5ODIwMjh9.ZK5s6OFB8zQ0yL3SgzYZXpjTMJyptXv5FouDyqQVlg';
class LoginDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_1__.ApiEmail)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], LoginDto.prototype, "username", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ required: true }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_3__.IsString)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_3__.MinLength)(8),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_3__.MaxLength)(20),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiHideProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], LoginDto.prototype, "password", void 0);
class LoginResponseDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.OmitType)(_entities_user_entity__WEBPACK_IMPORTED_MODULE_6__.User, ['_id', 'userId', 'sharedMediaItems', 'sharedPlaylists']) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({
        type: String,
        pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
        example: exampleToken
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Object)
], LoginResponseDto.prototype, "accessToken", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: Date }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LoginResponseDto.prototype, "updatedAt", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: String }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], LoginResponseDto.prototype, "_id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__.MediaItem, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], LoginResponseDto.prototype, "sharedMediaItems", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__.Playlist, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], LoginResponseDto.prototype, "sharedPlaylists", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_4__.MediaItem, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], LoginResponseDto.prototype, "mediaItems", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({ type: _playlist_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_5__.Playlist, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], LoginResponseDto.prototype, "playlists", void 0);
class TokenDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_2__.ApiProperty)({
        type: String,
        example: exampleToken,
        pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$'
    }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_3__.IsJWT)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], TokenDto.prototype, "token", void 0);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaItemDto": () => /* binding */ MediaItemDto
/* harmony export */ });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(120);


class MediaItemDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__.IntersectionType)(_create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__.CreateMediaItemDto, _create_media_item_dto__WEBPACK_IMPORTED_MODULE_1__.AdditionalMediaItemDto) {
}


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMediaItemDto": () => /* binding */ CreateMediaItemDto,
/* harmony export */   "AdditionalMediaItemDto": () => /* binding */ AdditionalMediaItemDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
var _a, _b;






// const CreateKeys:  Readonly<keyof MediaItem[]> = [ 'summary', 'isPlayable', 'description', 'title', 'category', 'userId' ] as const;
const OPTIONAL_MEDIA_DTO_KEYS = ['_id', 'displayFileName', 'thumbnail', 'uri', 'updatedDate'];
class CreateMediaItemDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.OmitType)(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__.MediaItem, [...OPTIONAL_MEDIA_DTO_KEYS]) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsBoolean)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiProperty)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Boolean)
], CreateMediaItemDto.prototype, "isPlayable", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsString)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiProperty)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], CreateMediaItemDto.prototype, "summary", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsString)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.MinLength)(_core_lib__WEBPACK_IMPORTED_MODULE_4__.ApiDefaults.longString.min),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.MaxLength)(_core_lib__WEBPACK_IMPORTED_MODULE_4__.ApiDefaults.longString.max),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiProperty)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], CreateMediaItemDto.prototype, "description", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__.ApiObjectId)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof NonNullable !== "undefined" && NonNullable) === "function" ? _a : Object)
], CreateMediaItemDto.prototype, "userId", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsString)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.MinLength)(_core_lib__WEBPACK_IMPORTED_MODULE_4__.ApiDefaults.longString.min),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.MaxLength)(_core_lib__WEBPACK_IMPORTED_MODULE_4__.ApiDefaults.longString.max),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiProperty)({ required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], CreateMediaItemDto.prototype, "title", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiProperty)({ required: true, enum: _core_lib__WEBPACK_IMPORTED_MODULE_4__.MEDIA_CATEGORY }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsIn)(_core_lib__WEBPACK_IMPORTED_MODULE_4__.MEDIA_CATEGORY),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof _core_lib__WEBPACK_IMPORTED_MODULE_4__.MediaCategoryType !== "undefined" && _core_lib__WEBPACK_IMPORTED_MODULE_4__.MediaCategoryType) === "function" ? _b : Object)
], CreateMediaItemDto.prototype, "category", void 0);
class AdditionalMediaItemDto extends CreateMediaItemDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AdditionalMediaItemDto.prototype, "displayFileName", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__.ApiUriString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AdditionalMediaItemDto.prototype, "thumbnail", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_5__.ApiUriString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], AdditionalMediaItemDto.prototype, "uri", void 0);


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaItemService": () => /* binding */ MediaItemService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37);
/* harmony import */ var remeda__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(remeda__WEBPACK_IMPORTED_MODULE_7__);
var _a, _b;








let MediaItemService = class MediaItemService extends _api__WEBPACK_IMPORTED_MODULE_1__.DataService {
    constructor(mediaRepository, logger) {
        super(mediaRepository, logger);
    }
    findPlaylistMedia(idStrings) {
        return this.repository.find({
            where: {
                $or: remeda__WEBPACK_IMPORTED_MODULE_7__.map(idStrings, (id) => ({
                    _id: id,
                })),
            },
        });
    }
    findMediaItemsByUserId(userId) {
        return this.repository.find({ userId });
    }
};
MediaItemService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__.MediaItem)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger) === "function" ? _b : Object])
], MediaItemService);



/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalGuard": () => /* binding */ LocalGuard
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalGuard = class LocalGuard extends (0,_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__.AuthGuard)('local') {
    canActivate(context) {
        const _super = Object.create(null, {
            canActivate: { get: () => super.canActivate },
            logIn: { get: () => super.logIn }
        });
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
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
LocalGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], LocalGuard);



/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersController": () => /* binding */ UsersController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(116);
/* harmony import */ var _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(124);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(112);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(125);
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(111);
/* harmony import */ var _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(103);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(53);
/* harmony import */ var _decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(115);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(126);
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(127);
/* harmony import */ var _playlist_dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(128);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;

















let UsersController = class UsersController {
    constructor(userService, playlistService, shareItemService) {
        this.userService = userService;
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
    }
    create(createUserDto) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const { username } = createUserDto;
            const existingUser = yield this.userService.checkIfUserExists(username);
            if (existingUser) {
                console.log(existingUser, 'exists already');
                throw (0,_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_8__.conflictResponse)(username);
            }
            const mongoUser = yield this.userService.createUser(createUserDto);
            return mongoUser;
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
    readSharedItem(shareId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const sharedItem = yield this.shareItemService.update(shareId, { read: true });
            return sharedItem;
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiResponse)({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.UserDto, status: 201, isArray: false }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiBody)({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.CreateUserDto, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__.CreateDto)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.CreateUserDto !== "undefined" && _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.CreateUserDto) === "function" ? _a : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UsersController.prototype, "create", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__.UserGetResponse)({ isArray: true }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "findAll", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.USER_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__.UserGetResponse)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _c : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "findOne", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Put)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.USER_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__.UserPostResponse)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Body)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _e : Object, typeof (_f = typeof _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__.UpdateUserDto !== "undefined" && _dto_update_user_dto__WEBPACK_IMPORTED_MODULE_3__.UpdateUserDto) === "function" ? _f : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "update", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Delete)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.USER_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__.JwtAuthGuard),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId')),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [String]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "remove", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(':userId/playlists'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__.UserGetResponse)({ type: _playlist_dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_16__.PlaylistResponseDto, isArray: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiHideProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_j = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _j : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], UsersController.prototype, "getPlaylists", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Put)(':userId/roles'),
    (0,_decorators_user_response_decorator__WEBPACK_IMPORTED_MODULE_12__.UserPostResponse)({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.UserDto }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiBody)({ enum: _core_lib__WEBPACK_IMPORTED_MODULE_11__.BC_ROLES, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId')), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Body)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [String, Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], UsersController.prototype, "setRoles", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpCode)(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.OK),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__.JwtAuthGuard),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)('shared-items/:shareId'),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'shareId', type: String, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiResponse)({ type: _dto_create_user_dto__WEBPACK_IMPORTED_MODULE_2__.UserDto, status: 200 }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_k = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _k : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], UsersController.prototype, "readSharedItem", null);
UsersController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiTags)('users'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)('users'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_l = typeof _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__.UserService !== "undefined" && _modules_auth_user_service__WEBPACK_IMPORTED_MODULE_10__.UserService) === "function" ? _l : Object, typeof (_m = typeof _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__.PlaylistService !== "undefined" && _playlist_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__.PlaylistService) === "function" ? _m : Object, typeof (_o = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__.ShareItemService !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_6__.ShareItemService) === "function" ? _o : Object])
], UsersController);



/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateUserDto": () => /* binding */ UpdateUserDto
/* harmony export */ });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_user_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85);


class UpdateUserDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__.PartialType)(_entities_user_entity__WEBPACK_IMPORTED_MODULE_1__.User) {
}


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "badRequestResponse": () => /* binding */ badRequestResponse,
/* harmony export */   "notFoundResponse": () => /* binding */ notFoundResponse,
/* harmony export */   "conflictResponse": () => /* binding */ conflictResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Return a new exception when the request is a bad request.
 *
 * @param {string} error
 * @return Http Exception with status of 400
 */
function badRequestResponse(error) {
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpException({ status: _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.BAD_REQUEST, error }, _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.BAD_REQUEST);
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
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpException(Object.assign({ status: _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.NOT_FOUND, error: `${entity} was not found` }, (args !== null && args !== void 0 ? args : args)), _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.NOT_FOUND);
}
function conflictResponse(id) {
    return new _nestjs_common__WEBPACK_IMPORTED_MODULE_0__.ConflictException(id, 'Resource already exists.');
}



/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateDto": () => /* binding */ CreateDto
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);


const CreateDto = (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.createParamDecorator)((data, context) => {
    var _a, _b, _c;
    const ctx = context.switchToHttp().getRequest();
    const user = (_c = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user) !== null && _c !== void 0 ? _c : null;
    return Object.assign(Object.assign({}, ctx.body), { createdBy: (0,_util_lib__WEBPACK_IMPORTED_MODULE_1__.ObjectIdGuard)(user === null || user === void 0 ? void 0 : user._id) });
});


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const RouteTokens = {
    USER_ID: ':userId',
    SHARE_ID: ':shareId',
    MEDIA_ITEM_ID: ':mediaId',
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RouteTokens);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistItemResponseDto": () => /* reexport safe */ _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__.PlaylistItemResponseDto,
/* harmony export */   "PlaylistResponseDto": () => /* binding */ PlaylistResponseDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);
/* harmony import */ var _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);




class PlaylistResponseDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.PickType)(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist, ['_id']) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ name: 'playlist media items for user', type: () => _playlist_response_item_dto__WEBPACK_IMPORTED_MODULE_3__.PlaylistItemResponseDto, description: 'Playlist response DTO' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], PlaylistResponseDto.prototype, "mediaItems", void 0);



/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistItemResponseDto": () => /* binding */ PlaylistItemResponseDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(84);
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
var _a;







class PlaylistItemCreatedBy extends _api__WEBPACK_IMPORTED_MODULE_1__.BcEntity {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiString)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], PlaylistItemCreatedBy.prototype, "username", void 0);
class PlaylistItemResponseDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.IntersectionType)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.OmitType)(_media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__.MediaItem, ['createdBy']), _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_5__.PlaylistItem) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_mediashare_shared__WEBPACK_IMPORTED_MODULE_2__.ApiObjectId)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _a : Object)
], PlaylistItemResponseDto.prototype, "playlistItemId", void 0);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtDecodeMiddleware": () => /* binding */ JwtDecodeMiddleware
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let JwtDecodeMiddleware = class JwtDecodeMiddleware {
    use(req, res, next) {
        _nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Logger.warn('Request...' + req);
        next();
    }
};
JwtDecodeMiddleware = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], JwtDecodeMiddleware);



/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaItemModule": () => /* binding */ MediaItemModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _media_item_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(121);
/* harmony import */ var _media_item_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(132);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);








let MediaItemModule = class MediaItemModule {
};
MediaItemModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__.TypeOrmModule.forFeature([_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_5__.MediaItem]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_6__.ShareItemModule, _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_7__.AuthModule],
        controllers: [_media_item_controller__WEBPACK_IMPORTED_MODULE_3__.MediaItemController],
        providers: [_media_item_service__WEBPACK_IMPORTED_MODULE_2__.MediaItemService],
    })
], MediaItemModule);



/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaItemController": () => /* binding */ MediaItemController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(109);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _media_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(121);
/* harmony import */ var _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(120);
/* harmony import */ var _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(133);
/* harmony import */ var _core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(125);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95);
/* harmony import */ var _modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(111);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(53);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _media_item_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(134);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(126);
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(127);
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(110);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(94);
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
        return _core_lib__WEBPACK_IMPORTED_MODULE_10__.MEDIA_CATEGORY;
    }
    findOne(mediaId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const mediaItem = yield this.mediaItemService.findOne(mediaId);
            if (!mediaItem)
                throw (0,_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__.notFoundResponse)('mediaItem', { args: { mediaId } });
            return mediaItem;
        });
    }
    update(mediaId, updateMediaItemDto) {
        return this.mediaItemService.update(mediaId, updateMediaItemDto);
    }
    remove(mediaId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const deleted = yield this.mediaItemService.remove(mediaId);
            if (!deleted)
                throw (0,_core_functors_http_errors_functor__WEBPACK_IMPORTED_MODULE_7__.notFoundResponse)(mediaId);
            return deleted;
        });
    }
    share(mediaId, userId, createdBy, response) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            console.log('the id', mediaId);
            const { title } = yield this.mediaItemService.findOne(mediaId);
            if (!title && !createdBy)
                return response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.NOT_FOUND);
            const shareItem = yield this.shareItemService.createMediaShareItem({
                createdBy,
                userId,
                mediaId,
                title,
            });
            response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.CREATED);
            return response.send(shareItem);
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)(),
    (0,_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__.MediaPostResponse)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_14__.CreateDto)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__.CreateMediaItemDto !== "undefined" && _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_5__.CreateMediaItemDto) === "function" ? _a : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], MediaItemController.prototype, "create", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(),
    (0,_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__.MediaGetResponse)({ isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], MediaItemController.prototype, "findAll", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('categories'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], MediaItemController.prototype, "getCategories", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__.MediaGetResponse)(),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.MEDIA_ITEM_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'mediaId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('mediaId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId) === "function" ? _b : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], MediaItemController.prototype, "findOne", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__.MediaPostResponse)(),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Put)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.MEDIA_ITEM_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'mediaId', type: String, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiBody)({ type: _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__.UpdateMediaItemDto }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('mediaId', _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Body)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId) === "function" ? _c : Object, typeof (_d = typeof _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__.UpdateMediaItemDto !== "undefined" && _dto_update_media_item_dto__WEBPACK_IMPORTED_MODULE_6__.UpdateMediaItemDto) === "function" ? _d : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], MediaItemController.prototype, "update", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.UseGuards)(_modules_auth_guards_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_9__.JwtAuthGuard),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Delete)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_15__.default.MEDIA_ITEM_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'mediaId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('mediaId')),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [String]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], MediaItemController.prototype, "remove", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)(':mediaId/share/:userId'),
    (0,_media_item_decorator__WEBPACK_IMPORTED_MODULE_12__.MediaPostResponse)({ type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_17__.ShareItem }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'mediaId', type: String, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('mediaId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_13__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(2, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_16__.GetUserId)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(3, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Res)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId) === "function" ? _e : Object, typeof (_f = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId) === "function" ? _f : Object, typeof (_g = typeof mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_11__.ObjectId) === "function" ? _g : Object, typeof (_h = typeof express__WEBPACK_IMPORTED_MODULE_2__.Response !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__.Response) === "function" ? _h : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], MediaItemController.prototype, "share", null);
MediaItemController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiTags)('media-items'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)('media-items'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_j = typeof _media_item_service__WEBPACK_IMPORTED_MODULE_4__.MediaItemService !== "undefined" && _media_item_service__WEBPACK_IMPORTED_MODULE_4__.MediaItemService) === "function" ? _j : Object, typeof (_k = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__.ShareItemService !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__.ShareItemService) === "function" ? _k : Object])
], MediaItemController);



/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateMediaItemDto": () => /* binding */ UpdateMediaItemDto
/* harmony export */ });
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);


class UpdateMediaItemDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_0__.PartialType)(_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_1__.MediaItem) {
}


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaGetResponse": () => /* binding */ MediaGetResponse,
/* harmony export */   "MediaPostResponse": () => /* binding */ MediaPostResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);




function MediaPostResponse({ isArray = false, type = _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__.MediaItem, description } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ description, type, status: 201, isArray }), (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiBody)({ type: _dto_create_media_item_dto__WEBPACK_IMPORTED_MODULE_2__.CreateMediaItemDto }));
}
const MediaGetResponse = function ({ isArray = false, type = _entities_media_item_entity__WEBPACK_IMPORTED_MODULE_3__.MediaItem } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, isArray, status: 200 }));
};



/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileModule": () => /* binding */ ProfileModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _profile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(136);
/* harmony import */ var _profile_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(138);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_profile_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(137);






let ProfileModule = class ProfileModule {
};
ProfileModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__.TypeOrmModule.forFeature([_entities_profile_entity__WEBPACK_IMPORTED_MODULE_5__.Profile])],
        controllers: [_profile_controller__WEBPACK_IMPORTED_MODULE_3__.ProfileController],
        providers: [_profile_service__WEBPACK_IMPORTED_MODULE_2__.ProfileService],
    })
], ProfileModule);



/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileService": () => /* binding */ ProfileService
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var nestjs_pino__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nestjs_pino__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_profile_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(137);
var _a, _b;







let ProfileService = class ProfileService extends _api__WEBPACK_IMPORTED_MODULE_1__.DataService {
    constructor(userRepository, logger) {
        super(userRepository, logger);
    }
};
ProfileService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_2__.Injectable)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_3__.InjectRepository)(_entities_profile_entity__WEBPACK_IMPORTED_MODULE_6__.Profile)),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository !== "undefined" && typeorm__WEBPACK_IMPORTED_MODULE_5__.MongoRepository) === "function" ? _a : Object, typeof (_b = typeof nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger !== "undefined" && nestjs_pino__WEBPACK_IMPORTED_MODULE_4__.PinoLogger) === "function" ? _b : Object])
], ProfileService);



/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Profile": () => /* binding */ Profile
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);



let Profile = class Profile extends _api__WEBPACK_IMPORTED_MODULE_2__.BcBaseEntity {
};
Profile = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Entity)()
], Profile);



/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileController": () => /* binding */ ProfileController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _profile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(136);
var _a;



let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
};
ProfileController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)('profile'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _profile_service__WEBPACK_IMPORTED_MODULE_2__.ProfileService !== "undefined" && _profile_service__WEBPACK_IMPORTED_MODULE_2__.ProfileService) === "function" ? _a : Object])
], ProfileController);



/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistModule": () => /* binding */ PlaylistModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _playlist_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(140);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_playlist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(112);
/* harmony import */ var _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(84);
/* harmony import */ var _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(114);
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(93);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7);











let PlaylistModule = class PlaylistModule {
};
PlaylistModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__.TypeOrmModule.forFeature([_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__.Playlist, _media_item_entities_media_item_entity__WEBPACK_IMPORTED_MODULE_6__.MediaItem, _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_7__.PlaylistItem]), _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_9__.ShareItemModule, _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_10__.AuthModule],
        controllers: [_playlist_controller__WEBPACK_IMPORTED_MODULE_2__.PlaylistController],
        providers: [_services_playlist_service__WEBPACK_IMPORTED_MODULE_5__.PlaylistService, _modules_playlist_item_services_playlist_item_service__WEBPACK_IMPORTED_MODULE_8__.PlaylistItemService],
    })
], PlaylistModule);



/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistController": () => /* binding */ PlaylistController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(109);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(141);
/* harmony import */ var _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(142);
/* harmony import */ var _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(112);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95);
/* harmony import */ var _core_lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(53);
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(110);
/* harmony import */ var _playlist_decorator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(143);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(94);
/* harmony import */ var _dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(128);
/* harmony import */ var _dto_create_playlist_response_dto__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(144);
/* harmony import */ var _core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(126);
/* harmony import */ var _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(84);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;


















const PLAYLIST_ID_TOKEN = ':playlistId';
let PlaylistController = class PlaylistController {
    constructor(playlistService, shareItemService) {
        this.playlistService = playlistService;
        this.shareItemService = shareItemService;
    }
    create(createPlaylistDto, userId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            console.log('dto', createPlaylistDto);
            return yield this.playlistService.createPlaylistWithItems(Object.assign(Object.assign({}, createPlaylistDto), { userId }));
        });
    }
    findAll() {
        return this.playlistService.findAll();
    }
    getCategories() {
        return { categories: _core_lib__WEBPACK_IMPORTED_MODULE_9__.PLAYLIST_CATEGORY };
    }
    findOne(playlistId) {
        return this.playlistService.getPlaylistById({ playlistId });
    }
    update(playlistId, userId, updatePlaylistDto) {
        const rest = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(updatePlaylistDto, []);
        return this.playlistService.update(playlistId, Object.assign(Object.assign({}, rest), { userId }));
    }
    remove(playlistId) {
        return this.playlistService.remove(playlistId);
    }
    share(playlistId, userId, createdBy, response) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const shareItem = yield this.shareItemService.createPlaylistShareItem({ createdBy, userId, playlistId });
            return response.status(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.HttpStatus.CREATED).send(shareItem);
        });
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__.PlaylistPostResponse)({ type: _dto_create_playlist_response_dto__WEBPACK_IMPORTED_MODULE_15__.CreatePlaylistResponseDto }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)(),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiBody)({ type: _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__.CreatePlaylistDto }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_create_dto_decorator__WEBPACK_IMPORTED_MODULE_16__.CreateDto)()), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__.GetUserId)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__.CreatePlaylistDto !== "undefined" && _dto_create_playlist_dto__WEBPACK_IMPORTED_MODULE_5__.CreatePlaylistDto) === "function" ? _a : Object, typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _b : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], PlaylistController.prototype, "create", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__.PlaylistGetResponse)({ isArray: true, type: _modules_playlist_item_entities_playlist_item_entity__WEBPACK_IMPORTED_MODULE_17__.PlaylistItem }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], PlaylistController.prototype, "findAll", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)('categories'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], PlaylistController.prototype, "getCategories", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__.PlaylistGetResponse)({ type: _dto_playlist_response_dto__WEBPACK_IMPORTED_MODULE_14__.PlaylistResponseDto }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({
        name: 'playlistId',
        required: true,
        type: 'string',
        example: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId().toHexString(),
    }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(PLAYLIST_ID_TOKEN),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'playlistId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _c : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], PlaylistController.prototype, "findOne", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Put)(PLAYLIST_ID_TOKEN),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'playlistId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__.ObjectIdPipe())), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__.GetUserId)()), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(2, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Body)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_d = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _d : Object, typeof (_e = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _e : Object, typeof (_f = typeof _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__.UpdatePlaylistDto !== "undefined" && _dto_update_playlist_dto__WEBPACK_IMPORTED_MODULE_6__.UpdatePlaylistDto) === "function" ? _f : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], PlaylistController.prototype, "update", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Delete)(PLAYLIST_ID_TOKEN)
    // @UseJwtGuard()
    ,
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'playlistId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('playlistId')),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [String]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], PlaylistController.prototype, "remove", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Post)([':playlistId', ' share', ':userId']),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'playlistId', type: String, required: true }),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiParam)({ name: 'userId', type: String, required: true }),
    (0,_playlist_decorator__WEBPACK_IMPORTED_MODULE_11__.PlaylistPostResponse)({ type: _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_13__.ShareItem, isArray: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('playlistId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(1, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('userId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_12__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(2, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_10__.GetUserId)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(3, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Res)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_g = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _g : Object, typeof (_h = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _h : Object, typeof (_j = typeof mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId) === "function" ? _j : Object, typeof (_k = typeof express__WEBPACK_IMPORTED_MODULE_2__.Response !== "undefined" && express__WEBPACK_IMPORTED_MODULE_2__.Response) === "function" ? _k : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], PlaylistController.prototype, "share", null);
PlaylistController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_3__.ApiTags)('playlists'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)('playlists'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_l = typeof _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__.PlaylistService !== "undefined" && _services_playlist_service__WEBPACK_IMPORTED_MODULE_7__.PlaylistService) === "function" ? _l : Object, typeof (_m = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__.ShareItemService !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_8__.ShareItemService) === "function" ? _m : Object])
], PlaylistController);



/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatePlaylistDto": () => /* binding */ CreatePlaylistDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);
var _a;




class CreatePlaylistDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.PickType)(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__.Playlist, ['category', 'title', 'createdBy', 'userId']) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ isArray: true, type: 'string', writeOnly: true, required: true }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsArray)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof Readonly !== "undefined" && Readonly) === "function" ? _a : Object)
], CreatePlaylistDto.prototype, "mediaIds", void 0);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePlaylistDto": () => /* binding */ UpdatePlaylistDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83);




class UpdatePlaylistDto extends (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.PickType)(_entities_playlist_entity__WEBPACK_IMPORTED_MODULE_3__.Playlist, ['title', 'category']) {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ required: false }),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsArray)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], UpdatePlaylistDto.prototype, "items", void 0);


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistPostResponse": () => /* binding */ PlaylistPostResponse,
/* harmony export */   "PlaylistGetResponse": () => /* binding */ PlaylistGetResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);



function PlaylistPostResponse({ isArray = false, type = _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist, description } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ description, type, status: 201, isArray }));
}
const PlaylistGetResponse = function ({ isArray = false, type = _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, isArray, status: 200 }));
};



/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Playlist": () => /* reexport safe */ _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist,
/* harmony export */   "CreatePlaylistResponseDto": () => /* binding */ CreatePlaylistResponseDto
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);
var _a;



class CreatePlaylistResponseDto {
}
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)({ readOnly: true, type: _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_a = typeof _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist !== "undefined" && _entities_playlist_entity__WEBPACK_IMPORTED_MODULE_2__.Playlist) === "function" ? _a : Object)
], CreatePlaylistResponseDto.prototype, "playlist", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiProperty)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Array)
], CreatePlaylistResponseDto.prototype, "playlistItems", void 0);



/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShareItemsModule": () => /* binding */ ShareItemsModule
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _share_items_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(146);
/* harmony import */ var _modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(93);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_auth_jwt_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(98);
/* harmony import */ var _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94);








let ShareItemsModule = class ShareItemsModule {
};
ShareItemsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Module)({
        imports: [_modules_share_item_share_item_module__WEBPACK_IMPORTED_MODULE_3__.ShareItemModule, _nestjs_typeorm__WEBPACK_IMPORTED_MODULE_4__.TypeOrmModule.forFeature([_modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_7__.ShareItem]), _modules_auth_auth_module__WEBPACK_IMPORTED_MODULE_6__.AuthModule],
        controllers: [_share_items_controller__WEBPACK_IMPORTED_MODULE_2__.ShareItemsController],
        providers: [_modules_auth_jwt_strategy__WEBPACK_IMPORTED_MODULE_5__.JwtStrategy],
    })
], ShareItemsModule);



/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShareItemsController": () => /* binding */ ShareItemsController
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95);
/* harmony import */ var _core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(110);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _share_items_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(147);
/* harmony import */ var _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(127);
var _a, _b, _c, _d;









let ShareItemsController = class ShareItemsController {
    constructor(shareItemService) {
        this.shareItemService = shareItemService;
    }
    findAll(userId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
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
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__.ShareItemGetResponse)({ isArray: true }),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_core_decorators_user_decorator__WEBPACK_IMPORTED_MODULE_3__.GetUserId)()),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _a : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", Promise)
], ShareItemsController.prototype, "findAll", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__.ShareItemGetResponse)(),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Get)(_modules_app_config_module_ts_constants_open_api_constants__WEBPACK_IMPORTED_MODULE_8__.default.SHARE_ID),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'shareId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_b = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _b : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], ShareItemsController.prototype, "findOne", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_share_items_decorator__WEBPACK_IMPORTED_MODULE_5__.ShareItemGetResponse)(),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Delete)(':shareId'),
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiParam)({ name: 'shareId', type: String, required: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__param)(0, (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Param)('shareId', new _mediashare_shared__WEBPACK_IMPORTED_MODULE_6__.ObjectIdPipe())),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_c = typeof mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId !== "undefined" && mongodb__WEBPACK_IMPORTED_MODULE_7__.ObjectId) === "function" ? _c : Object]),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:returntype", void 0)
], ShareItemsController.prototype, "remove", null);
ShareItemsController = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_4__.ApiTags)('share-items'),
    (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_1__.Controller)('share-items'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_d = typeof _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__.ShareItemService !== "undefined" && _modules_share_item_services_share_item_service__WEBPACK_IMPORTED_MODULE_2__.ShareItemService) === "function" ? _d : Object])
], ShareItemsController);



/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShareItemPostResponse": () => /* binding */ ShareItemPostResponse,
/* harmony export */   "ShareItemGetResponse": () => /* binding */ ShareItemGetResponse
/* harmony export */ });
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_swagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94);



function ShareItemPostResponse({ isArray = false, type = _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__.ShareItem, description } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ description, type, status: 201, isArray }));
}
const ShareItemGetResponse = function ({ isArray = false, type = _modules_share_item_entities_share_item_entity__WEBPACK_IMPORTED_MODULE_2__.ShareItem } = {}) {
    return (0,_nestjs_common__WEBPACK_IMPORTED_MODULE_0__.applyDecorators)((0,_nestjs_swagger__WEBPACK_IMPORTED_MODULE_1__.ApiResponse)({ type, isArray, status: 200 }));
};



/***/ }),
/* 148 */
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),
/* 149 */
/***/ ((module) => {

module.exports = require("passport");;

/***/ }),
/* 150 */
/***/ ((module) => {

module.exports = require("compression");;

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