import Schema from "../src/interfaces/schema";
import {toDataModel} from "../src/to-data-model";

const viewModel: object = {
    id: 1,
    firstName: "Mayer",
    lastName: "Fried",
    date: '2/1/2000',
};

const schema: Schema = [
    {
        name: 'ID',
        dataPath: 'ID',
        viewPath: 'id',
    },
    {
        name: 'Fist Name',
        dataPath: "FirstName",
        viewPath: "firstName",
    },
    {
        name: "Last Name",
        dataPath: "LastName",
        viewPath: "lastName",
    },
    {
        name: "Date",
        viewPath: "date",
        viewContent: (record: any) => record.Date.toLocaleDateString()
    }
]

const dataModel: object = {
    ID: 1,
    FirstName: "Mayer",
    LastName: "Fried",
};

test("should spit out a data model", () => {
    expect(toDataModel(viewModel, schema)).toStrictEqual(dataModel);
});