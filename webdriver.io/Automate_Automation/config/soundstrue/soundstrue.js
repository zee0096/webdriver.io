module.exports = {
    // clp test for soundstrue
    clientUrl : 'https://www.soundstrue.com/collections/mindfulness',
    // clientUrl: "https://loveamika.com/?_ab=0&_fd=0&_sc=1&preview_theme_id=120675369026",
    hasQuiz   : true,
    hasLure   : true,
    languages : ['en_US'],
    env       : {
      acceptCookieBtn : 'a[id="CybotCookiebotDialogBodyButtonAccept"]',
      lureIframeId    : 'iframe[title="Virtual Product Advisor"]',
    },
    Quiz : {
      clickOnTakeQuiz : 'button[class="css-16j4zce"]',
      quizIFrame: '[id^=automat-webchat-1e]'
    },
    popup : {
      iFramePopup    : 'iframe[id="attentive_creative"]',
      clickClosePopup : 'button[id="closeIconContainer"]',
    },
    ageVerification:{
      clickAgeVerification:'button[class="c-button u-cta-style--primary"]'
    },
    lang : {
      en_US : [{
        testId    : 'straight/corse',
        isSyncQuestion: true,
        questions : [
          {
            question : "First of all.. Are you feeling in touch with yourself today?",
            answer   : 'Very much',
            options  : ['Very much', 'Kind of', 'Hardly', 'I m not sure'],
            images   : [ ],
          },
          {
            question : 'Now, what are we going to look for together today?',
            answer   : 'Something for me',
            options  : ['Something for me', 'Professional resources', 'Music'],
            images   : [],
          },
          {
            question : 'Which of these practices speaks most to you?',
            answer   : 'Energy healing',
            options  : ['Reiki', 'Sound healing', 'Energy healing', 'Dreamwork', 'Chakras', 'Ayurveda', 'General subtle energy practices','I m not sure'],  // A/B test got for mindfulness flow in this question
            images   : [],
          },
          {
            question : "Which of the following interests you right now? Don't worry, you can add another one later.",
            answer   : 'Spirituality',
            options  : ["Mindfulness", "Spirituality", "Self-Development", "Health & Healing", "Relationships", "Trauma", "Something else"],
            images   : ['',
            ],
          },
          {
            question : "Which area of spirituality should we explore?",
            answer   : 'Shamanism',
            options  : ["Storytelling and Myth", "Shamanism", "Tradional Religions", "Esoteric and Divination"],
            images   : ['',
            ],
          },
          {
            question : "That's starting to give me a good idea about your interest in mindfulness. Do you want to keep talking or skip to your recommendations? ",
            answer   : 'Skip to recommendations',
            options  : ["Let's keep going", "Skip to recommendations"],
            images   : ['',
            ],
          },
          {
            question : 'Thank you for answering all of those questions! One last question before I share some recommendations. Would you like to sign up to get emails from us with special offers and news on our latest releases? ',
            answer   : 'No thank you',
            options  : ['I would sign me up', "I'm already signed up!", 'No thank you'],
            images   : ['',
            ],
          },
        ],
        recommendations : [{
          image       : 'https://cdn.shopify.com/s/files/1/0253/2822/2307/products/AlltheTimeintheWorld1.jpg?v=1637169022',
          productName : 'Plant Spirit Medicine',
          options     : ['ADD TO CART', 'Why this product?', 'Product details'],
        },
        {
          image       : 'https://cdn.shopify.com/s/files/1/0253/2822/2307/p…ourage-to-love-published-cover_2.jpg?v=1583897346',
          productName : 'Wiccan Meditations',
          options     : ['ADD TO CART', 'Why this product?', 'Product details'],
        },
        {
            image       : 'https://cdn.shopify.com/s/files/1/0253/2822/2307/products/357.jpg?v=1615581287',
            productName : 'Meeting Your Power Animal or Guardian Spirit',
            options     : ['ADD TO CART', 'Why this product?', 'Product details'],
          },
          {
            image       : '	https://cdn.shopify.com/s/files/1/0253/2822/2307/products/470.jpg?v=1583898369',
            productName : 'Tending to the Sacred',
            options     : ['ADD TO CART', 'Why this product?', 'Product details'],
          },
          {
            image       : 'https://cdn.shopify.com/s/files/1/0253/2822/2307/products/470.jpg?v=1583898369',
            productName : 'Self-Healing with Sound & Music',
            options     : ['ADD TO CART', 'Why this product?', 'Product details'],
          },
        ],
      },
      ],
    },
  };
  