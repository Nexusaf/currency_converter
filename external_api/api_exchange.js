var myHeaders = new Headers();

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

const getExchangeRate = async (base, target) => {
  const result = await fetch(`https://api.exchangerate.host/latest?base=${base}`, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));
  return result.rates[target];
}

export default getExchangeRate;
