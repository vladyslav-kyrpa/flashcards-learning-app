import { validateSchema } from "./schema_validator.js"

export const schema = {
    id: _ => true,
    title: value => value !== undefined,
    cards: value => value !== undefined
        && validateSchema(cardSchema, value),
}

const cardSchema = {
    front: value => value !== undefined,
    back: value => value !== undefined,
}

export default schema;