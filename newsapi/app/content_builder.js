import { RequestWrapper } from './request_wrapper.js';
import { NewsSnippet } from './news_snippet.js';

export class ContentBuilder{
  static build(source_type) {
    let request_wrapper = new RequestWrapper();
    request_wrapper.getResponse(
      request_wrapper.buildUrl(source_type)
    )
    .then(data => NewsSnippet.buildTemplate(data))
    .catch(e => console.log("ERROR LOG: ", e));
  }
}
