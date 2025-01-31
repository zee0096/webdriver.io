module.exports = {
  lang : {
    en_US : {
      langName : 'en_US',
      sb       : {
        connect : {
          browseAssociatesOption        : 'span=Browse Associates',
          iNeedHelpWithMyOrderOption    : 'span=I need help with my order',
          iWantShedulAnAppointment      : 'span=I want to shedule an appointment',
          iMLookingForAnAssociateOption : 'span=I’m looking for an Associate',
          inAStoreOptions               : 'span=In a store',
          onlineOptions                 : 'span=Online',
          getAnAnswerByEmailOptions     : 'span=Get an answer by email',
          bookOnlineAppointmentOption   : 'span=Book an online appointment',
          getAReplyBySmsOptions         : 'span=Get a reply by SMS',
          filterBySpecialtyBtn          : 'span=Filter by Specialty',
          filterByStoreBtn              : 'span=Filter by Store',
          imLookingForAnInStoreStylist  : 'span=I’m looking for an expert',
          defaultStoreLnk               : 'a=Toronto',
          yesThisIsMyStore              : 'span=Yes, this is my store',
          yesLetMeFindAnExpert          : 'span=Yes, let me find an expert',
          anyoneWouldWork               : 'span=Anyone would work!',
          iWantToConnectWithAnExpert    : 'span=I want to connect with an expert',
          chatWithAnExpert              : 'span=Chat with an expert',
          anyStoreWorksForMeOption      : 'span=Any store works for me!',
        }
      }
    },
  },

  sb : {
    connect : {
      sales : {
        chatbotIframe   : "iframe[id='sf-automat-companion']",
        chatbot         : '.button-hit-box',
        NextItemBtn     : "(//button[@aria-label='Next item'])[last()]",
        typeBtn         : "[aria-label='Type a message']",
        cardsOnMainMenu : "//ul[@class='css-qwomtc']",

      },
      iHaveProductQuestions : {
        findAnotherStoreBtn : "//span[text()='Find another store']",
        chatPopupCloseBtn   : "//button[@aria-label='Close Chat']",
      },
      imLookingForAnAssociate : {
        typeSendMessageBtn : "[aria-label='Send Message']",
        selectATimeAndDate : 'span=Select a Time & Date',
      },
      liveChat : {
        userNameTxt              : "[placeholder='Username']",
        passwordTxt              : "[placeholder='Password']",
        signInBtn                : "[value='Sign In']",
        homePageTitle            : "//a[text()='Home']",
        toggleSwitchBtn          : "//span[contains(text(),'Yes')]",
        appointmentRequestOption : "//h2[text()='Appointment']",
        styleAdviceOption        : "//h2[text()='Style']",
        contactMeOption          : "//h2[text()='Contact']",
        availableNowOnLive       : "//h2[text()='Live Chat']/..//span[text()='Available Now']",
        unavailableOnLive        : "//h2[text()='Live Chat']/..//span[text()='Unavailable']",
        yesbutton                : "//button[contains(text(),'Yes')]",

      }
    }
  }
};
