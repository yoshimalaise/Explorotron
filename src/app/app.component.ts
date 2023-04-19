import { Component } from '@angular/core';
import { PluginCommandService } from './services/plugin-command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VSCode Webview Angular';

  constructor(private pluginCommandService: PluginCommandService) {

  }
}
