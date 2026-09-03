import { store } from '../core/Store.js';

export class QuizRenderer {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleSubmitFillBlanks = this.handleSubmitFillBlanks.bind(this);
    }

    mount() {
        this.bindEvents();
        this.render();
        this.unsubscribe = store.subscribe(() => {
            if (store.getState().view === 'quiz') {
                this.render();
            }
        });
    }

    unmount() {
        this.container.removeEventListener('click', this.handleOptionClick);
        this.container.removeEventListener('click', this.handleNextClick);
        this.container.removeEventListener('click', this.handleSubmitFillBlanks);
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleOptionClick);
        this.container.addEventListener('click', this.handleNextClick);
        this.container.addEventListener('click', this.handleSubmitFillBlanks);
    }

    handleOptionClick(e) {
        const optionBtn = e.target.closest('.option-btn');
        if (!optionBtn || optionBtn.disabled) return;

        const state = store.getState();
        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;
        
        const question = activeSet.questions[state.currentIndex];
        if (question.type === 'fill_in_blanks') return;

        const selectedIndex = parseInt(optionBtn.dataset.optionIndex);
        const isCorrect = selectedIndex === question.correctAnswerIndex;

        const currentSetAnswers = state.answers[state.activeSetId] || {};
        
        store.setState({
            answers: {
                ...state.answers,
                [state.activeSetId]: {
                    ...currentSetAnswers,
                    [state.currentIndex]: {
                        selectedIndex,
                        isCorrect
                    }
                }
            }
        });
    }

    handleSubmitFillBlanks(e) {
        const submitBtn = e.target.closest('#submit-fill-blanks');
        if (!submitBtn || submitBtn.disabled) return;

        const state = store.getState();
        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;

        const question = activeSet.questions[state.currentIndex];
        if (question.type !== 'fill_in_blanks') return;

        const selectEls = this.container.querySelectorAll('.fill-blank-select');
        const selectedBlanks = {};
        const blankResults = {};
        let allCorrect = true;
        let anyUnanswered = false;

        selectEls.forEach(select => {
            const idx = select.dataset.blankIndex;
            const val = select.value;
            if (!val) anyUnanswered = true;
            selectedBlanks[idx] = val;

            const blankConfig = question.blanks[idx];
            const isBlankCorrect = val === (blankConfig ? blankConfig.correctAnswer : '');
            blankResults[idx] = isBlankCorrect;
            if (!isBlankCorrect) allCorrect = false;
        });

        if (anyUnanswered) {
            alert('Please select an option for all dropdown blanks before submitting.');
            return;
        }

        const currentSetAnswers = state.answers[state.activeSetId] || {};

        store.setState({
            answers: {
                ...state.answers,
                [state.activeSetId]: {
                    ...currentSetAnswers,
                    [state.currentIndex]: {
                        selectedBlanks,
                        blankResults,
                        isCorrect: allCorrect
                    }
                }
            }
        });
    }

    handleNextClick(e) {
        const nextBtn = e.target.closest('#next-btn');
        if (!nextBtn || nextBtn.disabled) return;

        const state = store.getState();
        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;

        if (state.currentIndex < activeSet.questions.length - 1) {
            store.setState({ currentIndex: state.currentIndex + 1 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            store.setState({ view: 'result' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    render() {
        const state = store.getState();
        if (state.view !== 'quiz' || !state.activeSetId) return;

        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;

        const question = activeSet.questions[state.currentIndex];
        const currentSetAnswers = state.answers[state.activeSetId] || {};
        const answerRecord = currentSetAnswers[state.currentIndex];
        const isAnswered = answerRecord !== undefined;

        // Fill in the blanks question type
        if (question.type === 'fill_in_blanks') {
            let processedText = question.questionText;

            if (question.blanks && Array.isArray(question.blanks)) {
                question.blanks.forEach((blank, idx) => {
                    const userChoice = isAnswered && answerRecord.selectedBlanks ? answerRecord.selectedBlanks[idx] : '';
                    const isBlankCorrect = isAnswered && answerRecord.blankResults ? answerRecord.blankResults[idx] : null;

                    let selectHTML = '';
                    if (isAnswered) {
                        const badge = isBlankCorrect 
                            ? `<span class="blank-badge correct" title="Correct">✔</span>` 
                            : `<span class="blank-badge incorrect" title="Incorrect (Correct: ${blank.correctAnswer})">✖</span>`;
                        
                        selectHTML = `
                            <span class="inline-blank-container ${isBlankCorrect ? 'is-correct' : 'is-incorrect'}">
                                <select class="fill-blank-select answered" disabled>
                                    <option value="${userChoice}">${userChoice || 'Unanswered'}</option>
                                </select>
                                ${badge}
                            </span>
                        `;
                    } else {
                        const optionsStr = blank.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                        selectHTML = `
                            <span class="inline-blank-container">
                                <select class="fill-blank-select" data-blank-index="${idx}">
                                    <option value="">Choose...</option>
                                    ${optionsStr}
                                </select>
                            </span>
                        `;
                    }

                    processedText = processedText.replace(`[[blank_${idx}]]`, selectHTML);
                });
            }

            const isCorrect = isAnswered ? answerRecord.isCorrect : null;
            let explanationHTML = '';
            if (isAnswered) {
                explanationHTML = `
                    <div class="explanation-box visible">
                        <h4>${isCorrect ? 'Correct!' : 'Partially / Incorrect!'}</h4>
                        <div class="explanation-text">${question.explanation}</div>
                    </div>
                `;
            }

            this.container.innerHTML = `
                <div class="quiz-card active">
                    <div class="question-header">
                        <span class="question-type-badge">Fill in the Blanks</span>
                    </div>
                    
                    <div class="fill-blanks-text" id="fill-blanks-container">
                        ${processedText}
                    </div>

                    ${question.resourcePath ? `<img src="${question.resourcePath}" alt="Question Image" class="question-image">` : ''}
                    
                    ${explanationHTML}
                    
                    <div class="action-container">
                        ${!isAnswered ? `
                            <button class="btn btn-secondary" id="submit-fill-blanks">
                                Check Answer
                            </button>
                        ` : ''}
                        <button class="btn btn-primary" id="next-btn" ${!isAnswered ? 'disabled' : ''}>
                            Next Question
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        // Standard MCQ question type
        const selectedOption = isAnswered ? answerRecord.selectedIndex : null;
        const isCorrect = isAnswered ? answerRecord.isCorrect : null;

        const isRoman = question.optionsFormat === 'roman' || (question.options && question.options.length === 5);
        const romanLetters = ['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.'];
        const stdLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

        const optionsHTML = question.options.map((option, index) => {
            let btnClass = 'option-btn';
            
            if (isAnswered) {
                if (index === question.correctAnswerIndex) {
                    btnClass += ' correct';
                } else if (index === selectedOption) {
                    btnClass += ' incorrect selected';
                }
            }

            const letterLabel = isRoman ? (romanLetters[index] || (index+1)+'.') : (stdLetters[index] || (index+1));

            return `
                <button class="${btnClass}" data-option-index="${index}" ${isAnswered ? 'disabled' : ''} aria-label="Option ${letterLabel}">
                    <span class="option-letter">${letterLabel}</span>
                    <span class="option-text">${option}</span>
                </button>
            `;
        }).join('');

        let explanationHTML = '';
        if (isAnswered) {
            explanationHTML = `
                <div class="explanation-box visible">
                    <h4>${isCorrect ? 'Correct!' : 'Incorrect!'}</h4>
                    <div class="explanation-text">${question.explanation}</div>
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="quiz-card active">
                <div class="question-header">
                    <h2 class="question-title">${question.questionText}</h2>
                    ${question.resourcePath ? `<img src="${question.resourcePath}" alt="Question Image" class="question-image">` : ''}
                </div>
                
                <div class="options-container" id="options-container">
                    ${optionsHTML}
                </div>
                
                ${explanationHTML}
                
                <div class="action-container">
                    <button class="btn btn-primary" id="next-btn" ${!isAnswered ? 'disabled' : ''}>
                        Next Question
                    </button>
                </div>
            </div>
        `;
    }
}

