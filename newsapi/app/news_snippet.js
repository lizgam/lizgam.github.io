export class NewsSnippet {
  static buildTemplate(data) {
    let elem = document.querySelector('.main');
    let ul = document.createElement('ul');
    ul.className = 'article_section';

    let fragment = document.createDocumentFragment();
    data.articles.map(item => {
      let li = document.createElement('li');
      li.className = 'video-item';
      let {author, description, publishedAt, title, url, urlToImage } = item;
      let pureDate = publishedAt.substring(0, 10);
      let imgTag = urlToImage ? `<img alt='image to news' src='${urlToImage}'/>` : '';
      li.innerHTML = `
        <h2><a target='_blank' href='${url}'>${title}</a></h2>
        <i>${pureDate}</i>
        <div class='content'>
          ${imgTag}
          <p>${description}</p>
        </div>`;
      fragment.appendChild(li);
    });

    ul.appendChild(fragment);
    elem.appendChild(ul);
  }
}
