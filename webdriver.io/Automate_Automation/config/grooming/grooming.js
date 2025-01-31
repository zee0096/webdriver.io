module.exports = {
    clientUrl: "https://www.harryrosen.com/en/shop/grooming",
    hasQuiz: true,
    hasLure: true,
    languages: ["en_US"],
    env       : {
        // when accept button is empty, user doesn't use cookie
        acceptCookieBtn : 'Accept',
        lureIframeId    : 'iframe[title="Virtual Product Advisor"]',
      },
      banner:{
        clickclosePcaSkinPopup : 'img[aria-label="Popup Close Button"]',

      },
      popup : {
        iFramePopup    : 'iframe[title="attentive_creative"]',
        clickClosePopup : 'img[aria-label="Popup Close Button"]',
      },
      quiz:{
        clickOnTakeQuiz:'button[class="css-19cn8x2"]'

      },
      accept:{
        btn:'button[id="truste-consent-button"]'
      },
    lang: {
      en_US: [{
        testId: "straight/coarse",        
        questions: [
          {
            question: "To start, tell me... Have you shopped at Harry Rosen before?",
            answer: "Yes",
            options: ["Yes","No"],
            images: [""
            ],
          },
          {
            question: "Let's be a bit more specific. What's your main concern?",
            answer: "Skin Care",
            options: ["Shaving + Beard Care", "Skin Care", "Hair Care", "Body Care", "Fragrance"],
            images: [],
          },
          {
            question: "Which skin type best describes your skin?",
            answer: "Dry Skin",
            options: ["Dry Skin", "Normal Skin", "Oily Skin", "Combination Skin"],
            images: [],
          },
          {
            question: "Do you use to spend a lot of time in the sun without SPF protection?",
            answer: "Yes!",
            options: ["Yes!", "No", "Please explain"],
            images: [],
          },
          {
            question: "Do you want to target wrinkles and fine lines?",
            answer: "Yes, definitely!",
            options: ["Yes, definitely!", "Not really, no"],
            images: [],
          },
          {
            question: "Are you concerned about radiance loss?",
            answer: "Skip to my recommendations",
            options: ["Yes, let's narrow my results!", "Skip to my recommendations"],
            images: [""
            ],
          },
        ],
        recommendations: [{
          image: "https://i1.adis.ws/i/harryrosen/20071558099",
          productName: "Willowherb Face Cleanser in Refill Pouch",
          options: ["Why this One?", "See Product Page", "Add to Cart"]
        },
        {
          image: "https://i1.adis.ws/i/harryrosen/20053071",
          productName: "Research Crème Concentrate",
          options: ["Why this One?", "See Product Page", "Add to Cart"]
        },
        {
            image: "https://i1.adis.ws/i/harryrosen/20071611075",
            productName: "Research Intensive Treatment Emulsion",
            options: ["Why this One?", "See Product Page", "Add to Cart"]
          },
          {
            image: "https://i1.adis.ws/i/harryrosen/20075220099",
            productName: "Under Eye Cream",
            options: ["Why this One?", "See Product Page", "Add to Cart"]
          },
        ],
      }
      ],
    }
  }