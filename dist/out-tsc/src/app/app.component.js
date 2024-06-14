"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const home_component_1 = require("./home/home.component");
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'webview';
    }
};
exports.AppComponent = AppComponent;
exports.AppComponent = AppComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        standalone: true,
        imports: [router_1.RouterOutlet, home_component_1.HomeComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
    })
], AppComponent);
//# sourceMappingURL=app.component.js.map