import React from 'react';

import Typography from '@material-ui/core/Typography';

import { config } from '../../config'



const reqInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
        Accept: 'application/ json',
        'Content-Type': 'application/json'
    },
};

const peopleUrl = config.goService.peopleApi

const Home = () => {
    //const classes = useStyles();
    const [person, setPeople] = React.useState([]);
    React.useEffect(() => {
        const fetchPeople = async (id) => {
            const resp = await fetch(`${peopleUrl}/${id}`, reqInit);
            if (resp.ok) {
                const json = await resp.json();
                setPeople(json);
            }
        };
        fetchPeople('1cd1611b-1dd8-4506-95ee-501aee77d2d1');
        console.log(setPeople)
    }, []);

    return (
        <>
            <Typography >
                {person.firstName} {person.lastName}
            </Typography>
            <Typography >
                {person.age}
            </Typography>
        </>
    )
}
export default Home;