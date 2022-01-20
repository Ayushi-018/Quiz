let questions = [
    {
        numb : 1,
        question : "HTML stands for - ",
        answer : "HyperText Markup Language",
        options : [
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "None of these"
        ]
    },
    {
        numb : 2,
        question : "Which of the following attribute is used to provide a unique name to an element?",
        answer : "id",
        options : [
            "class",
            "id",
            "type",
            "None of the above"
        ]
    },
    {
        numb : 3,
        question : "What are the types of unordered or bulleted list in HTML?",
        answer : "disc, circle, square",
        options : [
            "disc, square, triangle",
            "polygon, triangle, circle",
            "disc, circle, square",
            "All of the above"
            
        ]
    },
    {
        numb : 4,
        question : "Which of the following HTML attribute is used to define inline styles?",
        answer : "style",
        options : [
            "style",
            "type",
            "class",
            "None of the above"
        ]
    },
    {
        numb : 5,
        question : "A program in HTML can be rendered and read by -",
        answer : "Web browser",
        options : [
            "Web browser",
            "Server",
            "Interpreter",
            "None of the above"
        ]
    },
]

const start_btn = document.querySelector(".start_btn");
const rules_box = document.querySelector(".rules_box");
const exit_btn = document.querySelector(".buttons .exit_btn");
const continue_btn = document.querySelector(".buttons .continue_btn");
const quiz_box = document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeline = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .time_text");
// on clicking start_btn

start_btn.onclick = () =>{
    rules_box.classList.add("activeRules");//rules box appears
}

// on clicking start_btn
exit_btn.onclick =()=>{
    rules_box.classList.remove("activeRules");//rules box disappear,back to start button
}

// on clicking start_btn
continue_btn.onclick=()=>{
    rules_box.classList.remove("activeRules");//hide rules box
    quiz_box.classList.add("activeQuiz");//show quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timerValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const resart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

resart_quiz.onclick=()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timerValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);//after each que repeat timer from start
        startTimer(timerValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display= "none";
        timeoff.textContent="Time Left";
}

quit_quiz.onclick=()=>{
    window.location.reload();//reloads page
}
// if next button clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length-1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);//after each que repeat timer from start
        startTimer(timerValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display= "none";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}

//getting questions and options from the array
function showQuestions(index){
    const que_text=document.querySelector(".que_box");
    let que_tag='<span>'+questions[index].numb+ ". "+questions[index].question+'</span>';
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[2]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[3]+'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length ; i++)
    {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon_tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon_cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns==correctAns){
        userScore++;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        // if answer choosen is incorrect automatically select the correct answer
        for(let i=0;i<allOptions;i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
    //once user selected disabled all options
    for(let i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display= "block";
}

function showResultBox(){
    rules_box.classList.remove("activeRules");//hide rules box
    quiz_box.classList.remove("activeQuiz");//remove the quiz box
    result_box.classList.add("activeResult");//show result box
    const scoreText=result_box.querySelector(".score_text");
    if(userScore > 3 ){
        let scoreTag='<span>and congrats! you got <p> '+ userScore + ' </p> out of <p> '+questions.length +' </p>Questions</span>';
        scoreText.innerHTML=scoreTag;
    }
    else if(userScore > 1 ){
        let scoreTag='<span>and nice, you got <p> '+userScore+ ' </p> out of <p> '+questions.length+'</p>Questions</span>';
        scoreText.innerHTML=scoreTag;
    }
    else{
        let scoreTag='<span>and sorry, you got only <p> '+userScore+ ' </p> out of <p> '+questions.length +' </p>Questions</span>';
        scoreText.innerHTML=scoreTag;
    }
}
let allOptions = option_list.children.length;
function startTimer(time){
    counter= setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
            
            let correctAns = questions[que_count].answer;

            for(let i=0;i<allOptions;i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }

            for(let i=0;i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display= "block";
            let btn = document.querySelector(".next_btn");
            btn.click();
        }
    }
}

function startTimerLine(time){
    counterLine= setInterval(timer,29);
    function timer(){
        time+=1;
        timeline.style.width = time + "px";
        if(time>549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    const bottom_ques_counter=document.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+index +'</p>of<p>'+questions.length +'</p>'+"Questions"+'</span>';
    bottom_ques_counter.innerHTML=totalQuesCountTag;
}
