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
    action:"Buy NOW!"
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
    action:"Buy NOW!"
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
    action:"Buy NOW!"
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
    action:"Buy NOW!"
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
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  office_loafers: {
    title: "Professional Work Loafers",
    url: "https://www.dsw.com/product/clarks-westlynn-bella-loafer/560297?activeColor=121&size=6&width=Medium&cm_mmc=CSE-_-SAG",
    tags: {
      occupation: new Set(["Employed"]),
      gender: new Set(["Female"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  meal_kit: {
    title: "Quick Dinner Meal Kit",
    url: "https://www.hellofresh.com/",
    tags: {
      occupation: new Set(["Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  invoicing_software: {
    title: "Simple Invoicing for Freelancers",
    url: "https://www.freshbooks.com/",
    tags: {
      occupation: new Set(["Self-Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
      gender: new Set(["Female", "Male", "Nonbinary"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  personal_branding_course: {
    title: "Build Your Personal Brand",
    url: "https://www.udemy.com/",
    tags: {
      occupation: new Set(["Self-Employed"]),
      age: new Set(["Young Adults", "Middle age"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  resume_builder: {
    title: "Resume Builder",
    url: "https://www.canva.com/resumes/",
    tags: {
      occupation: new Set(["Unemployed"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  job_board: {
    title: "Jobs Hiring Near You",
    url: "https://www.indeed.com/",
    tags: {
      occupation: new Set(["Unemployed"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  stress_relief_plush: {
    title: "Weighted Stress Relief Plush",
    url: "https://www.amazon.com/",
    tags: {
      occupation: new Set(["Student", "Unemployed"]),
      age: new Set(["Teenagers", "Young Adults"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },

  productivity_app: {
    title: "Organize Your Entire Life",
    url: "https://www.notion.so/",
    tags: {
      occupation: new Set(["Student", "Employed", "Self-Employed"]),
    },
    img: "https://images.ctfassets.net/4mpdf15r5lc4/6cPZFBdmRr60cE4TyOvHzG/9ba22841abf02b89eb3477b1f606f304/article-image-640x360_linkedin.webp?w=1280&h=720",
    text: "Mech Fans: Your Next Build Just Dropped!",
    action:"Buy NOW!"
  },
};

const ads5 = {
  mechanical_keyboard: {
    title: "Mechanical Gaming Keyboard",
    url: "https://www.amazon.com/dp/B08gamingkeyboard",
    tags: {
      interest: new Set(["Gaming"]),
    },
  },

  gamer_chair: {
    title: "Ergonomic Gaming Chair",
    url: "https://www.amazon.com/dp/B08gamerchair",
    tags: {
      interest: new Set(["Gaming"]),
      age: new Set(["Young Adults", "Teenager"]),
    },
  },

  trench_coat: {
    title: "Trench Coat",
    url: "https://www2.hm.com/en_us/productpage.1315629001.html?srsltid=AfmBOopJB1ZF9tO_JpcT7MLrNJfiOj3-e9xwxQmOFGos1X4lOv6umevJ1_0",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Middle age"]),
      gender: new Set(["Female", "Nonbinary"]),
    },
  },

  men_trench_coat: {
    title: "Male Trench Coat",
    url: "https://www.cos.com/en-us/men/menswear/coatsjackets/coats/product/2-in-1-water-repellent-trench-coat-light-grey-1312026002?srsltid=AfmBOoo7e8PDQnhIZumM4mGXrhYKBIo456b_XqyXNWCejuiFy4YKCc1QzXI",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Middle age"]),
      gender: new Set(["Male", "Nonbinary"]),
    },
  },

  sneaker: {
    title: "On Men's Cloudtilt Shoes",
    url: "https://www.dickssportinggoods.com/p/on-mens-cloudtilt-shoes-23mazmcldtltwhtblmns/23mazmcldtltwhtblmns?sku=24982503&srsltid=AfmBOoodH-P8Y-Q1OX35ZAD0qgmRgBBZxyzyBId62yMqqpJTSDyPnfOCRQw",
    tags: {
      interest: new Set(["Fashion", "Fitness"]),
      age: new Set(["Young Adults", "Teenager"]),
      gender: new Set(["Male", "Nonbinary"]),
    },
  },

  designer_bag: {
    title: "Brook Flap Chain Bag",
    url: "https://www.coach.com/products/brook-flap-chain-bag/CCD07.html?frp=CCD07+B4%2FLD",
    tags: {
      interest: new Set(["Fashion"]),
      age: new Set(["Young Adults", "Middle age"]),
      gender: new Set(["Female"]),
    },
  },

  protein_powder: {
    title: "Whey Protein Powder",
    url: "https://www.amazon.com/dp/B08protein",
    tags: {
      interest: new Set(["Fitness"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Student", "Employed", "Self-Employed"]),
    },
  },

  yoga_mat: {
    title: "Non-Slip Yoga Mat",
    url: "https://www.amazon.com/dp/B08yogamat",
    tags: {
      interest: new Set(["Fitness"]),
      gender: new Set(["Female", "Nonbinary", "Male"]),
      age: new Set(["Teenagers", "Young Adults", "Middle age"]),
    },
  },

  investing_app: {
    title: "Start Investing Today",
    url: "https://www.acorns.com/",
    tags: {
      interest: new Set(["Finance"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Student", "Employed", "Self-Employed"]),
    },
  },

  trading_book: {
    title: "Stock Market Guide for Beginners",
    url: "https://www.amazon.com/dp/B08stockbook",
    tags: {
      interest: new Set(["Finance"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Student", "Unemployed", "Employed"]),
    },
  },

  sketchbook_set: {
    title: "Professional Sketchbook Set",
    url: "https://www.amazon.com/dp/B08sketchbook",
    tags: {
      interest: new Set(["Art/Creativity"]),
      age: new Set(["Teenagers", "Young Adults"]),
      occupation: new Set(["Student", "Self-Employed"]),
    },
  },

  ipad_drawing_pen: {
    title: "Digital Drawing Stylus",
    url: "https://www.amazon.com/dp/B08stylus",
    tags: {
      interest: new Set(["Art/Creativity"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Student", "Self-Employed", "Employed"]),
    },
  },

  carry_on: {
    title: "Lightweight Carry-On Suitcase",
    url: "https://www.amazon.com/dp/B08carryon",
    tags: {
      interest: new Set(["Travel"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set(["Employed", "Self-Employed"]),
    },
  },

  flight_deals: {
    title: "Cheap Flights This Month",
    url: "https://www.skyscanner.com/",
    tags: {
      interest: new Set(["Travel"]),
      age: new Set(["Young Adults", "Middle age"]),
      occupation: new Set([
        "Student",
        "Employed",
        "Self-Employed",
        "Unemployed",
      ]),
    },
  },
};

const ads7 = {
  cheap_mobile_game: {
    title: "Free Mobile Game",
    url: "https://play.google.com/store",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Gaming"]),
    },
  },

  thrift_clothing: {
    title: "Thrifted Fashion Finds",
    url: "https://www.depop.com/",
    tags: {
      budget: new Set(["Almost nothing"]),
      interest: new Set(["Fashion"]),
    },
  },

  resistance_bands: {
    title: "Resistance Bands Workout Set",
    url: "https://www.amazon.com/dp/B08bands",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Fitness"]),
    },
  },

  travel_daypack: {
    title: "Lightweight Travel Backpack",
    url: "https://www.amazon.com/dp/B08backpack",
    tags: {
      budget: new Set(["Up to $50"]),
      interest: new Set(["Travel"]),
    },
  },

  drawing_marker_set: {
    title: "Professional Marker Set",
    url: "https://www.amazon.com/dp/B08markers",
    tags: {
      budget: new Set(["Up to $100"]),
      interest: new Set(["Art/Creativity"]),
    },
  },

  streetwear_sneakers: {
    title: "Limited Edition Sneakers",
    url: "https://stockx.com/",
    tags: {
      budget: new Set(["Up to $100"]),
      interest: new Set(["Fashion"]),
    },
  },

  adjustable_dumbbells: {
    title: "Adjustable Dumbbell Set",
    url: "https://www.amazon.com/dp/B08dumbbells",
    tags: {
      budget: new Set(["Up to $500"]),
      interest: new Set(["Fitness"]),
    },
  },

  gaming_console: {
    title: "Next-Gen Gaming Console",
    url: "https://www.bestbuy.com/",
    tags: {
      budget: new Set(["Up to $500"]),
      interest: new Set(["Gaming"]),
    },
  },

  luxury_watch: {
    title: "Luxury Swiss Watch",
    url: "https://www.rolex.com/",
    tags: {
      budget: new Set(["Whatever it costs"]),
      interest: new Set(["Fashion", "Finance"]),
    },
  },

  luxury_resort: {
    title: "5-Star Private Island Resort",
    url: "https://www.fourseasons.com/",
    tags: {
      budget: new Set(["Whatever it costs"]),
      interest: new Set(["Travel"]),
    },
  },
};

const ads8 = {
  clearance_store: {
    title: "Massive Clearance Deals",
    url: "https://www.walmart.com/clearance",
    tags: {
      buyingHabit: new Set(["I look for the cheapest option."]),
    },
  },

  discount_marketplace: {
    title: "Daily Bargain Marketplace",
    url: "https://www.temu.com/",
    tags: {
      buyingHabit: new Set(["I look for the cheapest option."]),
    },
  },

  coupon_browser_extension: {
    title: "Never Miss a Coupon Again",
    url: "https://www.joinhoney.com/",
    tags: {
      buyingHabit: new Set(["I wait for sales or discounts"]),
    },
  },

  black_friday_alerts: {
    title: "Track the Best Sales Automatically",
    url: "https://slickdeals.net/",
    tags: {
      buyingHabit: new Set(["I wait for sales or discounts"]),
    },
  },

  luxury_sneakers: {
    title: "Limited Edition Sneaker Drop",
    url: "https://stockx.com/",
    tags: {
      buyingHabit: new Set(["I buy things that make people jealous of me."]),
      interest: new Set(["Fashion"]),
    },
  },

  luxury_sports_car: {
    title: "Drive the Car Everyone Notices",
    url: "https://www.lamborghini.com/",
    tags: {
      buyingHabit: new Set(["I buy things that make people jealous of me."]),
    },
  },

  one_click_checkout: {
    title: "Buy It Now — One Click Checkout",
    url: "https://www.amazon.com/",
    tags: {
      buyingHabit: new Set(["If I want it, I buy it immediately"]),
    },
  },

  same_day_delivery: {
    title: "Order Now, Delivered Today",
    url: "https://www.instacart.com/",
    tags: {
      buyingHabit: new Set(["If I want it, I buy it immediately"]),
    },
  },

  product_review_site: {
    title: "Compare 10,000+ Product Reviews",
    url: "https://www.consumerreports.org/",
    tags: {
      buyingHabit: new Set([
        " I usually think about it for a while before buying.",
      ]),
    },
  },

  price_tracking_tool: {
    title: "Track Price History Before You Buy",
    url: "https://camelcamelcamel.com/",
    tags: {
      buyingHabit: new Set([
        " I usually think about it for a while before buying.",
      ]),
    },
  },
};

const ads9 = {
  new_phone_preorder: {
    title: "Preorder the Newest Smartphone",
    url: "https://www.apple.com/iphone/",
    tags: {
      upgradeHabit: new Set(["Upgrade immediately"]),
      interest: new Set(["Gaming", "Fashion", "Travel"]),
    },
  },

  latest_gaming_gpu: {
    title: "Next-Gen Gaming GPU Just Released",
    url: "https://www.nvidia.com/en-us/geforce/",
    tags: {
      upgradeHabit: new Set(["Upgrade immediately"]),
      interest: new Set(["Gaming"]),
    },
  },

  smartwatch_upgrade: {
    title: "Upgrade to the Latest Smartwatch",
    url: "https://www.apple.com/watch/",
    tags: {
      upgradeHabit: new Set(["Upgrade Eventually"]),
      interest: new Set(["Fitness", "Fashion"]),
    },
  },

  laptop_tradein: {
    title: "Trade In Your Old Laptop for Credit",
    url: "https://www.bestbuy.com/site/services/trade-in",
    tags: {
      upgradeHabit: new Set(["Upgrade Eventually"]),
      interest: new Set(["Gaming", "Art/Creativity", "Finance"]),
    },
  },

  device_repair_kit: {
    title: "DIY Phone Repair Kit",
    url: "https://www.ifixit.com/",
    tags: {
      upgradeHabit: new Set(["Wait until my current one breaks"]),
    },
  },

  extended_warranty: {
    title: "Protect Your Devices with Extended Warranty",
    url: "https://www.squaretrade.com/",
    tags: {
      upgradeHabit: new Set(["Wait until my current one breaks"]),
    },
  },

  refurbished_electronics: {
    title: "Certified Refurbished Electronics",
    url: "https://www.backmarket.com/",
    tags: {
      upgradeHabit: new Set([
        "Upgrade Eventually",
        "Wait until my current one breaks",
      ]),
    },
  },

  subscription_upgrade_program: {
    title: "Phone Upgrade Program — New Every Year",
    url: "https://www.apple.com/shop/iphone/iphone-upgrade-program",
    tags: {
      upgradeHabit: new Set(["Upgrade immediately"]),
    },
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
  },

  side_hustle_course: {
    title: "Start a Side Hustle Today",
    url: "https://www.udemy.com/topic/side-hustle/",
    tags: {
      worry: new Set(["Not having enough money"]),
    },
  },

  luxury_watch: {
    title: "Stand Out With a Luxury Watch",
    url: "https://www.rolex.com/",
    tags: {
      worry: new Set(["Falling behind others"]),
      interest: new Set(["Fashion", "Finance"]),
    },
  },

  productivity_course: {
    title: "Outperform Everyone Around You",
    url: "https://www.coursera.org/",
    tags: {
      worry: new Set(["Falling behind others"]),
    },
  },

  linkedin_premium: {
    title: "Advance Your Career With LinkedIn Premium",
    url: "https://www.linkedin.com/premium/",
    tags: {
      worry: new Set(["Job or career stability"]),
    },
  },

  online_certification: {
    title: "Earn a Professional Certificate Online",
    url: "https://www.coursera.org/professional-certificates",
    tags: {
      worry: new Set(["Job or career stability"]),
    },
  },

  dating_app: {
    title: "Meet Someone Special Today",
    url: "https://tinder.com/",
    tags: {
      worry: new Set(["Relationships"]),
    },
  },

  couples_therapy: {
    title: "Online Relationship Counseling",
    url: "https://www.betterhelp.com/",
    tags: {
      worry: new Set(["Relationships"]),
    },
  },

  fitness_tracker: {
    title: "Track Your Health With a Smart Fitness Band",
    url: "https://www.fitbit.com/",
    tags: {
      worry: new Set(["Health"]),
      interest: new Set(["Fitness"]),
    },
  },

  health_checkup: {
    title: "Book a Full Health Screening",
    url: "https://www.zocdoc.com/",
    tags: {
      worry: new Set(["Health"]),
    },
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
  let direction = curAd.classList.contains("horizontal")?"horizontal":"vertical"
  html = `<a href=${adchoice["url"]}>
            <div class="${direction}Box">
              
              <img src=${adchoice["img"]} class="${direction}Ad">
              
              <div id="${direction}Text">
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
  if (!saveResult) {
    let name = response["name"] ? response["name"] + ", " : "";
    alert(
      `I just want to learn more about you, ${name}as a friend.\nMy secrets aren't free.`,
    );
    return;
  }
  changeLockerDisplay();
  refreshOverlay();
  curQuestion++;
  console.log("curqest", curQuestion);

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
