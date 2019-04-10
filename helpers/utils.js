let _ = require('underscore'),
    sanitize = require('mongo-sanitize');

module.exports.sanitize = (object) => {
    _.each(object, (value, key) => {
        if (_.isObject(value)) {
            object[key] = sanitize(value);
        }
    })
    return object;
}

module.exports.buildSearchRegex = (text) => {
    let regexString = "",
        terms = text.replace(/[&\/\\#,+(\[\])$~%.'":*?<>{}]/g, c => '\\' + c).split(' ');
    _.each(terms, (term, index) => {
        regexString += term;
        if (index < terms.length - 1) regexString += '|';
    })
    return regexString;
}

module.exports.random = (length) => {
    return Math.random().toString(36).substring(length);
}