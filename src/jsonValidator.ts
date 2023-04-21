export class JSONValidator {
    validate = (jsonString: string) => {
        return this.validateItem(JSON.parse(jsonString), this.schema);
    };
    private validateItem = (json: any, schema: JSONSchema) => {
        switch (schema.type) {
            case "string":
                return this.validateString(json, schema);
            case "number":
                return this.validateNumber(json, schema);
            case "boolean":
                return this.validateBoolean(json, schema);
            case "array":
                return this.validateArray(json, schema);
            case "object":
                return this.validateObject(json, schema);
            default:
                throw new Error("Schema type must be string, number, boolean, object, or array");
        }
    };

    private validateString = (string: any, schema: StringSchema) => {
        if (typeof(string) !== "string") {
            return false;
        }
        if (schema.minLength && string.length < schema.minLength) {
            return false;
        }
        if (schema.maxLength && string.length > schema.maxLength) {
            return false;
        }
        if (schema.pattern && !new RegExp(schema.pattern).test(string)) {
            return false;
        }
        return true;
    };
    private validateNumber = (number: any, schema: {type: "number", minimum?: number, maximum?: number, subtype?: string}) => {
        if (typeof(number) !== "number") {
            return false;
        }
        if (schema.minimum && number < schema.minimum) {
            return false;
        }
        if (schema.maximum && number > schema.maximum) {
            return false;
        }
        if (!schema.subtype) {
            return true;
        }
        if (schema.subtype === "integer") {
            return number % 1 === 0;
        }
        if (schema.subtype === "float") {
            return number % 1 !== 0;
        }
        return true;
    };

    private validateArray(array: any, schema: ArraySchema) {
        if (!Array.isArray(array)) {
            return false;
        }
        if (schema.minItems && array.length < schema.minItems) {
            return false;
        }
        if (schema.maxItems && array.length > schema.maxItems) {
            return false;
        }
        if (schema.items) {
            for (let i = 0; i < array.length; i++) {
                if (!this.validateItem(array[i], !Array.isArray(schema.items) ? schema.items : schema.items[i])) {
                    return false;
                }
            }
        }
        return true;
    }

    private validateObject(object: any, schema: ObjectSchema) {
        if (typeof(object) !== "object" || Array.isArray(object)) {
            return false;
        }
        for (let key in schema.keys) {
            if (!object.hasOwnProperty(key)) {
                if (schema.keys[key].required === false) {
                    continue;
                }
                return false;
            }
            if (!this.validateItem(object[key], schema.keys[key])) {
                return false;
            }
        }
        return true;
    }

    private checkSchema = (schema: JSONSchema) => {
        if (!schema.hasOwnProperty("type")) {
            throw new Error("Schema must have a type property");
        }
        if (["string", "number", "boolean", "object", "array"].indexOf(schema.type) === -1) {
            throw new Error("Schema type must be string, number, boolean, object, or array");
        }
    };

    private validateBoolean = (boolean: any, schema: BooleanSchema) => {
        return typeof(boolean) === schema.type;
    };

    updateSchema = (schema: JSONSchema) => {
        this.checkSchema(schema);
        this.schema = schema;
    };

    schema: JSONSchema;
    constructor(schema: JSONSchema) {
        this.checkSchema(schema);
        this.schema = schema;
    }
}

type BooleanSchema = {type: "boolean"};
type StringSchema = {type: "string", minLength?: number, maxLength?: number, pattern?: string};
type NumberSchema = {type: "number", minimum?: number, maximum?: number, subtype?: "integer" | "float"};
type ArraySchema = {type: "array", minItems?: number, maxItems?: number, items?: JSONSchema | JSONSchema[]};
type ObjectSchema = { type: "object", keys?: { [key: string]: JSONSchema & { required?: boolean } } };
type JSONSchema = BooleanSchema | StringSchema | NumberSchema | ArraySchema | ObjectSchema;


export {BooleanSchema, StringSchema, NumberSchema, ArraySchema, ObjectSchema, JSONSchema}
