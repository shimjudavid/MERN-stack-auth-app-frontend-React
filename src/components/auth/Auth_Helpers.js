 import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            // expire in 1 day
            expires: 1
        });
    }
};
// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key);
    }
};

// get cookie which contains stored token
// will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};
// set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
// get form LocalStorage

export const getLocalStorage = (key) => {
    if (window !== 'undefined') {
        return localStorage.getItem(key);
    }
}

// remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};


