export class JSONValidator {
    validate = () => {};
    updateSchema = (schema: any) => {
        this.schema = schema;
    };
    schema: any;
    constructor(schema: any = {}) {
        this.schema = schema;
    }
}

