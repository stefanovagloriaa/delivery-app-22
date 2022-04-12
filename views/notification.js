import {html, render} from '../node_modules/lit-html/lit-html.js';

const container = document.getElementById('notificationContainer');

const notificationTemplate = (message) => html`
<div id=notification>
${message}
<span @click=${clear} style="margin-left: 16px;">\u2716</span>
</div>
`;

export function createNotification(message){  
    render(notificationTemplate(message), container);
    setTimeout(clear,4000);
}

function clear(){
    render('', container)
}