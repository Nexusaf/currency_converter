var myHeaders = new Headers();
const BASE = "EUR";

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };


const result = await fetch(`https://api.exchangerate.host/latest?base=${BASE}`, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));

export default result;
