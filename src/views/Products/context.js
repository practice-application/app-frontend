import React, { createContext, useContext, useCallback, useMemo, useReducer } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import cloneDeep from 'lodash.clonedeep';

import { config } from '../../config';

const reducer = (state, action) => {
    const newState = cloneDeep(state);
    switch (action.type) {
        case 'init':
            newState.pending = true;
            newState.error = null;
            return newState;
        case 'query':
            newState.pending = false;
            let json = action.payload.json;
            const page = action.payload.page;
            if (page.offset > 0) {
                json.data = state.products.data.concat(json.data);
            }
            newState.products = json;
            newState.matches = json.matches;
            return newState;
        case 'get':
            newState.pending = false;
            newState.product = action.payload;
            return newState;
        case 'post':
            newState.pending = false;
            newState.product = action.payload;
            newState.product.push(action.payload)
            newState.products.matches++;
            return newState;
        case 'put':
            newState.pending = false;
            newState.product = action.payload;
            const index = newState.products.findIndex(e => e.id === action.payload);
            newState.products.splice(index, 1, action.payload);
            return newState;
        case 'delete': {
            newState.pending = false;
            const index = newState.products.data.findIndex(p => p.id === action.payload);
            newState.products.data.splice(index, 1);
            newState.products.matches--;
            return newState;
        }
        case 'error':
            console.error(action.error);
            newState.pending = false;
            newState.error = action.error.message;
            return newState;
        default:
            throw new Error('Unknown action type in entity reducer');
    }
};

const initialState = {

    pending: false,
    products: {
        data: [],
        matches: 0
    },
    product: {
        name: '',
        price: '',
        description: '',
        imageID: '',
        user: '',
        userPic: '',
        auth0id: '',
        size: '',
        tags: [],
        category: '',
        priority: {}
    },
    error: null,
};

const ProductContext = createContext(initialState);
export const ProductProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { state, dispatch } = useContext(ProductContext);

    const searchProducts = useCallback(async (query, category, page = { limit: 10 }) => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()

            },
        }
        console.log(await getAccessTokenSilently())
        const resp = await fetch(`${config.url}/products?st=${query}&off=0&category=${category}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'query', payload: { json: await resp.json(), page: page } });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'query' } });
        }

    }, [getAccessTokenSilently, dispatch]);

    const fetchProducts = useCallback(async (page = { limit: 10 }) => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        console.log(await getAccessTokenSilently())
        const resp = await fetch(`${config.url}/products?lmt=${page.limit}&off=${page.offset}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'query', payload: { json: await resp.json(), page: page } });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'query' } });
        }
    }, [getAccessTokenSilently, dispatch]);

    const fetchProduct = useCallback(async (id) => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        const resp = await fetch(`${config.url}/products/${id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'get', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'get' } });
        }

    }, [getAccessTokenSilently, dispatch]);

    const create = useCallback(async (product) => {
        const reqInit = {
            method: "POST",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
            body: JSON.stringify(product)
        }
        const resp = await fetch(`${config.url}/products`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'post', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'post' } });
        }

    }, [getAccessTokenSilently, dispatch]);

    const update = useCallback(async (product) => {
        const reqInit = {
            method: "PUT",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
            body: JSON.stringify(product)
        }
        const resp = await fetch(`${config.url}/products/${product.id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'put', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'put' } });
        }

    }, [getAccessTokenSilently, dispatch]);

    const deleteProduct = useCallback(async (id) => {
        const reqInit = {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        const resp = await fetch(`${config.url}/products/${id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'delete', payload: id });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'delete' } });
        }

    }, [getAccessTokenSilently, dispatch]);


    const actions = useMemo(() => {
        return { searchProducts, fetchProducts, fetchProduct, update, create, deleteProduct }
    }, [searchProducts, fetchProducts, fetchProduct, update, create, deleteProduct]);

    return [state, actions];
}