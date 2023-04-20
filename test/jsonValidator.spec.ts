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

describe("JSON Validator validate", () => {
    it("should return true if the type matches the schema", () => {
        let validator = new JSONValidator({type: "string"});
        expect(validator.validate(JSON.stringify(""))).to.be.true;
        expect(validator.validate(JSON.stringify(1))).to.be.not.true;
        expect(validator.validate(JSON.stringify(true))).to.be.not.true;
        expect(validator.validate(JSON.stringify({}))).to.be.not.true;
        expect(validator.validate(JSON.stringify([]))).to.be.not.true;
        validator.updateSchema({type: "number"});
        expect(validator.validate(JSON.stringify(""))).to.be.not.true;
        expect(validator.validate(JSON.stringify(1))).to.be.true;
        expect(validator.validate(JSON.stringify(true))).to.be.not.true;
        expect(validator.validate(JSON.stringify({}))).to.be.not.true;
        expect(validator.validate(JSON.stringify([]))).to.be.not.true;
        validator.updateSchema({type: "boolean"});
        expect(validator.validate(JSON.stringify(""))).to.be.not.true;
        expect(validator.validate(JSON.stringify(1))).to.be.not.true;
        expect(validator.validate(JSON.stringify(true))).to.be.true;
        expect(validator.validate(JSON.stringify({}))).to.be.not.true;
        expect(validator.validate(JSON.stringify([]))).to.be.not.true;
        validator.updateSchema({type: "object"});
        expect(validator.validate(JSON.stringify(""))).to.be.not.true;
        expect(validator.validate(JSON.stringify(1))).to.be.not.true;
        expect(validator.validate(JSON.stringify(true))).to.be.not.true;
        expect(validator.validate(JSON.stringify({}))).to.be.true;
        expect(validator.validate(JSON.stringify([]))).to.be.not.true;
        validator.updateSchema({type: "array"});
        expect(validator.validate(JSON.stringify(""))).to.be.not.true;
        expect(validator.validate(JSON.stringify(1))).to.be.not.true;
        expect(validator.validate(JSON.stringify(true))).to.be.not.true;
        expect(validator.validate(JSON.stringify({}))).to.be.not.true;
        expect(validator.validate(JSON.stringify([]))).to.be.true;
    })
});

describe("JSON Validator validate number", () => {
    it("should be higher than the minimum", () => {
        let validator = new JSONValidator({type: "number", minimum: 1});
        expect(validator.validate(JSON.stringify(1))).to.be.true;
        expect(validator.validate(JSON.stringify(0))).to.be.false;
    });
    it("should be lower than the maximum", () => {
        let validator = new JSONValidator({type: "number", maximum: 1});
        expect(validator.validate(JSON.stringify(1))).to.be.true;
        expect(validator.validate(JSON.stringify(2))).to.be.false;
    });
});