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


export const filter = (data, params, nestedObjectsKeys, additionalKey) => {
    const keys = data[0] ? Object.keys(data[0]) : [];
    return data.filter((item) => {

        if (typeof item[additionalKey] === 'number') {
            return item[additionalKey].toString() === params;
        }

        return keys.some(key => {
            const property = item[key];

            if (property === null) {
                return false;
            }

            if (!Array.isArray(property) && typeof property === "object" && nestedObjectsKeys && nestedObjectsKeys.includes(key)) {
                for (let propertyKey in property) {
                    if (property.hasOwnProperty(propertyKey) && property[propertyKey].toString().toLowerCase().indexOf(params.toLowerCase().toString()) !== -1) {
                        return true;
                    }
                }
            }

            return property.toString().toLowerCase().indexOf(params.toLowerCase().toString()) !== -1;
        });
    });
};
