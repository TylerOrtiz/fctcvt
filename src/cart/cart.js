/**
 * @typedef {Object} Cart
 * @property {Array} items - The items in the cart
 */


/**
 * 
 * @param {Cart} cart 
 * @returns {string}
 */
const serialize = (cart) => {
    try {
        return JSON.stringify(cart)
    }
    catch (e) {
        console.warn(e)
        return ''
    }
}

/**
 * 
 * @param {string} cart 
 * @returns {Cart}
 */
const deserialize = (cart) => {
    try {
        return JSON.parse(cart)
    }
    catch (e) {
        console.warn(e)
        return {}
    }
}

/**
 * 
 * @returns {Cart}
 */
const createCart = () => {
    const cart = {
        items: []
    }
    return cart
}

const getCart = () => {
    const cart = sessionStorage.getItem('cart')
    
    if (cart === null) {
        const newCart = createCart()
        sessionStorage.setItem('cart', serialize(newCart))
        return deserialize(newCart)
    }

    try {
        return deserialize(cart)
    } catch (e) {
        const newCart = createCart()
        sessionStorage.setItem('cart', serialize(newCart))
        return deserialize(newCart)
    }
}

const updateCart = (cart) => {
    sessionStorage.setItem('cart', serialize(cart))
    return deserialize(cart)
}

export { getCart, updateCart }