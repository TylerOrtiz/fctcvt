const page = (parent) => {
    const fields = parent.fields
    return {
        id: fields.pageId,
        title: fields.pageTitle,
        content: fields.pageContent,
    }
}

export default page