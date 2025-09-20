export const validateSchema = (schema, object) => 
    Object.keys(schema)
        .filter(key => !schema[key](object[key]))
        .map(key => new Error(`${key} is invalid.`));