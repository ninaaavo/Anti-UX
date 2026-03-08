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

`In sixth grade I lied about being pregnant because nobody paid attention to me and I wanted someone to care.`
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
  locker = lockers[currentLockerID]
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
    secret.innerHTML = `<h1>${textData}</h1>`
  }
}
// When click on a locker, show the overlay
console.log(Array.isArray(lockers));
lockers.forEach((locker, ind) => {
  locker.addEventListener("click", (event) => {
    if (overlay.classList.contains("hidden")) {
      event.stopPropagation();
      currentLockerID = ind;
      overlay.classList.remove("hidden");
      console.log("clicked", currentLockerID);
      console.log("ounopended", unopenedLockers);

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
    options: ["female", "male", "nonbinary"],
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
  console.log("area is", area);
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

function showSecret() {
  // swap out the questions to the secret, after user unlocked the locker
  // overlay.innerHTML = "Yo, ure out"
  console.log("overlay", overlay);
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
  refreshOverlay()
  showSecret();
  curQuestion++;

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
