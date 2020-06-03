const {VlElement} = require('vl-ui-core').Test;
const {By} = require('selenium-webdriver');
class VlSearchFilter extends VlElement {
  async getTitleText() {
    const title = await this.findElement(By.css('p.vl-search-filter__intro'));
    return title.getText();
  }

  async isAlt() {
    return this.hasAttribute('alt');
  }
}

module.exports = VlSearchFilter;
