import Joi from 'joi';
import { validate } from '../src/validate';
import Schema from '../src/interfaces/schema';

describe('validate', () => {
    const schema: Schema = [
        {
            name: 'ID',
            dataPath: 'ID',
            viewPath: 'id',
            validator: Joi.number().required(),
        },
        {
            name: 'First Name',
            dataPath: 'FirstName',
            viewPath: 'firstName',
            validator: Joi.string().required(),
        },
        {
            name: 'Last Name',
            dataPath: 'LastName',
            viewPath: 'lastName',
            validator: Joi.string().required(),
        },
    ];

    it('should validate a valid data model', async () => {
        const data = {
            ID: 1,
            FirstName: 'Mayer',
            LastName: 'Fried',
        };
        expect((await validate(data, schema, true)).isValid).toBeTruthy();
    });

    it('should return an error for invalid data', async () => {
        const data = {
            ID: 1,
            FirstName: 'Mayer',
        };
        expect((await validate(data, schema, true)).isValid).toBeFalsy();
    });

    it('should validate a valid view model', async () => {
        const data = {
            id: 1,
            firstName: 'Mayer',
            lastName: 'Fried',
        };
        expect(await validate(data, schema)).toBeTruthy();
    });

    it('should return an error for invalid view model', async () => {
        const data = {
            id: 1,
            firstName: 'Mayer',
        };
        expect((await validate(data, schema)).isValid).toBeFalsy();
    });
});