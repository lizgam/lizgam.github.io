'use strict';
const paging = require('./paging');
const Swipe = require('./swipe');

function search(callback){
    var searchField = document.querySelector('#search_field');
    searchField.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            document.querySelector('.list-items').innerHTML = "";
            document.querySelector('.list-items').style = "";
    	    document.querySelector('.footer').innerHTML = "";
            self.pageNum = 1;
            paging();
            var swipe = new Swipe(callback);
            self.searchWord = searchField.value;
            callback.call(this, self.searchWord);
        }
    });
}

module.exports = search;
