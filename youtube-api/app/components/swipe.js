'use strict';

const resize = require('./resize');

function Swipe(callback) {
    var isTouchSupported = 'ontouchstart' in window;
    var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
    var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
    var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

    var slideContainer = document.getElementById('list-items');

    var swipey = document.getElementById('wrapper');

    var la = document.getElementById('left_ar');
    var ra = document.getElementById('right_ar');

    var currentdWidth = swipey.offsetWidth;

    var hasSwipeStarted = false;
    var startX = 0,
        distanceX = 0,
        maxDistance = 0,
        currentDistance = 0,
        direction = "";
        resize();

    var la = document.getElementById('left_ar');
    var ra = document.getElementById('right_ar');

    ra.addEventListener('click', moveRight);
    la.addEventListener('click', moveLeft);

    function calculate() {
        var tmp = slideContainer.style.webkitTransform.replace('translate3d(', '');
        var dist = Math.abs.call(null,parseInt(tmp));
        self.pageNum = Math.ceil((dist / swipey.offsetWidth)+1);
    };

    swipey.addEventListener(startEvent, function(event) {
        var eventObj = isTouchSupported ? event.touches[0] : event;
        startX = eventObj.pageX;
        hasSwipeStarted = true;
        if ((self.pageNum + 1) === self.totalLoadedPages) {
            callback.call(this, self.searchWord);
        }

    }, true);

    swipey.addEventListener(moveEvent, function(event) {
        if (hasSwipeStarted) {
            var eventObj = isTouchSupported ? event.touches[0] : event;
            distanceX = eventObj.pageX - startX;
            slideContainer.style.webkitTransform = "translate3d(" + (distanceX + currentDistance) + "px, 0,0)";
        }
        event.preventDefault();

    }, true);

    swipey.addEventListener(endEvent, function(event) {
        if (distanceX > 0) {
            direction = "right";
        }
        if (distanceX < 0) {
            direction = "left";
        }

        if ((direction == "right" && currentDistance == 0) ||
            (direction == "left" && currentDistance == -(maxDistance - document.body.clientWidth))) {
            comeBack();
        }
        else if (distanceX <= -(document.body.clientWidth / 4)) {
            moveLeft();
        }
        else if (distanceX >= (document.body.clientWidth / 4)) {
            moveRight();
        }
        else {
            comeBack();
        }

        hasSwipeStarted = false;
        distanceX = 0;

        calculate();
    }, true);

    var footer = document.getElementById('footer');
    footer.addEventListener('click', function(event) {
        if (event.target === document.getElementById('right_ar')) {
            moveLeft();
            calculate();
        }
        if (event.target === document.getElementById('left_ar')) {
            moveRight();
            calculate();
        }
    });

    function moveLeft() {
        currentDistance += -document.body.clientWidth;
        slideContainer.style.webkitTransitionDuration = 400 + "ms";
        slideContainer.style.webkitTransform = "translate3d(" + currentDistance + "px, 0,0)";
    }

    function moveRight() {
        currentDistance += document.body.clientWidth;
        slideContainer.style.webkitTransitionDuration = 400 + "ms";
        slideContainer.style.webkitTransform = "translate3d(" + currentDistance + "px, 0,0)";
    }
    function comeBack() {
        slideContainer.style.webkitTransitionDuration = 300 + "ms";
        slideContainer.style.webkitTransitionTimingFunction = "ease-out";
        slideContainer.style.webkitTransform = "translate3d(" + currentDistance + "px, 0,0)";
    }
}

module.exports = Swipe;
