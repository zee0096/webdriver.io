const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const EmailMe = require('../../lib/emailme');
const AppointmentRequestPage = require('../../lib/appntrequest');
const PersonalShopper = require('../../lib/personalshopper');
const speclib = require('../../lib/speclib');

const { name } = TEST_DATA.request.sb;
const { phone } = TEST_DATA.request.sb;
const { email } = TEST_DATA.request.sb;
const { emailMessage } = TEST_DATA.request.sb;
const { appntMessage } = TEST_DATA.request.sb;
const { psMessage } = TEST_DATA.request.sb;

speclib.descSkipIf(SidebarPage.isProdEnv || !SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Sidebar New Leads`, () => {
  beforeEach(() => {
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
  });

  speclib.itSkipIf(!SidebarPage.hasEmailMeRequest)('C84744 Email Request from sidebar', () => {
    SidebarPage.clickOnWidgetIco();
    EmailMe.clickOnEmailMeOpt();
    EmailMe.requestEmailFrm(email, emailMessage, name, phone);
    expect(EmailMe.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(!SidebarPage.hasAppointmentRequest || !AppointmentRequestPage.hasLiveChatAppntTypeOpt)('C84745 Chat Appointment Request from sidebar', () => {
    SidebarPage.clickOnWidgetIco();
    AppointmentRequestPage.clickOnApptRequestOpt();
    AppointmentRequestPage.requestAppointmentByType(AppointmentRequestPage.APPOINTMENT_TYPE.chat, {
      email, info : appntMessage, name, phone,
    });
    expect(EmailMe.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(!SidebarPage.hasAppointmentRequest || !AppointmentRequestPage.hasInStoreAppntTypeOpt)('C84746 In-Store Appointment Request from sidebar', () => {
    SidebarPage.clickOnWidgetIco();
    AppointmentRequestPage.clickOnApptRequestOpt();
    AppointmentRequestPage.requestAppointmentByType(AppointmentRequestPage.APPOINTMENT_TYPE.store, {
      email, info : appntMessage, name, phone,
    });
    expect(EmailMe.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(!SidebarPage.hasAppointmentRequest || !AppointmentRequestPage.hasPhoneAppntTypeOpt)('C84747 Phone Appointment Request from sidebar', () => {
    SidebarPage.clickOnWidgetIco();
    AppointmentRequestPage.clickOnApptRequestOpt();
    AppointmentRequestPage.requestAppointmentByType(AppointmentRequestPage.APPOINTMENT_TYPE.phone, {
      email, info : appntMessage, name, phone,
    });
    expect(EmailMe.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(!PersonalShopper.hasPersonalShopper || !PersonalShopper.hasPersonalShopperInSb)('C84748 Personal Shopper Request from sidebar', () => {
    SidebarPage.clickOnWidgetIco();
    PersonalShopper.clickOnPersonalShopperOpt();
    PersonalShopper.requestPersonalShopperFrm({
      email, info : psMessage, phone,
    });
    expect(PersonalShopper.requestSentIsVisible()).toBeTruthy();
  });
});
