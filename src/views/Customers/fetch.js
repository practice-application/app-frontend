import { useState, useCallback, useMemo } from 'react';

import { useAuth0 } from "@auth0/auth0-react";


import { config } from '../../config';

export const useApi = () => {
    const [state, setState] = useState({
        people: [],
        person: {}
    });

    const { getAccessTokenSilently } = useAuth0();


    const fetchPeople = useCallback(async () => {
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()

            },
        }
        console.log(await getAccessTokenSilently())
        const resp = await fetch(`${config.url}/people`, reqInit);
        if (resp.ok) {
            const json = await resp.json();
            // return json;
            setState(prev => {
                return { ...prev, people: json }
            });
        } else {
            console.error(resp)
        }
        return
    }, [getAccessTokenSilently]);

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
            const json = await resp.json();
            // return json;
            setState(prev => {
                return { ...prev, person: json }
            });
        } else {
            console.error(resp)
        }

        return
    }, [getAccessTokenSilently]);

    const actions = useMemo(() => {
        return { fetchPeople, fetchPerson }
    }, [fetchPeople, fetchPerson]);

    return [state, actions];
}