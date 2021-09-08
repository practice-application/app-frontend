import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';

import { TextInput } from '../../components/TextInput'
import { config } from '../../config'


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
        fetchPeople('d3439211-17dc-4c41-b735-a1de98c05047');
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
                    <TextInput label="First Name" />
                    <TextInput label="Last Name" />
                    <Button variant="contained" > Submit</Button>
                </Stack>
            }
        </>
    )
}
export default Profile;