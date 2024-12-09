import _ from "lodash";
import Schema from "./interfaces/schema";
import ColumnSchema, { isColumnSchemaWithDataPath, isColumnWithDataContent } from "./interfaces/schema-column";

export function toDataModel(data: any, schema: Schema): object | [object] {
    if (Array.isArray(data)) {
        const dataModels = [];
        for (let item of data) {
            dataModels.push(convertObject(item, schema));
        };
        return dataModels;
    } else {
        return convertObject(data, schema);
    }
}

function convertObject(data: object ,schema: Schema): Object {
    const dataModel: Record<string, any> = {};
    for (let column of schema) {
        if(isColumnSchemaWithDataPath(column)) {
            if(isColumnWithDataContent(column)) {
                if(column.dataContent(data)) {
                    dataModel[column.dataPath] = column.dataContent(data);
                }
            }
            else {
                if(_.get(data, column.viewPath)) {
                    dataModel[column.dataPath] = _.get(data, column.viewPath);
                }
            }
        }
    }
    return dataModel;
}