const lockers = Array.from(document.getElementsByClassName("locker"));
const overlay = document.getElementById('overlay');
const zoomedLocker = document.getElementById('zoomedLocker');
console.log("yoooo");
console.log("all lockers", lockers[0]);


// When click on a locker, show the question
console.log(Array.isArray(lockers));
lockers.forEach((locker, ind) => {
    locker.addEventListener('click', (event) => {
      if (overlay.classList.contains('hidden')){
        event.stopPropagation()
        zoomedLocker.src = locker.src;
        overlay.classList.remove('hidden');
        console.log("clicked!! " + (ind + 1))
      }
    });
});

// when click outside of overlay, exit
document.addEventListener('click', (event) => {
  console.log("class lst" ,overlay.classList)
  if(!overlay.contains(event.target) && !overlay.classList.contains('hidden')){
    console.log("clicked outside");
    overlay.classList.add('hidden');
    console.log("overlay list", overlay.classList)
  }
})

// now do the questions

let curQuestion = 0;

const questions = [
  {id: "name", type:"text", prompt:"How should I call you?"},
  {id: "birthday", type:"date", prompt:"What is your birthday?" },
  {id: "gender", type: "radio", prompt:"Which gender do you identify with?", options:["female", "male", "nonbinary"]},
  {id: "occupation", type:"checkbox", prompt:"Which best describe your current situation?", options:["Student", "Employed", "Self-employed", "Other"]},
  {id: "interest", type: "checkbox", prompt:"Which of these interests you?", options:["Gaming", "Fashion", "Fitness", "Finance", "Art/Creativity", "Travel"]},
  {id: 'frequency', type: "radio", prompt:"How often do you usually buy things online?", options:["Several times a week", "Once a week", "Once or twice a month", "Rarely"]},
  {id: "budget", type:"radio", prompt: "If something could make you feel much better right now, how much would you pay for it?", options:["Almost nothing", "Up to $50", "Up to $100", "Up to $500", "Whatever it costs"]},
  {id: "spending", type: "radio", prompt: "When you decide to buy something, which describe you best?", options:["I look for the cheapest option.", "I wait for sales or discounts", "I buy things that make people jealous of me.", "If I want it, I buy it immediately", " I usually think about it for a while before buying."]},
  {id: "upgrade", type:"radio", prompt:"When a new version of something you own comes out, what do you usually do?", options: ["Upgrade immediately", "Upgrade Eventually", "Wait until my current one breaks"]},
  {id: "worries", type:"radio", prompt:"Which of these worries you the most right now?", options:["Not having enough money", "Falling behind others", "Job or career stability", "Relationships", "Health"]},
  {id: "comfortable", type:"radio", prompt:"Do you feel comfortable answering my questions?", options:["Completely comfortable", "Somewhat comfortable", "Slightly uncomfortable", "Very uncomfortable"]},
  {id: "secret", type:"text", prompt:"Tell me something about yourself that you'd rather no one knows, I promise to keep it between us."}
]

let response = {}

const recordPhases = {}
  