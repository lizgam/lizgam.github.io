'use strict';

function paging(event) {
    const footer = document.querySelector('.footer');
    const page = '<div class="slider left arrow" id = "left_ar"> &lt; </div><div class="slider page">' + self.pageNum + '</div><div class="slider arrow" id = "right_ar"> &gt; </div>';

    footer.innerHTML = page;
    if(self.pageNum === 1) {
        document.getElementById('left_ar').classList.add('hidden');
    }
}

module.exports = paging;
