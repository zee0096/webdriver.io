const Backoffice = require('../../backoffice.page');

/**
 * ReportSales Class
 *
 * @class
 * @classdesc info about Sales tab in reports page
 * @extends BackOfficePage
 */
class ReportSales extends Backoffice {
  /** Library for localStorage
   * @constructor LocalStorage
   */
  constructor() {
    super();
    /**
     * @property {string}
     */
    this.transactionId = '';
  }

  /** Sales Tab
   * @type {cssSelectorObj} */
  get salesTab() { return $('a#ui-id-2'); }

  /** Sales Details table - list all sales
   * @type {cssSelectorArr} */
  get salesDetailsLst() { return $$('tbody.table-layout-4 tr td:nth-child(2)'); }

  /**
   * getting text on product(s) column after click on show details
  */
  get valuesOfPrd() {
    return this.skuPrdOfItem(this.trxInReportsObj).getText();
  }

  /** saleAmountTotal - get the saleAmount total from BO
   * adding +2 because array starting with 0 + table header
   * @param {number} arrayIndexTrx incex of table
   * @return {string} returns the sales amout total of row selected
   * @type {cssSelectorObj} */
  saleAmountTotal(arrayIndexTrx) {
    return $(`tbody.table-layout-4 tr:nth-child(${arrayIndexTrx + 2}) td:nth-child(4)`);
  }

  /** showDetailsOfProductsLnk - link to click on show details link in product column
   * adding +2 because array starting with 0 + table header
   * @param {number} arrayIndexTrx incex of table
   * @return {string} detais of product after cliced on show details link
   * @type {cssSelectorObj} */
  showDetailsOfProductsLnk(arrayIndexTrx) {
    return $(`tbody.table-layout-4 tr:nth-child(${arrayIndexTrx + 2}) td:nth-child(3) a`);
  }

  /** skuPrdOfItem - return the sku of product
   * adding +2 because array starcating with 0 + table header
   * @param {number} arrayIndexTrx incex of table
   * @return {string} detais of product after cliced on show details link
   * @type {cssSelectorObj} */
  skuPrdOfItem(arrayIndexTrx) {
    return $(`tbody.table-layout-4 tr:nth-child(${arrayIndexTrx + 2}) td:nth-child(3) div.fn-content-list`);
  }

  /** productsDescription - return the the products description
   * adding +2 because array starting with 0 + table header
   * @param {number} arrayIndexTrx incex of table
   * @returns {cssSelectorObj} all products and qty list */
  productsDescription(arrayIndexTrx) {
    return $(`tbody.table-layout-4 tr:nth-child(${arrayIndexTrx + 2}) td:nth-child(3) div.fn-content-list`);
  }

  /** clickOnSalesTab - Click on sales tab in report page */
  clickOnSalesTab() {
    this.salesTab.waitForDisplayed({ timeout : 5000 });
    this.salesTab.click();
    this.waitForLoadingIconDisappear();
  }

  /** clickOnShowDetails - Click on show details link to see the details of sa specific sale
    * @param {number} arrayIndexTrx incex of table
    */
  clickOnShowDetails(arrayIndex) {
    this.showDetailsOfProductsLnk(arrayIndex).click();
    browser.pause(1000);
  }

  /** findTransactionInRow - find if a trasaction is listed
    * @param {String} transaction number
    * @return {number} the index where the transaction was found
    */
  findTransactionInRow(transactionNumber) {
    this.waitForLoadingIconDisappear();
    // if -1, not found
    let indexOfTrxFound = -1;

    const transactionList = this.salesDetailsLst;

    transactionList.every((e, index) => {
      if (transactionNumber === e.getText()) {
        indexOfTrxFound = index;
        return false;
      }
      return true;
    });
    this.trxInReportsObj = indexOfTrxFound;
    // TODO return not necessary because previous line
    return indexOfTrxFound;
  }
}
module.exports = new ReportSales();
