import Joi from "joi";
import Schema from "./interfaces/schema";
import SchemaColumn from "./interfaces/schema-column";

export function Validate(data: object, schema: Schema, isData: boolean = false) {
    const joiSchema: Record<string, any> = {};
    schema.forEach((prop: SchemaColumn) => {
        if(prop.validator) {
            if(isData) {
                if(prop.dataPath) {
                    joiSchema[prop.dataPath] = prop.validator;
                }
            }
            else {
                joiSchema[prop.viewPath] = prop.validator;
            }
        };
    });
    return Joi.object(joiSchema).validate(data, {allowUnknown: true});
}