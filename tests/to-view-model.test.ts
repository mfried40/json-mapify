import Schema from "../src/interfaces/schema";
import { toViewModel } from "../src/to-view-model";


const dataModel: object = {
    ID: 1,
    FirstName: "Mayer",
    LastName: "Fried",
    Date: new Date(2000, 0, 1)
};

const dataArrayModel: object = [
    {
        ID: 1,
        FirstName: "Mayer",
        LastName: "Fried",
        Date: new Date(2000, 0, 1)
    },
    {
        ID: 2,
        FirstName: "Mayer2",
        LastName: "Fried2",
        Date: new Date(2000, 1, 2)
    }
];

const dataArrayModelWithRows: object = {
    rows: [
        {
            ID: 1,
            FirstName: "Mayer",
            LastName: "Fried",
            Date: new Date(2000, 0, 1)
        },
        {
            ID: 2,
            FirstName: "Mayer2",
            LastName: "Fried2",
            Date: new Date(2000, 1, 2)
        }
    ]
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
]

const viewModel = {
    id: 1,
    firstName: "Mayer",
    lastName: "Fried",
};

const viewModelArray = [
    {
        id: 1,
        firstName: "Mayer",
        lastName: "Fried",
    },
    {
        id: 2,
        firstName: "Mayer2",
        lastName: "Fried2",
    }
];

describe('toViewModel', () => {
    it('should spit out a view model', () => {
        expect(toViewModel(dataModel, schema)).toStrictEqual(viewModel);
    });
    it('should spit out a view model array', () => {
        expect(toViewModel(dataArrayModel, schema)).toStrictEqual(viewModelArray);
    });
    it('should spit out a view model array when passed in a object with rows', () => {
        expect(toViewModel(dataArrayModelWithRows, schema)).toStrictEqual({
            rows: viewModelArray
        });
    });
    it('should handle empty data', () => {
        expect(toViewModel({}, schema)).toStrictEqual({});
    });
    it('should handle empty array data', () => {
        expect(toViewModel([], schema)).toStrictEqual([]);
    });
    it('should handle empty rows array', () => {
        expect(toViewModel({ rows: [] }, schema)).toStrictEqual({ rows: [] });
    });
    it('should handle missing data paths', () => {
        const incompleteDataModel = {
            ID: 1,
            FirstName: "Mayer"
        };
        const expectedViewModel = {
            id: 1,
            firstName: "Mayer",
        };
        expect(toViewModel(incompleteDataModel, schema)).toStrictEqual(expectedViewModel);
    });
    it('should handle view content', () => {
        const schemaWithViewContent = [
            {
                name: 'ID',
                dataPath: 'ID',
                viewPath: 'id',
                viewContent: (data: any) => data.ID + 1
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
        ];
        const expectedViewModel = {
            id: 2,
            firstName: "Mayer",
            lastName: "Fried",
        };
        expect(toViewModel(dataModel, schemaWithViewContent)).toStrictEqual(expectedViewModel);
    });
});