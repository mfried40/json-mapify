import _ from "lodash";
import Schema from "./interfaces/schema";

export function toViewModel(data: any, schema: Schema): Object | [object] {
    if (Array.isArray(data)) {
        const viewModels = [];
        for (let item of data) {
            const viewModel: Record<string, any> = {};
            for (let column of schema) {
                viewModel[column.viewPath] = column.viewContent ? column.viewContent(item, viewModel) : _.get(item, column.dataPath ?? "");
            }
            viewModels.push(viewModel);
        };
        return viewModels;
    } else if (Array.isArray(data.rows)) {
        const viewModels = [];
        for (let item of data.rows) {
            const viewModel: Record<string, any> = {};
            for (let column of schema) {
                viewModel[column.viewPath] = column.viewContent ? column.viewContent(item, viewModel) : _.get(item, column.dataPath ?? "");
            }
            viewModels.push(viewModel);
        };
        data.rows = viewModels
        return data;
    } else {
        const viewModel: Record<string, any> = {};
        for (let column of schema) {
            viewModel[column.viewPath] = column.viewContent ? column.viewContent(data, viewModel) : _.get(data, column.dataPath ?? "");
        }
        return viewModel
    };
}