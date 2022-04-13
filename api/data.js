import * as api from './api.js';

export async function register(email, username, password) {
    const result = await api.post('/users', { email, username, password });

    sessionStorage.setItem('email', email);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userId', result.objectId);
    sessionStorage.setItem('sessionToken', result.sessionToken);
}

export async function login(username, password) {
    const result = await api.post('/login', { username, password });

    sessionStorage.setItem('userId', result.objectId);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('sessionToken', result.sessionToken);
}

export async function getUserById(sessionToken) {
    return await api.get('/users/me');
}

export async function createRestaurant() {

    const response = await api.post('/classes/Restaurant', {
        'menu': [
            {
                "name": "Sandwich with ham and cheese",
                "Price": "5.60"
            },
            {
                "name": "Tortilla",
                "Price": "8.50"
            },
        ],
        'category': 'International',
        'timeForDelievery': '30mins',
        'name': 'Halloha!',
        'homeDelievery': true
    });

    console.log(response);
}

export async function updateUserProfile(userData, userId) {
    return await api.put('/users/' + userId, userData)
}

export async function createOrder(givenOrder) {
     await api.post('/classes/Order', givenOrder);

}

export async function getOrderByUserId(urlParam){
    return await api.get('/classes/Order');
}