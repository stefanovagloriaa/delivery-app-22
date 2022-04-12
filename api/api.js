const host = 'https://parseapi.back4app.com';

async function request(url, method,body){
    const headers = getHeaders(body);

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    });

    try{
        if(!response.statusText == 'OK'){
            throw new Error('NETWORK ERROR!');
        }
        const data = await response.json();
        return data;

    } catch(error) {
        alert(error.message);
    }
}

function getHeaders(body){
    
    return body? {
        "X-Parse-Application-Id" : "71ASnfdK1ruTRDS5SN12nX8BiQy2gzQbXRyIZ53x",
        "X-Parse-REST-API-Key" : "cnrLcWDyi7JxIdeyneu1uE8joBBUpGZLxmdSzWmF",
        "X-Parse-Session-Token" : sessionStorage.getItem('sessionToken'),
        "Content-type" : "application/json",
    } : {
        "X-Parse-Application-Id" : "71ASnfdK1ruTRDS5SN12nX8BiQy2gzQbXRyIZ53x",
        "X-Parse-REST-API-Key" : "cnrLcWDyi7JxIdeyneu1uE8joBBUpGZLxmdSzWmF",
        "X-Parse-Session-Token" : sessionStorage.getItem('sessionToken'),
    }
}

export async function get(url, body){
    return await request(host+url, 'get',body);
}

export async function post(url, body){
    return await request(host+url,'post', body);
}

export async function put(url, body){
    return await request(host+url,'put', body);
}

export async function del(url, body){
    return await request(host+url,'delete', body);
}