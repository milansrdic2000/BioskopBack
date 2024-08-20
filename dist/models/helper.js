export function getDbColumnName(objProp, entitySchema) {
    return (entitySchema.columns.find((col) => col.name.toString() === objProp)
        ?.getter || objProp);
}
export function getDbColumn(objProp, entitySchema) {
    return entitySchema.columns.find((col) => col.name.toString() === objProp);
}
//# sourceMappingURL=helper.js.map