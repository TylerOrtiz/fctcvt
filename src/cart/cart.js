/**
 * @typedef {Object} Cart
 * @property {Array} items - The items in the cart
 * @property {Date} last_updated_date - The date the cart was last updated
 */


/**
 * 
 * @param {Cart} cart 
 * @returns {string}
 */
const serialize = (cart) => {
    const serializer = (key, value) => {
        if (value instanceof Date && key.endsWith('_date')) {
            return value.toISOString()
        }
        return value
    }

    try {
        return JSON.stringify(cart, serializer)
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
    const deserializer = (key, value) => {
        if (key.endsWith('_date')) {
            return new Date(value)
        }
        return value;
    }

    try {
        return JSON.parse(cart, deserializer)
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
        items: [],
        last_updated_date: new Date(new Date().toISOString())
    }
    return cart
}

const getCart = () => {
    const cart = sessionStorage.getItem('cart')
    
    if (cart === null) {
        const newCart = createCart()
        sessionStorage.setItem('cart', serialize(newCart))
        return newCart
    }

    try {
        return deserialize(cart)
    } catch (e) {
        const newCart = createCart()
        sessionStorage.setItem('cart', serialize(newCart))
        return newCart
    }
}

const updateCart = (cart) => {
    cart.last_updated_date = new Date(new Date().toISOString())
    sessionStorage.setItem('cart', serialize(cart))
    return cart
}

export { getCart, updateCart }