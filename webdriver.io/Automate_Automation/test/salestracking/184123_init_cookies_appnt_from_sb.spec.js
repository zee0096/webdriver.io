const SalesTrackingPage = require('../../pages/salestracking/salestracking.page');
const SidebarPage = require('../../pages/sidebar.page');
const AppointmentRequestPage = require('../../lib/appntrequest');
const NewLeadsPage = require('../../pages/backoffice/newleads/newleads.page');
const CookiePage = require('../../lib/cookie');
const LocalStoragePage = require('../../pages/salestracking/localStorage.page');
const Contact = require('../../pages/salestracking/contact');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(
  SidebarPage.isProdEnv || !SidebarPage.hasSidebar || !SidebarPage.hasAppointmentRequest || !NewLeadsPage.hasNewLeads,
)(`${SidebarPage.RETAILER} New Salestracking`, () => {
  it('C184123 Salestracking Initiation - Cookies - Appointment Request from Sidebar', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184123');
    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Open Appointment Requests');
    AppointmentRequestPage.clickOnApptRequestOpt();

    speclib.addStepAutoNumber('Request random Appointment Request');
    AppointmentRequestPage.requestAppointmentByType(
      AppointmentRequestPage.getAppointmentTypeByRandom(),
      { email : `${Contact.email}`, info : 'Sidebar Appointment Salestracking' },
    );

    speclib.addStepAutoNumber('Verify request sent message');
    expect(AppointmentRequestPage.requestSentIsVisible()).toBe(true);

    speclib.addStepAutoNumber('Log in BO');
    SalesTrackingPage.openBoAndLoginByRole(NewLeadsPage.ROLE.rep, true);

    speclib.addStepAutoNumber('Accept new lead');
    NewLeadsPage.clickOnNewLeads();
    NewLeadsPage.acceptNewLead();

    speclib.addStepAutoNumber('Switch to sidebar window');
    SidebarPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Verify widget is visible');
    expect(SidebarPage.isWidgetVisible()).toBe(true);

    speclib.addStepAutoNumber('Refresh Sidebar page');
    SidebarPage.refreshPage(2000, { pauseForLocalStorage : true });

    if (SalesTrackingPage.isCookieTracking) {
      speclib.addStepAutoNumber('Verify Cookie Tracking');
      expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
      expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);
      expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-book-appointment');
    } else {
      speclib.addStepAutoNumber('Verify Local Storage');
      expect(LocalStoragePage.valueOfAcquisition()).toEqual('sidebar-book-appointment');
      expect(LocalStoragePage.valueOfTracking()).toEqual('true');
      expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SidebarPage.REP_NAME);
    }

    speclib.addStepAutoNumber('Refresh sidebar page');
    SidebarPage.refreshPage(5000, { pauseForLocalStorage : true });
    if (SalesTrackingPage.isCookieTracking) {
      speclib.addStepAutoNumber('Verify Cookie Tracking');
      expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-book-appointment');
      expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
      expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);
    } else {
      speclib.addStepAutoNumber('Verify Local Storage');
      expect(LocalStoragePage.valueOfAcquisition()).toEqual('sidebar-book-appointment');
      expect(LocalStoragePage.valueOfTracking()).toEqual('true');
      expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SidebarPage.REP_NAME);
    }

    if(!CookiePage.isProdEnv && SalesTrackingPage.hasProducts) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({ productId : 'fakeForC184123'});

      speclib.addStepAutoNumber('Switch to BO');
      SalesTrackingPage.switchToBackofficeWindow();

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s data:acquisition');
      expect(SALE.acquisition).toEqual('sidebar-book-appointment');

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_name');
      expect(SALE.customer_name).toEqual(SalesTrackingPage.transaction.customerName);

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_email');
      expect(SALE.customer_email).toEqual(SalesTrackingPage.transaction.customerEmail);

      speclib.addStepAutoNumber('Verify Sale\'s data:price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);

      speclib.addStepAutoNumber('Verify Sale\'s data:quantities');
      expect(SALE.quantities).toEqual(SalesTrackingPage.transaction.quantity);
    }
  });
});
