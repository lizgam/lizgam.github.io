'use strict';

const render = require('./renderItems');

function initRequest() {
    var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    return new XHR();
};

function createRequest(word) {
    const LIST_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD-DpTMxYI4d0_9v5lGU2eallGfeuub5eM&maxResults=15&type=video&q=';

    var url = LIST_URL + word + '&pageToken=' + self.nextPage;
    console.log(self.nextPage);

    var req = initRequest();
    req.open('GET', url, true);

    req.onload = function() {
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
                publishedData: item.snippet.publishedAt.substr(0,10),
            };
            (function(video) {
                var oneItemUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyD-DpTMxYI4d0_9v5lGU2eallGfeuub5eM&id=' + video.id;
                var oneItemReq = initRequest();

                oneItemReq.open('GET', oneItemUrl, true);
                oneItemReq.send();
                oneItemReq.onload = function() {
                    var text = oneItemReq.responseText;
                    var statistic = JSON.parse(text);
                    video.count = statistic.items[0].statistics.viewCount;
                    render(video);
                };
            })(obj);
        }
    };

    req.onerror = function() {
        console.log('Failed to load item.');
    };

    req.send();
};

module.exports = createRequest;
