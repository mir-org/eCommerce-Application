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

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const index_view_1 = __importDefault(__webpack_require__(/*! ./view/main/index/index-view */ "./app/view/main/index/index-view.ts"));
const login_view_1 = __importDefault(__webpack_require__(/*! ./view/main/login/login-view */ "./app/view/main/login/login-view.ts"));
const not_found_view_1 = __importDefault(__webpack_require__(/*! ./view/main/not-found/not-found-view */ "./app/view/main/not-found/not-found-view.ts"));
const registration_view_1 = __importDefault(__webpack_require__(/*! ./view/main/registration/registration-view */ "./app/view/main/registration/registration-view.ts"));
const state_1 = __importDefault(__webpack_require__(/*! ./state/state */ "./app/state/state.ts"));
class App {
    constructor() {
        this.header = null;
        this.main = null;
        const state = new state_1.default();
        const routes = this.createRoutes(state);
        this.router = new router_1.Router(routes);
        this.createView();
    }
    createView() {
        const wrapperView = new wrapper_1.default();
        this.header = new header_view_1.default(this.router);
        this.main = new main_view_1.default();
        const footer = new footer_view_1.default();
        wrapperView
            .getHTMLElement()
            .append(this.header.getHTMLElement(), this.main.getHTMLElement(), footer.getHTMLElement());
        document.body.append(wrapperView.getHTMLElement());
    }
    createRoutes(state) {
        const result = [
            {
                path: ``,
                callback: () => {
                    var _a;
                    (_a = this.main) === null || _a === void 0 ? void 0 : _a.setContent(new index_view_1.default());
                },
            },
            {
                path: `${pages_1.Pages.INDEX}`,
                callback: () => {
                    var _a;
                    (_a = this.main) === null || _a === void 0 ? void 0 : _a.setContent(new index_view_1.default());
                },
            },
            {
                path: `${pages_1.Pages.LOGIN}`,
                callback: () => {
                    var _a;
                    (_a = this.main) === null || _a === void 0 ? void 0 : _a.setContent(new login_view_1.default(state));
                },
            },
            {
                path: `${pages_1.Pages.REGISTRATION}`,
                callback: () => {
                    var _a;
                    (_a = this.main) === null || _a === void 0 ? void 0 : _a.setContent(new registration_view_1.default(state));
                },
            },
            {
                path: `${pages_1.Pages.NOT_FOUND}`,
                callback: () => {
                    var _a;
                    (_a = this.main) === null || _a === void 0 ? void 0 : _a.setContent(new not_found_view_1.default());
                },
            },
        ];
        return result;
    }
    // TODO из-за этого багался колл-стек, разобрать.
    setContent(pageName, view) {
        var _a, _b;
        // TODO или из-за этого.
        (_a = this.header) === null || _a === void 0 ? void 0 : _a.setSelectedItem(pageName);
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
        const test = `путь, ${typeof (route === null || route === void 0 ? void 0 : route.path)}, ${route === null || route === void 0 ? void 0 : route.path}`;
        alert(test);
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
            return window.location.hash.slice(1);
        }
        return window.location.pathname.slice(1);
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
class InputFieldsCreator {
    constructor(classNames, subClassNames, labelTextContent, inputValue, callback, type = 'text') {
        this.element = document.createElement('div');
        this.inputElement = document.createElement('input');
        this.labelElement = document.createElement('label');
        this.setElement(classNames, subClassNames, labelTextContent, type);
        this.setCallback(callback);
        this.setValue(inputValue);
    }
    setElement(classNames, subClassNames, labelTextContent, type) {
        this.setLabelTextContent(labelTextContent);
        this.setCssClasses(classNames, subClassNames);
        this.labelElement.prepend(this.inputElement);
        this.element.append(this.labelElement);
        this.setType(type);
    }
    getElement() {
        return this.element;
    }
    setValue(inputValue) {
        this.inputElement.value = inputValue;
    }
    setCssClasses(classNames, subClassNames) {
        this.element.classList.add(`${classNames}__${subClassNames}-input-wrapper`);
        this.inputElement.classList.add(`${classNames}__${subClassNames}-input`);
        this.labelElement.classList.add(`${classNames}__${subClassNames}-label`);
    }
    setLabelTextContent(text) {
        if (this.labelElement)
            this.labelElement.textContent = text;
    }
    setCallback(callback) {
        this.inputElement.addEventListener('keyup', (event) => callback(event));
    }
    setType(type) {
        this.inputElement.setAttribute('type', type);
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

/***/ "./app/view/footer/footer-view.ts":
/*!****************************************!*\
  !*** ./app/view/footer/footer-view.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
const CssClasses = 'footer';
const TEXT = 'SPA';
class FooterView extends view_1.View {
    constructor() {
        super('footer', CssClasses, TEXT);
    }
}
exports["default"] = FooterView;


/***/ }),

/***/ "./app/view/header/header-view.ts":
/*!****************************************!*\
  !*** ./app/view/header/header-view.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../utils/element-creator */ "./app/utils/element-creator.ts");
const view_1 = __webpack_require__(/*! ../view */ "./app/view/view.ts");
const link_view_1 = __importDefault(__webpack_require__(/*! ./link-view */ "./app/view/header/link-view.ts"));
const pages_1 = __webpack_require__(/*! ../../router/pages */ "./app/router/pages.ts");
const CssClasses = {
    HEADER: 'header',
    NAV: 'header__nav',
};
const NamePages = {
    INDEX: 'Main',
    LOGIN: 'Login',
    REGISTRATION: 'Registration',
};
class HeaderView extends view_1.View {
    constructor(router) {
        super('header', CssClasses.HEADER);
        this.headerLinkElements = new Map();
        this.configView(router);
    }
    configView(router) {
        const creatorNav = new element_creator_1.ElementCreator('nav', CssClasses.NAV);
        Object.keys(NamePages).forEach((key) => {
            const linkParams = {
                name: NamePages[key],
                callback: () => router.navigate(pages_1.Pages[key]),
            };
            const linkElement = new link_view_1.default(linkParams.name, linkParams.callback, this.headerLinkElements);
            creatorNav.addInnerElement(linkElement.getHTMLElement());
            this.headerLinkElements.set(pages_1.Pages[key], linkElement);
        });
        this.viewElementCreator.addInnerElement(creatorNav);
    }
    // TODO удалить?
    setSelectedItem(namePage) {
        const linkComponent = this.headerLinkElements.get(namePage);
        linkComponent === null || linkComponent === void 0 ? void 0 : linkComponent.setSelectedStatus();
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
    ITEM: 'nav-item',
    ITEM_SELECTED: 'nav-item__selected',
};
class LinkView extends view_1.View {
    constructor(text, pageCallback, linkElements) {
        super('a', CssClasses.ITEM, text);
        this.linkElements = linkElements;
        this.pageCallback = pageCallback;
        this.configView();
    }
    // TODO дробануть
    setSelectedStatus() {
        this.linkElements.forEach((link) => link.setNotSelectedStatus());
        const element = this.viewElementCreator.getElement();
        element.classList.add(CssClasses.ITEM_SELECTED);
        this.pageCallback();
    }
    setNotSelectedStatus() {
        const element = this.viewElementCreator.getElement();
        element.classList.remove(CssClasses.ITEM_SELECTED);
    }
    configView() {
        const element = this.viewElementCreator.getElement();
        element.addEventListener('click', this.setSelectedStatus.bind(this));
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

/***/ "./app/view/main/login/login-view.ts":
/*!*******************************************!*\
  !*** ./app/view/main/login/login-view.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const input_fields_creator_1 = __importDefault(__webpack_require__(/*! ../../../utils/input-fields-creator */ "./app/utils/input-fields-creator.ts"));
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const CssClasses = {
    LOGIN: 'login',
    TITLE: 'login__title',
    EMAIL: 'email',
    PASSWORD: 'password',
};
const TEXT = {
    FIELD_TEXT_ONE: 'Ваш мейл',
    FIELD_TEXT_TWO: 'Ваш пароль',
    TITLE: 'ЭТО СТРАНИЦА АВТОРИЗАЦИИ',
};
const KEY_FOR_SAVE = {
    email: 'login__email-input',
    password: 'login__password-input',
};
class LoginView extends view_1.View {
    constructor(state) {
        super('section', CssClasses.LOGIN);
        this.state = state;
        this.configView();
    }
    configView() {
        const title = new element_creator_1.ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
        this.viewElementCreator.addInnerElement(title);
        const emailInput = new input_fields_creator_1.default(CssClasses.LOGIN, CssClasses.EMAIL, TEXT.FIELD_TEXT_ONE, this.state.getValue(KEY_FOR_SAVE.email), (event) => this.keyupHandler(event, KEY_FOR_SAVE.email));
        this.viewElementCreator.addInnerElement(emailInput.getElement());
        const passwordInput = new input_fields_creator_1.default(CssClasses.LOGIN, CssClasses.PASSWORD, TEXT.FIELD_TEXT_TWO, this.state.getValue(KEY_FOR_SAVE.password), (event) => this.keyupHandler(event, KEY_FOR_SAVE.password));
        this.viewElementCreator.addInnerElement(passwordInput.getElement());
    }
    keyupHandler(event, fieldName) {
        if (event.target instanceof HTMLInputElement) {
            this.state.setValue(fieldName, event.target.value);
        }
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
class NotFoundView extends view_1.View {
    constructor() {
        super('section', 'not-found');
        this.configView();
    }
    configView() {
        const title = new element_creator_1.ElementCreator('h1', 'title', 'НЕ НАЙДЕНА');
        this.viewElementCreator.addInnerElement(title);
    }
}
exports["default"] = NotFoundView;


/***/ }),

/***/ "./app/view/main/registration/registration-view.ts":
/*!*********************************************************!*\
  !*** ./app/view/main/registration/registration-view.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const element_creator_1 = __webpack_require__(/*! ../../../utils/element-creator */ "./app/utils/element-creator.ts");
const input_fields_creator_1 = __importDefault(__webpack_require__(/*! ../../../utils/input-fields-creator */ "./app/utils/input-fields-creator.ts"));
const view_1 = __webpack_require__(/*! ../../view */ "./app/view/view.ts");
const CssClasses = {
    REGISTRATION: 'registration',
    TITLE: 'registration__title',
    EMAIL: 'email',
    PASSWORD: 'password',
};
const TEXT = {
    FIELD_TEXT_ONE: 'Ваш мейл',
    FIELD_TEXT_TWO: 'Ваш пароль',
    TITLE: 'ЭТО СТРАНИЦА РЕГИСТРАЦИИ',
};
const KEY_FOR_SAVE = {
    email: 'registration__email-input',
    password: 'registration__password-input',
};
class RegistrationView extends view_1.View {
    constructor(state) {
        super('section', CssClasses.REGISTRATION);
        this.state = state;
        this.configView();
    }
    configView() {
        const title = new element_creator_1.ElementCreator('h1', CssClasses.TITLE, TEXT.TITLE);
        this.viewElementCreator.addInnerElement(title);
        const emailInput = new input_fields_creator_1.default(CssClasses.REGISTRATION, CssClasses.EMAIL, TEXT.FIELD_TEXT_ONE, this.state.getValue(KEY_FOR_SAVE.email), (event) => this.keyupHandler(event, KEY_FOR_SAVE.email));
        this.viewElementCreator.addInnerElement(emailInput.getElement());
        const passwordInput = new input_fields_creator_1.default(CssClasses.REGISTRATION, CssClasses.PASSWORD, TEXT.FIELD_TEXT_TWO, this.state.getValue(KEY_FOR_SAVE.password), (event) => this.keyupHandler(event, KEY_FOR_SAVE.password));
        this.viewElementCreator.addInnerElement(passwordInput.getElement());
    }
    keyupHandler(event, fieldName) {
        if (event.target instanceof HTMLInputElement) {
            this.state.setValue(fieldName, event.target.value);
        }
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