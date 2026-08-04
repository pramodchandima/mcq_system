import { store } from '../core/Store.js';

export class QuizRenderer {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
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
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleOptionClick);
        this.container.addEventListener('click', this.handleNextClick);
    }

    handleOptionClick(e) {
        const optionBtn = e.target.closest('.option-btn');
        if (!optionBtn || optionBtn.disabled) return;

        const state = store.getState();
        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;
        
        const question = activeSet.questions[state.currentIndex];
        const selectedIndex = parseInt(optionBtn.dataset.optionIndex);
        const isCorrect = selectedIndex === question.correctAnswerIndex;

        const currentSetAnswers = state.answers[state.activeSetId] || {};
        
        // Update state with answer
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
        const selectedOption = isAnswered ? answerRecord.selectedIndex : null;
        const isCorrect = isAnswered ? answerRecord.isCorrect : null;

        const optionsHTML = question.options.map((option, index) => {
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
            let btnClass = 'option-btn';
            
            if (isAnswered) {
                if (index === question.correctAnswerIndex) {
                    btnClass += ' correct';
                } else if (index === selectedOption) {
                    btnClass += ' incorrect selected';
                }
            }

            return `
                <button class="${btnClass}" data-option-index="${index}" ${isAnswered ? 'disabled' : ''}>
                    <span class="option-letter">${letters[index] || (index+1)}</span>
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
