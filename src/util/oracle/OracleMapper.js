const getFieldPosition = (data, field) => data.metaData.findIndex(fieldDesc => fieldDesc.name === field);

function findByKey(objArray, fieldName, fieldValue) {
    return objArray.some(obj => {
        return fieldName in obj && obj[fieldName] === fieldValue;
    });
}

module.exports.getRowAsObj = (data, fields, rowIndex) => {
    let obj = {};
    let row = data.rows[rowIndex];
    if (row) {
        for (let field of fields) {
            let fieldIndex = getFieldPosition(data, field.name);
            obj[field.objName] = row[fieldIndex];
        }
    }
    return obj;
}

module.exports.getRowsAsObjs = (data, fields) => {
    let objs = [];
    for (let i = 0; i < data.rows.length; i++) {
        objs.push(this.getRowAsObj(data, fields, i));
    }
    return objs;
}

module.exports.getDifferentRowsAsObjs = (data, fields, keyField) => {
    let objs = this.getRowsAsObjs(data, fields);
    let filtered = [];
    objs.forEach(obj => {
        if (!findByKey(filtered, keyField, obj[keyField])) {
            filtered.push(obj);
        }
    });
    return filtered;
}

module.exports.getAnyFieldValueForKey = (data, field, keyField, keyValue) => {
    let fields = [field, keyField];
    let objs = this.getRowsAsObjs(data, fields);
    return fields.filter(obj => {
        return obj[keyField] === keyValue;
    })
    .map(obj => {
        return obj[field];
    });
}

module.exports.getFieldForAllRows = (data, fieldName) => {
    let values = [];
    let fieldIndex = getFieldPosition(data, fieldName);
    if (fieldIndex) {
        for (var row of data.rows) {
            values.push(row[fieldIndex]);
        }
    }
    return values;
}