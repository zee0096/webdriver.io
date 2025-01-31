/**
 * Created by agultsov on 03/09/20.
 */
const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montréal',
  changedChatStore : 'Montréal - Holt Renfrew Ogilvy',
  geo_ip           : '167.114.209.19',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 7 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 7 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  chatMode        : 'queue',
  sms             : true,
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/holt/holt-logo.png',

  sf : {
    menuItems      : 'nav.navigation > ul > li.navigation__list__item > a.navigation__link',
    updatesLink    : '.jumbotron__social-list__link.js-service-link',
    trProductCount : 8,
    page404        : {
      footerLinks     : 'ul.storefront-footer__navigation-list',
      productPageLink : '#site-container',
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1627457388/holt/holt-sidebar-variant-logo.png',
  },

  bo : {
    onboarding : {
      socialNetworks : ['twitter'],
      specialties    : true,
      vanityURL      : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  widget : {
    liveChat : {
      hasSpecialityDrp : true,
    },
    appRequest : {
      appntType : {
        hasInStore : false,
      },
    },
  },

  lang : {
    en_US : {
      sf : {
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Holt Renfrew',
        footerContent : ['CUSTOMER CARE', 'INFORMATION', 'ABOUT US', 'SERVICES'],
        page404       : {
          menuValidation : ['DESIGNERS', 'CLOTHING', 'WOMEN', 'SHOES', 'BAGS', 'BEAUTY', 'MEN', 'H PROJECT', 'HOLTS EDIT', 'CAFE', 'SALE'],
        },
      },
    },
  },
};
