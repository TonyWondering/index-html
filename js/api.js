var API_BASE = 'http://localhost:8080';

function getToken() {
    return localStorage.getItem('token') || '';
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function clearToken() {
    localStorage.removeItem('token');
}

function getUserName() {
    return localStorage.getItem('userName') || '';
}

function setUserName(name) {
    localStorage.setItem('userName', name);
}

function apiRequest(method, path, data) {
    var opts = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };
    var token = getToken();
    if (token) {
        opts.headers['Authorization'] = 'Bearer ' + token;
    }
    if (data && method !== 'GET') {
        opts.body = JSON.stringify(data);
    }
    return fetch(API_BASE + path, opts).then(function(res) {
        if (res.status === 401) {
            clearToken();
            throw new Error('未登录');
        }
        return res.json();
    });
}

function apiGet(path) { return apiRequest('GET', path); }
function apiPost(path, data) { return apiRequest('POST', path, data); }
function apiPut(path, data) { return apiRequest('PUT', path, data); }
function apiDelete(path) { return apiRequest('DELETE', path); }

function isLoggedIn() {
    return !!getToken();
}
