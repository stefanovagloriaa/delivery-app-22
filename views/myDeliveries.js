import { html } from '../node_modules/lit-html/lit-html.js';

let orderedItems;

const myDeliveriesTemplate = (items) => html`
<div>
    <h1>My Deliveries</h1>
</div>
<section>
    ${items ? items : 'No deliveries yet!'}
</section>
`;

const itemTemplate = (item) => html`
<div>
    <h1>${item.itemName} <h1>${item.price}</h1> </h1>
</div>
`;

export async function myDeliveriesPage(ctx){
    let items;

    if(orderedItems){
        items = orderedItems.map(i=> itemTemplate(i));
    }

    ctx.render(myDeliveriesTemplate(items), ctx.container);
}

export function addDelivery(items){
    orderedItems = items;
}