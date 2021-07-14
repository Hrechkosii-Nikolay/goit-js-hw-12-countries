export default function fetchCountryByName(country) {
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => {
    return response.json();
  });
}
