# json-validator

This project defines a json-validator written in typescript which follows the
ECMA-404 standard, and enables further control about subtypes.

## Disclaimer
This project was written as a part of a university lecture to test
test-driven-development. I don't know if I will develop this further.

## Install
Currently it's not pushed to npm, but you can still install it using npm
directly from github:
> npm install https://github.com/jeppard/json-validator.git 


## Usage
The `JSONValidator` takes a ``JSONSchema`` and validates a ``JSON-String`` using
the validate function:

```ts
import { JSONSchema, JSONValidator } from "../src/jsonValidator";


let schema: JSONSchema = {type: "number", minimum: 4}
const validator = new JSONValidator(schema);
console.log(validator.validate('4'))   // expected True
console.log(validator.validate('2'))   // expected False
console.log(validator.validate('"7"')) // expected False
```

### JSONSchema
It's possible to validate numbers, booleans, strings, arrays and objects.
In the following sections the schema for the different types are defined.
The schemas can be defined recursively. It is possible to define the items inside
arrays or the structure of values inside an object.

#### Validating numbers
```ts
{
    type: "number",      // (required)
    minimum?: number     // (optional) forces the number to be greater or equals to minimum
    maximim?: number     // (optional) forces the number to be greater or equals to maximum
    subtype?: "float" |  // (optional) defines a subtype, if integer the number is divisible by 1
             "integer"
}
```

#### Validating strings
```ts
{
    type: "string",     // (required)
    minLength?: number, // (optional) forces the string to have at least minLength characters
    maxLength?: number, // (optional) forces the string to have at most maxLength characters
    pattern?: string    // (optional) forces the string to match the regex given by pattern
}
```

#### Validating booleans
```ts
{
    type: "boolean" // (required) field must be true or false
}
```

#### Validating arrays
```ts
{
    type: "array",          // (required)
    minItems?: number,      // (optional) requires the array to have equal or more items then minItems
    maxItems?: number,      // (optional) requires the array to have equal or less items then maxItems
    items?: JSONSchema |    // (optional) requirers every item of the array to follow the defined schema
            JSONSchema[]    // (optional) if a array of schemas is given to array to validate have to have the same amount of items, and each item of the array has to match the schema at the same position
}
```

#### Validating objects
```ts
{ 
    type: "object",             // (required)
    keys?: {                    // (optional) defines keys, but is permissive extra keys do not cause the validation to fail
        "any identifier": {     // any identifier defined can be validated using any of the possible schemas
            required?: boolean  // (optional) default: false
            JSONSchema
        }
    } 
}
```
Note keys are optional by default, if they are required you have to specify
`required: true`.