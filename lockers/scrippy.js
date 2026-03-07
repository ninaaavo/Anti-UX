const lockers = Array.from(document.getElementsByClassName("locker"));
const overlay = document.getElementById("overlay");
const zoomedLocker = document.getElementById("zoomedLocker");
console.log("yoooo");
console.log("all lockers", lockers[0]);

// When click on a locker, show the question
console.log(Array.isArray(lockers));
lockers.forEach((locker, ind) => {
  locker.addEventListener("click", (event) => {
    if (overlay.classList.contains("hidden")) {
      event.stopPropagation();
      zoomedLocker.src = locker.src;
      displayQuestion();
      overlay.classList.remove("hidden");
      console.log("clicked!! " + (ind + 1));
    }
  });
});

// when click outside of overlay, exit
document.addEventListener("click", (event) => {
  if (
    !overlay.contains(event.target) &&
    !overlay.classList.contains("hidden")
  ) {
    console.log("clicked outside");
    overlay.classList.add("hidden");
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
  console.log("cur q is", q);
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

function clickSubmit() {
  let saveResult = saveResponse();
  if (!saveResult) {
    let name = response["name"] ? response["name"] + ", " : "";
    alert(
      `I just want to learn more about you, ${name}as a friend.\nMy secrets aren't free.`,
    );
    return;
  }

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
