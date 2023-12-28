const _ = require('lodash');

function toViewModel(data, map) {
    if (Array.isArray(data)) {
        const viewModels = [];
        for (let item of data) {
            const viewModel = {};
            for (let column of map) {
                viewModel[column.viewPath] = column.viewContent ? column.viewContent(item, viewModel) : _.get(item, column.dataPath);
            }
            viewModels.push(viewModel);
        };
        return viewModels;
    } else if (Array.isArray(data.rows)) {
        const viewModels = [];
        for (let item of data.rows) {
            const viewModel = {};
            for (let column of map) {
                viewModel[column.viewPath] = column.viewContent ? column.viewContent(item, viewModel) : _.get(item, column.dataPath);
            }
            viewModels.push(viewModel);
        };
        data.rows = viewModels
        return data;
    } else {
        const viewModel = {};
        for (let column of map) {
            viewModel[column.viewPath] = column.viewContent ? column.viewContent(data, viewModel) : _.get(data, column.dataPath);
        }
        return viewModel
    };
}

function toDataModel(data, map) {
    if (Array.isArray(data)) {
        const dataModels = [];
        for (let item of data) {
            const dataModel = {};
            for (let column of map) {
                dataModel[column.dataPath] = _.get(item, column.viewPath);
            }
            dataModels.push(dataModel);
        };
        return dataModels;
    } else {
        const dataModel = {};
        for (let column of map) {
            dataModel[column.dataPath] = _.get(data, column.viewPath);
        }
        return dataModel;
    }
}

module.exports = {
    toViewModel,
    toDataModel
}