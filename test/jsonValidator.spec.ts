import { describe } from "mocha";
import { expect } from "chai";
import { JSONValidator } from "../src/jsonValidator";

describe("JSON Validator", () => {
    let jsonValidator: JSONValidator;
    beforeEach(() => {
        jsonValidator = new JSONValidator({type: "string"});
    });
    it("should exist", () => {
        expect(jsonValidator).to.exist;
    });
    it("should have a validate method", () =>{
        expect(jsonValidator).to.have.property("validate").that.is.a("function");
    });
    it("should take a schema as a parameter and store it", () => {
        let schema = {type: "object"};
        let validator = new JSONValidator(schema);
        expect(validator.schema).to.equal(schema);
        schema = { type: "string" };
        validator = new JSONValidator(schema);
        expect(validator.schema).to.equal(schema);
    });
    it("should have a updateSchema method", () => {
        expect(jsonValidator).to.have.property("updateSchema").that.is.a("function");
        let schema = { type: "string" };
        jsonValidator.updateSchema(schema);
        expect(jsonValidator.schema).to.equal(schema);
    });
});

describe("JSON Validator schema", () => {
    it("should need a type property", () => {
        let schema = {};
        expect(() => {new JSONValidator(schema)}).to.throw();
        schema = { type: "string" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {new JSONValidator(schema).updateSchema({})}).to.throw();
    });
    it("should only accept string, number, boolean, object, or array as a type", () => {
        let validator = new JSONValidator({type: "string"});
        let schema = { type: "string" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {validator.updateSchema(schema)}).to.not.throw();
        schema = { type: "number" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {validator.updateSchema(schema)}).to.not.throw();
        schema = { type: "boolean" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {validator.updateSchema(schema)}).to.not.throw();
        schema = { type: "object" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {validator.updateSchema(schema)}).to.not.throw();
        schema = { type: "array" };
        expect(() => {new JSONValidator(schema)}).to.not.throw();
        expect(() => {validator.updateSchema(schema)}).to.not.throw();
        schema = { type: "foo" };
        expect(() => {new JSONValidator(schema)}).to.throw();
        expect(() => {validator.updateSchema(schema)}).to.throw();
    });
});