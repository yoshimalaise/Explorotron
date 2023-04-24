import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { CommandType, ExtensionCommand } from '../model/extension-command.interface';
import { StudyTour } from '../model/study-tour.interface';
import { LenseIds } from '../model/lense-ids.enum';

@Injectable({
  providedIn: 'root'
})
export class PluginCommandService {
  /**
   * This class will be injected once into the main app component and handle all messages posted from the vscode extension.
   */
  constructor(private state: StateService) {
    window.addEventListener('message', event => {
      const cmd = event.data as ExtensionCommand
      if (cmd.sourceCode) {
        state.sourceCode = cmd.sourceCode;
      }

      if (cmd.command === CommandType.LOAD_PLUGIN && cmd.lenseId) {
        state.isTour = false;
        state.currentLense = cmd.lenseId;
      }      

      if (cmd.command === CommandType.EDIT_STUDY_TOUR && cmd.tour) {
        state.isTour = false;
        state.studyTour = cmd.tour;
        state.currentLense = LenseIds.EDIT_STUDY_TOUR;
      }
    });
  }
}
