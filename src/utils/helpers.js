export const addParamsToUrl = (urlPath, params = {}) => {
    let paramCurrentCount = 1;
    let url = urlPath;

    const keys = Object.keys(params).filter(
        key => (typeof params[key] === 'object' && params[key].length > 0)
            || (typeof params[key] === 'string' && params[key] !== '')
            || (typeof params[key] === 'number' && params[key] > 0),
    );

    keys.forEach((key) => {
        if (paramCurrentCount === 1) {
            url += '?';
        }

        url += `${key}=${encodeURIComponent(params[key])}`;

        if (paramCurrentCount !== Object.keys(keys).length) {
            url += '&';
        }

        paramCurrentCount += 1;
    });

    return url;
};


export const filter = (data, params) => {
    const keys = data[0] ? Object.keys(data[0]) : [];
    return data.filter((item) => {
        return keys.some(key => item[key].toString().toLowerCase().indexOf(params.toLowerCase().toString()) !== -1)
    });
};
