import { describe } from "mocha";
import { expect } from "chai";
import { JSONValidator } from "../src/jsonValidator";

describe("JSON Validator", () => {
    let jsonValidator: JSONValidator;
    beforeEach(() => {
        jsonValidator = new JSONValidator();
    });
    it("should exist", () => {
        expect(jsonValidator).to.exist;
    });
    it("should have a validate method", () =>{
        expect(jsonValidator).to.have.property("validate").that.is.a("function");
    });
    it("should take a schema as a parameter and store it", () => {
        let schema = {};
        let validator = new JSONValidator(schema);
        expect(validator.schema).to.equal(schema);
        schema = { "type": "string" };
        validator = new JSONValidator(schema);
        expect(validator.schema).to.equal(schema);
    });
    it("should have a updateSchema method", () => {
        expect(jsonValidator).to.have.property("updateSchema").that.is.a("function");
        let schema = { "type": "string" };
        jsonValidator.updateSchema(schema);
        expect(jsonValidator.schema).to.equal(schema);
    });
});