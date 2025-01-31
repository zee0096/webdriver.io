const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SidebarPage.RETAILER !== 'hbc')(`${SidebarPage.RETAILER} Check Sidebar HTML Page`, () => {
  it('C180613 Validate that head of the html landing page contains the hotjar code'
  + 'and landing page service form contains tag data-hj-allow-iframe in all service forms', () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180613');

    speclib.addStepAutoNumber('Open sidebar page and click on Widget');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    SidebarPage.clickOnWidgetIco();

    // such declaration is intentional
    const hotJarScript = '<script>\n'
      + '    (function(h,o,t,j,a,r){\n'
      + '      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n'
      + '      h._hjSettings={hjid:2933888,hjsv:6};\n'
      + '      a=o.getElementsByTagName(\'head\')[0];\n'
      + '      r=o.createElement(\'script\');r.async=1;\n'
      + '      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n'
      + '      a.appendChild(r);\n'
      + '    })(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');\n'
      + '  </script>';

    const scripts = $$('head script');
    let result = false;

    scripts.every((line) => {
      if (line.getHTML() === hotJarScript) { // should be //head//script[15]
        result = true;
        return false;
      }
      return true;
    });

    speclib.addStepAutoNumber('Verify the hotjar script presence in the source code');
    expect(result).toBeTruthy();

    speclib.addStepAutoNumber('Verify the data-hj-allow-iframe presence');
    const iframe = $('iframe#sf-services-landing');
    expect(iframe.getHTML()).toContain('data-hj-allow-iframe');
  });
});
