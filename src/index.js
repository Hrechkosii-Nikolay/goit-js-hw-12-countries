import './sass/main.scss';
import fetchCountryByName from './js/fetchCountries.js';

import countryCard from './templates/oneCountryCard.hbs';
import countrysList from './templates/countrysList.hbs';

import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const refs = {
  countryCard: document.querySelector('#countryCard'),
  countriesContainer: document.querySelector('#countriesContainer'),
  input: document.querySelector('#js-input'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  if (e.target.value === '') {
    refs.countryCard.innerHTML = '';
    refs.countriesContainer.innerHTML = '';
    return;
  }

  const searchQuery = e.target.value;
  fetchCountryByName(searchQuery).then(renderCountryCard).catch(console.error);
}

function renderCountryCard(country) {
  if (country.length > 10) {
    error({
      title: 'Too many matches found!',
      text: 'Please enter a more specific query!',
    });
    return;
  } else if (country.status === 404) {
    error({
      title: 'Oh no! Not found!',
      text: 'Try again.',
    });
    return;
  } else if (country.length > 1 && country.length <= 10) {
    const countryList = countrysList(country);
    refs.countryCard.innerHTML = countryList;
    return;
  } else if (country.length === 1) {
    const markup = countryCard(country);
    refs.countryCard.innerHTML = markup;
    return;
  }
}
