module.exports = {
    clientUrl: "https://store.us.filorga.com/",
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
        clickClosePopup : 'button[class="sc-fznWOq cqDPIl privy-dismiss-content"]',
      },
      scrollSelector:{
       privacyPolicy:'span.css-5bgwy4',
      },
      Quiz:{
        clickOnTakeQuiz:'button.css-sr3rnv',  
      },
      accept:{
        btn:'button[id="truste-consent-button"]'
      },
    lang: {
      en_US: [{
        testId: "straight/coarse",
        isSyncQuestion: true,        
        questions: [
          {
            question: "Have you used our products before?",
            answer: "Yes",
            options: ["Yes", "No, it's my first time"],
            images: [""
            ],
          },
          {
            question: "Let's begin. What's your skin type?",
            answer: "Oily",
            options: ["Oily", "Dry", "Combination", "Normal", "I'm not sure"],
            images: [],
          },
          {
            question: "Our products consider where you are in life. Which of the following describes your age group?", 
            answer: "Under 24",
            options: ["Under 24", "25-34", "35-44", "45-54", "55 and over", "I'd prefer not to say"],
            images: [],
          },
          {
            question: "Which specific areas would you like to focus on today?",
            answer: "Face, eyes and lips",
            options: ["Face, eyes and lips", "Eyes", "Face only"],
            images: [],
          },
          {
            question: "Sounds good! What is your main skincare concern? If you have more than one, you'll be able to add it later.", 
            answer: "Signs of aging",
            options: ["Signs of aging", "Dry skin", "Uneven or dull tone"],
            images: [],
          },
          {
            question: "Do you want to minimize the appearance of fine lines and wrinkles?",
            answer: "Yes, for sure",
            options: ["Yes, for sure", "No"],
            images: ["",
            ],
          },
          {
            question: "Are you experiencing a lack of firmness in any areas of your face?",
            answer: "Yes",
            options: ["Yes", "Some", "No", "Please explain"],
            images: [""
            ],
          },
          {
            question: "Do you feel like your skin is lacking elasticity?",
            answer: "Yes",
            options: ["Yes", "Some", "Not really", "Please explain"],
            images: [""
            ],
          },
          {
            question: "Great! We've discussed your concern about signs of aging. Is there another skin concern you'd like to address before moving to the final steps?",
            answer: "No, let's keep going",
            options: ["Yes please", "No, let's keep going"],
            images: [""
            ],
          },
          {
            question: "Eye contours are delicate and require special attention. When it comes to your eyes, you want to focus on:",
            answer: "None of these",
            options: ["Correcting dark circles", "Minimizing crow's feet", "Reducing puffiness", "None of these"],
            images: [""
            ],
          },
          {
            question: "For your lip care, which are you concerned about?",
            answer: "None of these",
            options: ["Dry lips", "Lack of volume", "None of these"],
            images: [""
            ],
          },
          {
            question: "Last question. When do you prefer to do your skincare routine?",
            answer: "Morning",
            options: ["Morning", "Evening", "Both morning and evening", "It depends"],
            images: [""
            ],
          },
          {
            question: "Great! Before I show you your personalized recommendations, would you like to receive beauty tips and special offers from Laboratoires FILORGA?",
            answer: "I'm already signed up",
            options: ["Yes, sign me up", "I'm already signed up", "Maybe later"],
            images: [""
            ],
          },
        ],
        recommendations: [{
          image: "",
          productName: "FOAM CLEANSER",
          options: ["Add to Cart", "Why this Product?", "See Product Page"]
        },
        {
          image: "",
          productName: "TIME-FILLER",
          options: ["Add to Cart", "Why this Product?", "See Product Page"]
        },
        {
            image: "",
            productName: "MESO-MASK",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
          {
            image: "",
            productName: "TIME-ZERO",
            options: ["Add to Cart", "Why this Product?", "See Product Page"]
          },
        ],
      }
      ],
    }
  }