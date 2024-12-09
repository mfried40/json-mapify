import Joi from "joi";
import Schema from "./interfaces/schema";
import SchemaColumn, { isColumnSchemaWithDataPath, isColumnSchemaWithViewPath } from "./interfaces/schema-column";

export function validate(data: object, schema: Schema, isData: boolean = false) {
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
    return Joi.object(joiSchema).validate(data, {allowUnknown: true});
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