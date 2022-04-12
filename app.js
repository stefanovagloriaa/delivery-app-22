import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';

import { restaurantsPage } from '/views/restaurants.js'
import { loginPage } from '/views/login.js';
import { registerPage } from '/views/register.js';
import { myDeliveriesPage } from '/views/myDeliveries.js';
import { logoutUser } from '/views/logout.js';
import { shoppingCardPage } from '/views/shoppingCard.js';
import { profilePage } from '/views/myProfile.js';

const main = document.getElementById('container');
const headerNav = document.getElementById('topnav');
const guestNav = document.getElementById('guest');
const userNav = document.getElementById('loggedUser');

console.log(headerNav);

page('/', attachComponents, restaurantsPage);
page('/login', attachComponents, loginPage);
page('/register', attachComponents, registerPage);
page('/myDeliveries', attachComponents, myDeliveriesPage);
page('/logout', logoutUser);
page('/myShoppingCard', attachComponents, shoppingCardPage);
page('/myProfile', attachComponents, profilePage)

page.start();
setupNavigation();

function attachComponents(ctx, next) {
    ctx.render = render;
    ctx.container = main;
    next();
}

export function setupNavigation() {
    const token = sessionStorage.getItem('sessionToken');

    if (token) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
};

headerNav.addEventListener('focusin', (ev) => {
    ev.target.classList.add('active');
});
headerNav.addEventListener('focusout', (ev) => {
    ev.target.classList.remove('active');
});
