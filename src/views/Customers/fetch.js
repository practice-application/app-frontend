import { useState, useCallback, useMemo } from 'react';

import { useAuth0 } from "@auth0/auth0-react";


import { config } from '../../config';

export const useApi = () => {
    const [state, setState] = useState({
        people: {
            data: [],
            matches: 0
        },
        person: {}
    });

    const { getAccessTokenSilently } = useAuth0();


    const fetchPeople = useCallback(async (page = { limit: 10 }, callback) => {
        // if (!callback) {
        //     setState({ type: 'init' });
        // }
        const reqInit = {
            method: "GET",
            headers: {
                Accept: 'application/ json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await getAccessTokenSilently()

            },
        }
        // console.log(await getAccessTokenSilently())
        const resp = await fetch(`${config.url}/people?lmt=${page.limit}&off=${page.offset}`, reqInit);
        // resp.setLimit(page.limit)
        if (resp.ok) {
            const json = await resp.json();
            // return json;
            setState(prev => {
                console.log(json.data)
                let p = {};
                if (page.offset > 0) {
                    p.data = [...prev.data, ...json.data];
                    p.matches = json.matches;
                } else {
                    p = json;
                }

                return { ...prev, people: p }
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