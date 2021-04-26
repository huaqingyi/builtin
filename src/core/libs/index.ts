export * from './vuex';
export * from './sysort';

/**
 * TODO: this function only use for vscode link translate file . don't has more realization .
 * @param translateKey translate key
 * @returns translate key
 */
export function t(translateKey: string) {
    return translateKey;
}
