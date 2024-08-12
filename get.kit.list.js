async function getRequest() {
    try {
        const response = await fetch('https://cnt-d5fcea5e-8420-4293-8ebf-ae953b0127ae.containerhub.tripleten-services.com/api/v1/kits?cardId=1');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getRequest();