export const UPDATE_FILTER_VALUE = 'UPDATE_FILTER_VALUE';

export function handleFilter(data: any) {
    return (dispatch: any) => {
        dispatch(updateFilter(data))
    }
}

export function updateFilter(data: any) {
    return {
        type: UPDATE_FILTER_VALUE,
        payload: data
    }
}