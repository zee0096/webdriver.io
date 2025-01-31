module.exports = {
  clientUrl : 'https://eva-nyc.com/',
  hasQuiz   : true,
  hasLure   : true,
  languages : ['en_US'],
  env       : {
    acceptCookieBtn : '//button[text()="Accept"]',
    lureIframeId    : 'iframe[title="Virtual Product Advisor"]'
  },
  lure : {
    clickOnlure : 'img[alt="Tap to open chat."]'
  },
  popup : {
    iFramePopup     : 'attentive_creative',
    clickClosePopup : "svg[id='closeIconSvg']"
  },
  lang : {
    en_US : [{
      testId    : 'straight/coarse',
      questions : [
        {
          question : "First of all, what's your hair type?",
          answer   : 'Straight',
          options  : ['Straight', 'Wavy', 'Curly', 'Coily', 'Kinky'],
          images   : [''],
        },
        {
          question : 'you would describe your hair as...',
          answer   : 'Coarse',
          options  : ['Fine', 'Medium', 'Coarse', "I'm not sure, Help please!"],
          images   : [],
        },
        {
          question : 'Now that you know our products are as down to earth as we are... Do you already have a product type in mind or do you want a new hair routine?',
          answer   : 'Styling tool',
          options  : ['Complete hair routine', 'Styling tool', 'Shampoo & Conditioner', 'Mask or Treatment', 'Styling Product', "I don't know yet... surprise me!"],
          images   : [],
        },
        {
          question : 'Okay! Let’s start with perhaps the most shared concern in the hair care world... frizz! Does your hair get frizzy throughout the day?',
          answer   : "That's me!",
          options  : ["That's me!", 'sometimes', 'not really'],
          images   : [],
        },
        {
          question : 'When you heat style your hair, what look are you going for?',
          answer   : 'Blowout',
          options  : ['Blowout', 'Straight', 'Wavy', 'Curly'],
          images   : [],
        },
        {
          question : 'Are you dreaming of glossy hair after styling?',
          answer   : 'Yes, give me all the gloss!',
          options  : ['Yes, give me all the gloss!', "No, I'm fine"],
          images   : [],
        },
        {
          question : "Does your hair feel like it's being damaged by heat tools?",
          answer   : 'Unfortunately, yes...',
          options  : ['Unfortunately, yes...', 'No, my hair can resist anything!'],
          images   : [],
        },
        {
          question : 'How do you feel about your current styling routine?',
          answer   : 'I take my time and I take it easy',
          options  : ['I take my time and I take it easy', "I'm often in a rush", 'It depends on the style'],
          images   : [],
        },
        {
          question : 'When you dress up, you’d describe your style as...',
          answer   : 'Classic and timeless ✨',
          options  : ['Classic and timeless ✨', 'Bold and patterned', 'I like to change it up!'],
          images   : [],
        },
        {
          question : 'Last but not least, how long are you looking your style to last?',
          answer   : 'A couple days',
          options  : ['A couple days', 'For the day', 'Hours'],
          images   : [],
        },
        {
          question : 'Great! Before I show you your recommendations, I have a quick question.',
          answer   : 'Not now',
          options  : ['Sign me up! 🙌', "I'm already signed up!", 'Not now'],
          images   : [],
        },
      ],
      recommendations : [{
        image       : 'https://cdn.shopify.com/s/files/1/0305/5589/produc…thyheatpro-litedryer_0194_main_F.jpg?v=1621542838',
        productName : 'Healthy Heat Pro-Lite Hair Dryer x COVL',
        options     : ['why This One?', 'See Product Page', 'ADD TO CART', 'See Personalized Reviews']
      },
      {
        image       : 'https://cdn.shopify.com/s/files/1/0305/5589/produc…47c1-eccf-454f-8638-79bda1d15ce5.jpg?v=1614890844',
        productName : 'Nano Silk Styling Iron x COVL',
        options     : ['why This One?', 'See Product Page', 'ADD TO CART', 'See Personalized Reviews']
      },
      {
        image       : 'https://cdn.shopify.com/s/files/1/0305/5589/products/1_aa644d71-8f95-4c43-9ea2-b84680cf6744.jpg?v=1623422387',
        productName : 'Mane Magic 10-in-1 Split End Mender',
        options     : ['why This One?', 'See Product Page', 'ADD TO CART', 'See Personalized Reviews']
      },
      ],
      mainOptions : ['Shop All', 'Go to My Cart', 'Start Again']
    }
    ],
  }
};
