export class JSONValidator {
    validate = (jsonString: string) => {
        let json = JSON.parse(jsonString);
        if (this.schema.type === "array") {
            return Array.isArray(json);
        }
        if (!(typeof(json) === this.schema.type && !Array.isArray(json))){
            return false;
        }
        if (this.schema.type === "number") {
            return this.validateNumber(json, this.schema);
        }
        return true;
    };

    private validateNumber = (number: any, schema: {type: "number", minimum?: number, maximum?: number}) => {
        if (typeof(number) !== "number") {
            return false;
        }
        if (schema.minimum && number < schema.minimum) {
            return false;
        }
        if (schema.maximum && number > schema.maximum) {
            return false;
        }
        return true;
    };

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

