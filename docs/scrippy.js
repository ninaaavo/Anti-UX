// all secrets

const secrets = [
  `In high school, I stole the mp3 player of a classmate. Went into the locker room during PE and snatched it. I didn't steal it because I wanted it or to sell it, I just did it because she was an awful judgmental queen bee and I wanted to get back at her. People saw me with it in my hands, so the next day I was called into the principal's office. I denied everything and they searched my bag and my room.

They never found it. I buried the MP3 player in my garden as soon as I got home, and that garden is now a mega store parking lot. I've never admitted it to anyone.`,

  `I'm tired of being an adult and just want someone to take care of me. I'm a single mom and the responsible caretaker person in some capacity for 35 of my 40 years. I have chronic health issues and I'm exhausted. Everyone sees me as dependable and responsible, but I wish I could take a long break where I don't have to worry about bills, decisions, or parenting.

Also, my son gets extremely loud when gaming with his friends and it drives me insane. I feel guilty for getting irritated at him.`,

  `I'm in a 2 year relationship but I still think about my previous partner. Before my current boyfriend I had a thing with a guy who was already in a relationship. I fell madly in love with him, but he eventually broke things off with me out of nowhere. I never got closure.

Now I really love my boyfriend, but I don't think I'll ever love him as much as I loved the other guy. I still see him sometimes and my heart stops.`,

  `In 1991 my business partner committed suicide by driving into a concrete barrier. He left a note on his computer explaining what he planned to do and apologizing for leaving me without a partner. I've never told anyone. Everyone thinks it was an accident.`,

  `My friend hosted a birthday party and I found her passed out in vomit in her room. I rinsed her off in the shower and put her in bed. When I changed her clothes I realized she had soiled herself. I cleaned her up like a baby and put clean clothes on her. It was awkward explaining the next day, but I didn't want her to wake up like that.`,

  `We put the cat to sleep. We didn't find him already dead. He had cancer, feline HIV, and no teeth. He was suffering badly. We lied about it because someone in the family doesn't believe in euthanasia and would have forced him to suffer longer.`,

  `When I was 16 I accidentally ran over my friend's kitten while leaving her party. I felt the bump and knew what happened. I was terrified she'd never forgive me, so I kept driving. She called me crying later that night about it. We're still best friends today and she never knew.`,

  `I haven't wanted to be alive for a long time. Not actively suicidal, but passively. Sometimes the feeling is quiet and sometimes it's loud. The world is beautiful and terrifying at the same time and it's a lot to process.`,

  `I wish I was never born.`,

  `If I feel ugly on a bad day, I can't go outside or interact with people. I feel completely incapable of functioning normally unless I look good.`,

  `I want kids but my partner doesn't. I had an abortion last year and never told him that part of me didn't fully want it. I know admitting that would probably end our 11 year relationship, so I'll carry the grief alone.`,

  `In sixth grade I lied about being pregnant because nobody paid attention to me and I wanted someone to care.`,
];

// setting up imgs html

const imgs = new Array(12).fill("single_locker.jpg");

let imgsHTML = "";
let emptyImg = "empty.png";

imgs.forEach((img, ind) => {
  imgsHTML += `<img src="${img}" class="locker" id="lock${ind}" />`;
});
const gridBox = document.getElementById("grid-box");
gridBox.innerHTML = imgsHTML;

// Define vars
const lockers = Array.from(document.getElementsByClassName("locker"));
const lockerCount = lockers.length;
const overlay = document.getElementById("overlay");
const zoomedLocker = document.getElementById("zoomedLocker");
const secret = document.getElementById("secret");
const parentQuestion = document.getElementById("parent-question");

let unopenedLockers = new Set();
currentLockerID = -1;
for (let i = 0; i < lockerCount; i++) unopenedLockers.add(i);
console.log("unopen", unopenedLockers);

function refreshOverlay() {
  locker = lockers[currentLockerID];
  if (unopenedLockers.has(currentLockerID)) {
    // if the user hasnt opened this locker
    console.log("yu");
    zoomedLocker.src = locker.src;
    parentQuestion.classList.remove("hidden");
    secret.classList.add("hidden");
    displayQuestion();
  } else {
    // if the user opened this locker
    let textData = secrets[currentLockerID];
    console.log("parent question", parentQuestion);
    secret.classList.remove("hidden");
    parentQuestion.classList.add("hidden");
    secret.innerHTML = `<h1>${textData}</h1>`;
  }
}
// When click on a locker, show the overlay
lockers.forEach((locker, ind) => {
  locker.addEventListener("click", (event) => {
    if (overlay.classList.contains("hidden")) {
      event.stopPropagation();
      currentLockerID = ind;
      overlay.classList.remove("hidden");
      // console.log("clicked", currentLockerID);
      // console.log("ounopended", unopenedLockers);

      refreshOverlay();
    }
  });
});

function hideOverlay() {
  overlay.classList.add("hidden");
  curLocker = -1;
}

// when click outside of overlay, exit
document.addEventListener("click", (event) => {
  if (
    !overlay.contains(event.target) &&
    !overlay.classList.contains("hidden")
  ) {
    hideOverlay();
  }
});

// now do the questions

let curQuestion = 0;

const questions = [
  { id: "name", type: "text", prompt: "How should I call you?" },
  { id: "birthday", type: "date", prompt: "what is your birthday?" },
  {
    id: "gender",
    type: "radio",
    prompt: "which gender do you identify with?",
    options: ["Female", "Male", "Nonbinary"],
  },
  {
    id: "occupation",
    type: "checkbox",
    prompt: "which best describe your current situation?",
    options: ["Student", "Employed", "Self-employed", "Other"],
  },
  {
    id: "interest",
    type: "checkbox",
    prompt: "which of these interests you?",
    options: [
      "Gaming",
      "Fashion",
      "Fitness",
      "Finance",
      "Art/Creativity",
      "Travel",
    ],
  },
  {
    id: "frequency",
    type: "radio",
    prompt: "how often do you usually buy things online?",
    options: [
      "Several times a week",
      "Once a week",
      "Once or twice a month",
      "Rarely",
    ],
  },
  {
    id: "budget",
    type: "radio",
    prompt:
      "if something could make you feel much better right now, how much would you pay for it?",
    options: [
      "Almost nothing",
      "Up to $50",
      "Up to $100",
      "Up to $500",
      "Whatever it costs",
    ],
  },
  {
    id: "spending",
    type: "radio",
    prompt: "when you decide to buy something, which describe you best?",
    options: [
      "I look for the cheapest option.",
      "I wait for sales or discounts",
      "I buy things that make people jealous of me.",
      "If I want it, I buy it immediately",
      " I usually think about it for a while before buying.",
    ],
  },
  {
    id: "upgrade",
    type: "radio",
    prompt:
      "when a new version of something you own comes out, what do you usually do?",
    options: [
      "Upgrade immediately",
      "Upgrade Eventually",
      "Wait until my current one breaks",
    ],
  },
  {
    id: "worries",
    type: "radio",
    prompt: "which of these worries you the most right now?",
    options: [
      "Not having enough money",
      "Falling behind others",
      "Job or career stability",
      "Relationships",
      "Health",
    ],
  },
  {
    id: "comfortable",
    type: "radio",
    prompt: "do you feel comfortable answering my questions?",
    options: [
      "Completely comfortable",
      "Somewhat comfortable",
      "Slightly uncomfortable",
      "Very uncomfortable",
    ],
  },
  {
    id: "secret",
    type: "text",
    prompt:
      "tell me something about yourself that you'd rather no one knows, I promise to keep it between us.",
  },
];

let response = {};

function displayQuestion() {
  const q = questions[curQuestion];
  const area = document.getElementById("question-area");
  // console.log("area is", area);
  let prompt = response["name"] ? response["name"] + ", " + q.prompt : q.prompt;
  let html = `<p>${prompt}</p>`;

  if (q.type === "text") {
    html += `<input type="text" id="response-input">`;
  }

  if (q.type === "date") {
    html += `<input type="date" id="response-input">`;
  }

  if (q.type === "radio") {
    html += q.options
      .map(
        (e) => `
      <label>
      <input type="radio" name="response-input" value="${e}">
        ${e}
      </label><br>
    `,
      )
      .join("");
  }

  if (q.type === "checkbox") {
    html += q.options
      .map(
        (opt) => `
      <label>
        <input type="checkbox" name="response-input" value="${opt}">
        ${opt}
      </label><br>
    `,
      )
      .join("");
  }

  area.innerHTML = html;
}

function saveResponse() {
  const q = questions[curQuestion];

  if (q.type === "text" || q.type === "date") {
    const input = document.getElementById("response-input");
    if (!input.value) return false;
    response[q.id] = input.value;
  }

  if (q.type === "radio") {
    const selected = document.querySelector(
      'input[name="response-input"]:checked',
    );
    if (!selected.value) return false;
    if (selected) response[q.id] = selected.value;
  }

  if (q.type === "checkbox") {
    const selected = document.querySelectorAll(
      'input[name="response-input"]:checked',
    );
    let arr = Array.from(selected).map((e) => e.value);
    if (!arr) return false;
    response[q.id] = arr;
  }
  return true;
}

function changeLockerDisplay() {
  // change locker img to opened img
  unopenedLockers.delete(currentLockerID);
  curLocker = lockers[currentLockerID];
  curLocker.src = emptyImg;
}

// ads hanndling

const ads3 = {
  // ads for first 3 demographic: name (no need) +  age + gender
  gundam: {
    title: "REGUS 1/100",
    url: "https://www.usagundamstore.com/products/zza-02-gzss-ox-regus",
    tags: {
      gender: new Set(["Male"]),
      age: new Set(["Teenagers", "Young Adults"]),
    },
    img: "adImgs/gundam.png",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action: "Buy NOW!",
  },
  tool_kit: {
    title: "Home repair tool kit",
    url: "https://www.amazon.com/Sundpey-Home-Tool-Kit-148-Pcs/dp/B09P3FTB6Y/ref=sr_1_3_sspa?dib=eyJ2IjoiMSJ9.d1Vm1jHQgkQA628dpvUlYzVyWTrNbQWgM-jIK1I7whCpvwgvTkcV3eo49e4dSqvmyGCJNFXwFntACSO3W4L9rEO7T8KvP1U4j9XginQXSIot-dOkGKidTrZzr63w-YjyMxKoArszL9HZsoYWxTzjBp5HiziYoVrRwIxjGrqaNJ0OJz9pv9A5ySFvR-7uC_MuogOSRptt4XthtvkgP6E8C-Fry34p5ON56XwVm-jnViCdZKCIgaXxHKgTxcnzqVVUAo_NRf7CzXZj7KjdVVPELmQ85NtsP0_eWj9QTWyLp6U.NBx79JdnBFwfuzLA0Q4Dg2uU-HQKRKCRXKnJy_NipEg&dib_tag=se&keywords=home%2Brepair%2Btool%2Bkit&qid=1772936350&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
    tags: {
      gender: new Set(["Male"]),
      age: new Set(["Middle age"]),
    },
    img: "adImgs/toolKit.png",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action: "Buy NOW!",
  },
  candle: {
    title: "Candle",
    url: "https://www.bathandbodyworks.com/p/champagne-toast-3-wick-candle-028013557?srsltid=AfmBOooUF7o4GvzsB2m6OOh8Ef-K5pgRb6S08V575lpxtXgIRRwLpKwVSUQ",
    tags: {
      gender: new Set(["Nonbinary", "Female"]),
      age: new Set(["Teenagers", "Young Adults", "Middle age"]),
    },
    img: "https://play-lh.googleusercontent.com/lETycvOJNvuKtnUHVZHSKvUj6IUx62hlUdpAlgaun1sKwU2fa3hzkVNJsiB4BoKeqIM=w416-h235-rw",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action: "Buy NOW!",
  },
  perfume_set: {
    title: "Libre Collection Mini Perfume Duo Set",
    url: "https://www.sephora.com/product/yves-saint-laurent-libre-collection-mini-perfume-duo-set-P513277?country_switch=us&lang=en&skuId=2801603&srsltid=AfmBOopBwcsf-1CZwiOxLETChman6TPArAOQh0XSh2Yv8aWaw13clPVjyxs",
    tags: {
      gender: new Set(["Female"]),
      age: new Set(["Middle age"]),
    },
    img: "https://content.stylitics.com/images/items/20717653",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action: "Buy NOW!",
  },
};

const ads4 = {
  internship_platform: {
    title: "Linkedin",
    url: "https://www.linkedin.com/jobs/internship-jobs",
    tags: {
      occupation: new Set(["Student"]),
      age: new Set(["Teenagers", "Young Adults"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Your network is your net worth. Find internship with Linkedin!",
    action: "Visit Us",
  },

  office_loafers: {
    title: "Professional Work Loafers",
    url: "https://www.dsw.com/product/clarks-westlynn-bella-loafer/560297?activeColor=121&size=6&width=Medium&cm_mmc=CSE-_-SAG",
    tags: {
      occupation: new Set(["Employed"]),
      gender: new Set(["Female"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://assets.designerbrands.com/match/Site_Name/560297_413_ss_04/?quality=85&io=transform:fit,width:1280",
    text: "Redefine sophisticated with the Westlynn Bella loafer from Clarks.",
    action: "Buy NOW!",
  },

  meal_kit: {
    title: "Quick Dinner Meal Kit",
    url: "https://www.hellofresh.com/",
    tags: {
      occupation: new Set(["Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://www.giftcardexchange.com.au/138-medium_default/xhellofresh-gift-card.jpg.pagespeed.ic.C4A3yAzeo5.jpg",
    text: "Whatever your week looks like, dinner’s covered.",
    action: "See Pricing & Plans",
  },

  invoicing_software: {
    title: "",
    url: "https://www.freshbooks.com/",
    tags: {
      occupation: new Set(["Self-Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
      gender: new Set(["Female", "Male", "Nonbinary"]),
    },
    img: "https://images.squarespace-cdn.com/content/v1/658304bceabeda35f23becd0/1739591870493-UT3B8QOY4YGNIJSBTGX7/Untitled_design__18_-removebg-preview.png",
    text: "Simple Invoicing for Freelancers",
    action: "Visit Us!",
  },

  personal_branding_course: {
    title: "Build Your Personal Brand",
    url: "hhttps://www.coursera.org/courses?query=personal%20branding",
    tags: {
      occupation: new Set(["Self-Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://theinterngroup.com/hubfs/Imported_Blog_Media/aziz-acharki-U3C79SeHa7k-unsplash.jpg",
    text: "Stand out and Succeed!",
    action: "Join us!",
  },

  job_board: {
    title: "Jobs Hiring Near You",
    url: "https://www.indeed.com/",
    tags: {
      occupation: new Set(["Unemployed"]),
    },
    img: "https://careers.aan.com/themes/aan1/images/img4.png?1753318581",
    text: "Find your dream job!",
    action: "Search now!",
  },
};

const ads5 = {
  mechanical_keyboard_male: {
    title: "ARTEMIS K719 PRO Anime Keyboard",
    url: "https://redragonshop.com/products/artemis-k719-pro-anime-keyboard",
    tags: {
      interest: new Set(["Gaming"]),
      gender: new Set(["Male", "Nonbinary"]),
    },
    img: "https://redragonshop.com/cdn/shop/files/RedragonARTEMISK719PROAnimeKeyboard_1.png?v=1762467820&width=713",
    text: "Reliable ally of Redragon, personalized waifu character Ignara reporting!",
    action: "Buy NOW!",
  },

  mechanical_keyboard_female: {
    title: "Akko x Yier and Bubu Limited Edition Keyboard",
    url: "https://en.akkogear.com/product/yier-and-bubu-3108v3-mechanical-keyboard/",
    tags: {
      interest: new Set(["Gaming"]),
      gender: new Set(["Female"]),
    },
    img: "https://en.akkogear.com/wp-content/uploads/2025/12/Yier-and-Bubu-3108v3-P.png",
    text: "Inspired by the beloved characters, also known globally as Bubu and Dudu.",
    action: "Buy NOW!",
  },

  trench_coat: {
    title: "Trench Coat",
    url: "https://www2.hm.com/en_us/productpage.1315629001.html?srsltid=AfmBOopJB1ZF9tO_JpcT7MLrNJfiOj3-e9xwxQmOFGos1X4lOv6umevJ1_0",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Middle age"]),
      gender: new Set(["Female", "Nonbinary"]),
    },
    img: "adImgs/trenchCoat.png",
    text: "Effortless elegance for any weather.",
    action: "Buy NOW!",
  },

  men_trench_coat: {
    title: "Male Trench Coat",
    url: "https://www.cos.com/en-us/men/menswear/coatsjackets/coats/product/2-in-1-water-repellent-trench-coat-light-grey-1312026002?srsltid=AfmBOoo7e8PDQnhIZumM4mGXrhYKBIo456b_XqyXNWCejuiFy4YKCc1QzXI",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Middle age"]),
      gender: new Set(["Male", "Nonbinary"]),
    },
    img: "adImgs/maleTrenchCoat.png",
    text: "Sharp, timeless, and built for the modern man, this trench coat adds effortless confidence to every step you take.",
    action: "Buy NOW!",
  },

  sneaker: {
    title: "On Men's Cloudtilt Shoes",
    url: "https://www.dickssportinggoods.com/p/on-mens-cloudtilt-shoes-23mazmcldtltwhtblmns/23mazmcldtltwhtblmns?sku=24982503&srsltid=AfmBOoodH-P8Y-Q1OX35ZAD0qgmRgBBZxyzyBId62yMqqpJTSDyPnfOCRQw",
    tags: {
      interest: new Set(["Fashion", "Fitness"]),
      age: new Set(["Young Adults", "Teenager"]),
      gender: new Set(["Male", "Nonbinary"]),
    },
    img: "https://dks.scene7.com/is/image/GolfGalaxy/23MAZMCLDTLTWHTBLMNS_Black_Ivory?wid=2000&hei=2000&fit=constrain&fmt=pjpeg",
    text: "The On Men's Cloudtilt Shoes offer unparalleled comfort for your walking and casual needs.",
    action: "Buy NOW!",
  },

  designer_bag: {
    title: "Brook Flap Chain Bag",
    url: "https://www.coach.com/products/brook-flap-chain-bag/CCD07.html?frp=CCD07+B4%2FLD",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Young Adults", "Middle age"]),
      gender: new Set(["Female"]),
    },
    img: "https://coach.scene7.com/is/image/Coach/can90_b4bk_a0?$desktopProduct$",
    text: "Turn heads wherever you go: Brook Flap Chain Bag blends sleek luxury with just the right touch of bold elegance.",
    action: "Buy NOW!",
  },

  protein_powder: {
    title: "Nutrex 100% Whey Protein Powder",
    url: "https://www.amazon.com/dp/B08protein",
    tags: {
      interest: new Set(["Fitness"]),
      gender: new Set(["Nonbinary", "Male"]),
    },
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ_fxETmX1FdmMAYmXBQjOvYTlUByxNZuKY3fwwBh13C0yyGYziWQBN5jpqSMi8xy1g3mepeCU4EtDs3syAxnB4KIq6DGoX0wNryR0BLBnW",
    text: "Pure muscle-building fuel and perfect for your muscle-building goals.",
    action: "Buy NOW!",
  },

  yoga_mat: {
    title: "Non-Slip Yoga Mat",
    url: "https://www.amazon.com/dp/B08yogamat",
    tags: {
      interest: new Set(["Fitness"]),
      gender: new Set(["Female"]),
      age: new Set(["Teenagers", "Young Adults", "Middle age"]),
    },
    img: "https://target.scene7.com/is/image/Target/GUEST_464b976c-e4fe-4021-89f7-9daa8f733b30?wid=1200&hei=1200&qlt=80",
    text: "Your future flexible self will thank you: this non-slip yoga mat is ready whenever you finally decide to show up.",
    action: "Buy NOW!",
  },

  investing_app: {
    title: "Start Investing Today",
    url: "https://www.acorns.com/",
    tags: {
      interest: new Set(["Finance"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Student", "Employed", "Self-Employed"]),
    },
    img: "https://sqy7rm.media.zestyio.com/Hp-Updates-Body-01.avif",
    text: "An automated saving and investing app for you and your family",
    action: "Get started",
  },

  color_markers: {
    title:
      "Ohuhu Honolulu 320 Colors Dual Tips Alcohol Art Markers (New Version)",
    url: "https://ohuhu.com/products/ohuhu-honolulu-320-colors-dual-tips-alcohol-art-markers?gad_source=1&gad_campaignid=20549422248&gbraid=0AAAAACPJ4XuqOGYcped_283O91d5WQEdu&gclid=Cj0KCQjw37nNBhDkARIsAEBGI8MLlIIkZAOcF72Z_P5zhUNtUANZbZSeypKvyYYZNmXtEKh_9i6Yei0aAuaZEALw_wcB",
    tags: {
      interest: new Set(["Art/Creativity"]),
    },
    img: "https://ohuhu.com/cdn/shop/files/Honolulu_320_Basic_V2-10.jpg?v=1754489183&width=1080",
    text: "Explore the artistry of Ohuhu Markers, the preferred choice for alcohol-based markers.",
    action: "Buy NOW!",
  },

  flight_deals: {
    title: "Flight Deals with Expedia",
    url: "https://www.skyscanner.com/",
    tags: {
      interest: new Set(["Travel"]),
    },
    img: "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?semt=ais_rp_50_assets&w=740&q=80",
    text: "Compare cheap airline ticket prices at a glance from a large inventory of carriers on Expedia. You can get cheap flights by staying flexible with travel dates.",
    action: "Buy NOW!",
  },
};

const ads7 = {
  cheap_mobile_game: {
    title: "Free To Play Marvel Rivals",
    url: "https://www.marvelrivals.com/",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Gaming"]),
    },
    img: "https://shared.akamai.steamstatic.com//store_item_assets/steam/apps/2767030/9d7954ac82070ed306b791a65da2c93827c57204/capsule_616x353.jpg?t=1770976548",
    text: " Super Hero Team-based PVP Shooter in the Marvel Universe with all heroes FREE TO PLAY",
    action: "Play NOW!",
  },

  thrift_clothing: {
    title: "Thrifted Fashion Finds",
    url: "https://www.depop.com/",
    tags: {
      budget: new Set(["Almost nothing", "Up to $50"]),
      interest: new Set(["Fashion"]),
    },
    img: "https://bump.bot/images/depop.jpg",
    text: "Buy for less. Pay no selling fee*. Keep fashion circular.",
    action: "Explore more",
  },

  free_workout_app: {
    title: "Free Guided Workouts with Nike Training Club",
    url: "https://www.nike.com/ntc-app",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Fitness"]),
    },
    img: "https://static.digit.in/default/d4e0dd2d70b4524f85297fc0c768f6f0dbb41227.jpeg",
    text: "The Nike Training Club app will make your fitness habits stick with quicker options, goal-setting tools, and new content daily. ",
    action: "Start Training",
  },

  budget_tracker: {
    title: "MINT Free Budget Tracker",
    url: "https://mint.intuit.com/",
    tags: {
      budget: new Set(["Almost nothing", "Up to $50"]),
      interest: new Set(["Finance"]),
    },
    img: "https://i.pcmag.com/imagery/reviews/05OMSsUmroXJ6F6sETKpH9R-43.fit_lim.size_1200x630.v1630353377.jpg",
    text: "Track spending, set budgets, and understand your money for FREE.",
    action: "Start Budgeting",
  },

  coloring_app: {
    title: "Happy Mobile Coloring Book",
    url: "https://www.lakecoloring.com/",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Art/Creativity"]),
    },
    img: "https://d1nl7v5tzifdth.cloudfront.net/fojnsgj5hqagns0bpzxpei2s.webp",
    text: "Welcome to Lake: a coloring app with the largest collection of coloring books by independent illustrators. ",
    action: "Color Now",
  },

  trip_planner: {
    title: "Plan Your Dream Trip with Wanderlog",
    url: "https://wanderlog.com/",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Travel"]),
    },
    img: "https://www.winklix.com/blog/wp-content/uploads/2025/04/wanderlog.jpg.webp",
    text: "Build itineraries, track bookings, and plan trips with friends.",
    action: "Plan a Trip",
  },

  resistance_bands: {
    title: "Resistance Bands Workout Set",
    url: "https://www.dickssportinggoods.com/p/ethos-super-band-17au6usprbndxhvyxeac/17au6usprbndxhvyxeac?recid=PageElement:product2_rr_v1e8mm3:80504:&sku=17412528&recToken=rt.2.WyJwcm9kdWN0IiwgNTgzMjM3NywgbnVsbCwgIjE3NDEyNTI4IiwgIjE3QVU2VVNQUkJORFhIVllYRUFDIiwgODA1MDQsIDIsICIyMDI2LTAzLTA5VDE4OjM4OjExLjI1MzcyNFoiXQ",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Fitness"]),
    },
    img: "https://dks.scene7.com/is/image/GolfGalaxy/ETHA203_NOCOLOR_REG-alt3?wid=2000&hei=2000&fit=constrain&fmt=pjpeg",
    text: "Add resistance to a wide variety of upper and lower body exercises with the ETHOS® Super Band, designed with a durable, compact construction that provides maximum toning results with minimal equipment.",
    action: "Buy NOW!",
  },

  steam:{
    title: "Mewgenics!",
    url: "https://store.steampowered.com/app/686060/Mewgenics/",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Gaming"]),
    },
    img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/686060/aa8075d11165fef4d4d0d09c156f0da0623b5da1/header.jpg?t=1771573546",
    text: "Build the ultimate cat army through tactical breeding and send them into deep, challenging turn-based adventures.",
    action: "Play on Steam",
  },

  travel_daypack: {
    title: "Lightweight Travel Backpack",
    url: "https://www.amazon.com/dp/B08backpack",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Travel"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  coloring_book: {
    title: "Fuzzy Hygge: Cute and Cozy Coloring Book",
    url: "https://www.lakecoloring.com/",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Art/Creativity"]),
    },
    img: "https://prodimage.images-bn.com/pimages/9798217036523_p0_v1_s600x595.jpg",
    text: "Savor the little joys and cozy moments of the hygge lifestyle with Fuzzy Hygge - an irresistible coloring book that will make your heart melt into a puddle of gooey cuteness.",
    action: "Color Now",
  },

  watercolor: {
    title: "All-In-One Premium Watercolor Set",
    url: "https://grabieart.com/products/100-solid-watercolor-paint-set-with-40-metallic-color?currency=USD&variant=50160627253529&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=aa0886fea784&utm_source=google&dm_cam=23554532320&dm_grp=&dm_ad=&dm_kw=&dm_net=adwords&att_gcid=Cj0KCQjw37nNBhDkARIsAEBGI8N1PRX9eptJtyLhHRL2fM7eHba42vzeu_KzxE8LisNqVLcqvm9_ShwaAgMaEALw_wcB&att_gbid=0AAAAABKmrNVHVoIQm59_V_8t438hD32mi&att_wbid=CkAKCAiA2bTNBhB9EjAAk6yxL74abVppLwWqQDTwT8c5BGlTw1P1BDSBJLBFWoOjKm8aOhAuvGgwgyX-RxMaAiLh&gad_source=1&gad_campaignid=23549896550&gbraid=0AAAAABKmrNVHVoIQm59_V_8t438hD32mi&gclid=Cj0KCQjw37nNBhDkARIsAEBGI8N1PRX9eptJtyLhHRL2fM7eHba42vzeu_KzxE8LisNqVLcqvm9_ShwaAgMaEALw_wcB",
    tags: {
      budget: new Set(["Up to $100"]),
      interest: new Set(["Art/Creativity"]),
    },
    img: "adImgs/watercolor.png",
    text: "Elevate your artistry with our three distinct watercolor sets, available in 50, 100, or 168 stunning colors. ",
    action: "Buy NOW!",
  },

  game_chair:{
    title: "SOONTRANS Massage Gaming Chair Office Chair with Footrest",
    url: "https://www.walmart.com/ip/Ferghana-Massage-Gaming-Chair-Office-Chair-Ergonomic-Game-Chair-Hight-Back-with-Lumbar-Pillow-and-Footrest-Gamer-Chairs-for-Adults-Kids-Blue/1299924365",
    tags: {
      budget: new Set(["Up to $100"]),
      interest: new Set(["Gaming"]),
    },
    img: "adImgs/gameChair.png",
    text: "designed in racing style that born to offer you a combination of luxurious comfort and visual enjoyment",
    action: "Buy NOW!",
  },

  investing_book: {
  title: "Start Investing for Less Than $100",
  url: "https://www.amazon.com/s?k=investing+books",
  tags: {
    budget: new Set(["Under $100"]),
    interest: new Set(["Finance"]),
  },
  img: "adImgs/investingBook.png",
  text: "Learn how to grow your money with beginner investing guides.",
  action: "Learn More",
},

  headphones: {
    title: "Baseus Inspire XH1 Adaptive Active Noise Cancelling Headphones",
    url: "https://www.amazon.com/dp/B0FLPY5H72?tag=cnet-buy-button-20&ascsubtag=eb7bc43c7a894fa4bdf8804e77f61682&geniuslink=true&th=1",
    tags: {
      budget: new Set(["Up to $100"]),
      interest: new Set(["Fashion","Fitness", "Travel"]),
    },
    img: "adImgs/headphones.png",
    text: "Enjoy an exceptional audio experience with Baseus’s finest headphones yet",
    action: "Buy NOW!",
  },

  smart_home_gym: {
  title: "Build Your Home Gym Under $500",
  url: "https://www.roguefitness.com/",
  tags: {
    budget: new Set(["Up to $500"]),
    interest: new Set(["Fitness"]),
  },
  img: "adImgs/rogue.png",
  text: "Upgrade your workouts with adjustable dumbbells and compact gym gear.",
  action: "Start Training",
},

  gaming_console: {
    title: "Nintendo Switch 2 System",
    url: "https://www.bestbuy.com/",
    tags: {
      budget: new Set(["Up to $500"]),
      interest: new Set(["Gaming"]),
    },
    img: "https://d37tikmwcb2tc.cloudfront.net/gaming/image/Nintendo_Switch2_123669_6.jpg",
    text: "Unlock the gaming world with Nintendo Switch 2 System",
    action: "Buy NOW!",
  },

  luxury_watch: {
    title: "Luxury Swiss Watch",
    url: "https://www.rolex.com/",
    tags: {
      budget: new Set(["Whatever it costs"]),
      interest: new Set(["Fashion", "Finance"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  luxury_resort: {
    title: "5-Star Private Island Resort",
    url: "https://www.fourseasons.com/",
    tags: {
      budget: new Set(["Whatever it costs"]),
      interest: new Set(["Travel"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },
};

const ads8 = {
  clearance_store: {
    title: "Massive Clearance Deals",
    url: "https://www.walmart.com/clearance",
    tags: {
      buyingHabit: new Set(["I look for the cheapest option."]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  coupon_browser_extension: {
    title: "Never Miss a Coupon Again",
    url: "https://www.joinhoney.com/",
    tags: {
      buyingHabit: new Set(["I wait for sales or discounts"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  luxury_sports_car: {
    title: "Drive the Car Everyone Notices",
    url: "https://www.lamborghini.com/",
    tags: {
      buyingHabit: new Set(["I buy things that make people jealous of me."]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  same_day_delivery: {
    title: "Order Now, Delivered Today",
    url: "https://www.instacart.com/",
    tags: {
      buyingHabit: new Set(["If I want it, I buy it immediately"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  price_tracking_tool: {
    title: "Track Price History Before You Buy",
    url: "https://camelcamelcamel.com/",
    tags: {
      buyingHabit: new Set([
        " I usually think about it for a while before buying.",
      ]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },
};

const ads9 = {
  laptop_tradein: {
    title: "Trade In Your Old Laptop for Credit",
    url: "https://www.bestbuy.com/site/services/trade-in",
    tags: {
      upgradeHabit: new Set(["Upgrade Eventually"]),
      interest: new Set(["Gaming", "Art/Creativity", "Finance"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  extended_warranty: {
    title: "Protect Your Devices with Extended Warranty",
    url: "https://www.squaretrade.com/",
    tags: {
      upgradeHabit: new Set(["Wait until my current one breaks"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  subscription_upgrade_program: {
    title: "Phone Upgrade Program — New Every Year",
    url: "https://www.apple.com/shop/iphone/iphone-upgrade-program",
    tags: {
      upgradeHabit: new Set(["Upgrade immediately"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },
};

const ads10 = {
  budgeting_app: {
    title: "Take Control of Your Finances",
    url: "https://www.ynab.com/",
    tags: {
      worry: new Set(["Not having enough money"]),
      interest: new Set(["Finance"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  luxury_watch: {
    title: "Stand Out With a Luxury Watch",
    url: "https://www.rolex.com/",
    tags: {
      worry: new Set(["Falling behind others"]),
      interest: new Set(["Fashion", "Finance"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  online_certification: {
    title: "Earn a Professional Certificate Online",
    url: "https://www.coursera.org/professional-certificates",
    tags: {
      worry: new Set(["Job or career stability"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  couples_therapy: {
    title: "Online Relationship Counseling",
    url: "https://www.betterhelp.com/",
    tags: {
      worry: new Set(["Relationships"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },

  fitness_tracker: {
    title: "Track Your Health With a Smart Fitness Band",
    url: "https://www.fitbit.com/",
    tags: {
      worry: new Set(["Health"]),
      interest: new Set(["Fitness"]),
    },
    img: "",
    text: "",
    action: "Buy NOW!",
  },
};

const adsInds = [3, 4, 5, 7, 8, 9, 10];
const actualAdsList = [ads3, ads4, ads5, ads7, ads8, ads9, ads10];
let curAdsInd = -1;
let computedAds = {};

function revealAd(ind) {
  curAd = document.getElementById(`ad${ind}`);
  curAd.classList.remove("hidden");
  let computedAds = computeAd();
  console.log(computedAds);
  choice = computedAds[0][1];
  adchoice = actualAdsList[curAdsInd][choice];
  console.log("choice is", adchoice);
  console.log("img is", adchoice["img"]);
  let direction = curAd.classList.contains("horizontal")
    ? "horizontal"
    : "vertical";
  html = `<a href=${adchoice["url"]}>
            <div class="${direction}Box">
              
              <img src=${adchoice["img"]} class="${direction}Ad">
              
              <div class="${direction}Text">
                <h1> ${adchoice.title} </h1>
                <h2> ${adchoice.text} </h2>
                <div class="fakeBnt">${adchoice["action"]}</div>
              </div>
            </div>
          </a>`;

  curAd.innerHTML = html;
}

function computeAd() {
  let curComputed = [];
  console.log("cur ad ind", curAdsInd);
  console.log("current user profile", response);
  curAdLst = actualAdsList[curAdsInd];
  for (const [ad, adInfo] of Object.entries(curAdLst)) {
    console.log("cur ad considering", ad, "w ad info", adInfo);
    let score = 0;
    let cnt = 0;
    for (const [tagName, tagSet] of Object.entries(adInfo.tags)) {
      tagResponse = response[tagName];
      if (Array.isArray(tagResponse)) {
        for (const e of tagResponse) {
          if (tagSet.has(e)) score += 1;
          cnt += 1;
        }
      } else {
        cnt++;
        if (tagSet.has(tagResponse)) score++;
      }
    }
    score /= cnt; // normalizing :> so no bias towards longer tags
    curComputed.push([score, ad]);
  }
  curComputed.sort((a, b) => b[0] - a[0]);
  return curComputed.slice(0, 2); // return the best 3 ads
}

function clickSubmit() {
  let saveResult = saveResponse();
  if (!parentQuestion.classList.contains("hidden") && !saveResult) {
    let name = response["name"] ? response["name"] + ", " : "";
    alert(
      `I just want to learn more about you, ${name}as a friend.\nMy secrets aren't free.`,
    );
    return;
  }
  changeLockerDisplay();
  refreshOverlay();
  curQuestion++;
  // console.log("curqest", curQuestion);

  if (curAdsInd < adsInds.length - 1 && curQuestion == adsInds[curAdsInd + 1]) {
    curAdsInd++;
    revealAd(adsInds[curAdsInd]);
  }

  if (curQuestion < questions.length) {
    displayQuestion();
  } else {
    console.log("All responses:", response);
  }
}

document.getElementById("submit-btn").addEventListener("click", clickSubmit);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !overlay.classList.contains("hidden"))
    clickSubmit();
});
