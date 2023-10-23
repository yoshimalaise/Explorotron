import * as vscode from 'vscode';
import { BaseController } from './base-controller';
import { WebPanel } from '../extension';
import { PersonalProfile, UserActionType } from '../personal-profile/model/personal-profile.interface';

// We will use the memento VSCOde api to survive extention and vscode updates
export class PersonalProfileController extends BaseController {
    private profile: PersonalProfile;
    private ctx: vscode.ExtensionContext;

    constructor(view: vscode.Webview, extentionPath: string) {
        super(view);
        this.ctx = WebPanel.context as vscode.ExtensionContext;
        this.profile = { actions: [], lensUsageCounter: {}};
        this.initializeDB();
    }


    private initializeDB() {
        const p = this.ctx.globalState.get<PersonalProfile>('profile');
        if (!p) {
            this.profile = { actions: [], lensUsageCounter: {}};
            this.saveDB()
        } else {
            this.profile = p;
        }
    }

    private deleteDB() {
        this.ctx.globalState.update('profile', { actions: [], lensUsageCounter: {}});
    }

    private saveDB() {
        this.ctx.globalState.update('profile', this.profile);
    }

    private registerLenseUse(lensId: string) {
        let ctr = this.profile.lensUsageCounter[lensId] ?? 0;
        this.profile.lensUsageCounter[lensId] = ctr++;
        this.profile.actions.push({
            actionType: UserActionType.OPEN_LENS,
            timeStamp: (new Date()).toISOString()
        });
        this.saveDB();
    }

}