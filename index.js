const questions=[
    {
        question:"Which country is the largest democracy in the world?",
        answer:[
            {text: "India", correct:true },
            {text:"Pakistan", correct:false },
            {text: "Brazil", correct:false },
            {text:"Ukrain", correct: false}
        ]
    },
    {
        question:"Which is the largest animal in the world?",
        answer:[
            {text:"Shark", correct:false },
            {text: "Blue whale", correct:true },
            {text: "Elephant", correct:false },
            {text:"Giraffe", correct: false}
        ]
    },
    {
        question:"Who is the cheif minister of Bihar?",
        answer:[
            {text:"Lalu yadav", correct:false },
            {text: "Tejasvi yadav", correct:false },
            {text:"Baingan", correct: false},
            {text: "Nitish kumar", correct:true },
        ]
    },
    {
        question:"Who are you?",
        answer:[
            {text:"Shark", correct:false },
            {text: "Human", correct:true },
            {text: "Elephant", correct:false },
            {text:"Giraffe", correct: false}
        ]
    }
    
]


 const questionElement=document.querySelector("#question");
 const answerButton=document.querySelector("#answer-btn");
 const nextButton=document.querySelector("#next-btn");

 let currentQuestionIndex=0;
 let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    
    let currentQuestion=questions[currentQuestionIndex];
    questionElement.innerHTML=(currentQuestionIndex+1) +"."+currentQuestion.question
    currentQuestion.answer.forEach(ans=>{
        const button =document.createElement("button");
        button.innerHTML=ans.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(ans.correct){
            button.dataset.correct=ans.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
} 
let sec=1;
function time(){
    setInterval(()=>{
        document.querySelectorAll(".timer")[0].innerHTML=sec+"s";
        sec++;
    },1000);
}


function selectAnswer(){
    const isCorrect=this.dataset.correct;
    if(isCorrect){
        this.classList.add("correct");
        score++;
    }
    else{
        this.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(btn=>{
        if(btn.dataset.correct==="true"){
            btn.classList.add("correct");
        }
        btn.setAttribute("disabled",true);
    })
    nextButton.style.display="block"
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        resetState();
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
        
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your score is ${score} out of ${questions.length}`
   
    document.querySelector("#h").innerHTML=`time taken is ${sec}s`
    document.querySelectorAll(".timer")[0].style.display="none";
    
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}



time();
startQuiz();  