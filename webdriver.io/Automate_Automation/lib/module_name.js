/* eslint-disable max-len */
// const RETAILER = process.env.NODE_ENV.toLowerCase();
// const PageLib = require('./pagelib');

const PageLib = require('./pagelib');

const { RETAILER } = new PageLib();

module.exports = {
  accountCreationLogin : `${RETAILER}-Account Creation & Login`,
  accountSettings      : `${RETAILER}-Account Settings`,
  automat              : `${RETAILER}-Automat`,
  chatTimeout          : `${RETAILER}-ChatTimeout`,
  contacts             : `${RETAILER}-Contacts`,
  backoffice           : `${RETAILER}-Backoffice`,
  corporateTasks       : `${RETAILER}-Corporate Tasks`,
  customerRequests     : `${RETAILER}-Customer Requests`,
  footer               : `${RETAILER}-Footer`,
  frontend             : `${RETAILER}-Frontend`,
  liveChat             : `${RETAILER}-Live Chat`,
  miscellaneous        : `${RETAILER}-Miscellaneous`,
  multiLang            : `${RETAILER}-Multi Language`,
  productLibrary       : `${RETAILER}-Product Library`,
  retailerSpecific     : `${RETAILER}-Retailer Specific`,
  salestracking        : `${RETAILER}-Salestracking`,
  shareAnUpdate        : `${RETAILER}-Share An Update`,
  sidebar              : `${RETAILER}-Sidebar`,
  storefront           : `${RETAILER}-Storefront`,
  userManagement       : `${RETAILER}-User Management`,
  utils                : `${RETAILER}-Utils`,
  widgetsLandingPage   : `${RETAILER}-Widgets & Landing Page (Lures)`,
};
