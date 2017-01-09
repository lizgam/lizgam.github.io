'use strict';

self.nextPage  = '';
self.searchWord = '';
self.pageNum = 1;
self.countLi = 0;

const dataonload = require('./components/load');
const renderPage = require('./components/renderPage');
renderPage();

const Swipe = require('./components/swipe');
const search = require('./components/search');
const resize = require('./components/resize');
const paging = require('./components/paging');

search(dataonload);

var searchField = document.querySelector('#search_field');
searchField.addEventListener("click", find);

window.addEventListener("load", resize);
window.addEventListener("resize", resize);
window.addEventListener("click", paging);
