
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlSearchFilterPage = require('./pages/vl-search-filter.page');

describe('vl-search-filter', async () => {
    const vlSearchFilterPage = new VlSearchFilterPage(driver);

    before(() => {
        return vlSearchFilterPage.load()
    });

    after(async () => {
        return driver.quit();
    });

});
