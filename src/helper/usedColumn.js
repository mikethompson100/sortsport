export default function usedColumn(key, validColumns) {
    const existsInList = validColumns.some(obj => obj.name === key);
    return existsInList;
};