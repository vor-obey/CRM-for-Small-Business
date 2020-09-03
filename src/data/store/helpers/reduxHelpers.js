
export function AsyncState (isLoading = false, isSuccess = false, isError = false) {
    return { isLoading, isSuccess, isError }
}

export const AsyncActions = (actionName) => ([
    `${actionName}`,
    `${actionName}_SUCCESS`,
    `${actionName}_FAIL`,
]);

export const createAction = (type) =>
    (payload = undefined) => ({ type, payload })
