const CheckProperties = (obj, properties) => {
    var hasAllProperties = true;
    for (property of properties) {
        hasAllProperties = hasAllProperties && (property in obj);
    }
    return hasAllProperties;
}