/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	self.nextPage = '';
	self.searchWord = '';
	self.pageNum = 1;
	self.countLi = 0;

	const dataonload = __webpack_require__(1);
	const renderPage = __webpack_require__(2);
	renderPage();

	const Swipe = __webpack_require__(6);
	const search = __webpack_require__(4);
	const resize = __webpack_require__(5);
	const paging = __webpack_require__(7);

	search(dataonload);

	var searchField = document.querySelector('#search_field');
	searchField.addEventListener("click", find);

	window.addEventListener("load", resize);
	window.addEventListener("resize", resize);
	window.addEventListener("click", paging);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const render = __webpack_require__(3);

	function initRequest() {
	    var XHR = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
	    return new XHR();
	};

	function createRequest(word) {
	    const LIST_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD-DpTMxYI4d0_9v5lGU2eallGfeuub5eM&maxResults=15&type=video&q=';

	    var url = LIST_URL + word + '&pageToken=' + self.nextPage;
	    console.log(self.nextPage);

	    var req = initRequest();
	    req.open('GET', url, true);

	    req.onload = function () {
	        var data = req.responseText;
	        var videoData = JSON.parse(data);
	        self.nextPage = JSON.parse(data).nextPageToken;

	        for (var item of videoData.items) {
	            var obj = {
	                id: item.id.videoId,
	                youtubeLink: 'https://www.youtube.com/watch?v=' + item.id.videoId,
	                preview: item.snippet.thumbnails.medium.url,
	                title: item.snippet.title,
	                description: item.snippet.description,
	                author: item.snippet.channelTitle,
	                publishedData: item.snippet.publishedAt.substr(0, 10)
	            };
	            (function (video) {
	                var oneItemUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyD-DpTMxYI4d0_9v5lGU2eallGfeuub5eM&id=' + video.id;
	                var oneItemReq = initRequest();

	                oneItemReq.open('GET', oneItemUrl, true);
	                oneItemReq.send();
	                oneItemReq.onload = function () {
	                    var text = oneItemReq.responseText;
	                    var statistic = JSON.parse(text);
	                    video.count = statistic.items[0].statistics.viewCount;
	                    render(video);
	                };
	            })(obj);
	        }
	    };

	    req.onerror = function () {
	        console.log('Failed to load item.');
	    };

	    req.send();
	};

	module.exports = createRequest;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function renderPage() {

	    const header = '<div id = "wrapper" class = "wrapper"><header class = "header"><div class = "search_form"><label><input id = "search_field" value = "" type = "text" placeholder = "Search on Youtube"/></label></div></header>';

	    const content = '<main class = "main-content"><ul id = "list-items" class = "list-items"></ul></main>';

	    const footer = '<footer id="footer" class = "footer"></footer></div>';
	    var fullPage = header + content + footer;

	    document.body.innerHTML = fullPage;
	}

	module.exports = renderPage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const resize = __webpack_require__(5);
	const paging = __webpack_require__(7);

	function render(content) {

	    var content1 = '<div class = "box-item"><figure><a href="' + content.youtubeLink + '"><img class = "preview" alt="' + content.title + '" src="' + content.preview + '"></a><div class = "count_view"><img alt="count of views" src="img/icon-eye.png"><span>' + content.count + '</span></div></figure></div>';

	    var content2 = '<div class = "box-info"><ul class = "info"><li class = "row publish">Published <strong>' + content.publishedData + '</strong></li><li class = "row author">By <strong>' + content.author + '</strong></li><li class = "row title"><a href="' + content.youtubeLink + '">' + content.title + '</a></li><li class = "row description">' + content.description + '</li></ul></div>';

	    var allContent = content1 + content2;

	    var ul = document.querySelector('.list-items');
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const paging = __webpack_require__(7);
	const Swipe = __webpack_require__(6);

	function search(callback) {
	    var searchField = document.querySelector('#search_field');
	    searchField.addEventListener('keypress', function (event) {
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function resize() {
	    var contener = document.querySelector('.main-content');
	    var items = document.querySelectorAll('.video-item');
	    var currentdWidth = contener.offsetWidth;
	    var itemWidth = 320;

	    self.countLi = Math.floor(currentdWidth / itemWidth) - 1;
	    if (currentdWidth > itemWidth && currentdWidth < 656) {
	        self.countLi = 1;
	    }
	    var countMargin = self.countLi + 1;
	    var margin = (currentdWidth - itemWidth * self.countLi) / countMargin;
	    var len = items.length;

	    for (let i = 0, n = 1; i < len; i++) {
	        if (i === self.countLi * n - 1) {
	            items[i].setAttribute("style", "margin-left:" + margin + "px;margin-right:" + margin + "px;");
	            n++;
	            continue;
	        } else {
	            items[i].setAttribute("style", "margin-left:" + margin + "px;");
	        }
	    }
	}

	module.exports = resize;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const resize = __webpack_require__(5);

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
	        var dist = Math.abs.call(null, parseInt(tmp));
	        self.pageNum = Math.ceil(dist / swipey.offsetWidth + 1);
	    };

	    swipey.addEventListener(startEvent, function (event) {
	        var eventObj = isTouchSupported ? event.touches[0] : event;
	        startX = eventObj.pageX;
	        hasSwipeStarted = true;
	        if (self.pageNum + 1 === self.totalLoadedPages) {
	            callback.call(this, self.searchWord);
	        }
	    }, true);

	    swipey.addEventListener(moveEvent, function (event) {
	        if (hasSwipeStarted) {
	            var eventObj = isTouchSupported ? event.touches[0] : event;
	            distanceX = eventObj.pageX - startX;
	            slideContainer.style.webkitTransform = "translate3d(" + (distanceX + currentDistance) + "px, 0,0)";
	        }
	        event.preventDefault();
	    }, true);

	    swipey.addEventListener(endEvent, function (event) {
	        if (distanceX > 0) {
	            direction = "right";
	        }
	        if (distanceX < 0) {
	            direction = "left";
	        }

	        if (direction == "right" && currentDistance == 0 || direction == "left" && currentDistance == -(maxDistance - document.body.clientWidth)) {
	            comeBack();
	        } else if (distanceX <= -(document.body.clientWidth / 4)) {
	            moveLeft();
	        } else if (distanceX >= document.body.clientWidth / 4) {
	            moveRight();
	        } else {
	            comeBack();
	        }

	        hasSwipeStarted = false;
	        distanceX = 0;

	        calculate();
	    }, true);

	    var footer = document.getElementById('footer');
	    footer.addEventListener('click', function (event) {
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function paging(event) {
	    const footer = document.querySelector('.footer');
	    const page = '<div class="slider left arrow" id = "left_ar"> &lt; </div><div class="slider page">' + self.pageNum + '</div><div class="slider arrow" id = "right_ar"> &gt; </div>';

	    footer.innerHTML = page;
	    if (self.pageNum === 1) {
	        document.getElementById('left_ar').classList.add('hidden');
	    }
	}

	module.exports = paging;

/***/ }
/******/ ]);