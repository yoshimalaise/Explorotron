import { Component } from '@angular/core';
import { PluginCommandService } from './services/plugin-command.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pluginCommandService: PluginCommandService, public state: StateService) {
    
  }
}
