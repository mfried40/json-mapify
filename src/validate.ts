import Joi from "joi";
import Schema from "./interfaces/schema";
import SchemaColumn, { isColumnSchemaWithDataPath, isColumnSchemaWithViewPath } from "./interfaces/schema-column";
import ValidationResult from "./classes/validation-result";
import _ from "lodash";

export async function validate(data: object, schema: Schema, isData: boolean = false) {
    if(isData) {
        return await validateDataModel(data, schema);
    }
    else {
        return await validateViewModel(data, schema);
    }
}

export function getJoiSchema(schema: Schema, isData: boolean = false) {
    const joiSchema: Record<string, any> = {};
    schema.forEach((prop: SchemaColumn) => {
        if(prop.validator) {
            if(isData) {
                if(isColumnSchemaWithDataPath(prop)) {
                    joiSchema[prop.dataPath] = prop.validator;
                }
            }
            else {
                if(isColumnSchemaWithViewPath(prop)) {
                    joiSchema[prop.viewPath] = prop.validator;
                }
            }
        };
    });
    return Joi.object(joiSchema);
}

async function validateDataModel(data: object, schema: Schema) {
    const joiSchema: Record<string, any> = {};
    for(const prop of schema) {
        if(prop.validator) {
            if(isColumnSchemaWithDataPath(prop)) {
                if(Array.isArray(prop.validator)) {
                    for(const validator of prop.validator) {
                        if(Joi.isSchema(validator)) {
                            joiSchema[prop.dataPath] = validator;
                            continue;
                        }
                        const result = await validator(data);
                        if(!result.valid) {
                            return new ValidationResult(false, result.message);
                        }
                    }
                }
                else {
                    joiSchema[prop.dataPath] = prop.validator;
                }
            }
        }
    }
    return ValidationResult.fromJoiResult(Joi.object(joiSchema).validate(data, {allowUnknown: true}));
}

async function validateViewModel(data: object, schema: Schema) {
    const joiSchema: Record<string, any> = {};
    for(const prop of schema) {
        if(prop.validator) {
            if(isColumnSchemaWithViewPath(prop)) {
                if(Array.isArray(prop.validator)) {
                    for(const validator of prop.validator) {
                        if(Joi.isSchema(validator)) {
                            joiSchema[prop.viewPath] = validator;
                            continue;
                        }
                        const result = await validator(data);
                        if(!result.valid) {
                            return new ValidationResult(false, result.message);
                        }
                    }
                }
                else {
                    joiSchema[prop.viewPath] = prop.validator;
                }
            }
        }
    }
    return ValidationResult.fromJoiResult(Joi.object(joiSchema).validate(data, {allowUnknown: true}));
}