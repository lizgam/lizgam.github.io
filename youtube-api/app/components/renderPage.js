'use strict';

function renderPage() {

    const header = '<div id = "wrapper" class = "wrapper"><header class = "header"><div class = "search_form"><label><input id = "search_field" value = "" type = "text" placeholder = "Search on Youtube"/></label></div></header>';

    const content = '<main class = "main-content"><ul id = "list-items" class = "list-items"></ul></main>';

    const footer = '<footer id="footer" class = "footer"></footer></div>';
    var fullPage = header + content + footer;

    document.body.innerHTML = fullPage;
}

module.exports = renderPage;
