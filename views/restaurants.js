import { html } from '../node_modules/lit-html/lit-html.js';

import { addItemToShoppingCard } from './shoppingCard.js';
import { createNotification } from './notification.js';

var totalPrice = 0;

const pageTemplate = (restaurants, onSearch, username) => html`
<section id="searchRestaurant">
    <h1 id="welcomeMsg">${username ? 'Welcome ' + username + '!' : 'Welcome!'}</h1>
    <form @submit=${onSearch} id="searchForm">
        <input type="search" id="searchCriteria" placeholder="Search...">
        <button id="searchButton" type="text">&#128269;</button>
    </form>
</section>
<section>
    <div class="row">
        ${restaurants}
    </div>
</section>
`;

const restaurantTemplate = (restaurant, getMenu) => html`
    <div class="column">
        <div class="card" id="${restaurant.objectId}">
            <h2>${restaurant.name}</h2>
            <h3>${restaurant.category}</h3>
            <button @click=${getMenu}>Menu</button>
        </div>
    </div>
`;

const menuPageTemplate = (name, menu, restaurantId) => html`
    <h2 id="restaurantName">Restaurant ${name}</h2>
    ${menu}
`;

function menuTemplate(menuItem) {
    return html`
<article id="${menuItem.name}">
    <h2>${menuItem.name}</h2>
    <p>${menuItem.price}</p>
    <button @click=${addToBasket}>Order</button>
</article>
`;
}

export async function restaurantsPage(ctx) {

    const searchParam = ctx.querystring.split('=')[1];

    const response = await fetch('https://parseapi.back4app.com/classes/Restaurant', {
        headers: {
            'X-Parse-Application-Id': '71ASnfdK1ruTRDS5SN12nX8BiQy2gzQbXRyIZ53x',
            'X-Parse-REST-API-Key': 'cnrLcWDyi7JxIdeyneu1uE8joBBUpGZLxmdSzWmF',
        }
    });

    const dataResponse = await response.json();

    let data;

    if (searchParam) {
        data = dataResponse.results.filter(r => r.category.toLowerCase().includes(searchParam.toLowerCase())
            || r.name.toLowerCase().includes(searchParam.toLowerCase()));
        console.log(data);

    } else {
        data = dataResponse.results;
    }

    const restaurants = data.map(r => restaurantTemplate(r, getMenu));

    const page = pageTemplate(restaurants, onSearch, sessionStorage.getItem('username'));

    ctx.render(page, ctx.container);

    function onSearch(event) {
        event.preventDefault();
        const searchCriteria = encodeURIComponent(document.getElementById('searchCriteria').value);

        ctx.page.redirect('/?search=' + searchCriteria);
    }

    function getMenu(event) {
        const selectedRestaurant = data.filter(r => r.objectId == event.target.parentNode.id);
        console.log(selectedRestaurant);
        const menu = selectedRestaurant[0].menu.map(m => menuTemplate(m));
        const restaurantName = selectedRestaurant[0].name;
        const restaurantId = selectedRestaurant[0].objectId;
        sessionStorage.setItem('restaurantId', restaurantId);

        ctx.render(menuPageTemplate(restaurantName, menu), ctx.container);
    }
};

function addToBasket(event) {
    const itemName = event.target.parentNode.children[0].textContent;
    const price = Number(event.target.parentNode.children[1].textContent);
    const restaurantName = document.getElementById('restaurantName').textContent;
    sessionStorage.setItem('restaurant', restaurantName);
    const restaurantId =

        console.log(restaurantName);
    createNotification('Item added to the shopping card');

    console.log(restaurantName);
    addItemToShoppingCard({ itemName, price });
}