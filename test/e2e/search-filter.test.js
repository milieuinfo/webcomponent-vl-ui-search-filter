
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlSearchFilterPage = require('./pages/vl-search-filter.page');

describe('vl-search-filter', async () => {
  let vlSearchFilterPage;

  before(() => {
    vlSearchFilterPage = new VlSearchFilterPage(getDriver());
    return vlSearchFilterPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlSearchFilterPage.hasWcagIssues());
  });

  it('Als gebruiker kan ik de titel van een search filter opvragen', async () => {
    const vlSearchFilter = await vlSearchFilterPage.getSearchFilter();
    await assert.eventually.equal(vlSearchFilter.getTitleText(), 'VERFIJN UW ZOEKOPDRACHT');
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een search filter en een alternatieve search filter', async () => {
    const vlSearchFilter = await vlSearchFilterPage.getSearchFilter();
    await assert.eventually.isFalse(vlSearchFilter.isAlt());
    const vlSearchFilterAlt = await vlSearchFilterPage.getSearchFilterAlt();
    await assert.eventually.isTrue(vlSearchFilterAlt.isAlt());
  });
});
