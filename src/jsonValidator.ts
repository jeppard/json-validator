export class JSONValidator {
    validate = (jsonString: string) => {
        return this.validateItem(JSON.parse(jsonString), this.schema);
    };
    private validateItem = (json: any, schema: any) => {
        if (schema.type === "array") {
            return this.validateArray(json, schema);
        }
        if (!(typeof(json) === schema.type && !Array.isArray(json))){
            return false;
        }
        if (schema.type === "number") {
            return this.validateNumber(json,schema);
        }
        if (schema.type === "string") {
            return this.validateString(json, schema);
        }
        if (schema.type === "array") {
            return this.validateArray(json, schema);
        }
        if (schema.type === "object") {
            return this.validateObject(json, schema);
        }
        return true;
    };

    private validateString = (string: any, schema: {type: "string", minLength?: number, maxLength?: number, pattern?: string}) => {
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

    private validateArray(array: any, schema: {type: "array", minItems?: number, maxItems?: number, items?: any}) {
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

    private validateObject(object: any, schema: {type: "object", [key: string]: any}) {
        if (typeof(object) !== "object" || Array.isArray(object)) {
            return false;
        }
        let {type, ...keys} = schema;
        for (let key in keys) {
            if (!object.hasOwnProperty(key)) {
                if (keys[key].required === false) {
                    continue;
                }
                return false;
            }
            if (!this.validateItem(object[key], keys[key])) {
                return false;
            }
        }
        return true;
    }

    private checkSchema = (schema: any) => {
        if (!schema.hasOwnProperty("type")) {
            throw new Error("Schema must have a type property");
        }
        if (["string", "number", "boolean", "object", "array"].indexOf(schema.type) === -1) {
            throw new Error("Schema type must be string, number, boolean, object, or array");
        }
    };

    updateSchema = (schema: any) => {
        this.checkSchema(schema);
        this.schema = schema;
    };

    schema: any;
    constructor(schema: any = {}) {
        this.checkSchema(schema);
        this.schema = schema;
    }
}

