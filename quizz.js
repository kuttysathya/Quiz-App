const questions =[
    { 
        question: "What is the capital of France?",
         answer :[{text: "Indonesia", correct: false},
                  {text: "Paris", correct: true},
                  {text: "Seoul", correct: false},
                  {text: "Bangkok" , correct: false},]
            
    },
    { 
        question: "What is the largest lake in the world?",
         answer :[{text: "Ontario", correct: false},
                  {text: "Caspian Sea", correct: false},
                  {text: "Baikal", correct: true},
                  {text: "Lake Superior" , correct: false},]
            
    },
    { 
        question: "Which river is the longest in the world?",
         answer :[{text: "Yangtze", correct: false},
                  {text: "Amazon", correct: false},
                  {text: "Mississippi", correct: false},
                  {text: "Nile" , correct: true},]
            
    },
    { 
        question: "What animal is the national symbol of Australia?",
         answer :[{text: "Kangaroo", correct: true},
                  {text: "Emu", correct: false},
                  {text: "Crocodile", correct: false},
                  {text: "Koala" , correct: false},]
            
    },
    { 
        question: "Which planet in the solar system is known as the “Red Planet”?",
         answer :[{text: "Venus", correct: false},
                  {text: "Earth", correct: false},
                  {text: "Mars", correct: true},
                  {text: "Jupiter" , correct: false},]
            
    }
];

const questionElement = document.getElementById("Question");
const answerbuttons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next_Button");
const timerE = document.getElementById("timer")

let currentQuestionIndex = 0;
let score = 0;
let timeLeft =30;
let timerInterval;

function startQuiz(){
    setTimer();
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function setTimer(){
    timerInterval = setInterval(()=>{
        timeLeft--;
        timerE.textContent = `Timer: ${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timerInterval);
            handlerNextButton();
        }
    },1000);
}


function showQuestion(){
    resetState();
    clearInterval(timerInterval);
    timeLeft =30;
    timerE.textContent = timeLeft;
    setTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber +". "+ currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    timerE.textContent = timeLeft;
    clearInterval(timerInterval);
    timerE.style.display=" block";
    nextButton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}


function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score ++;
    }else{
        selectedButton.classList.add("incorrect");
    }
Array.from (answerbuttons.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display ="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
    clearInterval(timerInterval);
    timerE.style.display="none";

}

function  handlerNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handlerNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();