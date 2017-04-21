import {getFirstIssues, getSecondIssues} from './api/getData';

export function loadFirstIssues() {
    return {
        type: 'PROMISE',
        actions: ['ISSUES_LOADED', 'ISSUES_LOAD_FAILURE'],
        promise: getFirstIssues()
    };
}

export function loadSecondIssues() {
    return {
        type: 'PROMISE',
        actions: ['ISSUES_LOADED', 'ISSUES_LOAD_FAILURE'],
        promise: getSecondIssues()
    };
}