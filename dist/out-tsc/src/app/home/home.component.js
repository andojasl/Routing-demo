"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const about_component_1 = require("../about/about.component");
let HomeComponent = class HomeComponent {
    navigateTo(view) {
        console.log("Navigating from home... \n");
        const vscode = acquireVsCodeApi();
        vscode.postMessage({ command: 'navigate', view });
    }
};
exports.HomeComponent = HomeComponent;
exports.HomeComponent = HomeComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        standalone: true,
        selector: 'app-home',
        imports: [about_component_1.AboutComponent],
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
//# sourceMappingURL=home.component.js.map