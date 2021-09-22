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
                json.data = state.people.data.concat(json.data);
            }
            newState.people = json;
            newState.matches = json.matches;
            return newState;
        case 'get':
            newState.pending = false;
            newState.person = action.payload;
            return newState;
        case 'post':
            newState.pending = false;
            newState.person = action.payload;
            newState.person.push(action.payload)
            return newState;
        case 'put':
            newState.pending = false;
            newState.person = action.payload;
            const index = newState.people.findIndex(e => e.id === action.payload);
            newState.people.splice(index, 1, action.payload);
            return newState;
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
    people: {
        data: [],
        matches: 0
    },
    person: {},
    error: null,
};

const CustomerContext = createContext(initialState);
export const CustomerProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CustomerContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CustomerContext.Provider>
    );
};

export const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { state, dispatch } = useContext(CustomerContext);

    const fetchPeople = useCallback(async (page = { limit: 10 }) => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()

            },
        }
        console.log(await getAccessTokenSilently())
        const resp = await fetch(`${config.url}/people?lmt=${page.limit}&off=${page.offset}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'query', payload: { json: await resp.json(), page: page } });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'query' } });
        }
        return
    }, [getAccessTokenSilently, dispatch]);

    const fetchPerson = useCallback(async (id) => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        const resp = await fetch(`${config.url}/people/${id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'get', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'get' } });
        }

        return
    }, [getAccessTokenSilently, dispatch]);

    const createPerson = useCallback(async (person) => {

        const reqInit = {
            method: "POST",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
            body: JSON.stringify(person)
        }
        const resp = await fetch(`${config.url}/people`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'post', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'post' } });
        }

        return
    }, [getAccessTokenSilently, dispatch]);

    const update = useCallback(async (person) => {

        const reqInit = {
            method: "PUT",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
            body: JSON.stringify(person)
        }
        const resp = await fetch(`${config.url}/people/${person.id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'put', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'put' } });
        }

        return
    }, [getAccessTokenSilently, dispatch]);

    const deletePerson = useCallback(async (person) => {
        const reqInit = {
            method: "DELETE",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
            body: JSON.stringify(person)
        }
        const resp = await fetch(`${config.url}/people/${person.id}`, reqInit);
        if (resp.ok) {
            dispatch({ type: 'delete', payload: await resp.json() });
        } else {
            dispatch({ type: 'error', error: resp.Error, meta: { method: 'delete' } });
        }

        return
    }, [getAccessTokenSilently, dispatch]);


    const actions = useMemo(() => {
        return { fetchPeople, fetchPerson, update, createPerson, deletePerson }
    }, [fetchPeople, fetchPerson, update, createPerson, deletePerson]);

    return [state, actions];
}