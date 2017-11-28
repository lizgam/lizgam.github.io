import { Configurator } from './configurator.js';

window.addEventListener("load", newsConfiguration);

function newsConfiguration() {
  let configurator = new Configurator();
  configurator.initPage();
}
