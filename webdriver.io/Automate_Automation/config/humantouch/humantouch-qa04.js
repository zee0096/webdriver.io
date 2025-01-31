module.exports = {
  lang : {
    en_US : {
      langName : 'en_US',
      sb       : {
        connect : {
          imLookingForAnInStoreStylist : 'span=I’m looking for an in-store stylist',
          iWantToConnectWithInSS       : 'span=I want to connect with an in-store stylist',
          defaultStoreLnk              : 'a=Toronto',
          chatWithInStoreStylistOption : 'span=Chat with an in-store stylist',
          iWantShedulAnAppointment     : 'span=I want to shedule an appointment',

        }
      }
    },
  },

  sb : {
    connect : {
      sales : {
        chatbot           : '.button-hit-box',
        cardsOnMainMenu   : "//ul[@class='css-qwomtc']",
        NextItemBtn       : "(//button[@aria-label='Next item'])[last()]",
        specialityOptions : '.css-1e8mnem',

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
    }
  }
};
