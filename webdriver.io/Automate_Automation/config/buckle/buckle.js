const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  sms                    : true,
  phoneInPS              : true,
  sidebar                : false,
  sfHTMLTitle_en_US      : 'Shop with Testy Rep0 Tester Rep0 - Buckle',
  logoRetailerURL        : 'https://cdn.salesfloor.net/salesfloor-assets/buckle/buckle-logo.png',
  searchAdvisorInSidebar : false,

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.buckle.com/search:shirt?sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Buckle',
      },
    },
  },

  sf : {
    menuItems      : 'nav#mainSubNav > ul > li > a.navigation__link',
    updatesLink    : 'a.jumbotron__social-list__link[data-modal-open=inscriptionModal]',
    hasRepComments : false,
    mainPage       : {
      hasLiveChat : false,
    },
    page404 : {
      footerLinks          : 'footer.storefront-footer ul.storefront-footer__navigation-list a[href]',
      footerContent_en_US  : ['Get in Touch', 'Customer Service', 'Shopping Tools', 'Company Info'],
      menuValidation_en_US : ['Products', 'Registry'],
      productPageLink      : '#header ul#mega-menu-container li.dropdown', // cart link in cart icon in main page
    },
  },

  lp : {
    hasLiveChat : false,
  },

  bo : {
    onboarding : {
      vanityURL : true,
    },
    product : {
      naProductCount : 8,
    },
  },

  ft : {
    hasLiveChat : false,
  },

  widget : {
    appRequest : {
      appntType : {
        hasLiveChat : false,
      },
    },
  },
};
