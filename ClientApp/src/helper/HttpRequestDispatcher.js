import {authHeader} from '../helper/AuthHeader'

export const HttpPostDispatcher = (url, data, successCallback, failureCallback, isAnonymous = false) => {
        fetch(url, {
            method: 'POST',
            headers: isAnonymous ? {'Content-Type': 'application/json'} : { ...authHeader() ,'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                successCallback(data);
            } else {
                failureCallback(data)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

export const HttpGetDispatcher = (url, successCallback, failureCallback) => {
    fetch(url, {headers: authHeader()})
        .then(response => response.json())
        .then(data => {
            if(data.success){
                successCallback(data);
            } else {
                failureCallback(data);
            }
        });
};