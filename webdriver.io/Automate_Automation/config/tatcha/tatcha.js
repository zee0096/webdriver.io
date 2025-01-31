module.exports = {
    clientUrl: "https://www.tatcha.com/category/shop-all/?page=1",
    hasQuiz: true,
    hasLure: true,
    languages: ["en_US"],
    env       : {
        lureIframeId    : 'iframe[title="Virtual Product Advisor"]',
      },
      popup : {
        // when empty popup doesn't use iframe
        iFramePopup     : 'iframe[title="attentive_creative"]',
        // clickClosePopup : 'closeIconContainer',
        clickClosePopup : 'close-form',
        //clickClosePopup:'popup-subcription-backgrounds-container-66d401e6-d7ac-49f3-b6ce-93e7dbc605da'

      },
      banner:{
        clickClosePopup : 'img[aria-label="Popup Close Button"]',

      },

      Quiz:{
        clickOnTakeQuiz:'button[aria-label="Take the Quiz"]'

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
            question:"First question... How would you describe your skin today?",
            answer: "Dry to Mature",
            options: ["Dry to Mature","Combo to Dry", "Combo to Oily", "Oily", "How can I tell"],
            images: [""
            ],
          },
          {
            question: "And are you looking for a specific product or for your complete skincare ritual?",
            answer: "My complete ritual",
            options: ["My complete ritual", "Moisturizer", "Cleanser", "Mask", "Face Exfoliator", "Eye Cream", "Essence & Serums"],
            images: [],
          },
          {
            question: "Now, what's the main thing you'd like to improve about your skin right now? Click or type your goals below ",
            answer: "Moisturizing",
            options: ["Moisturizing", "Calming", "Healthy Aging", "Brightening", "Clarifying"],
            images: [],
          },
          /*{
            question: "Okay, I have a bunch of products that could help with dehydration, so let’s narrow it down for your skin. How often do you notice your skin feeling tight?",
            answer: "Preventative",
            options: ["Preventative", "Aging", "Discoloration", "Acne", "Sensitive Skin"],
            images: [],
          },*/
          {
            question: "Okay, I have several products that could help to prevent your skin from aging, so let’s cater to your specific needs👌 Do you spend a lot of time in the sun without SPF protection? ",
            answer: "Very often",
            options: ["Very often", "Ocasionally", "Rarely", "Please explain"],
            images: [],
          },
          {
            question: "Does your skin sometimes get dry, flaky patches?",
            answer: "Yes",
            options: ["Yes", "No", "Please explain"],
            images: ["",
            ],
          },
          {
            question: "Does your skin usually appear dull or radiant?",
            answer: "Dull",
            options: ["Dull", "Radiant", "Please explain"],
            images: [""
            ],
          },
          {
            question: "Okay thanks! Now I have good sense of how dehydration affects your skin. Now, do you want any help with the area around your eyes?",
            answer: "Yes",
            options: ["Yes", "No"],
            images: [""
            ],
          },
          {
            question: "Are you worried about wrinkles or crow's feet around your eyes? ",
            answer: "Yes",
            options: ["Yes", "No", "Please explain"],
            images: [""
            ],
          },
          {
            question: "Does the area around your eyes feel like it needs some extra hydration and moisture?",
            answer: "Yes",
            options: ["Yes", "No"],
            images: [""
            ],
          },
          {
            question: "Are dark circles under the eyes a common occurrence for you?",
            answer: "Yes",
            options: ["Yes", "No"],
            images: [""
            ],
          },
          {
            question: "Are you looking to reduce the appearance of puffiness?",
            answer: "Yes",
            options: ["Yes", "No"],
            images: [""
            ],
          },
          {
            question: "When do you like to do your skincare ritual?",
            answer: "In the morning",
            options: ["In the morning", "At night", "Morning+night"],
            images: [""
            ],
          },
          {
            question: "How many products do you like to use?",
            answer: "Less than 4",
            options: ["Less than 4", "4", "5 or more"],
            images: [""
            ],
          },
          {
            question: "Does the area around your eyes feel like it needs some extra hydration and moisture?",
            answer: "Not now",
            options: ["Sign me up", "I'm already signed up!", "Not now"],
            images: [""
            ],
          },
        ],
        recommendations: [{
          image: "https://www.tatcha.com/dw/image/v2/BCFF_PRD/on/dem…PolishRepack_FS_CapOnFrontFacing_1200X1200_V2.jpg",
          productName: "The Rice Polish: Gentle",
          options: ["Why this Product?", "See Product Page", "Add to Bag"]
        },
        {
          image: "https://www.tatcha.com/dw/image/v2/BCFF_PRD/on/dem…DeepHydrationEyeSerum_FS_Open_PPage_1200x1200.jpg",
          productName: "Luminous Deep Hydration Firming Eye Serum",
          options: ["Why this Product?", "See Product Page", "Add to Bag"]
        },
        {
            image: "https://www.tatcha.com/dw/image/v2/BCFF_PRD/on/dem…5cdd/images/large/Silk-Cream-New-Crop-V2.1.21.jpg",
            productName: "The Silk Cream",
            options: ["Why this Product?", "See Product Page", "Add to Bag"]
          },
        ],
      }
      ],
    }
  }