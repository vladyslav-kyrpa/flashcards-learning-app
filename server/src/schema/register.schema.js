const schema = {
    username: value => value !== undefined,
    email: value => value !== undefined,
    password: value => value !== undefined,
}

export default schema;