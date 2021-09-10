const url = 'http://localhost:8080'

export const config = {
    goService: {
        peopleApi: `${url}/people`,
        orgApi: `${url}/organisation`,
        productApi: `${url}/products`
    },
    auth0: {
        domain: "dev-k6bx05vf.us.auth0.com",
        clientId: "SWXFgDlcVJRto1h2mrdqVRvePcokucgQ",
        audience: "https://https://practice-app.netlify.app/customers"
    },
    getReqInit: {
        method: "GET",
        mode: 'cors',
        headers: {
            Accept: 'application/ json',
            'Content-Type': 'application/json'
        },
    }
};