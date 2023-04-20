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
});