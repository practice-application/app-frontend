import firebase from 'firebase';

export const config = {
    auth0: {
        domain: "dev-k6bx05vf.us.auth0.com",
        clientId: "SWXFgDlcVJRto1h2mrdqVRvePcokucgQ",
        audience: "shared-app.com"
    },
    storage: {
        apiKey: "AIzaSyCkjhlIhlWnqcK1_Qd9kUghek3xP7JB1Co",
        authDomain: "practice-app-92bba.firebaseapp.com",
        databaseURL: "https://practice-app-92bba-default-rtdb.firebaseio.com",
        projectId: "practice-app-92bba",
        storageBucket: "practice-app-92bba.appspot.com",
        messagingSenderId: "40981754515",
        appId: "1:40981754515:web:3154a18bab93747a2fd366"
    },
    url: 'https://jumpingbeans.herokuapp.com'
};

firebase.initializeApp(config.storage);
export const imgStorage = firebase.storage();
