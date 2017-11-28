export const newsArray = ['abc-news', 'ars-technica', 'bbc-news', 'google-news-uk', 'reuters'];

export class NewsAgregator {
  static getNews() {
    return newsArray;
  }

  static getNewsById(id) {
    return newsArray[id];
  }
}
