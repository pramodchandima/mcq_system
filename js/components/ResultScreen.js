import { store } from '../core/Store.js';

export class ResultScreen {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.handleRestartClick = this.handleRestartClick.bind(this);
    }

    mount() {
        this.bindEvents();
        this.render();
        this.unsubscribe = store.subscribe(() => {
            if (store.getState().view === 'result') {
                this.render();
            }
        });
    }

    unmount() {
        this.container.removeEventListener('click', this.handleRestartClick);
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleRestartClick);
    }

    handleRestartClick(e) {
        if (e.target.id === 'restart-btn') {
            const state = store.getState();
            
            // If restart, we can just reset answers for this set, or just navigate to index 0. 
            // In original it just did: `state.currentIndex = 0; state.view = 'quiz'; render();`
            // Let's reset the answers for the active set as well to restart from scratch, 
            // wait, no, the original restart button just went to the first question without clearing answers?
            // Actually, if they want to clear, they click "Reset Progress".
            // Let's just go to the first question and change view back to quiz.
            store.setState({ 
                view: 'quiz',
                currentIndex: 0
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    calculateScore(state) {
        let score = 0;
        const setAnswers = state.answers[state.activeSetId] || {};
        for (let key in setAnswers) {
            if (setAnswers[key].isCorrect) score++;
        }
        return score;
    }

    render() {
        const state = store.getState();
        if (state.view !== 'result' || !state.activeSetId) return;

        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;

        const score = this.calculateScore(state);
        const total = activeSet.questions.length;
        const percentage = Math.round((score / total) * 100) || 0;
        
        this.container.innerHTML = `
            <div class="result-card quiz-card active">
                <h2>Quiz Completed!</h2>
                <p>You have answered all questions.</p>
                
                <div class="result-stats">
                    <div class="stat-box">
                        <span class="stat-num">${score} / ${total}</span>
                        <span class="stat-lbl">Score</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-num">${percentage}%</span>
                        <span class="stat-lbl">Accuracy</span>
                    </div>
                </div>
                
                <button class="btn btn-primary" id="restart-btn">Restart Quiz</button>
            </div>
        `;
    }
}
