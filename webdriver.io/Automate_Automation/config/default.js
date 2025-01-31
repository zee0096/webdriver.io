/* eslint-disable max-len */
const retailer = process.env.NODE_ENV;
const environment = process.env.NODE_APP_INSTANCE;

module.exports = {
  /** @prop {('rep'|'team')} mode='rep' - mode of retailer works $configs['retailer.storepage_mode'] */
  mode     : 'rep',
  /** @prop {('broadcast'|'queue')} chatMode='broadcast' - chat mode of retailer $configs['retailer.queue.byStore']
   * queue.byStore
   * */
  chatMode : 'broadcast',
  repName  : 'test_rep1',

  /** @prop {string} the retailer's store id */
  storeID : '',

  sms             : false,
  useWidgetsPage  : true, // use widgets page for validations, not retailer website
  socialShop      : false, // SocialShop feature
  /** @prop {boolean} personalShopper=true - The retailer has Personal Shopper option enable at the system */
  personalShopper : true,

  /** @prop {boolean} customerService=true - If true, you can foward to CS customerservice.can_forward */
  customerService     : true,
  /**
   * @prop {boolean} hasPrivacyPolicyLink=true the retailer has Privacy Policy link into schedule appointment page
   */
  hasPrivacyPolicyLnk : true,
  /**
   * @prop {Boolean} hasPhoneInPS=true the retailer has phone field in Personal shopper widget
   */
  hasPhoneInPS        : true,
  share               : true,
  tracking            : 'cookie', // options: 'localstorage' or 'cookie' - used on salestracking

  /**
   * @prop {boolean} hasComexCookie=true the retailer has cookie in case of comex in URL
   */
  hasComexCookie      : true,

  /** @prop {boolean} hasProducts=true Retailer has products and use such option */
  hasProducts : true,

  /** @prop {boolean} hasAssets=true Retailer has assets and use such option */
  hasAssets : true,

  /** @prop {boolean} sidebar=true Retailer has sidebar $configs['retailer.sidebar.v3.enabled'] = true */
  sidebar : true,

  /** @prop {boolean} hasFooter=true Retailer has footer */
  hasFooter : true,

  // the first item in array must have the default language for the retailer
  /**
   * @type {array<string>} [languages=['en_US']] list of languages used by retailer - the first is the default language
   */
  languages : ['en_US'],
  /**
   * @prop {Object}  lang - each language can his own specific configuration
   * @prop {Object} lang.en_US.langName=en_US - english US - default language
   * @prop {String} lang.en_US.sf.htmlTitle - Title of storefront page
   * @prop {Object} specificLanguage - en_US, fr_CA - language_Country
   * @prop {Object} lang.en_US.sf.page404 - page 404 on storefront
   * @prop {string} lang.en_US.sf.searchTrackingUrl - retailer's URL after redirection from SF when customer uses the search
   * @prop {array} lang.en_US.sf.page404.footerContent - should be update with footer titles of retailer
   * @prop {array} lang.en_US.sf.page404.menuValidation - should be update with menu titles of retailer
   * @prop {urlAddress} shoppingUrl Url address for shopping (used on footer page)
   * @prop {urlAddress} sidebarUrl Url address for sidebar
   * @prop {urlAddress} backOfficeUrl Url address for backOffice
   * @prop {urlAddress} productPageUrl Url to product page with widget
   */
  lang      : {
    en_US : {
      langName       : 'en_US',
      currency       : '$',
      shoppingUrl    : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl     : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl  : `https://${retailer}-${environment}.salesfloor.net`,
      productPageUrl : '',
      sf             : {
        searchTrackingUrl : '',
        footerContent     : [], // should be updated with footer titles of retailer
        page404           : {
          menuValidation : [], // should be updated with menu titles of retailer
        },
        htmlTitle        : '',
        availableRepText : 'Available_Available Now',
      },
    },
    fr_CA : {
      langName      : 'fr_CA',
      currency      : '$',
      shoppingUrl   : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl    : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      sf            : {
        searchTrackingUrl : '',
        htmlTitle         : '',
        availableRepText  : 'Disponible',
      },
    },
  },

  /**
   * @prop {String}     logoRetailerURL   - the Retailer's "master" image to be displayed onto any page
   */
  logoRetailerURL : '',
  /**
   * @prop {object} Selectors - general selectors
   * @prop {object} Selectors.popupCloseButton      - button to close a popup on sidebar
   *
  */
  Selectors       : {
    popupCloseButton : '#email_message .closebtn',
  },
  /**
   * Widget parameters (modal window)
   * @prop {Object}  widget                        - All parameters used on Widget modal window
   * @prop {Object}  widget.liveChat               - parameters for Live chat option
   * @prop {Boolean} widget.liveChat.hasSpecialityDrp=false  - shows Specility/category drop down
   * @prop {Boolean} widget.liveChat.questionBoxTxt=false  - has question text box
   * @prop {Object}  widget.appRequest               - parameters for appnt request option
   * @prop {Boolean} widget.appRequest.hasPrivacyPolicyLnk=true  - The priv. policy has url (link)
   * @prop {Boolean} widget.appRequest.hasSubscribeOpt=false  - has subscribe option
   * @prop {Boolean} widget.appRequest.hasSpecialityDrp=false  - shows Specility/category drop down
   * @prop {Boolean} widget.appRequest.appntType             - Appnt types available
   * @prop {Boolean} widget.appRequest.appntType.hasPhone=true    - shows presence of phone option in appointment request
   * @prop {Boolean} widget.appRequest.appntType.hasLiveChat=true - shows presence of chat option in appointment request
   * @prop {Boolean} widget.appRequest.appntType.hasInStore=true  - shows presence of in-store option in appointment request
   * @prop {Boolean} widget.appRequest.appntType.hasVirtual=false  - shows presence of virtual option in appointment request
   *
   * - shows Specility/category drop down
   */
  widget : {
    liveChat : {
      hasPrivacyPolicyLnk : true,
      hasSubscribeOpt     : false,
      // TODO: check if is the same information that bo.onboarding.specialties
      hasSpecialityDrp    : false,
      // TODO all clients have false. Is it really necessary?
      hasQuestionBoxTxt   : false,
    },

    appRequest : {
      hasPrivacyPolicyLnk : true,
      hasSubscribeOpt     : false,
      appntType           : {
        hasPhone    : true,
        hasLiveChat : true,
        hasInStore  : true,
        hasVirtual  : false,
      },
    },
  },
  /** storefront
   * @prop {object}      sf                            - Storefront Page selectors and properties
   * @prop {object}      sf.menuItems                  - menu list from storefront. When empty('') the retailer doesn't have it
   * @prop {object}      sf.repComments                - selector for rep comments on sf
   * @prop {object}      sf.hasRepComments             - existence of rep comments on sf
   * @prop {object}      sf.page404                    - properties and selectors of 404 page
   * @prop {cssSelector} sf.page404.footerLinks='div.storefront-footer__column'  - should be update for each retailer
   * @prop {cssSelector} sf.page404.link404             - link to error button
   * @prop {string}      sf.page404.productPageLink     - link to identify an element into retailer main page in production
   * @prop {cssSelector} sf.articles.prdDescCss         - list of description of product inside sections in SF - used (session css + descriptions CSS)
   * @prop {object}      sf.mainPage                    - section and selectors of mainpage page
   * @prop {boolean}     sf.mainPage.hasEmailMeRequest=true     - show the contact us/email me request option in storefront page
   * @prop {boolean}     sf.mainPage.hasAppointmentRequest=true  - show the appointment request option in storefront page
   * @prop {boolean}     sf.mainPage.hasLiveChat=true  - show the live chat option in storefront page
   * @prop {boolean}     sf.mainPage.events=false       - show the Events section in sf page - see $configs['storefront.store_events'] = ['active' => false]; in config file of platform
   * @prop {boolean}     sf.mainPage.posts=true         - show the Instagram/blog section on sf - see $configs['storefront.instagram'] on  config file of platform
   * @prop {object}      sf.mainPage.selector           - selectors when the values are true
   * @prop {integer}     sf.mainPage.imageCount=1       - shows the associate images when the value is bigger than 0 (TBV)
   * @prop {String}      sf.mainPage.associateImageSel  - seledtor for associate image
   */
  sf : {
    menuItems      : 'li.navigation__list__item:not(.navigation__list__item--is-mobile)',
    updatesLink    : 'div.jumbotron__inscription-ctn a, a.jumbotron__social-list__link, a[data-modal-open="inscriptionModal"]', // link on get my Updates button or link
    repComments    : 'blockquote.product__comment', // comments of products from an rep
    hasRepComments : true,
    trProductCount : 0, // trending products section in Storefront
    page404        : {
      footerLinks     : 'div.storefront-footer__column, li.storefront-footer__navigation-list__item', // should be update for each retailer
      link404         : 'a.errors__btn',
      productPageLink : '', // link to identify an element into retailer main page in production
    },
    articles : {
      prdDescCss : 'p.product__brand',
    },
    mainPage : {
      hasEmailMeRequest     : true,
      hasAppointmentRequest : true,
      hasLiveChat           : true,
      events                : false,
      posts                 : true,
      imageCount            : 1,
      associateImageSel     : '#AtRepPicture',
    },
  },
  /** landingpage/sidebar selectors
   * @prop {object}  lp                            - Landing Page (LP) selectors and properties
   * @prop {boolean} lp.dotChatWidget=true         - show the dot available color on widget
   * @prop {string}  lp.logoRetailerURL=''         - tested when it is different from ''. example: 'https://s3.amazonaws.com/salesfloor-assets/sw/SWLogo.png'
   * @prop {boolean} lp.visitStorefront=false      - show the link to visit the storefront in Search Store page in Landingpage
   * @prop {boolean} lp.personalShopper=true       - show the personalShopper option/link on Sidebar/landingpage. It's different of personaShopper global variable
   * @prop {boolean} lp.hasCheckGeo=true           - show the map location and other linked verifications on the sidebar widget
   * @prop {boolean} lp.hasEmailMeRequest=true     - show the Contact US/Email Me request option in sidebar landing page
   * @prop {boolean} lp.hasAppointmentRequest=true - show the appointment request option in sidebar landing page
   * @prop {boolean} lp.hasLiveChat=true           - show the Live Chat option in sidebar landing page
   * @prop {String}  lp.nearBy                     - show the 'near you' or other string instead of city name
   */
  lp : {
    dotChatWidget          : true,
    logoRetailerURL        : '',
    visitStorefront        : false,
    personalShopper        : true,
    hasCheckGeo            : true,
    hasEmailMeRequest      : true,
    hasAppointmentRequest  : true,
    hasLiveChat            : true,
    searchAdvisorInSidebar : true, // show the text if the user want search advisor + Search Now link
    nearBy                 : '',
  },
  /** Object with all BackOffice selectors and properties
   * @prop {object}      bo                            - Backoffice page selectors and properties
   * @prop {String}      bo.logoRetailerURL                - the image to be displayed onto Backoffice page, if it is empty the value from 'master' (logoRetailerURL) is chosen
   * @prop {object}      bo.onboarding                 - Object where their properties are used on onboarding page
   * @prop {boolean}     bo.onboarding.importContacts=false  - source: platform config file ($configs['retailer.onboarding.step.add_contacts'])
   * @prop {boolean}     bo.onboarding.specialties=false     - The retailer has specialyties field or not ($configs['retailer.specialties.is_enabled'])
   * @prop {Boolean}     bo.onboarding.vanityURL=false       - source: Personalise web and email - platform config file ($configs['onboarding.choose_alias'] ;)
   * @prop {Boolean}     bo.onboarding.acceptAgreement=true  - Checkbox during the onBoarding
   * @prop {array.roles} bo.roles.manageUserRoles      - array with list of roles
   * @prop {array.roles} bo.roles.filterUserRoles      - array with list of roles
   * @prop {array.roles} bo.roles.createUserRoles      - array with list of roles
   * @prop {Object}      bo.homeTabs                   - for track if retailer excluded some tabs from backoffice
   * @prop {Boolean}     bo.homeTabs.contacts          - Contacts tab
   * @prop {Boolean}     bo.homeTabs.messageCenter     - Message Center tab
   * @prop {Boolean}     bo.homeTabs.newLeads          - New Leads tab
   * @prop {integer}     bo.product.tpProductCount     - Qty of Top Picks products displayed at Storefront page
   * @prop {integer}     bo.product.naProductCount     - Qty of New Arrival products section displayed in Storefront
   * @prop {integer}     bo.product.tpProductTitleSel  - Selector for top picks product title
   * @prop {String} bo.newContactPhoneNumberStartsWith - The value for phone number during adding new phone-based contact
   * @prop {String} bo.customerRequestsBadges          - Presence of customer requests and messages badges
   */
  bo : {
    logoRetailerURL : '',
    onboarding      : {
      importContacts  : false, // platform config file ($configs['retailer.onboarding.step.add_contacts'])
      specialties     : false,
      vanityURL       : false, // Personalise web and email - platform config file ($configs['onboarding.choose_alias'] ;)
      acceptAgreement : true, // subscription Agreement  when the user create an account
      socialNetworks  : [],
    },
    roles : {
      manageUserRoles : ['admin', 'corp_admin', 'management', 'selling_manager', 'nonsell_manager'],
      filterUserRoles : ['admin', 'corp_admin', 'management', 'selling_manager', 'nonsell_manager'],
      createUserRoles : ['admin', 'corp_admin', 'management', 'selling_manager', 'nonsell_manager'],
    },
    homeTabs : {
      contacts      : true,
      messageCenter : true,
      newLeads      : true,
    },
    product : {
      tpProductCount    : 12, // retailer.num_top_picks
      naProductCount    : 0, // retailer.num_deals
      tpProductTitleSel : 'section:not([data-library="deals"], .identity-ctn, .recommendations-panel) article h3',
    },
    newContactPhoneNumberStartsWith : '+1213714',
    customerRequestsBadges          : true,
  },
  /** Object with all Footer page selectors and properties
   * @prop {object}  ft                            - footer page selectors and properties
   * @prop {boolean} ft.hasEmailMeRequest=true     - show the contact us/email me request option in footer page
   * @prop {boolean} ft.hasAppointmentRequest=true  - show the appointment request option in footer page
   * @prop {boolean} ft.hasLiveChat=true  - show the live chat option in footer page
   * @prop {object}  ft.productPage
  */
  ft : {
    hasEmailMeRequest     : true,
    hasAppointmentRequest : true,
    hasLiveChat           : true,
    productPage           : '#shopify-section-product',
  },
};
