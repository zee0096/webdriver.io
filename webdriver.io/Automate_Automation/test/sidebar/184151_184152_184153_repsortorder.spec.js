// repSortOrder.js
const LiveChat = require('../../lib/livechat');
const SidebarPage = require('../../pages/sidebar.page');
const speclib = require('../../lib/speclib');

const strToCheck = 'Ja';

speclib.descSkipIf(
  SidebarPage.isProdEnv || SidebarPage.isTeamMode || !SidebarPage.hasSidebar || !SidebarPage.hasSearchAdvisorInSidebar,
)(`${SidebarPage.RETAILER} Rep Sort Order`, () => {
  before(() => {
    LiveChat.widgetWindowComingFrom = LiveChat.IT_IS_COMMING_FROM.sidebar;
    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Click on widget ico');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on search an associate link');
    LiveChat.clickOnSearchAnAssociateLnk();
  });

  beforeEach(() => {
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addModule(speclib.ALLURE.module.sidebar);
  });

  it('C184151 As a Customer, by default list of reps should be in alphabetical order)', () => {
    speclib.addTestId('184151');
    speclib.addStepAutoNumber('Get and sort reps name');
    const { unsortedReps, sortedReps } = SidebarPage.sortRepsNames();
    speclib.addStepAutoNumber('Verify rep names are sorted properly');
    expect(JSON.stringify(unsortedReps)).toEqual(JSON.stringify(sortedReps));
  });

  it('C73089 As a customer, list of reps when searching for a rep is shown in alphabetical order)', () => {
    speclib.addTestId('184152');
    speclib.addStepAutoNumber('Set value to search box');
    SidebarPage.searchBox.setValue(strToCheck);
    browser.pause(2000);
    if (SidebarPage.repNames.length > 0) {
      speclib.addStepAutoNumber('Get and sort reps name');
      const { unsortedReps, sortedReps } = SidebarPage.sortRepsNames();
      const contains = unsortedReps.every((r) => r.toLowerCase().includes(strToCheck.toLowerCase()));
      speclib.addStepAutoNumber('Verify all filtered rep names contain value from search box');
      expect(contains).toBeTruthy();
      speclib.addStepAutoNumber('Verify rep names are sorted properly');
      expect(JSON.stringify(unsortedReps)).toEqual(JSON.stringify(sortedReps));
    } else {
      speclib.addStepAutoNumber('Verify empty list text is displayed');
      expect(SidebarPage.emptyListText.isDisplayed()).toBeTruthy();
    }
  });

  it('C184153 As a customer, I can filter list of reps by specialties on retailers that support it)', () => {
    speclib.addTestId('184153');
    speclib.addStepAutoNumber('Set value to search box');
    SidebarPage.searchBox.setValue(strToCheck);
    if (SidebarPage.filterCategory.isDisplayed()) {
      speclib.addStepAutoNumber('Filter by first category');
      SidebarPage.filterCategory.selectByIndex(0);
    }
    browser.pause(2000);
    if (SidebarPage.repNames.length > 0) {
      speclib.addStepAutoNumber('Get and sort reps name');
      const { unsortedReps, sortedReps } = SidebarPage.sortRepsNames();
      const contains = unsortedReps.every((r) => r.toLowerCase().includes(strToCheck.toLowerCase()));
      speclib.addStepAutoNumber('Verify all filtered rep names contain value from search box');
      expect(contains).toBeTruthy();
      speclib.addStepAutoNumber('Verify rep names are sorted properly');
      expect(JSON.stringify(unsortedReps)).toEqual(JSON.stringify(sortedReps));
    } else {
      speclib.addStepAutoNumber('Verify empty list text is displayed');
      expect(SidebarPage.emptyListText.isDisplayed()).toBeTruthy();
    }
  });
});
