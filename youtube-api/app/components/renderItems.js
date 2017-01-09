'use strict';

const resize = require('./resize');
const paging = require('./paging');

function render(content) {

    var content1 = '<div class = "box-item"><figure><a href="' + content.youtubeLink + '"><img class = "preview" alt="' + content.title + '" src="' + content.preview + '"></a><div class = "count_view"><img alt="count of views" src="img/icon-eye.png"><span>' + content.count + '</span></div></figure></div>';

    var content2 = '<div class = "box-info"><ul class = "info"><li class = "row publish">Published <strong>' + content.publishedData + '</strong></li><li class = "row author">By <strong>' + content.author + '</strong></li><li class = "row title"><a href="' + content.youtubeLink + '">' + content.title + '</a></li><li class = "row description">' + content.description + '</li></ul></div>';

    var allContent = content1 + content2;

    var ul = document.querySelector('.list-items');
    var li = document.createElement('li');
    li.className = 'video-item';
    li.innerHTML = allContent;
    ul.appendChild(li);
    resize();
    paging();

    self.totalLi = ul.childElementCount;
    self.totalLoadedPages = Math.ceil(self.totalLi / self.countLi);
}

module.exports = render;
