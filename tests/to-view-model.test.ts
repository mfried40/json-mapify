import Schema from "../src/interfaces/schema";
import {toViewModel} from "../src/to-view-model";


const dataModel: object = {
    ID: 1,
    FirstName: "Mayer",
    LastName: "Fried",
    Date: new Date(2000, 1, 1)
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
        dataPath: "Date",
        viewPath: "date",
        viewContent: (record: any) => record.Date.toLocaleDateString()
    }
]

const viewModel = {
    id: 1,
    firstName: "Mayer",
    lastName: "Fried",
    date: '2/1/2000',
};

test('should spit out a view model', () => {
    expect(toViewModel(dataModel, schema)).toStrictEqual(viewModel);
});