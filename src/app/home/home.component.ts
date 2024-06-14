import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [AboutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  navigateTo(view: string) {
    console.log("Navigating from home... \n");
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', view });
  }
}

