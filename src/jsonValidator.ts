export class JSONValidator {
    validate = () => {};
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

