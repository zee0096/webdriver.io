module.exports = {
  lang : {
    en_US : {
      langName : 'en_US',
      sb       : {
        connect : {
          imLookingForAnInStoreStylist     : 'span=I’m looking for an in-store stylist',
          imLookingForStyleAdviceOption    : "span=I'm looking for style advice",
          iWantToConnectWithInSS           : 'span=I want to connect with an in-store stylist',
          bookAnAppointmentOptions         : 'span=Book an appointment',
          inAStoreOptions                  : 'span=In a store',
          onlineOptions                    : 'span=Online',
          defaultStoreLnk                  : 'a=Toronto',
          filterBySpecialtyBtn             : 'span=Filter by Specialty',
          filterByStoreBtn                 : 'span=Filter by Store',
          anyoneWouldWorkOption            : 'span=Anyone would work!',
          anyStoreWorksForMeOption         : 'span=Any store works for me!',
          chatWithInStoreStylistOption     : 'span=Chat with an in-store expert',
          getAReplyWithSmsOption           : 'span=Get a reply by sms'
        }
      }
    },
  },

  sb : {
    connect : {
      sales : {
        chatbotIframe            : "iframe[id='sf-notification-companion']",
        chatbot                  : '.button-hit-box',
        NextItemBtn              : "(//button[@aria-label='Next item'])[last()]",
        typeBtn                  : "[aria-label='Type a message']",
        customerServiceMenuCard  : "//h2[text()='Customer Service']",
        anyStoreWorksForMeOption : 'span=Any store works for me!',
        cardsOnMainMenu          : "//ul[@class='css-qwomtc']",
      },
      liveChat : {

        denysBtn        : "//button[contains(text(),'Deny')]",
        yesBtn          : "//button[contains(text(),'Yes')]",
        userNameTxt     : "[placeholder='Username']",
        passwordTxt     : "[placeholder='Password']",
        signInBtn       : "[value='Sign In']",
        homePageTitle   : "//a[text()='Home']",
        toggleSwitchBtn : "//span[contains(text(),'Yes')]",
      },
      iMLookingForInSS : {
        selectTestStore     : ".css-cutnha",
        connectBtn               : "//button[span='Connect']"
      }
    }
  }
};
