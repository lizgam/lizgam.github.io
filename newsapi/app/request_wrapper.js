import { API_KEY } from './constants.js';

export class RequestWrapper {
  buildUrl(source_type) {
    return `https://newsapi.org/v2/top-headlines?` +
    `sources=${source_type}` +
    `&apiKey=${API_KEY}`;
  }

  getResponse(url) {
    let req = new Request(url);
    return fetch(req, {
      'Access-Control-Allow-Origin': 'https://newsapi.org'
    })
    .then(response => response.json());
  }
}
