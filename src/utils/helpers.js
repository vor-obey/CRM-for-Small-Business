export const addParamsToUrl = (urlPath, params = {}) =>{
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
    return data.filter((item) => {
        const keys = Object.keys(params);
        const values = Object.values(params);

        for (let i = 0; i <= keys.length; i++) {
            if (Object.prototype.hasOwnProperty.call(values, i)) {
                let value = item[keys[i]];
                let param = params[keys[i]];

                if (value.firstName) {
                    return value.firstName.toLowerCase().indexOf(params.toLowerCase()) !== -1;
                }

                if (typeof value === 'number') {
                    value = value.toString();
                }

                if (typeof param === 'number') {
                    param = param.toString();
                }

                if (value !== param) {
                    return false;
                }
            }
        }

        return true;
    });
};
