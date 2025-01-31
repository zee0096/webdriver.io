const repName = 'test_rep1';

module.exports = {
  logoURL          : 'https://s3.amazonaws.com/salesfloor-assets/elguntors/logo.png',
  changedStoreCity : 'Toronto',
  changedChatStore : 'Toronto - Bogus Plaza',
  geo_ip           : '24.48.98.186',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  chatMode            : 'queue',
  hasPrivacyPolicyLnk : false,
  logoRetailerURL     : 'https://cdn.salesfloor.net/salesfloor-assets/elguntors/logo.png',

  sf : {
    menuItems   : 'a.storefront-header__navigation__link',
    repComments : '.product__comment',
    updatesLink : 'footer.jumbotron__footer ul li a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : '.storefront-footer__header__list',
      productPageLink : 'h2.page-heading',
    },
    mainPage : {
      posts : false,
    },
  },

  bo : {
    onboarding : {
      importContacts : true,
      specialties    : true,
      socialNetworks : ['twitter'],
    },
    roles : {
      createUserRoles : ['admin', 'corp_admin'],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - El Guntors',
        footerContent : ['People Powered E-Commerce'],
        page404       : {
          menuValidation : ['ALL', 'WOMEN', 'MEN', 'SHOES', 'BAGS', 'ACCESSORIES', 'CONTACT US'],
        },
      },
    },
  },
};
