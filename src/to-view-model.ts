import _ from "lodash";
import Schema from "./interfaces/schema";
import { isColumnSchemaWithViewPath, isColumnWithViewContent } from "./interfaces/schema-column";

export function toViewModel(data: any, schema: Schema): Object | [object] {
    if (Array.isArray(data)) {
        const viewModels = [];
        for (let item of data) {
            viewModels.push(convertObject(item, schema));
        };
        return viewModels;
    } else if (Array.isArray(data.rows)) {
        const viewModels = [];
        for (let item of data.rows) {
            viewModels.push(convertObject(item, schema));
        };
        data.rows = viewModels
        return data;
    } else {
        return convertObject(data, schema);
    };
}

function convertObject(data: object ,schema: Schema): Object {
    const viewModel: Record<string, any> = {};
    for (let column of schema) {
        if(isColumnSchemaWithViewPath(column)) {
            if(isColumnWithViewContent(column)) {
                if(column.viewContent(data, viewModel)) {
                    viewModel[column.viewPath] = column.viewContent(data, viewModel);
                }
            }
            else {
                if(_.get(data, column.dataPath)) {
                    viewModel[column.viewPath] = _.get(data, column.dataPath);
                }
            }
        }
    }
    return viewModel;
}