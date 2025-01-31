module.exports = {
    clientUrl: "https://www.marketviewliquor.com/category/wine-red",
    hasQuiz: true,
    hasLure: true,
    languages: ["en_US"],
    env       : {
        // when accept button is empty, user doesn't use cookie
        acceptCookieBtn : 'Accept',
        lureIframeId    : 'iframe[title="Virtual Product Advisor"]',
      },
      popup : {
        iFramePopup    : 'iframe[title="attentive_creative"]',
        clickClosePopup : 'div[id="ltkpopup-close-button"]',
      },
      ageVerification:{
        clickAgeVerification:'button[class="c-button u-cta-style--primary"]'
      },
      Quiz:{
        clickOnTakeQuiz:'button[class="css-191ncmp"]',
      },
      accept:{
        btn:'button[id="truste-consent-button"]'
      },
    lang: {
      en_US: [{
        testId: "straight/coarse",
        isSyncQuestion: true,
        urlrecommendationPage:'https://www.pcaskin.com/daily-care-products',
        
        questions: [
          {
            question: "First of all, what's the occasion that calls for red wine?",
            answer: "Every day",
            options: ["I'm just browsing","Every day", "Dinner", "A party", "A special occasion", "A gift"],
            images: [""
            ],
          },
          {
            question: "By the way, if you don't have much knowledge but want to learn, you should go the technical route. I'll help you along.",
            answer: "Low",
            options: ["Low", "Medium", "High"],
            images: [],
          },
          {
            question: "Are you looking to pair it with food?", //got A/B test here
            answer: "Yes",
            options: ["Yes", "No"],
            images: [],
          },
          {
            question: "How would you describe food?",
            answer: "Light",
            options: ["Light", "Delicate", "Acidic", "Salty", "Light meat", "Red meat", "Red sauce", "Rich", "Earthy", "Spicy", "Sweet", "None of these"],
            images: [],
          },
          {
            question: "Which fruits could you never get sick of?", // A/B test here
            answer: "No preference",
            options: ["Tree Fruit", "Citrus Fruit", "Tropical Fruit", "Black Fruit", "Dried Fruit", "No preference"],
            images: [],
          },
          {
            question: "Which scent do you go for?",
            answer: "None of these",
            options: ["Vanilla Bean", "Ocean Spray", "Rose", "Fresh-Baked Bread", "Pine Tree", "Ginger", "Caramel Mocha", "Mint", "Honeysuckle", "None of these"],
            images: ["",
            ],
          },
          {
            question: "How do you like your lemonade?",
            answer: "Very sour",
            options: ["Very sour", "Kind of sour", "Balanced", "I prefer fruit juice"],
            images: [""
            ],
          },
          {
            question: "What's your favorite kind of chocolate?",
            answer: "Very sour",
            options: ["Milk", "30% Dark", "75% Dark", "Why do you ask?"],
            images: [""
            ],
          },
          {
            question: "Did you have a budget in mind?",
            answer: "Under $10",
            options: ["Under $10", "$10-$20", "$20-$40", "$40-$60", "$60+", "No preference"],
            images: [""
            ],
          },
        ],
        recommendations: [{
          image: "https://www.marketviewliquor.com/mm5/graphics/00000001/LATERREMERLOT750.jpg",
          productName: "La Terre Merlot / 750 ml",
          options: ["Add to Cart", "Why this Product?", "See Product Page"]
        },
        {
          image: "https://www.marketviewliquor.com/mm5/graphics/00000001/GOUGUENHEIMMALBEC.jpg",
          productName: "Gouguenheim Malbec / 750 ml",
          options: ["Add to Cart", "Why this Product?", "See Product Page"]
        },
        {
            image: "https://www.marketviewliquor.com/mm5/graphics/00000001/FLACOTEMPRANILLO.jpg",
            productName: "Flaco Tempranillo / 750mL",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
          {
            image: "https://www.marketviewliquor.com/mm5/graphics/00000001/CASTILLODEMONSERANGARNACHA.jpg",
            productName: "Castillo de Monseran Garnacha / 750mL",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
          {
            image: "https://www.marketviewliquor.com/mm5/graphics/00000001/CAMPOSDELUZGARNACHA.jpg",
            productName: "Campos de Luz Garnacha / 750mL",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
          {
            image: "https://www.marketviewliquor.com/mm5/graphics/00000001/EQUILIBRIOMONASTRELLSYRAH.jpg",
            productName: "Equilibrio Monastrell-Syrah / 750mL",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
        ],
      }
      ],
    }
  }