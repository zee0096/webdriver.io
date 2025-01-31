const environment = process.env.NODE_APP_INSTANCE;
const retailer = process.env.NODE_ENV;
const repName = 'test_rep1';

module.exports = {
  chatMode         : 'queue',
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '167.114.209.19',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  hasAssets       : false,
  customerService : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/scsk/scsk-logo.png',
  personalShopper : false,

  widget : {
    liveChat : {
      hasSpecialityDrp : true,
    },
    appRequest : {
      appntType : {
        hasPhone    : false,
        hasLiveChat : false,
        hasVirtual  : true,
      },
    },
  },
  sf : {
    menuItems   : '',
    updatesLink : '',
    page404     : {
      productPageLink : '.navbar li',
      footerLinks     : 'ul.storefront-footer__navigation-list > li',
    },
    mainPage : {
      posts         : false,
    },
  },

  lp : {
    personalShopper        : false,
    searchAdvisorInSidebar : false,
  },

  bo : {
    onboarding : {
      importContacts : true,
      specialties    : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
  },

  languages : ['ja_JP'],
  lang      : {
    ja_JP : {
      langName      : 'ja_JP',
      currency      : '¥',
      shoppingUrl   : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl    : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,

      sf : {
        footerContent : ['Order Status', 'Customer Service', 'Gift Cards', 'Our Story', 'Dream Jobs', 'Catalog', 'Download our App'],
        page404       : {
          menuValidation : ['SALE', 'NEW', 'PRINTS + COLORS', 'DRESSES', 'CLOTHING', 'SWIM', 'GIFTS + ACCESSORIES', 'GIRLS'],
        },
        htmlTitle        : '★とショッピング Tester Rep0 Testy Rep0 - SCSKプレッシェンド株式会社',
        availableRepText : '対応可能です',
      },
    },
  },

  ft : {
    hasPersonalShopper : false,
  },
};
