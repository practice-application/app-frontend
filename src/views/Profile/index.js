import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { config } from '../../config'





const peopleUrl = config.goService.peopleApi

const Profile = () => {

    const [view, setView] = React.useState(true);
    const [person, setPeople] = React.useState([]);
    const reqInit = {
        method: view === true ? "GET" : "PUT",
        mode: 'cors',
        headers: {
            Accept: 'application/ json',
            'Content-Type': 'application/json'
        },
    };
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
    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    return (
        <>
            <Button variant="contained" onClick={view === true ? change : changeBack}>{view === true ? "Edit" : "View"} Profile</Button>
            {view === true &&
                <Card>
                    <Typography >
                        {person.firstName} {person.lastName}
                    </Typography>
                    <Typography >
                        {person.age}
                    </Typography>
                </Card>
            }
            {view === false &&
                <>
                    <TextField label="First Name" variant="outlined" />
                    <TextField label="Last Name" variant="outlined" />
                </>
            }
        </>
    )
}
export default Profile;