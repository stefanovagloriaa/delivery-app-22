import { setupNavigation } from '../app.js';

export async function logoutUser(ctx){
    sessionStorage.clear();

    setupNavigation();
    ctx.page.redirect('/');
}