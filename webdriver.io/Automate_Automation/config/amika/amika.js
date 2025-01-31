module.exports = {
  clientUrl : 'https://loveamika.com/',
  // clientUrl: "https://loveamika.com/?_ab=0&_fd=0&_sc=1&preview_theme_id=120675369026",
  hasQuiz   : true,
  hasLure   : true,
  languages : ['en_US'],
  env       : {
    acceptCookieBtn : 'button[aria-label="accept"]',
    lureIframeId    : 'iframe[title="Virtual Product Advisor"]',
  },
  lure : {
    clickOnlure : 'img[alt="Tap to open chat."]',
  },
  popup : {
    iFramePopup     : "iframe[id='attentive_creative]",
    clickClosePopup : "button[id='closeIconContainer']"
  },

  lang : {
    en_US : [{
      testId    : 'straight/corse',
      questions : [
        {
          question : "first question... what's your hair type?",
          answer   : 'straight',
          options  : ['straight', 'wavy', 'curly', 'coily', 'kinky'],
          images   : ['https://cda.automat-ai.com/assets/AMIKA/Cropped+Hair+Types/automat-straight.png',
            'https://cda.automat-ai.com/assets/AMIKA/Cropped+Hair+Types/auto-mat-wavy.png',
            'https://cda.automat-ai.com/assets/AMIKA/Cropped+Hair+Types/automat-curly.png',
            'https://cda.automat-ai.com/assets/AMIKA/Cropped+Hair+Types/automat-coily.png',
            'https://cda.automat-ai.com/assets/AMIKA/Cropped+Hair+Types/automat-kinky.png',
          ],
        },
        {
          question : 'you would describe your hair as...',
          answer   : 'coarse',
          options  : ['coarse', 'medium', 'fine', "I'm not sure, help!"],
          images   : [],
        },
        {
          question : 'has your hair been chemically processed or treated?',
          answer   : 'yes',
          options  : ['yes', 'nno', 'explain please'],
          images   : [],
        },
        {
          question : 'okay, I have a few more questions, but first I was wondering... do you have a product type in mind or do you want a new hair routine?',
          answer   : 'shampoo',
          options  : ['routine please', 'shampoo', 'conditioner', 'mask or treatment', 'dry shampoo', 'styling product', 'value sets'],
          images   : [],
        },
        {
          question : "okay! now, what's your main hair goal? if you have more than one, you can type them in below ",
          answer   : 'hydrate + repair 💧',
          options  : ['hydrate + repair 💧', 'color', 'curls', 'cleanse'],
          images   : [],
        },
        {
          question : "ookay, I can definitely help you find some nourishing + reparative products. to get a better idea of the right products for you, I'll ask a couple questions. you ready? ",
          answer   : 'skip to recommendations',
          options  : ["yes, let's go!", 'skip to recommendations'],
          images   : ['https://cda.automat-ai.com/assets/AMIKA/Icons/repair.png',
            'https://cda.automat-ai.com/assets/AMIKA/Icons/color.png',
            'https://cda.automat-ai.com/assets/AMIKA/Icons/curl.png',
            'https://cda.automat-ai.com/assets/AMIKA/Icons/detox.png',
          ],
        },
        {
          question : 'just before I show you your recommendations, I have a quick question. do you want to take our friendship to the next level? ',
          answer   : 'not now',
          options  : ['sign me up', "I'm already signed up!", 'not now'],
          images   : ['',
          ],
        },
      ],
      recommendations : [{
        image       : 'https://cdn.shopify.com/s/files/1/2117/1151/products/Amika_Smooth_VelveteenDream_SmoothingShampoo_300ml_new_1754bb75-37ac-43e6-9456-2ae9bbb9f59b.png?v=1636482941',
        productName : 'velveteen dream smoothing shampoo',
        options     : ['why this product?', 'product details page', 'add to cart'],
      },
      {
        image       : 'https://cdn.shopify.com/s/files/1/2117/1151/produc…_2769-RGB-trans-shadow-2000x2000.png?v=1648230236',
        productName : 'bust your brass cool blonde repair shampoo',
        options     : ['why this product?', 'product details page', 'add to cart'],
      },
      ],
      mainOptions : ['shop all', 'message an expert', 'restart', 'done'],
    },
    ],
  },
};
