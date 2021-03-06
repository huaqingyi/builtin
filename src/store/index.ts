import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { ITagsViewState } from './modules/tags-view';
import { IErrorLogState } from './modules/error-log';
import { ISettingsState } from './modules/settings';
import { IPermissionState } from './modules/permission';

Vue.use(Vuex);

export interface IRootState {
    app: IAppState;
    tagsView: ITagsViewState;
    errorLog: IErrorLogState;
    settings: ISettingsState;
    permission: IPermissionState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
