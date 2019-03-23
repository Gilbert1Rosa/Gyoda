const checkProperties = (obj, properties) => {
    var hasAllProperties = obj !== null && obj !== undefined;
    for (property of properties) {
        hasAllProperties = hasAllProperties && (key in obj);
    }
    return hasAllProperties;
}

const getMissingProperties = (obj, properties) => {
    return properties.map((property) => {
        return property in obj;
    });
}

module.exports.checkProperties = checkProperties;
module.exports.getMissingProperties = getMissingProperties;