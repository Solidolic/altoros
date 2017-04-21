
export function issuesOne(state = [], action){
    switch (action.type){
        case 'ISSUES_LOADED':
            return action.data;
        default:
            return state;
    }
}


export function issuesTwo(state = [], action){
    switch (action.type){
        case 'ISSUES_LOADED':
            return action.data;
        default:
            return state;
    }
}



