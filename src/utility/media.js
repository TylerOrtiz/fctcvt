const cloudinary = require('cloudinary').v2;

const bannerImage = (id, width, height) => {
    return cloudinary.url(id, { width: width, height: height, crop: "lfill", secure: true})
}

const featureImage = (id, width, height) => {
    return cloudinary.url(id, { width: width, height: height, secure: true})
}

const media = { bannerImage, featureImage }

export default media
