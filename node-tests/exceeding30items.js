//THIS TESTS ADDING A SINGLE PRODUCT WITH MULTIPLE QUANITY AMOUNT TO CAUSE THE KIT TO EXCEED 30

async function postRequest(){
    const requestBody = {
        "productsList": [
          {
            "id": 11,
            "quantity": 12
          }
        ]
      }

try {
    // Use the fetch method to send a POST request to the specified URL and wait for the response
    const response = await fetch('https://cnt-d5fcea5e-8420-4293-8ebf-ae953b0127ae.containerhub.tripleten-services.com/api/v1/kits/3/products', {
        method: 'POST',
        // Set headers
        headers: {
        'Content-Type': 'application/json'
        },
        // Set request body and convert the data object into a JSON string
        body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error(error);
}
}

postRequest()