const StorefrontPage = require('../../pages/storefront.page');
const LiveChat = require('../../lib/livechat');
const MainPagePage = require('../../pages/storefront/mainpage.page');
const speclib = require('../../lib/speclib');
const { naProductCount, tpProductCount, hasRepComments } = require('../../pages/backoffice/home/editsection.page');

describe(`${StorefrontPage.RETAILER} Storefront Main Page`, () => {
  before(() => {
    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C184100 Jumbotron is visible', () => {
    speclib.addTestId('184100');

    speclib.addStepAutoNumber('Verify jumbotron to be displayed');
    expect(StorefrontPage.jumbotron).toBeDisplayed();
  });

  speclib.itSkipIf(!StorefrontPage.hasHeaderLinks)('C184101 Storefront menu links in Header', () => {
    speclib.addTestId('184101');

    speclib.addStepAutoNumber('Verify header menu count');
    expect(StorefrontPage.menuItems.length).toBeGreaterThan(0);
  });

  speclib.itSkipIf(!StorefrontPage.hasFooterLinks)('C184102 Storefront footer validation', () => {
    speclib.addTestId('184102');

    speclib.addStepAutoNumber('Verify footer menu links has bigger than 0');
    expect(StorefrontPage.footerLinks.length).toBeGreaterThan(0);
  });

  speclib.itSkipIf(StorefrontPage.isTeamMode)('C184103 Associate\'s picture(s) is loading correctly', () => {
    speclib.addTestId('184103');

    speclib.addStepAutoNumber('Verify associate images');
    expect(MainPagePage.associateImageIsOk()).toBeTruthy();
  });

  it('C184104 Events Visibility', () => {
    speclib.addTestId('184104');

    speclib.addStepAutoNumber('Verify events header');
    // usually the last section of SF
    if (MainPagePage.hasEvents) {
      expect(StorefrontPage.eventsHeader).toBeDisplayed();
    } else {
      expect(StorefrontPage.eventsHeader).not.toBeDisplayed();
    }
  });
  it('C184105 Instagram Posts Visibility', () => {
    speclib.addTestId('184105');

    speclib.addStepAutoNumber('Verify posts visibility');
    if (MainPagePage.hasPosts) {
      expect(MainPagePage.posts).toBeDisplayed();

      speclib.addStepAutoNumber('Verify instagram feed images are displayed correctly');
      expect(MainPagePage.isRealImage(MainPagePage.instagramProductImages)).toBe(true);
    } else {
      expect(MainPagePage.posts).not.toBeDisplayed();
    }
  });

  speclib.itSkipIf(tpProductCount === 0)('C184107 Correct Number of Top Picks Products Are Displayed', () => {
    speclib.addTestId('184107');

    speclib.addStepAutoNumber('Verify number of Top Picks');
    expect(StorefrontPage.products.length).toEqual(tpProductCount);

    speclib.addStepAutoNumber('Verify products images are displayed correctly');
    expect(MainPagePage.isRealImage(MainPagePage.productImagesSel)).toBeTruthy();

    speclib.addStepAutoNumber('Verify no products with $0 are displayed');
    expect(StorefrontPage.pricesAreNotZero()).toBeTruthy();

    speclib.addStepAutoNumber('Verify deals are deals');
    expect(StorefrontPage.pricesDontMatch()).toBeTruthy();

    if(hasRepComments) {
      speclib.addStepAutoNumber('Verify rep comments are legit');
      expect(StorefrontPage.checkCommentsAreLegit()).toBeTruthy();
    }
  });

  speclib.itSkipIf(naProductCount === 0)('C184108 Correct Number of New Arrivals Products Are Displayed', () => {
    speclib.addTestId('184108');

    speclib.addStepAutoNumber('Verify number of New Arrivals');
    const count = StorefrontPage.newArrivals.length;
    expect(count).toEqual(naProductCount);
  });

  if (MainPagePage.trProductCount > 0) {
    it('C184111 Correct Number of Trending Recs Products Are Displayed', () => {
      speclib.addTestId('184111');

      speclib.addStepAutoNumber('Verify number of trending products');
      const count = StorefrontPage.trendingProducts.length;
      const minCount = 2;
      expect(count).toBeGreaterThanOrEqual(minCount);
      expect(count).toBeLessThanOrEqual(MainPagePage.trProductCount);
    });
  }

  it('C184112 HTML Page Title', () => {
    speclib.addTestId('184112');

    speclib.addStepAutoNumber('Step 1 - Verify html page title');
    expect(browser).toHaveTitle(StorefrontPage.sfHtmlTitle);
  });

  speclib.itSkipIf(!StorefrontPage.hasUpdatesLink
    || (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode))(`C180882
    Get Updates`, () => {
    speclib.addTestId('180882');

    speclib.addStepAutoNumber('Step 1 - Verify get updates');
    expect(StorefrontPage.getUpdates('qatest+updates@salesfloor.net')).toBeTruthy();
  });

  speclib.itSkipIf(!StorefrontPage.hasLiveChat)('C184113 Contact/Chat window appears when requested', () => {
    speclib.addTestId('184113');

    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME);

    // check if the chat is available or not
    if (StorefrontPage.chatAvailable.isExisting()) {
      speclib.addStepAutoNumber('Click live chat link');
      StorefrontPage.clickLiveChatLink();
      speclib.addStepAutoNumber('Verify livechat to be displayed');
      expect(LiveChat.liveChatTitle).toBeDisplayed();
    } else {
      speclib.addStepAutoNumber('Click live chat link');
      StorefrontPage.clickLiveChatLinkNoSwitchWindow(false);
      speclib.addStepAutoNumber('Select frame question chat');
      StorefrontPage.selectIFrame('questionChat');
      speclib.addStepAutoNumber('Verify contact box exists');
      expect(StorefrontPage.contactBox).toExist();
    }
  });
});
