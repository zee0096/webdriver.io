const retailer = process.env.NODE_ENV;
const environment = process.env.NODE_APP_INSTANCE;

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Toronto - Bloor',
  geo_ip           : '69.158.246.65',
  logoRetailerURL  : 'https://saks-stg.salesfloor-ecom.net/img/retailers/saks/saks_t.png',
  lang             : {
    en_US : {
      langName   : 'en_US',
      sidebarUrl : `http://${retailer}-widgets-${environment}.salesfloor-ecom.net/tests/desktop`,
    },
  },
};
