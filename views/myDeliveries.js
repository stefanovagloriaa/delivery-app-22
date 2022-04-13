import { html } from '../node_modules/lit-html/lit-html.js';

import { getOrderByUserId } from '../api/data.js';

//let orderedItems;

const myDeliveriesTemplate = (items) => html`
<h1>My Delivery Page</h1>
${items}
`;

const itemTemplate = (item) => html`
<div>
    <div class="column">
        <div class="card" id="${item.objectId}">
            <h2>${item.itemName}</h2>
            <h3>${item.itemPrice}</h3>
            <p>${item.restaurantName}</p>
        </div>
    </div>
</div>
`;

export async function myDeliveriesPage(ctx) {

    const user = sessionStorage.getItem('userId');

    const response = await getOrderByUserId();
    const result = response.results;

    console.log(result);

    if (result) {

        const ordersByUser = result.filter(o => o.userId.objectId == user);

        const givenOrders = ordersByUser.map(o => itemTemplate(o));

        ctx.render(myDeliveriesTemplate(givenOrders), ctx.container);
    } else {
        ctx.render('No added orders', ctx.container);
    }


}

export function addDelivery(items) {
    //orderedItems = items;

}