const VlSearchFilter = require('../components/vl-search-filter');
const { Page, Config } = require('vl-ui-core').Test;

class VlSearchFilterPage extends Page {
    async _getSearchFilter(selector) {
        return new VlSearchFilter(this.driver, selector);
    }
    
    async getSearchFilter() {
    	return this._getSearchFilter("#search-filter");
    }

    async getSearchFilterAlt() {
    	return this._getSearchFilter("#search-filter-alt");
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-search-filter.html');
    }
}

module.exports = VlSearchFilterPage;
