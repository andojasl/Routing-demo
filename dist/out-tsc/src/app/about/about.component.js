"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let AboutComponent = class AboutComponent {
    navigateTo(view) {
        console.log("Navigating from about... \n");
        const vscode = acquireVsCodeApi();
        vscode.postMessage({ command: 'navigate', view });
    }
};
exports.AboutComponent = AboutComponent;
exports.AboutComponent = AboutComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-about',
        standalone: true,
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.css']
    })
], AboutComponent);
//# sourceMappingURL=about.component.js.map