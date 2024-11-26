import _ from "lodash";
import Schema from "./interfaces/schema";

export function toDataModel(data: any, schema: Schema): object | [object] {
    if (Array.isArray(data)) {
        const dataModels = [];
        for (let item of data) {
            const dataModel: Record<string, any> = {};
            for (let column of schema) {
                if(column.dataPath) {
                    dataModel[column.dataPath] = _.get(item, column.viewPath);
                }
            }
            dataModels.push(dataModel);
        };
        return dataModels;
    } else {
        const dataModel: Record<string, any> = {};
        for (let column of schema) {
            if(column.dataPath) {
                dataModel[column.dataPath] = _.get(data, column.viewPath);
            }
        }
        return dataModel;
    }
}