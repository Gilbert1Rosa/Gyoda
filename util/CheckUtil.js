const checkProperties = (obj, properties) => {
    var hasAllProperties = new Boolean(obj && properties);
    if (hasAllProperties) {
        hasAllProperties = getMissingProperties(obj, properties).length === 0;
    }
    return hasAllProperties;
}

const getMissingProperties = (obj, properties) => {
    return properties.filter(property => {
        return !(property in obj);
    });
}

module.exports.checkProperties = checkProperties;
module.exports.getMissingProperties = getMissingProperties;