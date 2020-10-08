import { 
    SHOW_CART,
    HIDE_CART,
    UPDATE_TO_CART,
    REMOVE_FROM_CART
} from '../types'

export const showCart = (id) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_CART })
    }
}

export const hideCart = () => {
    return async (dispatch) => {
        dispatch({ type: HIDE_CART })
    }
}

export const updateToCart = (productId, quantity) => {
    return async (dispatch, getState) => {
        const { products } = getState()
        const product = products.find(product => product?.id === productId)
        const item = {
            ...product,
            quantity: quantity
        }
        dispatch({ type: UPDATE_TO_CART, payload: item })
    }
}

export const removeFromCart = (productId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_FROM_CART, payload: productId })
    }
}