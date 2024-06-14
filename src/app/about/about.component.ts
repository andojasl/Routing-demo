import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  navigateTo(view: string) {
    console.log("Navigating from about... \n");
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

