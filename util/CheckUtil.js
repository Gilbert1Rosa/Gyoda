const checkProperties = (obj, properties) => {
    var hasAllProperties = true;
    for (property of properties) {
        hasAllProperties = hasAllProperties && (property in obj);
    }
    return hasAllProperties;
}

const getMissingProperties = (obj, properties) => {
    var missingProperties = [];
    for (property of properties) {
        if (!(property in obj)) {
            missingProperties.push(property);
        }
    }
    return missingProperties;
}

module.exports.checkProperties = checkProperties;
module.exports.getMissingProperties = getMissingProperties;