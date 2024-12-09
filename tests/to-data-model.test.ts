import Schema from "../src/interfaces/schema";
import {toDataModel} from "../src/to-data-model";

describe("toDataModel", () => {
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
        }
    ];

    const dataModel: object = {
        ID: 1,
        FirstName: "Mayer",
        LastName: "Fried",
    };

    it("should spit out a data model", () => {
        expect(toDataModel(viewModel, schema)).toStrictEqual(dataModel);
    });

    it("should spit out a array of data models", () => {
        expect(toDataModel([viewModel, viewModel], schema)).toStrictEqual([dataModel, dataModel]);
    });

    it('should ommit blank data', () => {
        const viewModel: object = {
            id: 1,
            firstName: "Mayer",
        };
        const dataModel: object = {
            ID: 1,
            FirstName: "Mayer",
        };
        expect(toDataModel(viewModel, schema)).toStrictEqual(dataModel);
    });
    
    it('should handle data content', () => {
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
                name: "Full Name",
                dataPath: "FullName",
                dataContent: (data: any) => data.firstName + " " + data.lastName,
            }
        ];
        const dataModel: object = {
            ID: 1,
            FirstName: "Mayer",
            LastName: "Fried",
            FullName: "Mayer Fried",
        };
        expect(toDataModel(viewModel, schema)).toStrictEqual(dataModel);
    });
});