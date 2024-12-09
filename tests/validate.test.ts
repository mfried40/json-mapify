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

    it('should validate a valid data model', () => {
        const data = {
            ID: 1,
            FirstName: 'Mayer',
            LastName: 'Fried',
        };
        expect(validate(data, schema, true)).toStrictEqual({value: data});
    });

    it('should return an error for invalid data', () => {
        const data = {
            ID: 1,
            FirstName: 'Mayer',
        };
        expect(validate(data, schema, true)).toStrictEqual({
            error: expect.any(Object),
            value: data,
        });
    });

    it('should validate a valid view model', () => {
        const data = {
            id: 1,
            firstName: 'Mayer',
            lastName: 'Fried',
        };
        expect(validate(data, schema)).toStrictEqual({value: data});
    });

    it('should return an error for invalid view model', () => {
        const data = {
            id: 1,
            firstName: 'Mayer',
        };
        expect(validate(data, schema)).toStrictEqual({
            error: expect.any(Object),
            value: data,
        });
    });
});