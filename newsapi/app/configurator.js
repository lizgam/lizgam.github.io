import { NewsAgregator } from './news_agregator.js';
import { ContentBuilder } from './content_builder.js'

export class Configurator {
  initPage() {
    let fragment = document.createDocumentFragment();
    let nav = document.querySelector('.aside');

    for(let i = 0; i < NewsAgregator.getNews().length; ++i) {
      let news_button = document.createElement('div');
      news_button.className = 'button';
      let newsResource = NewsAgregator.getNewsById(i);
      news_button.innerHTML = newsResource;
      news_button.addEventListener("click", e => {
        ContentBuilder.build(newsResource)
      });
      news_button.addEventListener("click", e => {
        this.isContentLoaded();
      });
      fragment.appendChild(news_button);
    }

    nav.appendChild(fragment);
  }
  isContentLoaded(){
    let myEl = document.querySelector('.main');
    if (myEl.childElementCount > 0) {
      removeChildElement(myEl.children[0]);
    }
  }
}

/*helper function*/
function removeChildElement(child) {
  child.parentNode.removeChild(child);
}
