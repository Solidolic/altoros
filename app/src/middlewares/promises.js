/**
 * Created by akoz on 17.04.2017.
 */

const middleware = store => next => action => {
    if (action.type !== 'PROMISE'){
        return next(action);
    }
    
    const [successAction, failureAction] = action.actions;
    
    action.promise.then(data => store.dispatch({
        type: successAction,
        data: atob(data.content)
    }), error => store.dispatch({
        type: failureAction,
        error
    }));
};

export default middleware;