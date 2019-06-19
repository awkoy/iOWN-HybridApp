export function performResult(res, cb) {
    if (res.success) cb();
    else throw res.payload;
}

export function performDefaultResult(res, type, dispatch) {
    if (res.success) {
        dispatch({
            type,
        });
    } else throw res.payload;
}
