/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/sass/main.scss":
/*!*******************************!*\
  !*** ./assets/sass/main.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./api/CustomerAPI/CustomerAPI.ts":
/*!****************************************!*\
  !*** ./api/CustomerAPI/CustomerAPI.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerAPI = void 0;
const api_data_1 = __webpack_require__(/*! ../api-data */ "./api/api-data.ts");
const authAPI_1 = __webpack_require__(/*! ../authAPI/authAPI */ "./api/authAPI/authAPI.ts");
const customer_api_type_1 = __webpack_require__(/*! ./customer-api-type */ "./api/CustomerAPI/customer-api-type.ts");
class CustomerAPI {
    static loginCustomer(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_API_URL}/${api_data_1.CTP_PROJECT_KEY}/me/login`;
            const responseStatus = yield authAPI_1.AuthAPI.fetchPasswordToken(email, password);
            if (responseStatus !== authAPI_1.AuthStatusCodes.successfulPasswordTokenFetch) {
                return responseStatus;
            }
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(api_data_1.TOKEN_STORAGE_KEY)}`,
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            return response.status;
        });
    }
    static registerCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_API_URL}/${api_data_1.CTP_PROJECT_KEY}/me/signup`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(api_data_1.TOKEN_STORAGE_KEY)}`,
                },
                body: JSON.stringify({
                    email: customerData.email,
                    password: customerData.password,
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    dateOfBirth: customerData.dateOfBirth,
                    addresses: customerData.addresses,
                    defaultShippingAddress: customerData.defaultShippingAddress,
                    shippingAddresses: customerData.shippingAddresses,
                    defaultBillingAddress: customerData.defaultBillingAddress,
                    billingAddresses: customerData.billingAddresses,
                }),
            });
            if (response.status !== customer_api_type_1.StatusCodes.successfulRegistration) {
                const data = yield response.json();
                return {
                    message: data.message,
                    statusCode: data.statusCode,
                };
            }
            yield authAPI_1.AuthAPI.fetchPasswordToken(customerData.email, customerData.password);
            yield this.loginCustomer(customerData.email, customerData.password);
            return response.status;
        });
    }
    static getCustomerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_API_URL}/${api_data_1.CTP_PROJECT_KEY}/me`;
            const response = yield fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(api_data_1.TOKEN_STORAGE_KEY)}`,
                },
            });
            const data = yield response.json();
            console.log('getInfo', data);
        });
    }
}
exports.CustomerAPI = CustomerAPI;


/***/ }),

/***/ "./api/CustomerAPI/customer-api-type.ts":
/*!**********************************************!*\
  !*** ./api/CustomerAPI/customer-api-type.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["successfulLogin"] = 200] = "successfulLogin";
    StatusCodes[StatusCodes["successfulRegistration"] = 201] = "successfulRegistration";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));


/***/ }),

/***/ "./api/api-data.ts":
/*!*************************!*\
  !*** ./api/api-data.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TOKEN_STORAGE_KEY = exports.CTP_SCOPES = exports.CTP_API_URL = exports.CTP_AUTH_URL = exports.CTP_CLIENT_ID = exports.CTP_CLIENT_SECRET = exports.CTP_PROJECT_KEY = void 0;
const CTP_PROJECT_KEY = 'beat-amazon';
exports.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
const CTP_CLIENT_SECRET = 'Q-Re7QPpJHlYELukt_igPBIHx6mOx13q';
exports.CTP_CLIENT_SECRET = CTP_CLIENT_SECRET;
const CTP_CLIENT_ID = 'X5YO3W0sZrwcRNYQexE8np0q';
exports.CTP_CLIENT_ID = CTP_CLIENT_ID;
const CTP_AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
exports.CTP_AUTH_URL = CTP_AUTH_URL;
const CTP_API_URL = 'https://api.europe-west1.gcp.commercetools.com';
exports.CTP_API_URL = CTP_API_URL;
const CTP_SCOPES = 'manage_my_quote_requests:beat-amazon manage_my_orders:beat-amazon view_products:beat-amazon manage_my_quotes:beat-amazon view_categories:beat-amazon manage_my_shopping_lists:beat-amazon view_published_products:beat-amazon manage_my_business_units:beat-amazon manage_my_payments:beat-amazon create_anonymous_token:beat-amazon manage_my_profile:beat-amazon';
exports.CTP_SCOPES = CTP_SCOPES;
const TOKEN_STORAGE_KEY = 'access-token';
exports.TOKEN_STORAGE_KEY = TOKEN_STORAGE_KEY;


/***/ }),

/***/ "./api/authAPI/authAPI.ts":
/*!********************************!*\
  !*** ./api/authAPI/authAPI.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthAPI = exports.AuthStatusCodes = void 0;
const api_data_1 = __webpack_require__(/*! ../api-data */ "./api/api-data.ts");
var AuthStatusCodes;
(function (AuthStatusCodes) {
    AuthStatusCodes[AuthStatusCodes["successfulPasswordTokenFetch"] = 200] = "successfulPasswordTokenFetch";
})(AuthStatusCodes || (exports.AuthStatusCodes = AuthStatusCodes = {}));
class AuthAPI {
    static setAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!localStorage.getItem(api_data_1.TOKEN_STORAGE_KEY)) {
                yield this.fetchAnonymousToken();
            }
        });
    }
    static fetchAnonymousToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_AUTH_URL}/oauth/${api_data_1.CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${api_data_1.CTP_CLIENT_ID}:${api_data_1.CTP_CLIENT_SECRET}`)}`,
                },
            });
            const data = yield response.json();
            const accessToken = data.access_token;
            localStorage.setItem(api_data_1.TOKEN_STORAGE_KEY, accessToken);
        });
    }
    static fetchPasswordToken(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_AUTH_URL}/oauth/${api_data_1.CTP_PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${api_data_1.CTP_CLIENT_ID}:${api_data_1.CTP_CLIENT_SECRET}`)}`,
                },
            });
            if (response.status !== AuthStatusCodes.successfulPasswordTokenFetch) {
                return response.status;
            }
            const data = yield response.json();
            const accessToken = data.access_token;
            localStorage.setItem(api_data_1.TOKEN_STORAGE_KEY, accessToken);
            return response.status;
        });
    }
    static fetchRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${api_data_1.CTP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${token}`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${api_data_1.CTP_CLIENT_ID}:${api_data_1.CTP_CLIENT_SECRET}`)}`,
                },
            });
            const data = yield response.json();
            const accessToken = data.access_token;
            localStorage.setItem(api_data_1.TOKEN_STORAGE_KEY, accessToken);
        });
    }
}
exports.AuthAPI = AuthAPI;


/***/ }),

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const router_1 = __webpack_require__(/*! ./router/router */ "./app/router/router.ts");
const footer_view_1 = __importDefault(__webpack_require__(/*! ./view/footer/footer-view */ "./app/view/footer/footer-view.ts"));
const header_view_1 = __importDefault(__webpack_require__(/*! ./view/header/header-view */ "./app/view/header/header-view.ts"));
const main_view_1 = __importDefault(__webpack_require__(/*! ./view/main/main-view */ "./app/view/main/main-view.ts"));
const wrapper_1 = __importDefault(__webpack_require__(/*! ./view/wrapper */ "./app/view/wrapper.ts"));
const pages_1 = __webpack_require__(/*! ./router/pages */ "./app/router/pages.ts");
const state_1 = __importDefault(__webpack_require__(/*! ./state/state */ "./app/state/state.ts"));
const authAPI_1 = __webpack_require__(/*! ../api/authAPI/authAPI */ "./api/authAPI/authAPI.ts");
class App {
    constructor() {
        authAPI_1.AuthAPI.setAccessToken();
        this.header = null;
        this.main = null;
        const state = new state_1.default();
        const routes = this.createRoutes(state);
        this.router = new router_1.Router(routes);
        this.createView(state);
    }
    createView(state) {
        const wrapperView = new wrapper_1.default();
        this.header = new header_view_1.default(this.router, state);
        this.main = new main_view_1.default();
        const footer = new footer_view_1.default();
        wrapperView
            .getHTMLElement()
            .append(this.header.getHTMLElement(), this.main.getHTMLElement(), footer.getHTMLElement());
        document.body.append(wrapperView.getHTMLElement());
    }
    /* eslint-disable max-lines-per-function */
    createRoutes(state) {
        const result = [
            {
                path: '',
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: IndexView } = yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./view/main/index/index-view */ "./app/view/main/index/index-view.ts")));
                    this.setContent(pages_1.Pages.INDEX, new IndexView());
                }),
            },
            {
                path: `${pages_1.Pages.INDEX}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: IndexView } = yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./view/main/index/index-view */ "./app/view/main/index/index-view.ts")));
                    this.setContent(pages_1.Pages.INDEX, new IndexView());
                }),
            },
            {
                path: `${pages_1.Pages.LOGIN}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: LoginView } = yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./view/main/login/login-view */ "./app/view/main/login/login-view.ts")));
                    this.setContent(pages_1.Pages.LOGIN, new LoginView(this.router, this.header, state));
                }),
            },
            {
                path: `${pages_1.Pages.REGISTRATION}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: RegistrationView } = yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./view/main/registration/registration-view */ "./app/view/main/registration/registration-view.ts")));
                    this.setContent(pages_1.Pages.REGISTRATION, new RegistrationView(this.router));
                }),
            },
            {
                path: `${pages_1.Pages.NOT_FOUND}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: NotFoundView } = yield Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./view/main/not-found/not-found-view */ "./app/view/main/not-found/not-found-view.ts")));
                    this.setContent(pages_1.Pages.NOT_FOUND, new NotFoundView(this.router));
                }),
            },
        ];
        return result;
    }
    /* eslint-enable max-lines-per-function */
    setContent(page, view) {
        var _a, _b;
        (_a = this.header) === null || _a === void 0 ? void 0 : _a.setSelectedItem(page);
        (_b = this.main) === null || _b === void 0 ? void 0 : _b.setContent(view);
    }
}
exports["default"] = App;


/***/ }),

/***/ "./app/router/pages.ts":
/*!*****************************!*\
  !*** ./app/router/pages.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pages = void 0;
const Pages = {
    INDEX: 'main',
    LOGIN: 'login',
    REGISTRATION: 'registration',
    NOT_FOUND: 'not-found',
};
exports.Pages = Pages;


/***/ }),

/***/ "./app/router/router.ts":
/*!******************************!*\
  !*** ./app/router/router.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
const pages_1 = __webpack_require__(/*! ./pages */ "./app/router/pages.ts");
const BROWSER_ROUTER_BASENAME = 'eCommerce-Application/';
class Router {
    constructor(routes) {
        this.routes = routes;
        document.addEventListener('DOMContentLoaded', () => {
            const path = this.getCurrentPath();
            this.navigate(path);
        });
        window.addEventListener('popstate', this.browserChangeHandler.bind(this));
        window.addEventListener('hashchange', this.browserChangeHandler.bind(this));
    }
    navigate(url) {
        const request = this.parseUrl(url);
        const pathForFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
        const route = this.routes.find((item) => item.path === pathForFind);
        if (!route) {
            this.redirectToNotFound();
        }
        else {
            route.callback();
            window.history.pushState(null, '', pathForFind);
        }
    }
    parseUrl(url) {
        const path = url.split('/');
        const result = {
            path: '',
            resource: '',
        };
        [result.path = '', result.resource = ''] = path;
        return result;
    }
    redirectToNotFound() {
        const routeNotFound = this.routes.find((item) => item.path === pages_1.Pages.NOT_FOUND);
        if (routeNotFound) {
            this.navigate(routeNotFound.path);
        }
    }
    browserChangeHandler() {
        const path = this.getCurrentPath();
        this.navigate(path);
    }
    getCurrentPath() {
        if (window.location.hash) {
            return window.location.hash.slice(1).replace(BROWSER_ROUTER_BASENAME, '');
        }
        return window.location.pathname.slice(1).replace(BROWSER_ROUTER_BASENAME, '');
    }
}
exports.Router = Router;


/***/ }),

/***/ "./app/state/state.ts":
/*!****************************!*\
  !*** ./app/state/state.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const KEY_FOR_SAVE = 'spaApp';
class State {
    constructor() {
        this.fields = this.loadState();
        window.addEventListener('beforeunload', this.saveState.bind(this));
    }
    setValue(name, value) {
        this.fields.set(name, value);
    }
    getValue(name) {
        const value = this.fields.get(name);
        if (value)
            return value;
        return '';
    }
    saveState() {
        const fields = Object.fromEntries(this.fields.entries());
        localStorage.setItem(KEY_FOR_SAVE, JSON.stringify(fields));
    }
    loadState() {
        const fields = localStorage.getItem(KEY_FOR_SAVE);
        if (fields) {
            const fieldsArr = JSON.parse(fields);
            return new Map(Object.entries(fieldsArr));
        }
        return new Map();
    }
}
exports["default"] = State;


/***/ }),

/***/ "./app/utils/element-creator.ts":
/*!**************************************!*\
  !*** ./app/utils/element-creator.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ElementCreator = void 0;
class ElementCreator {
    constructor(tag, classNames, textContent) {
        this.element = document.createElement(tag);
        this.setElement(classNames, textContent);
    }
    setElement(classNames, textContent) {
        this.setCssClasses(classNames);
        if (textContent)
            this.setTextContent(textContent);
    }
    getElement() {
        return this.element;
    }
    setCssClasses(cssClasses) {
        // не нравится, можно переделать?
        if (Array.isArray(cssClasses)) {
            this.element.classList.add(...cssClasses);
        }
        else {
            this.element.classList.add(cssClasses);
        }
    }
    setTextContent(text) {
        this.element.textContent = text;
    }
    addInnerElement(element) {
        if (element instanceof ElementCreator) {
            this.element.append(element.getElement());
        }
        else {
            this.element.append(element);
        }
    }
}
exports.ElementCreator = ElementCreator;


/***/ }),

/***/ "./app/utils/input-fields-creator.ts":
/*!*******************************************!*\
  !*** ./app/utils/input-fields-creator.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ./element-creator */ "./app/utils/element-creator.ts");
const CssClasses = {
    wrapper: 'primary-wrapper',
    input: 'primary-input',
    label: 'primary-label',
    errorLine: 'primary-error-line',
};
class InputFieldsCreator {
    constructor(classNames, subClassNames, labelTextContent, inputValue, type = 'text', placeholder = '') {
        this.element = document.createElement('div');
        this.inputElement = document.createElement('input');
        this.labelElement = document.createElement('label');
        this.errorLineElement = document.createElement('div');
        this.setElement(classNames, subClassNames, labelTextContent, type);
        this.setValue(inputValue);
        this.setPlaceholder(placeholder);
    }
    setElement(classNames, subClassNames, labelTextContent, type) {
        this.setLabelTextContent(labelTextContent);
        this.setCssClasses(classNames, subClassNames);
        this.labelElement.prepend(this.inputElement);
        this.element.append(this.labelElement);
        this.element.append(this.errorLineElement);
        this.setType(type);
    }
    getElement() {
        return this.element;
    }
    getInputElement() {
        return this.inputElement;
    }
    getErrorLine() {
        return this.errorLineElement;
    }
    setValue(inputValue) {
        this.inputElement.value = inputValue;
    }
    setCssClasses(classNames, subClassNames) {
        this.element.classList.add(`${classNames}__${subClassNames}-input-wrapper`, CssClasses.wrapper);
        this.inputElement.classList.add(`${classNames}__${subClassNames}-input`, CssClasses.input);
        this.labelElement.classList.add(`${classNames}__${subClassNames}-label`, CssClasses.label);
        this.errorLineElement.classList.add(CssClasses.errorLine);
    }
    setLabelTextContent(text) {
        if (this.labelElement)
            this.labelElement.textContent = text;
    }
    setType(type) {
        this.inputElement.setAttribute('type', type);
    }
    setPlaceholder(placeholder) {
        this.inputElement.setAttribute('placeholder', placeholder);
    }
    addInnerElement(element) {
        if (element instanceof element_creator_1.ElementCreator) {
            this.element.append(element.getElement());
        }
        else {
            this.element.append(element);
        }
    }
}
exports["default"] = InputFieldsCreator;


/***/ }),

/***/ "./app/utils/validator.ts":
/*!********************************!*\
  !*** ./app/utils/validator.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Validator = void 0;
class Validator {
    static nameField(name) {
        let error = '';
        const nameRegex = /^[a-zA-Z]+$/;
        if (!name) {
            error = 'Name is empty.';
        }
        if (!nameRegex.test(name)) {
            error = 'Wrong format of Name.';
        }
        return error;
    }
    static emailField(email) {
        let error = '';
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!email) {
            error = 'Email is empty.';
        }
        else if (!emailRegex.test(email)) {
            error = 'Wrong format of email.';
        }
        return error;
    }
    static passwordField(password) {
        let error = '';
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!password) {
            error = 'Password is empty.';
        }
        else if (!passwordRegex.test(password)) {
            error =
                'Password must be at least 8 characters long; must contain at least one uppercase letter (A-Z),  at least one lowercase letter (a-z), at least one digit (0-9), must not contain leading or trailing whitespace ';
        }
        return error;
    }
    static confirmPasswordField(confirmPassword, password) {
        let error = '';
        if (!confirmPassword) {
            error = 'Password is empty.';
        }
        else if (confirmPassword !== password) {
            error = 'Passwords do not match';
        }
        return error;
    }
    static birthField(dateOfBirth) {
        let error = '';
        const MIN_AGE = 13;
        if (!dateOfBirth) {
            error = 'Date of birth is empty.';
        }
        else {
            const birthDate = new Date(dateOfBirth);
            const currentDate = new Date();
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            if (currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
                age -= 1;
            }
            if (age < MIN_AGE) {
                error = `You must be at least ${MIN_AGE} years old.`;
            }
        }
        return error;
    }
    static streetField(street) {
        let error = '';
        if (!street) {
            error = 'Street is empty.';
        }
        return error;
    }
    static cityField(city) {
        const cityRegex = /^[a-zA-Z\s]+$/;
        let error = '';
        if (!city) {
            error = 'City is empty.';
        }
        else if (!cityRegex.test(city)) {
            error = 'City must contain only letters and spaces.';
        }
        return error;
    }
    static postalCodeField(postalCode, selectedCountry) {
        const usaPostalCodeRegex = /^\d{5}(-\d{4})?$/;
        const russiaPostalCodeRegex = /^[0-9]{6}$/;
        let error = '';
        if (!postalCode) {
            error = 'Postal code is empty.';
        }
        else {
            const countrySpecificRegex = selectedCountry === 'US' ? usaPostalCodeRegex : russiaPostalCodeRegex;
            if (!countrySpecificRegex.test(postalCode)) {
                error = selectedCountry === 'US' ? 'Invalid USA postal code format.' : 'Invalid Russian postal code format.';
            }
        }
        return error;
    }
}
exports.Validator = Validator;


/***/ }),

/***/ "./app/view/footer/footer-view.ts":
/*!****************************************!*\
  !*** ./app/view/footer/footer-view.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../utils/element-creator */ "./app/utils/element-creator.ts");
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
class FooterView extends view_1.View {
    constructor() {
        super('footer', 'footer');
        this.configView();
    }
    configView() {
        const footerRssLink = new element_creator_1.ElementCreator('a', 'footer__link', '');
        footerRssLink.getElement().setAttribute('href', 'https://rs.school/js/');
        footerRssLink.getElement().setAttribute('target', '_blank');
        footerRssLink.getElement().setAttribute('rel', 'noopener noreferrer');
        this.viewElementCreator.addInnerElement(footerRssLink);
        const rssImage = new element_creator_1.ElementCreator('img', 'footer__link-image', '');
        rssImage.getElement().setAttribute('src', '../../../../assets/images/rs_school_js.svg');
        footerRssLink.addInnerElement(rssImage);
        const teamText = new element_creator_1.ElementCreator('div', 'footer__text-team', 'Developed by New World Disorder');
        this.viewElementCreator.addInnerElement(teamText);
        const yearText = new element_creator_1.ElementCreator('div', 'footer__text-year', '2023');
        this.viewElementCreator.addInnerElement(yearText);
    }
}
exports["default"] = FooterView;


/***/ }),

/***/ "./app/view/header/header-view.ts":
/*!****************************************!*\
  !*** ./app/view/header/header-view.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../utils/element-creator */ "./app/utils/element-creator.ts");
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
const link_view_1 = __importDefault(__webpack_require__(/*! ./link-view */ "./app/view/header/link-view.ts"));
const pages_1 = __webpack_require__(/*! ../../router/pages */ "./app/router/pages.ts");
const authAPI_1 = __webpack_require__(/*! ../../../api/authAPI/authAPI */ "./api/authAPI/authAPI.ts");
const CssClasses = {
    HEADER: 'header',
    NAV: ['header__nav', 'nav'],
    LOGOUT_BUTTON: 'header__logout-button',
    SHOW_LOGOUT_BUTTON: 'show',
    HIDE_LINK_ELEMENT: 'hide',
};
const NamePages = {
    INDEX: 'Main',
    LOGIN: 'Login',
    REGISTRATION: 'Registration',
};
const TEXT = {
    LOGOUT_BUTTON: 'Logout',
};
const KEY_FOR_SAVE = {
    LOGIN_STATUS: 'false',
};
class HeaderView extends view_1.View {
    constructor(router, state) {
        super('header', CssClasses.HEADER);
        this.headerLinkElements = new Map();
        this.logoutButton = null;
        this.configView(router, state);
    }
    configView(router, state) {
        this.addNavigation(router, state);
        this.addLogoutButton(router, state);
    }
    setSelectedItem(namePage) {
        const linkItem = this.headerLinkElements.get(namePage.toUpperCase());
        if (linkItem instanceof link_view_1.default) {
            linkItem.setSelectedStatus();
        }
    }
    customerLogin(state) {
        var _a;
        (_a = this.logoutButton) === null || _a === void 0 ? void 0 : _a.classList.add('show');
        this.hideLoginLink(state);
    }
    hideLoginLink(state) {
        const isLoggedIn = state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
        if (isLoggedIn === 'true') {
            const loginLink = this.headerLinkElements.get('login');
            loginLink === null || loginLink === void 0 ? void 0 : loginLink.getHTMLElement().classList.add(CssClasses.HIDE_LINK_ELEMENT);
        }
    }
    showLogoutButton(state) {
        var _a;
        const isLoggedIn = state.getValue(KEY_FOR_SAVE.LOGIN_STATUS);
        if (isLoggedIn === 'true') {
            (_a = this.logoutButton) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.SHOW_LOGOUT_BUTTON);
        }
    }
    addNavigation(router, state) {
        const creatorNav = new element_creator_1.ElementCreator('nav', CssClasses.NAV);
        Object.keys(NamePages).forEach((key) => {
            const linkParams = {
                name: NamePages[key],
                callback: () => router.navigate(pages_1.Pages[key]),
            };
            const linkElement = new link_view_1.default(linkParams.name, linkParams.callback, this.headerLinkElements);
            creatorNav.addInnerElement(linkElement.getHTMLElement());
            this.headerLinkElements.set(pages_1.Pages[key].toUpperCase(), linkElement);
        });
        this.hideLoginLink(state);
        this.viewElementCreator.addInnerElement(creatorNav);
    }
    addLogoutButton(router, state) {
        const logoutButtonCreator = new element_creator_1.ElementCreator('button', CssClasses.LOGOUT_BUTTON, TEXT.LOGOUT_BUTTON);
        const logoutButtonElement = logoutButtonCreator.getElement();
        this.logoutButton = logoutButtonElement;
        logoutButtonElement.addEventListener('click', this.logoutButtonClickFn.bind(this, router, state));
        this.showLogoutButton(state);
        this.viewElementCreator.addInnerElement(logoutButtonElement);
    }
    logoutButtonClickFn(router, state) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield authAPI_1.AuthAPI.fetchAnonymousToken();
            router.navigate(pages_1.Pages.LOGIN);
            (_a = this.logoutButton) === null || _a === void 0 ? void 0 : _a.classList.remove(CssClasses.SHOW_LOGOUT_BUTTON);
            const loginLink = this.headerLinkElements.get('login');
            loginLink === null || loginLink === void 0 ? void 0 : loginLink.getHTMLElement().classList.remove(CssClasses.HIDE_LINK_ELEMENT);
            state.setValue(KEY_FOR_SAVE.LOGIN_STATUS, 'false');
        });
    }
}
exports["default"] = HeaderView;


/***/ }),

/***/ "./app/view/header/link-view.ts":
/*!**************************************!*\
  !*** ./app/view/header/link-view.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
const CssClasses = {
    ITEM: 'nav__item',
    ITEM_SELECTED: 'nav__item_selected',
};
class LinkView extends view_1.View {
    constructor(text, pageCallback, linkElements) {
        super('a', CssClasses.ITEM, text);
        this.linkElements = linkElements;
        this.pageCallback = pageCallback;
        this.configView();
    }
    setSelectedStatus() {
        this.linkElements.forEach((link) => link.setNotSelectedStatus());
        const element = this.viewElementCreator.getElement();
        element.classList.add(CssClasses.ITEM_SELECTED);
    }
    setNotSelectedStatus() {
        const element = this.viewElementCreator.getElement();
        element.classList.remove(CssClasses.ITEM_SELECTED);
    }
    configView() {
        const element = this.viewElementCreator.getElement();
        element.addEventListener('click', () => {
            this.setSelectedStatus.bind(this);
            this.pageCallback();
        });
    }
}
exports["default"] = LinkView;


/***/ }),

/***/ "./app/view/main/index/index-view.ts":
/*!*******************************************!*\
  !*** ./app/view/main/index/index-view.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const CssClasses = {
    INDEX: 'index',
    TITLE: 'index__title',
};
const TEXT = {
    TITLE: 'ЭТО ГЛАВНАЯ СТРАНИЦА',
};
class IndexView extends view_1.View {
    constructor() {
        super('section', CssClasses.INDEX);
        this.configView();
    }
    configView() {
        const title = new element_creator_1.ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
        this.viewElementCreator.addInnerElement(title);
    }
}
exports["default"] = IndexView;


/***/ }),

/***/ "./app/view/main/login/login-view-types.ts":
/*!*************************************************!*\
  !*** ./app/view/main/login/login-view-types.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KEY_FOR_SAVE = exports.INITIAL_VALUE = exports.TYPE = exports.TEXT = exports.CssClasses = void 0;
exports.CssClasses = {
    TITLE: 'login__title',
    LOGIN: 'login',
    ERROR_LINE: 'login_error-line',
    ERROR_LINE_SHOW: 'show',
    FORM: 'login__form',
    EMAIL_INPUT: 'email',
    PASSWORD_INPUT: 'password',
    INPUT_INVALID: 'invalid',
    LOGIN_BUTTON: ['login__button', 'primary-button'],
    SHOW_HIDE_ICON: ['material-symbols-outlined', 'login__show-hide-icon'],
    REGISTRATION_LINK: ['login__registration-link'],
};
exports.TEXT = {
    TITLE: 'LOGIN',
    ERROR_LINE: 'Incorrect username or password',
    FORM: '',
    EMAIL_INPUT: 'Ел.адрес',
    PASSWORD_INPUT: 'Пароль',
    BUTTON: 'Войти',
    SHOW_HIDE_ICON: {
        VISIBLE: 'visibility',
        VISIBLE_OFF: 'visibility_off',
    },
    REGISTRATION_LINK: 'Зарегистрироваться',
};
exports.TYPE = {
    INPUT_TYPE: {
        EMAIL: 'text',
        PASSWORD: 'password',
        TEXT: 'text',
    },
    BUTTON_TYPE: 'submit',
};
exports.INITIAL_VALUE = {
    INPUT_VALUE: {
        EMAIL: '',
        PASSWORD: '',
    },
    PLACEHOLDER: {
        EMAIL: '',
        PASSWORD: '',
    },
    ERROR_LINE: '',
};
exports.KEY_FOR_SAVE = {
    LOGIN_STATUS: 'false',
};


/***/ }),

/***/ "./app/view/main/login/login-view.ts":
/*!*******************************************!*\
  !*** ./app/view/main/login/login-view.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CustomerAPI_1 = __webpack_require__(/*! ../../../../api/CustomerAPI/CustomerAPI */ "./api/CustomerAPI/CustomerAPI.ts");
const authAPI_1 = __webpack_require__(/*! ../../../../api/authAPI/authAPI */ "./api/authAPI/authAPI.ts");
const pages_1 = __webpack_require__(/*! ../../../router/pages */ "./app/router/pages.ts");
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const input_fields_creator_1 = __importDefault(__webpack_require__(/*! ../../../utils/input-fields-creator */ "./app/utils/input-fields-creator.ts"));
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const login_view_types_1 = __webpack_require__(/*! ./login-view-types */ "./app/view/main/login/login-view-types.ts");
const validator_1 = __webpack_require__(/*! ../../../utils/validator */ "./app/utils/validator.ts");
class LoginView extends view_1.View {
    constructor(router, header, state) {
        super('section', login_view_types_1.CssClasses.LOGIN);
        this.router = router;
        this.header = header;
        this.state = state;
        this.form = null;
        this.errorLine = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.configView();
    }
    configView() {
        this.addTitle();
        this.addErrorLine();
        this.addForm();
        this.configForm();
        this.addRegistrationLink();
    }
    configForm() {
        this.addEmailInput();
        this.addPasswordInput();
        this.addLoginButton();
    }
    addTitle() {
        const titleCreator = new element_creator_1.ElementCreator('h1', login_view_types_1.CssClasses.TITLE, login_view_types_1.TEXT.TITLE);
        this.viewElementCreator.addInnerElement(titleCreator);
    }
    addErrorLine() {
        const errorLineCreator = new element_creator_1.ElementCreator('div', login_view_types_1.CssClasses.ERROR_LINE, login_view_types_1.TEXT.ERROR_LINE);
        const errorLineElement = errorLineCreator.getElement();
        this.errorLine = errorLineElement;
        this.viewElementCreator.addInnerElement(errorLineElement);
    }
    addForm() {
        const formCreator = new element_creator_1.ElementCreator('form', login_view_types_1.CssClasses.FORM, login_view_types_1.TEXT.FORM);
        this.form = formCreator;
        this.viewElementCreator.addInnerElement(formCreator.getElement());
    }
    addEmailInput() {
        var _a;
        const emailInputCreator = new input_fields_creator_1.default(login_view_types_1.CssClasses.LOGIN, login_view_types_1.CssClasses.EMAIL_INPUT, login_view_types_1.TEXT.EMAIL_INPUT, login_view_types_1.INITIAL_VALUE.INPUT_VALUE.EMAIL, login_view_types_1.TYPE.INPUT_TYPE.EMAIL, login_view_types_1.INITIAL_VALUE.PLACEHOLDER.EMAIL);
        const emailInputElement = emailInputCreator.getInputElement();
        this.emailInput = emailInputCreator;
        emailInputElement.addEventListener('input', () => {
            this.inputValidation(emailInputCreator, () => validator_1.Validator.emailField(emailInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(emailInputCreator.getElement());
    }
    addPasswordInput() {
        var _a;
        const passwordInputCreator = new input_fields_creator_1.default(login_view_types_1.CssClasses.LOGIN, login_view_types_1.CssClasses.PASSWORD_INPUT, login_view_types_1.TEXT.PASSWORD_INPUT, login_view_types_1.INITIAL_VALUE.INPUT_VALUE.PASSWORD, login_view_types_1.TYPE.INPUT_TYPE.PASSWORD, login_view_types_1.INITIAL_VALUE.PLACEHOLDER.PASSWORD);
        this.addShowHidePasswordIcon(passwordInputCreator);
        const passwordInputElement = passwordInputCreator.getInputElement();
        this.passwordInput = passwordInputCreator;
        passwordInputElement.addEventListener('input', () => {
            this.inputValidation(passwordInputCreator, () => validator_1.Validator.passwordField(passwordInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(passwordInputCreator.getElement());
    }
    addShowHidePasswordIcon(passwordInputCreator) {
        const showHideIconCreator = new element_creator_1.ElementCreator('span', login_view_types_1.CssClasses.SHOW_HIDE_ICON, login_view_types_1.TEXT.SHOW_HIDE_ICON.VISIBLE);
        showHideIconCreator.getElement().addEventListener('click', this.showHidePasswordFn.bind(this, showHideIconCreator));
        passwordInputCreator.addInnerElement(showHideIconCreator);
    }
    addLoginButton() {
        var _a;
        const loginButtonCreator = new element_creator_1.ElementCreator('button', login_view_types_1.CssClasses.LOGIN_BUTTON, login_view_types_1.TEXT.BUTTON);
        const loginButtonElement = loginButtonCreator.getElement();
        loginButtonElement.setAttribute('type', login_view_types_1.TYPE.BUTTON_TYPE);
        loginButtonElement.addEventListener('click', (e) => this.loginButtonClickFn.call(this, e));
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(loginButtonElement);
    }
    addRegistrationLink() {
        const registrationLinkCreator = new element_creator_1.ElementCreator('a', login_view_types_1.CssClasses.REGISTRATION_LINK, login_view_types_1.TEXT.REGISTRATION_LINK);
        const registrationLinkElement = registrationLinkCreator.getElement();
        registrationLinkElement.addEventListener('click', (e) => this.registrationLinkClickFn.call(this, e));
        this.viewElementCreator.addInnerElement(registrationLinkElement);
    }
    inputKeydownFn() {
        var _a;
        (_a = this.errorLine) === null || _a === void 0 ? void 0 : _a.classList.remove(login_view_types_1.CssClasses.ERROR_LINE_SHOW);
    }
    inputValidation(inputCreator, validatorFn) {
        const inputElement = inputCreator.getInputElement();
        const errorLineElement = inputCreator.getErrorLine();
        const error = validatorFn();
        if (error) {
            inputElement.classList.add(login_view_types_1.CssClasses.INPUT_INVALID);
            errorLineElement.textContent = `${error}`;
            return false;
        }
        inputElement.classList.remove(login_view_types_1.CssClasses.INPUT_INVALID);
        errorLineElement.textContent = login_view_types_1.INITIAL_VALUE.ERROR_LINE;
        return true;
    }
    loginButtonClickFn(event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.emailInput || !this.passwordInput) {
                throw new Error();
            }
            event.preventDefault();
            const isFormsValid = this.isFormsValid.call(this, this.emailInput, this.passwordInput);
            if (!isFormsValid)
                return;
            const email = this.emailInput.getInputElement().value;
            const password = this.passwordInput.getInputElement().value;
            const loginStatusCode = yield CustomerAPI_1.CustomerAPI.loginCustomer(email, password);
            if (loginStatusCode === authAPI_1.AuthStatusCodes.successfulPasswordTokenFetch) {
                console.log(this.router);
                this.router.navigate(pages_1.Pages.INDEX);
                this.state.setValue(login_view_types_1.KEY_FOR_SAVE.LOGIN_STATUS, 'true');
                (_a = this.header) === null || _a === void 0 ? void 0 : _a.customerLogin(this.state);
                yield CustomerAPI_1.CustomerAPI.getCustomerInfo();
            }
            else {
                (_b = this.errorLine) === null || _b === void 0 ? void 0 : _b.classList.add(login_view_types_1.CssClasses.ERROR_LINE_SHOW);
            }
        });
    }
    isFormsValid(emailInputCreator, passwordInputCreator) {
        const isEmailValid = this.inputValidation.call(this, emailInputCreator, () => validator_1.Validator.emailField(emailInputCreator.getInputElement().value));
        const isPasswordValid = this.inputValidation.call(this, passwordInputCreator, () => validator_1.Validator.passwordField(passwordInputCreator.getInputElement().value));
        if (isEmailValid && isPasswordValid) {
            return true;
        }
        return false;
    }
    showHidePasswordFn(showHideIconCreator) {
        var _a, _b;
        const showHideIconElement = showHideIconCreator.getElement();
        if (((_a = this.passwordInput) === null || _a === void 0 ? void 0 : _a.getInputElement().getAttribute('type')) === login_view_types_1.TYPE.INPUT_TYPE.PASSWORD) {
            this.passwordInput.getInputElement().setAttribute('type', login_view_types_1.TYPE.INPUT_TYPE.TEXT);
            showHideIconElement.textContent = login_view_types_1.TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
        }
        else {
            (_b = this.passwordInput) === null || _b === void 0 ? void 0 : _b.getInputElement().setAttribute('type', login_view_types_1.TYPE.INPUT_TYPE.PASSWORD);
            showHideIconElement.textContent = login_view_types_1.TEXT.SHOW_HIDE_ICON.VISIBLE;
        }
    }
    registrationLinkClickFn(event) {
        event.preventDefault();
        this.router.navigate(pages_1.Pages.REGISTRATION);
    }
}
exports["default"] = LoginView;


/***/ }),

/***/ "./app/view/main/main-view.ts":
/*!************************************!*\
  !*** ./app/view/main/main-view.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
const CssClasses = 'main';
class MainView extends view_1.View {
    constructor() {
        super('main', CssClasses);
    }
}
exports["default"] = MainView;


/***/ }),

/***/ "./app/view/main/not-found/not-found-view.ts":
/*!***************************************************!*\
  !*** ./app/view/main/not-found/not-found-view.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const pages_1 = __webpack_require__(/*! ../../../router/pages */ "./app/router/pages.ts");
class NotFoundView extends view_1.View {
    constructor(router) {
        super('section', 'not-found');
        this.router = router;
        this.configView();
    }
    configView() {
        this.addImageBlock();
        this.addTextBlock();
    }
    addImageBlock() {
        const imageBlock = new element_creator_1.ElementCreator('div', 'not-found__image-block', '');
        this.viewElementCreator.addInnerElement(imageBlock);
        const image = new element_creator_1.ElementCreator('img', 'not-found__image-block-img', '');
        image.getElement().setAttribute('src', '../../../../assets/images/error-404.png');
        imageBlock.addInnerElement(image);
    }
    addTextBlock() {
        const textBlock = new element_creator_1.ElementCreator('div', 'not-found__text', '');
        this.viewElementCreator.addInnerElement(textBlock);
        const header = new element_creator_1.ElementCreator('h1', 'not-found__text__head', 'Error 404');
        textBlock.addInnerElement(header);
        const textL = new element_creator_1.ElementCreator('div', 'not-found__text-l', 'Page Not Found');
        textBlock.addInnerElement(textL);
        const textM = new element_creator_1.ElementCreator('div', 'not-found__text-m', 'We broke something!');
        textBlock.addInnerElement(textM);
        const textS = new element_creator_1.ElementCreator('div', 'not-found__text-s', 'Or you did...');
        textBlock.addInnerElement(textS);
        const registrationLinkCreator = new element_creator_1.ElementCreator('a', 'not-found__text-link', 'Back to main');
        const registrationLinkElement = registrationLinkCreator.getElement();
        registrationLinkElement.addEventListener('click', (e) => this.registrationLinkClickFn.call(this, e));
        textBlock.addInnerElement(registrationLinkElement);
    }
    registrationLinkClickFn(event) {
        event.preventDefault();
        this.router.navigate(pages_1.Pages.INDEX);
    }
}
exports["default"] = NotFoundView;


/***/ }),

/***/ "./app/view/main/registration/registration-view-types.ts":
/*!***************************************************************!*\
  !*** ./app/view/main/registration/registration-view-types.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INITIAL_VALUE = exports.TYPE = exports.SIGN_UP_TEXT = exports.SIGN_UP_CLASSES = void 0;
exports.SIGN_UP_CLASSES = {
    REGISTRATION: 'registration',
    TITLE: 'registration__title',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm-password',
    FIRST_NAME: 'first-name',
    LAST_NAME: 'last-name',
    DATE_OF_BIRTH: 'date-of-birth',
    CITY: 'city',
    STREET: 'street',
    POSTAL_CODE: 'postal-code',
    COUNTRY: 'country',
    ERROR_LINE: 'error',
    REGISTER_BTN: 'primary-button',
    LOGIN_BTN: 'primary-button',
    SHOW_HIDE_ICON: ['material-symbols-outlined', 'registration__show-hide-icon'],
    SET_DEFAULT_ADDRESS: 'set-default',
    INPUT_INVALID: 'invalid',
    ERROR_LINE_SHOW: 'show',
};
exports.SIGN_UP_TEXT = {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    DATE_OF_BIRTH: 'Date of Birth',
    CITY: 'City',
    STREET: 'Street',
    POSTAL_CODE: 'Postal Code',
    COUNTRY: 'Country',
    TITLE: 'Sign Up',
    REGISTER_BTN: 'Create Account',
    LOGIN_BTN: 'Login',
    ERROR_LINE: '',
    SET_DEFAULT_ADDRESS: 'Set Default Address',
    SHOW_HIDE_ICON: {
        VISIBLE: 'visibility',
        VISIBLE_OFF: 'visibility_off',
    },
};
exports.TYPE = {
    INPUT_TYPE: {
        EMAIL: 'email',
        PASSWORD: 'password',
        TEXT: 'text',
    },
    BUTTON_TYPE: 'submit',
};
exports.INITIAL_VALUE = {
    INPUT_VALUE: {
        EMAIL: '',
        PASSWORD: '',
    },
    PLACEHOLDER: {
        EMAIL: '',
        PASSWORD: '',
    },
    ERROR_LINE: '',
};


/***/ }),

/***/ "./app/view/main/registration/registration-view.ts":
/*!*********************************************************!*\
  !*** ./app/view/main/registration/registration-view.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CustomerAPI_1 = __webpack_require__(/*! ../../../../api/CustomerAPI/CustomerAPI */ "./api/CustomerAPI/CustomerAPI.ts");
const authAPI_1 = __webpack_require__(/*! ../../../../api/authAPI/authAPI */ "./api/authAPI/authAPI.ts");
const pages_1 = __webpack_require__(/*! ../../../router/pages */ "./app/router/pages.ts");
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const input_fields_creator_1 = __importDefault(__webpack_require__(/*! ../../../utils/input-fields-creator */ "./app/utils/input-fields-creator.ts"));
const validator_1 = __webpack_require__(/*! ../../../utils/validator */ "./app/utils/validator.ts");
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const registration_view_types_1 = __webpack_require__(/*! ./registration-view-types */ "./app/view/main/registration/registration-view-types.ts");
class RegistrationView extends view_1.View {
    constructor(router) {
        super('section', registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION);
        this.router = router;
        this.form = null;
        this.btnsWrapper = null;
        this.firstNameInput = null;
        this.lastNameInput = null;
        this.dateOfBirthInput = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.confirmPasswordInput = null;
        this.shippingAddressFieldSet = null;
        this.billingAddressFieldSet = null;
        this.cityShippingAddressInput = null;
        this.streetShippingAddressInput = null;
        this.postalCodeShippingAddressInput = null;
        this.countryShippingAddressInput = null;
        this.defaultShippingAddressInput = null;
        this.cityBillingAddressInput = null;
        this.streetBillingAddressInput = null;
        this.postalCodeBillingAddressInput = null;
        this.countryBillingAddressInput = null;
        this.defaultBillingAddressInput = null;
        this.errorLine = null;
        this.configView();
    }
    configView() {
        this.addTitle();
        this.addForm();
        this.configForm();
    }
    addTitle() {
        const title = new element_creator_1.ElementCreator('h1', registration_view_types_1.SIGN_UP_CLASSES.TITLE, registration_view_types_1.SIGN_UP_TEXT.TITLE);
        this.viewElementCreator.addInnerElement(title);
    }
    addForm() {
        var _a;
        this.form = new element_creator_1.ElementCreator('form', 'registration__form');
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.getElement().addEventListener('submit', (event) => this.handleSubmit(event));
        this.viewElementCreator.addInnerElement(this.form.getElement());
    }
    configForm() {
        this.addFirstNameInput();
        this.addLastNameInput();
        this.addDateOfBirthInput();
        this.addEmailInput();
        this.addPasswordInput();
        this.addConfirmPasswordInput();
        this.addShippingFieldSet();
        this.addAddressInput(this.shippingAddressFieldSet, 'shipping');
        this.addCopyButton();
        this.addBillingFieldSet();
        this.addAddressInput(this.billingAddressFieldSet, 'billing');
        this.addErrorLine();
        this.addControlButtons();
    }
    addFirstNameInput() {
        var _a;
        const firstNameInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.FIRST_NAME, registration_view_types_1.SIGN_UP_TEXT.FIRST_NAME, '', 'text', '');
        const firstNameInputElement = firstNameInputCreator.getInputElement();
        this.firstNameInput = firstNameInputElement;
        firstNameInputElement.addEventListener('input', () => {
            this.inputValidation(firstNameInputCreator, () => validator_1.Validator.nameField(firstNameInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(firstNameInputCreator.getElement());
    }
    addLastNameInput() {
        var _a;
        const lastNameInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.LAST_NAME, registration_view_types_1.SIGN_UP_TEXT.LAST_NAME, '', 'text', '');
        const lastNameInputElement = lastNameInputCreator.getInputElement();
        this.lastNameInput = lastNameInputElement;
        lastNameInputElement.addEventListener('input', () => {
            this.inputValidation(lastNameInputCreator, () => validator_1.Validator.nameField(lastNameInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(lastNameInputCreator.getElement());
    }
    addDateOfBirthInput() {
        var _a;
        const dateOfBirthInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.DATE_OF_BIRTH, registration_view_types_1.SIGN_UP_TEXT.DATE_OF_BIRTH, '', 'date', '');
        const dateOfBirthInputElement = dateOfBirthInputCreator.getInputElement();
        this.dateOfBirthInput = dateOfBirthInputElement;
        dateOfBirthInputElement.addEventListener('input', () => {
            this.inputValidation(dateOfBirthInputCreator, () => validator_1.Validator.birthField(dateOfBirthInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(dateOfBirthInputCreator.getElement());
    }
    addEmailInput() {
        var _a;
        const emailInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.EMAIL, registration_view_types_1.SIGN_UP_TEXT.EMAIL, '', 'email', '');
        const emailInputElement = emailInputCreator.getInputElement();
        this.emailInput = emailInputElement;
        emailInputElement.addEventListener('input', () => {
            this.inputValidation(emailInputCreator, () => validator_1.Validator.emailField(emailInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(emailInputCreator.getElement());
    }
    addPasswordInput() {
        var _a;
        const passwordInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.PASSWORD, registration_view_types_1.SIGN_UP_TEXT.PASSWORD, '', 'password', '');
        const passwordInputElement = passwordInputCreator.getInputElement();
        this.passwordInput = passwordInputElement;
        this.addShowHidePasswordIcon(this.passwordInput, passwordInputCreator);
        passwordInputElement.addEventListener('input', () => {
            this.inputValidation(passwordInputCreator, () => validator_1.Validator.passwordField(passwordInputElement.value));
            this.inputKeydownFn();
        });
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(passwordInputCreator.getElement());
    }
    addConfirmPasswordInput() {
        var _a, _b;
        const confirmPasswordInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.CONFIRM_PASSWORD, registration_view_types_1.SIGN_UP_TEXT.CONFIRM_PASSWORD, '', 'password', '');
        const confirmPasswordInputElement = confirmPasswordInputCreator.getInputElement();
        const passwordValue = (_a = this.passwordInput) === null || _a === void 0 ? void 0 : _a.value;
        this.confirmPasswordInput = confirmPasswordInputElement;
        this.addShowHidePasswordIcon(this.confirmPasswordInput, confirmPasswordInputCreator);
        confirmPasswordInputElement.addEventListener('input', () => {
            if (passwordValue !== undefined) {
                this.inputValidation(confirmPasswordInputCreator, () => validator_1.Validator.confirmPasswordField(confirmPasswordInputElement.value, passwordValue));
                this.inputKeydownFn();
            }
        });
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.addInnerElement(confirmPasswordInputCreator.getElement());
    }
    addShowHidePasswordIcon(passwordInput, passwordInputCreator) {
        const showHideIconCreator = new element_creator_1.ElementCreator('span', registration_view_types_1.SIGN_UP_CLASSES.SHOW_HIDE_ICON, registration_view_types_1.SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE);
        showHideIconCreator
            .getElement()
            .addEventListener('click', this.showHidePasswordFn.bind(this, passwordInput, showHideIconCreator));
        passwordInputCreator.addInnerElement(showHideIconCreator);
    }
    addAddressInput(wrapper, type) {
        if (wrapper) {
            this.addCityAddressInput(wrapper, type);
            this.addStreetAddressInput(wrapper, type);
            this.addPostalCodeAddressInput(wrapper, type);
            this.addCountryAddressInput(wrapper, type);
            this.addDefaultCheckbox(wrapper, type);
        }
    }
    addShippingFieldSet() {
        var _a;
        const fieldSet = new element_creator_1.ElementCreator('fieldset', 'fieldset');
        this.shippingAddressFieldSet = fieldSet;
        const legendFieldSet = new element_creator_1.ElementCreator('legend', 'legend');
        legendFieldSet.getElement().textContent = 'Shipping Address';
        fieldSet.addInnerElement(legendFieldSet);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(fieldSet);
    }
    addBillingFieldSet() {
        var _a;
        const fieldSet = new element_creator_1.ElementCreator('fieldset', 'fieldset');
        this.billingAddressFieldSet = fieldSet;
        const legendFieldSet = new element_creator_1.ElementCreator('legend', 'legend');
        legendFieldSet.getElement().textContent = 'Billing Address';
        fieldSet.addInnerElement(legendFieldSet);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(fieldSet);
    }
    addCityAddressInput(wrapper, type) {
        const cityAddressInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.CITY, registration_view_types_1.SIGN_UP_TEXT.CITY, '', 'text', '');
        const cityAddressInputElement = cityAddressInputCreator.getInputElement();
        if (type === 'shipping') {
            this.cityShippingAddressInput = cityAddressInputElement;
        }
        else if (type === 'billing') {
            this.cityBillingAddressInput = cityAddressInputElement;
        }
        cityAddressInputElement.addEventListener('input', () => {
            this.inputValidation(cityAddressInputCreator, () => validator_1.Validator.cityField(cityAddressInputElement.value));
            this.inputKeydownFn();
        });
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addInnerElement(cityAddressInputCreator.getElement());
    }
    addStreetAddressInput(wrapper, type) {
        const streetAddressInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.STREET, registration_view_types_1.SIGN_UP_TEXT.STREET, '', 'text', '');
        const streetAddressInputElement = streetAddressInputCreator.getInputElement();
        if (type === 'shipping') {
            this.streetShippingAddressInput = streetAddressInputElement;
        }
        else if (type === 'billing') {
            this.streetBillingAddressInput = streetAddressInputElement;
        }
        streetAddressInputElement.addEventListener('input', () => {
            this.inputValidation(streetAddressInputCreator, () => validator_1.Validator.cityField(streetAddressInputElement.value));
            this.inputKeydownFn();
        });
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addInnerElement(streetAddressInputCreator.getElement());
    }
    addPostalCodeAddressInput(wrapper, type) {
        const postalCodeAddressInputCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.POSTAL_CODE, registration_view_types_1.SIGN_UP_TEXT.POSTAL_CODE, '', 'text', '');
        const postalCodeAddressInputElement = postalCodeAddressInputCreator.getInputElement();
        if (type === 'shipping') {
            this.postalCodeShippingAddressInput = postalCodeAddressInputElement;
        }
        else if (type === 'billing') {
            this.postalCodeBillingAddressInput = postalCodeAddressInputElement;
        }
        postalCodeAddressInputElement.addEventListener('input', () => {
            let country = '';
            this.inputValidation(postalCodeAddressInputCreator, () => {
                var _a, _b, _c, _d;
                if (type === 'shipping') {
                    country = (_b = (_a = this.countryShippingAddressInput) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
                }
                else if (type === 'billing') {
                    country = (_d = (_c = this.countryBillingAddressInput) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
                }
                return validator_1.Validator.postalCodeField(postalCodeAddressInputElement.value, country);
            });
            this.inputKeydownFn();
        });
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addInnerElement(postalCodeAddressInputCreator.getElement());
    }
    addCountryAddressInput(wrapper, type) {
        // TODO refactor to separate createSelect method
        const countryOptions = ['USA', 'Russia'];
        const countryValues = ['US', 'RU'];
        const wrapperClasses = ['registration__country-input-wrapper', 'primary-wrapper'];
        const labelClasses = ['registration__country-label', 'primary-label'];
        const selectClasses = ['registration__country-input', 'primary-input'];
        const countryAddressInputWrapper = new element_creator_1.ElementCreator('div', wrapperClasses);
        const countryAddressInputLabel = new element_creator_1.ElementCreator('label', labelClasses);
        countryAddressInputLabel.getElement().textContent = 'Country';
        const countryAddressInputCreator = new element_creator_1.ElementCreator('select', selectClasses);
        for (let i = 0; i < countryOptions.length; i += 1) {
            const option = document.createElement('option');
            option.setAttribute('value', countryValues[i]);
            option.textContent = countryOptions[i];
            countryAddressInputCreator.getElement().appendChild(option);
        }
        countryAddressInputWrapper.addInnerElement(countryAddressInputLabel.getElement());
        countryAddressInputLabel.addInnerElement(countryAddressInputCreator.getElement());
        const countryAddressInputElement = countryAddressInputCreator.getElement();
        if (type === 'shipping') {
            this.countryShippingAddressInput = countryAddressInputElement;
        }
        else if (type === 'billing') {
            this.countryBillingAddressInput = countryAddressInputElement;
        }
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addInnerElement(countryAddressInputWrapper.getElement());
    }
    addDefaultCheckbox(wrapper, type) {
        var _a;
        const defaultAddressCheckboxCreator = new input_fields_creator_1.default(registration_view_types_1.SIGN_UP_CLASSES.REGISTRATION, registration_view_types_1.SIGN_UP_CLASSES.SET_DEFAULT_ADDRESS, registration_view_types_1.SIGN_UP_TEXT.SET_DEFAULT_ADDRESS, '', 'checkbox', '');
        const defaultShippingAddressInputElement = defaultAddressCheckboxCreator.getInputElement();
        if (type === 'shipping') {
            this.defaultShippingAddressInput = defaultShippingAddressInputElement;
        }
        else if (type === 'billing') {
            this.defaultBillingAddressInput = defaultShippingAddressInputElement;
        }
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addInnerElement(defaultAddressCheckboxCreator.getElement());
        const checkbox = (_a = defaultAddressCheckboxCreator.getElement().firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
        console.log(checkbox);
        checkbox.classList.remove('primary-input');
    }
    addErrorLine() {
        var _a;
        const errorLineCreator = new element_creator_1.ElementCreator('div', registration_view_types_1.SIGN_UP_CLASSES.ERROR_LINE, registration_view_types_1.SIGN_UP_TEXT.ERROR_LINE);
        const errorLineElement = errorLineCreator.getElement();
        this.errorLine = errorLineElement;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(errorLineElement);
    }
    addControlButtons() {
        var _a, _b, _c;
        this.btnsWrapper = new element_creator_1.ElementCreator('div', 'form-buttons');
        (_a = this.btnsWrapper) === null || _a === void 0 ? void 0 : _a.addInnerElement(this.addRegisterButton());
        (_b = this.btnsWrapper) === null || _b === void 0 ? void 0 : _b.addInnerElement(this.addLoginButton());
        (_c = this.form) === null || _c === void 0 ? void 0 : _c.addInnerElement(this.btnsWrapper.getElement());
    }
    addRegisterButton() {
        const registerBtn = new element_creator_1.ElementCreator('button', registration_view_types_1.SIGN_UP_CLASSES.REGISTER_BTN, registration_view_types_1.SIGN_UP_TEXT.REGISTER_BTN);
        registerBtn.getElement().setAttribute('type', 'submit');
        return registerBtn;
    }
    addLoginButton() {
        const loginBtn = new element_creator_1.ElementCreator('button', registration_view_types_1.SIGN_UP_CLASSES.LOGIN_BTN, registration_view_types_1.SIGN_UP_TEXT.LOGIN_BTN);
        loginBtn.getElement().setAttribute('type', 'button');
        loginBtn.getElement().addEventListener('click', () => this.router.navigate(pages_1.Pages.LOGIN));
        return loginBtn;
    }
    addCopyButton() {
        var _a;
        const copyBtn = new element_creator_1.ElementCreator('button', 'copy', 'Set as Billing Address');
        copyBtn.getElement().setAttribute('type', 'button');
        copyBtn.getElement().addEventListener('click', this.copyShippingAddressToBillingAddress.bind(this));
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addInnerElement(copyBtn);
    }
    // TODO refactor, this is horrible
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = this.getFormData();
            const allErrors = document.querySelectorAll('.primary-error-line');
            let allEmpty = true;
            allErrors.forEach((errorElement) => {
                var _a;
                if (((_a = errorElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== '') {
                    allEmpty = false;
                    return '';
                }
                return '';
            });
            if (this.errorLine) {
                if (allEmpty) {
                    yield CustomerAPI_1.CustomerAPI.registerCustomer(formData);
                    yield authAPI_1.AuthAPI.fetchPasswordToken(formData.email, formData.password);
                    yield CustomerAPI_1.CustomerAPI.getCustomerInfo();
                    yield CustomerAPI_1.CustomerAPI.loginCustomer(formData.email, formData.password);
                    this.router.navigate(pages_1.Pages.INDEX);
                }
                else {
                    this.errorLine.textContent = 'Fix all errors';
                }
            }
        });
    }
    copyShippingAddressToBillingAddress() {
        var _a, _b, _c, _d;
        const cityValue = (_a = this.cityShippingAddressInput) === null || _a === void 0 ? void 0 : _a.value;
        const streetValue = (_b = this.streetShippingAddressInput) === null || _b === void 0 ? void 0 : _b.value;
        const postalCodeValue = (_c = this.postalCodeShippingAddressInput) === null || _c === void 0 ? void 0 : _c.value;
        const countryValue = (_d = this.countryShippingAddressInput) === null || _d === void 0 ? void 0 : _d.value;
        if (cityValue !== undefined && this.cityBillingAddressInput !== null) {
            this.cityBillingAddressInput.value = cityValue;
            this.cityBillingAddressInput.focus();
            this.cityBillingAddressInput.blur();
        }
        if (streetValue !== undefined && this.streetBillingAddressInput !== null) {
            this.streetBillingAddressInput.value = streetValue;
            this.streetBillingAddressInput.focus();
            this.streetBillingAddressInput.blur();
        }
        if (postalCodeValue !== undefined && this.postalCodeBillingAddressInput !== null) {
            this.postalCodeBillingAddressInput.value = postalCodeValue;
            this.postalCodeBillingAddressInput.focus();
            this.postalCodeBillingAddressInput.blur();
        }
        if (countryValue !== undefined && this.countryBillingAddressInput !== null) {
            this.countryBillingAddressInput.value = countryValue;
        }
    }
    showHidePasswordFn(passwordInput, showHideIconCreator) {
        const showHideIconElement = showHideIconCreator.getElement();
        if (passwordInput.getAttribute('type') === registration_view_types_1.TYPE.INPUT_TYPE.PASSWORD) {
            passwordInput.setAttribute('type', registration_view_types_1.TYPE.INPUT_TYPE.TEXT);
            showHideIconElement.textContent = registration_view_types_1.SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE_OFF;
        }
        else {
            passwordInput.setAttribute('type', registration_view_types_1.TYPE.INPUT_TYPE.PASSWORD);
            showHideIconElement.textContent = registration_view_types_1.SIGN_UP_TEXT.SHOW_HIDE_ICON.VISIBLE;
        }
    }
    getAddressFormData(inputType) {
        var _a, _b, _c, _d;
        let cityInput;
        let streetInput;
        let postalCodeInput;
        let countryInput;
        if (inputType === 'Shipping') {
            cityInput = this.cityShippingAddressInput;
            streetInput = this.streetShippingAddressInput;
            postalCodeInput = this.postalCodeShippingAddressInput;
            countryInput = this.countryShippingAddressInput;
        }
        else if (inputType === 'Billing') {
            cityInput = this.cityBillingAddressInput;
            streetInput = this.streetBillingAddressInput;
            postalCodeInput = this.postalCodeBillingAddressInput;
            countryInput = this.countryBillingAddressInput;
        }
        return {
            country: (_a = countryInput === null || countryInput === void 0 ? void 0 : countryInput.value) !== null && _a !== void 0 ? _a : '',
            streetName: (_b = streetInput === null || streetInput === void 0 ? void 0 : streetInput.value) !== null && _b !== void 0 ? _b : '',
            postalCode: (_c = postalCodeInput === null || postalCodeInput === void 0 ? void 0 : postalCodeInput.value) !== null && _c !== void 0 ? _c : '',
            city: (_d = cityInput === null || cityInput === void 0 ? void 0 : cityInput.value) !== null && _d !== void 0 ? _d : '',
        };
    }
    getShippingAddressFormData() {
        return this.getAddressFormData('Shipping');
    }
    getBillingAddressFormData() {
        return this.getAddressFormData('Billing');
    }
    getFormData() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const formEmail = (_b = (_a = this.emailInput) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        const formPassword = (_d = (_c = this.passwordInput) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
        const formFirstName = (_f = (_e = this.firstNameInput) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
        const formLastName = (_h = (_g = this.lastNameInput) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '';
        const formDateOfBirth = (_k = (_j = this.dateOfBirthInput) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : '';
        const shippingAddress = this.getShippingAddressFormData();
        const billingAddress = this.getBillingAddressFormData();
        const formData = {
            email: formEmail,
            password: formPassword,
            firstName: formFirstName,
            lastName: formLastName,
            dateOfBirth: formDateOfBirth,
            addresses: [shippingAddress, billingAddress],
        };
        if ((_l = this.defaultShippingAddressInput) === null || _l === void 0 ? void 0 : _l.checked) {
            formData.defaultShippingAddress = 0;
        }
        if ((_m = this.defaultBillingAddressInput) === null || _m === void 0 ? void 0 : _m.checked) {
            formData.defaultBillingAddress = 1;
        }
        return formData;
    }
    inputValidation(inputCreator, validatorFn) {
        const inputElement = inputCreator.getInputElement();
        const errorLineElement = inputCreator.getErrorLine();
        const error = validatorFn();
        if (error) {
            inputElement.classList.add(registration_view_types_1.SIGN_UP_CLASSES.INPUT_INVALID);
            errorLineElement.textContent = `${error}`;
            return false;
        }
        inputElement.classList.remove(registration_view_types_1.SIGN_UP_CLASSES.INPUT_INVALID);
        errorLineElement.textContent = registration_view_types_1.INITIAL_VALUE.ERROR_LINE;
        return true;
    }
    inputKeydownFn() {
        var _a;
        (_a = this.errorLine) === null || _a === void 0 ? void 0 : _a.classList.remove(registration_view_types_1.SIGN_UP_CLASSES.ERROR_LINE_SHOW);
    }
}
exports["default"] = RegistrationView;


/***/ }),

/***/ "./app/view/view.ts":
/*!**************************!*\
  !*** ./app/view/view.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
const element_creator_1 = __webpack_require__(/*! ../utils/element-creator */ "./app/utils/element-creator.ts");
class View {
    constructor(tag, classNames, textContent) {
        this.viewElementCreator = this.createView(tag, classNames, textContent);
    }
    createView(tag, classNames, textContent) {
        const elementCreator = new element_creator_1.ElementCreator(tag, classNames, textContent);
        return elementCreator;
    }
    getHTMLElement() {
        return this.viewElementCreator.getElement();
    }
    setContent(view) {
        const currentElement = this.viewElementCreator.getElement();
        const element = view.getHTMLElement();
        this.removeContent(currentElement);
        this.viewElementCreator.addInnerElement(element);
    }
    // TODO добавить addContent
    removeContent(element) {
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }
}
exports.View = View;


/***/ }),

/***/ "./app/view/wrapper.ts":
/*!*****************************!*\
  !*** ./app/view/wrapper.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const view_1 = __webpack_require__(/*! ./view */ "./app/view/view.ts");
const CssClasses = ['wrapper'];
class WrapperView extends view_1.View {
    constructor() {
        super('div', CssClasses);
    }
}
exports["default"] = WrapperView;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./assets/sass/main.scss */ "./assets/sass/main.scss");
const app_1 = __importDefault(__webpack_require__(/*! ./app/app */ "./app/app.ts"));
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const app = new app_1.default();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map