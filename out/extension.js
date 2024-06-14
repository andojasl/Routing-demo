"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.OpenHome', () => {
        WebviewPanel.createOrShow(context.extensionPath, 'Home');
    }), vscode.commands.registerCommand('extension.openAbout', () => {
        WebviewPanel.createOrShow(context.extensionPath, 'About');
    }));
}
exports.activate = activate;
class WebviewPanel {
    static createOrShow(extensionPath, view) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (WebviewPanel.currentPanel) {
            WebviewPanel.currentPanel._panel.reveal(column);
            WebviewPanel.currentPanel.update(view);
            return;
        }
        const panel = vscode.window.createWebviewPanel('webviewNavigation', 'Webview Navigation', column || vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'webview-navigation/dist/webview-navigation'))]
        });
        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionPath, view);
    }
    constructor(panel, extensionPath, view) {
        this._panel = panel;
        this._extensionPath = extensionPath;
        this.update(view);
        this._panel.onDidDispose(() => this.dispose(), null, []);
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'navigate':
                    WebviewPanel.createOrShow(this._extensionPath, message.view);
                    return;
            }
        }, null, []);
    }
    dispose() {
        WebviewPanel.currentPanel = undefined;
    }
    update(view) {
        this._panel.title = view === 'home' ? 'home' : 'about';
        const webviewHtml = this.getWebviewContent(view);
        this._panel.webview.html = webviewHtml;
    }
    getWebviewContent(view) {
        const appDistPath = path.join(this._extensionPath, 'webview-navigation', 'dist', 'webview-navigation');
        const appIndexPath = path.join(appDistPath, 'index.html');
        let html = fs.readFileSync(appIndexPath, 'utf8');
        html = html.replace('<base href="/">', '<base href="${vscode.Uri.file(appDistPath).with({ scheme: \'vscode-resource\' })}/">');
        html = html.replace('</head>', `
      <script>
        window.initialView = '${view}';
        window.acquireVsCodeApi = acquireVsCodeApi;
      </script>
      </head>
    `);
        return html;
    }
}
