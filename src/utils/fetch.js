import {HTTP_GET} from "../constants/method";
import {serialize} from "cookie";
import {stringify} from "query-string";

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const handleFetch = (url, method, body, isServer = false, cookies = null) => {
    const urlPostfix = (method === HTTP_GET) && body ? `?${stringify(body)}` : "";
    const URI = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://api.iown.firstbridge.work/api";
    const headers = {
        'Content-Type': 'application/json',
    };

    if (cookies) {
        headers['Cookie'] = Object.keys(cookies).map(i => serialize(i, cookies[i]) + ";").join(" ");
    }

    return fetch(`http://localhost:3000/api${url}${urlPostfix}`, {
        method,
        headers,
        credentials: 'include',
        body: method !== HTTP_GET ? JSON.stringify(body) : undefined,
    })
        .then(res => res.json());
};
