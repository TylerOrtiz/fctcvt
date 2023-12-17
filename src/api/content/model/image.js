const images = (parent) => {
    return parent?.map((resource) => {
        return {
            url: resource.secure_url,
            public_id: resource.public_id,
            width: resource.width,
            height: resource.height,
        }
    })
}

export default images