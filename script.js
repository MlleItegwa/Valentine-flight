
/* SCREENS */

function showScreen(id){
 document.querySelectorAll(".screen")
 .forEach(s=>s.classList.remove("active"));

 document.getElementById(id).classList.add("active");
}


/* MUSIC */

const music=document.getElementById("music");

yesBtn.onclick=()=>{

 music.play();

 showScreen("turbulence");

 startCountdown();
};


/* RUN */

function run(btn){

 btn.onmouseover=btn.ontouchstart=()=>{

  btn.style.left=Math.random()*150-75+"px";
  btn.style.top=Math.random()*150-75+"px";
 };
}

run(noBtn);
run(finalNo);


/* COUNT */

function startCountdown(){

 let c=5;

 let t=setInterval(()=>{

  countdown.textContent=c--;

  if(c<0){

   clearInterval(t);

   showScreen("quiz");

   loadQ();
  }

 },1000);
}


/* SAVE ANSWERS */

let answersLog=[];


/* QUIZ */

let questions=[

 {q:"💞 When do you feel most emotionally safe with me?",
  o:["When we talk deeply",
      "When I support you",
      "When I reassure you",
      "When I give you space"]},

 {q:"💞 What fear do you have about being with me?",
  o:["Losing you",
      "Hurting you",
      "Not being enough",
      "Losing freedom"]},

 {q:"💞 What made you stay consistent with me these past months?",
  o:["Emotional connection",
      "Trust",
      "Attraction",
      "My personality"]},

 {q:"💞 When I’m upset, what do you think I need most from you?",
  o:["Listening","Comfort","Solutions","Space"]},

 {q:"💞 What do you think we can do better than your past relationships?",
  o:["Communication","Loyalty","Support","Understanding"]},

 {q:"💞 If we face a serious problem, what would you do first?",
  o:["Talk and fix it",
      "Pray / reflect",
      "Take space then talk",
      "Avoid it"]},

 {q:"💞 What part of me do you never want to lose?",
  o:["My kindness",
      "My ambition",
      "My love",
      "My loyalty"]},

 {q:"💞 How do you imagine loving me when things are not easy?",
  o:[ "Patience & effort",
      "Reassurance",
      "Giving space",
      "Still choosing you"]},

 {q:"💞 What promise would you want us to make to each other?",
  o:[ "Always be transparent",
      "Never disrespect",
      "Always communicate",
      "Grow together"]},

 {q:"💞 Why do you want me as your girlfriend — not just “a girl friend”?",
  o:["Emotional bond",
      "Compatibility",
      "My character",
      "Future potential"]}

];

let i=0;


/* LOAD */

function loadQ(){

 quizBox.classList.remove("slide");

 setTimeout(()=>quizBox.classList.add("slide"),10);

 let q=questions[i];

 question.textContent=q.q;

 options.innerHTML="";

 q.o.forEach(opt=>{

  let b=document.createElement("button");

  b.textContent=opt;

  b.onclick=()=>pick(opt);

  options.appendChild(b);
 });
}


/* PICK */

function pick(opt){

 answersLog.push({
  question:questions[i].q,
  answer:opt
 });

 i++;

 if(i<questions.length) loadQ();
 else showScreen("landing");
}


/* BACK */

function goBack(){

 if(i>0){

  i--;

  answersLog.pop();

  loadQ();
 }
}


/* TRUE FALSE */

let tf=[
 "😊 You smile when my name pops up",
 "😌 You brag about me to your homeboys",
 "🫶🏽 You've imagined us together"
];

let si=0;


landYes.onclick=()=>showScreen("series");


function loadTF(){

 seriesQ.textContent=tf[si];
}

loadTF();


function nextSeries(v){

 answersLog.push({
  question:tf[si],
  answer:v?"True":"False"
 });

 si++;

 if(si<tf.length) loadTF();
 else showResult();
}


/* RESULT */

function showResult(){

 showScreen("result");

 score.textContent="Answers sent to Yvette 💖✈️";

 sendEmail();

 fireworks();
}



function fireworks(){

 let end=Date.now()+5000;

 (function f(){

  confetti({particleCount:6,spread:80});

  if(Date.now()<end) requestAnimationFrame(f);

 })();
}


/* LETTER */

envelopeImg.onclick=()=>showScreen("letter");


function closeLetter(){

 music.pause();

 console.log("His answers:",answersLog);

 showScreen("intro");
}
function sendEmail(){

 let text="";

 answersLog.forEach((a,i)=>{

  text+=`${i+1}. ${a.question}\nAnswer: ${a.answer}\n\n`;

 });

 emailjs.send(
  "service_8pwulyh",
  "template_vq3wpw4",
  {
   message: text
  }
 ).then(()=>{

  console.log("Email sent ❤️");

 }).catch(err=>{

  console.log("Email error:",err);

 });
}
