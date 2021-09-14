import { useState, useCallback, useMemo } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import { config } from '../../config';

export const useApi = () => {
    const [state, setState] = useState({
        people: [],
        person: {}
    });
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const fetchPeople = useCallback(async () => {
        const reqInit = {
            method: "GET",
            mode: 'cors',
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        const resp = await fetch(`${config.url}/people`, reqInit);
        if (resp.ok) {
            const json = await resp.json();
            // return json;
            setState({ ...state, people: json });
        } else {
            console.log(resp)
        }
        return
    }, [getAccessTokenSilently, state]);

    const fetchPerson = useCallback(async () => {
        const reqInit = {
            method: "GET",
            mode: 'cors',
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()
            },
        }
        const resp = await fetch(`${config.url}/people/${id}`, reqInit);
        if (resp.ok) {
            const json = await resp.json();
            // return json;
            setState({ ...state, person: json });
        }
        return
    }, [getAccessTokenSilently, state, id]);

    const actions = useMemo(() => {
        return { fetchPeople, fetchPerson }
    }, [fetchPeople, fetchPerson]);

    return [state, actions];
}