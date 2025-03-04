"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function activate(context) {
    console.log('In activate!! \n');
    context.subscriptions.push(vscode.commands.registerCommand('demo-routing.openHome', () => {
        console.log('Command demo-routing.openHome executed');
        WebviewPanel.createOrShow(context.extensionPath, 'home');
    }), vscode.commands.registerCommand('demo-routing.openAbout', () => {
        console.log('Command demo-routing.openAbout executed');
        WebviewPanel.createOrShow(context.extensionPath, 'about');
    }));
}
exports.activate = activate;
class WebviewPanel {
    static createOrShow(extensionPath, view) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        console.log("In Webview panel \n view is: " + view + "\n extension path: " + extensionPath + "\n");
        console.log("Joined path: " + path.join(extensionPath) + "/dist/out-tsc/ext-src\n");
        if (WebviewPanel.currentPanel) {
            WebviewPanel.currentPanel._panel.reveal(column);
            WebviewPanel.currentPanel.update(view);
            console.log("Current panel: " + WebviewPanel.currentPanel + "\n");
            return;
        }
        const panel = vscode.window.createWebviewPanel('angular', 'Webview Navigation', column || vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extensionPath, '/dist/out-tsc/ext-src'))]
        });
        console.log("panel: " + panel + "\n path:" + extensionPath + "\n view:" + view + "\n");
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
        if (view === 'home') {
            this._panel.title = 'home';
        }
        else {
            this._panel.title = 'about';
        }
        //this._panel.title = view === 'home' ? 'about' : 'home';
        console.log("Webview title: " + this._panel.title + "\nActual view: " + view + "\n");
        const webviewHtml = this.getWebviewContent(view);
        this._panel.webview.html = webviewHtml;
    }
    getWebviewContent(view) {
        // const appDistPath = path.join(this._extensionPath, 'dist');
        // const appIndexPath = path.join(appDistPath, 'index.html');
        // let html = fs.readFileSync(appIndexPath, 'utf8');
        // html = html.replace('<base href="/">', '<base href="${vscode.Uri.file(appDistPath).with({ scheme: \'vscode-resource\' })}/">');
        // html = html.replace('</head>', `
        //   <script>
        //     window.initialView = '${view}';
        //     window.acquireVsCodeApi = acquireVsCodeApi;
        //   </script>
        //   </head>
        // `);
        // return html;
        // path to dist folder
        const appDistPath = path.join(this._extensionPath, "dist");
        const appDistPathUri = vscode.Uri.file(appDistPath);
        // path as uri
        const baseUri = this._panel.webview.asWebviewUri(appDistPathUri);
        // get path to index.html file from dist folder
        const indexPath = path.join(appDistPath, "index.html");
        // read index file from file system
        let indexHtml = fs.readFileSync(indexPath, { encoding: "utf8" });
        // update the base URI tag
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);
        return indexHtml;
    }
}
//# sourceMappingURL=extension.js.map