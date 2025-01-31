const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 30 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  sms             : true,
  personalShopper : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/rtb/rtb-logo.png',
  Selectors       : {
    popupCloseButton : '//*[@id="close-form"]/ancestor::button',
  },

  sf : {
    menuItems      : '#mainSubNav > ul > li.navigation__list__item > a.navigation__link',
    updatesLink    : 'a.jumbotron__social-list__link[data-modal-open=inscriptionModal]',
    trProductCount : 4,
    page404        : {
      productPageLink      : 'a[href="/cart"]',
      menuValidation_en_US : ['SHOP', 'PAIN RELIEF CENTER'],
      footerLinks          : 'a.storefront-footer__navigation-list__link',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
  },

  lp : {
    dotChatWidget   : false,
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1625667423/rtb/salesfloor-assets/rtb-sidebar-logo.png',
  },

  bo : {
    onboarding : {
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Relax The Back',
        footerContent : ['CUSTOMER SERVICE', 'OUR COMPANY', 'PROMOTIONS & OFFERS'],
        page404       : {
          menuValidation : ['SHOP', 'PAIN RELIEF CENTER'],
        },
      },
    },
  },
};
