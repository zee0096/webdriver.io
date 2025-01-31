module.exports = {
    clientUrl: "https://www.pcaskin.com/daily-care-products",
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
        clickOnTakeQuiz:'div[id^="ChatBanner_PreChat_DefaultHeroBanner-ConductorCore_cta"]'

      },
      accept:{
        btn:'button[id="truste-consent-button"]'
      },
    lang: {
      en_US: [{
        testId: "straight/coarse",
        urlrecommendationPage:'https://www.pcaskin.com/daily-care-products',
        
        questions: [
          {
            question: "Hello, I'm Margo, your virtual PCA SKIN expert. I'm here to help you find the best products for your skin concerns.",
            answer: "Not yet!",
            options: ["Of course!","Not yet!"],
            images: [""
            ],
          },
          {
            question: "We're happy to have you back! Which skin type best describes your skin?",
            answer: "Dry Skin",
            options: ["Dry Skin", "Normal Skin", "Oily Skin", "Combination Skin"],
            images: [],
          },
          {
            question: "Are you looking for a complete regimen or something specific?",
            answer: "Cleanser",
            options: ["Regimen", "Moisturizer", "Cleanser", "Toner", "Body", "Mask or Exfoliants", "Serum", "Eyes, Neck and Lip", "SPFs", "Retinols"],
            images: [],
          },
          {
            question: "Perfect! Now let me understand more of your skin needs. What's the main improvement you'd like to see in your skin? Click or type your goals below:",
            answer: "Preventative",
            options: ["Preventative", "Aging", "Discoloration", "Acne", "Sensitive Skin"],
            images: [],
          },
          {
            question: "Okay, I have several products that could help to prevent your skin from aging, so let’s cater to your specific needs👌 Do you spend a lot of time in the sun without SPF protection? ",
            answer: "Yes",
            options: ["Yes", "Not really, no", "Please explain"],
            images: [],
          },
          {
            question: "Are you starting to see some fine lines?",
            answer: "Yes, a bit",
            options: ["Yes, a bit", "No"],
            images: ["",
            ],
          },
          {
            question: "Are you concerned about radiance loss?",
            answer: "Yes, I need glow",
            options: ["Yes, I need glow", "Mhm, somewhat", "No, not really", "Please explain"],
            images: [""
            ],
          },
          {
            question: " Just before I show you your recommendations I have a quick question. Do you want to sign up for our newsletter and get the scoop on our new products? P.S. it comes with a welcome present - free shipping on your order! ",
            answer: "Not now",
            options: ["Sign me up", "I'm already signed up!", "Not now"],
            images: [""
            ],
          },
        ],
        recommendations: [{
          image: "https://www.pcaskin.com/media/catalog/product/cach…a3a75920894/d/a/daily-cleansing-oil-1200x1200.jpg",
          productName: "Daily Cleansing Oil",
          options: ["Why this Product?", "See Product Page", "Add to Cart"]
        },
        {
          image: "https://www.pcaskin.com/media/catalog/product/cach…b48559a3a75920894/f/a/facial-wash-1200x1200_1.jpg",
          productName: "Facial Wash",
          options: ["Why this Product?", "See Product Page", "Add to Cart"]
        },
        ],
      }
      ],
    }
  }