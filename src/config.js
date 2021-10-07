import firebase from 'firebase';
// const firebase = require('firebase');

export const config = {
    auth0: {
        domain: "dev-k6bx05vf.us.auth0.com",
        clientId: "SWXFgDlcVJRto1h2mrdqVRvePcokucgQ",
        audience: "shared-app.com"
    },
    storage: {
        apiKey: "AIzaSyDgUq9Yu72T4N4P4Po7qkuzuHIId5H9ks8",
        authDomain: "practice-app-f69b1.firebaseapp.com",
        projectId: "practice-app-f69b1",
        storageBucket: "practice-app-f69b1.appspot.com",
        messagingSenderId: "144166072950",
        appId: "1:144166072950:web:786bfa87c6f67518162557",
        measurementId: "G-VJZKP0WB26"
    },
    url: 'https://jumpingbeans.herokuapp.com'
};

firebase.initializeApp(config.storage);
export const imgStorage = firebase.storage();
