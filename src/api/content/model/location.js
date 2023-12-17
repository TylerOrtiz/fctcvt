const location = (parent) => {
    const fields = parent.fields
    return {
        name: fields.name,
        streetAddress: fields.streetAddress,
        city: fields.city,
        state: fields.state,
        zipCode: fields.zipCode,
    }
}

export default location