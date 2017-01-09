'use strict';

function resize() {
    var contener = document.querySelector('.main-content');
    var items = document.querySelectorAll('.video-item');
    var currentdWidth = contener.offsetWidth;
    var itemWidth = 320;

    self.countLi = (Math.floor(currentdWidth / itemWidth) - 1);
    if (currentdWidth > itemWidth && currentdWidth < 656){
        self.countLi = 1;
    }
    var countMargin = self.countLi + 1
    var margin = (currentdWidth - (itemWidth * self.countLi)) / countMargin;
    var len = items.length;

    for (let i = 0, n = 1; i < len; i++) {
        if(i === self.countLi * n - 1) {
            items[i].setAttribute("style", "margin-left:" + margin + "px;margin-right:" + margin + "px;");
             n++;
             continue;
        } else {
            items[i].setAttribute("style", "margin-left:" + margin + "px;");
        }
    }
}

module.exports = resize;
