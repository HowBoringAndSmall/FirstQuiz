const DATA = [
    {
        question: "Почему такой слабенький опросник я заливаю на гитхаб?",
        answers: [
            {
                id: '1',
                value: 'Просто потому, что это первое что-то большое, что я сделал на JS',
                correct: true,
            },
            {
                id: '2',
                value: 'Потому что хочу',
                correct: false,
            },
            {
                id: '3',
                value: 'Потому что я люблю опросы',
                correct: false,
            },
                
        ]
    },
    {
        question: "Почему я не сделал его на специальных сайтах, как делают все те, кому нужны опросы?",
        answers: [
            {
                id: '4',
                value: 'Потому что я не умею',
                correct: false,
            },
            {
                id: '5',
                value: 'Потому что я не лох',
                correct: true,
            }, 
        ]
    },
    {
        question: "Оцени сайт",
        answers: [
            {
                id: '6',
                value: 'Слабенький',
                correct: false,
            },
            {
                id: '7',
                value: 'Богдан, ты молодец, я обязательно посмотрю, что ты написал на JS и похвалю тебя ещё раз',
                correct: true,
            }, 
        ]
    },

];

let localResults = {};




const quiz = document.getElementById('quiz');
const questions = document.getElementById("questions"); 
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnResert = document.getElementById('btn-resert');

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name = ${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__questions">${DATA[index].question}</div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {

    let content = '';

    const getClassname = (answer, questionIndex) => {
        let className = '';

        if (!answer.correct && answer.id === localResults[questionIndex]) {
            className = 'answer--invalid';
        } else if (answer.correct){
            className = 'answer--valid';
        }

        return className
    };

    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answer) =>`<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
        .join('');
    
    DATA.forEach((question, index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item__questions">${question.question}</div>
                <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
            </div>
        `;
    });
    results.innerHTML = content;

};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) =>{
    //Логика ответа
    if (event.target.classList.contains('answer-input')){
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) =>{
    // Вперёд сначало
    if (event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1
        
        if (DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            btnNext.classList.add('btn-next--hidden');
            btnResert.classList.add('btn-next--visible');
            renderResults();
        }
        else{
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }
    if (event.target.classList.contains('btn-resert')){
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnResert.classList.remove('btn-next--visible');

        renderQuestions(0);
    }
})

renderQuestions(0);
