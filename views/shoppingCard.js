import {html} from '../node_modules/lit-html/lit-html.js';

import {addDelivery} from './myDeliveries.js';
import {createNotification} from './notification.js';
import {createOrder} from '/api/data.js';

const currentItems = [];

const shoppingCardTemplate = (addedItems,makeOrder) => html`
<h2>My ShoppingCard Page</h2>
<section id=items>
${addedItems}
</section>
${addedItems ? 
    html`<button @click=${makeOrder} style="background-color: #AED35E">
${totalSum(currentItems)}$ - Finish your order!
</button>`
: ''}
`;

function totalSum(items){
    let totalPrice = 0;
    items.forEach(element => {
        totalPrice+= Number(element.price.toFixed(2));

    });
    return totalPrice.toFixed(2);
}

const itemTemplate = (item,removeItem) => html`
<article id="${item.name}">
<h2>${item.itemName}</h2>
<p>${item.price.toFixed(2)}</p>
    <button @click=${removeItem}>Delete from order</button>
</article>
`;

export async function shoppingCardPage(ctx){

    const addedItems = currentItems.map(i=> itemTemplate(i,removeItem));

    ctx.render(shoppingCardTemplate(addedItems,makeOrder), ctx.container);

    function removeItem(event){
        const item = event.target.parentNode;
        item.remove();
        currentItems.pop(item);
        
        ctx.render(shoppingCardTemplate(addedItems, makeOrder), ctx.container);
    }

    function makeOrder(event){
        console.log(event.target.textContent);
    
        if(event.target.textContent.includes('0.00')){
            return;
        }
        const items = Array.from(event.target.parentNode.children[1].children);
     
        const orderItems = [];
     
        items.forEach(i=> {
            const itemName = i.children[0].textContent;
            const price = Number(i.children[1].textContent);
            const restaurant = sessionStorage.getItem('restaurant');
            const restaurantId = sessionStorage.getItem('restaurantId');
            const userId = sessionStorage.getItem('userId');

            const givenOrder =  {
                    "itemName": itemName,
                    "itemPrice": price,
                    "restaurantName": restaurant,
                    "restaurantId": { 
                        "__type": "Pointer", 
                        "className": "Restaurant", 
                        "objectId": restaurantId
                    },
                    "userId": { 
                        "__type": "Pointer", 
                        "className": "_User", 
                        "objectId": userId
                    }
            };

           createOrder(givenOrder);

            //orderItems.push({itemName,price});
        });
     
       // addDelivery(orderItems);
        createNotification('Your order has been submitted :)');
        ctx.render('No added products in the shopping card yet..', ctx.container);
        
        while(currentItems.length >0){
            currentItems.pop();
        }   
     }
}

export function addItemToShoppingCard(item){
    currentItems.push(item);
   
}

