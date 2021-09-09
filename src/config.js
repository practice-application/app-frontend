const url = 'http://localhost:8080'

export const config = {
    'goService': {
        peopleApi: `${url}/people`,
        orgApi: `${url}/organisation`,
        productApi: `${url}/products`
    }
}

export const getReqInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        Accept: 'application/ json',
        'Content-Type': 'application/json'
    },
};