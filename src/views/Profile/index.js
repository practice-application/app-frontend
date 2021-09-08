import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { config } from '../../config'
import CreateProfile from '../Create'

const reqInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        Accept: 'application/ json',
        'Content-Type': 'application/json'
    },
};

const peopleUrl = config.goService.peopleApi

const Profile = () => {

    const [view, setView] = React.useState(true);
    const [person, setPeople] = React.useState([]);

    React.useEffect(() => {
        const fetchPeople = async (id) => {
            const resp = await fetch(`${peopleUrl}/${id}`, reqInit);
            if (resp.ok) {
                const json = await resp.json();
                setPeople(json);
            }
        };
        fetchPeople('a65a0ad6-0783-4500-9461-171ed0ae010a');
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
                <Stack>
                    <TextField label="First Name" variant="outlined" />
                    <TextField label="Last Name" variant="outlined" />
                    <Button variant="contained" > Submit</Button>
                </Stack>
            }
            <CreateProfile />
        </>
    )
}
export default Profile;