import { store } from '../core/Store.js';

export class Sidebar {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    mount() {
        this.bindEvents();
        this.render();
        this.unsubscribe = store.subscribe(() => {
            this.render();
        });
    }

    unmount() {
        this.container.removeEventListener('click', this.handleNavClick);
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
        this.container.classList.remove('active'); // Hide sidebar in non-quiz views
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleNavClick);
    }

    handleNavClick(e) {
        const item = e.target.closest('.nav-grid-item');
        if (!item) return;

        const newIndex = parseInt(item.dataset.index);
        store.setState({ currentIndex: newIndex });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const state = store.getState();
        
        if (state.view !== 'quiz' || !state.activeSetId) {
            this.container.classList.remove('active');
            this.container.innerHTML = '';
            return;
        }

        this.container.classList.add('active'); // Show sidebar

        const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
        if (!activeSet) return;

        const currentSetAnswers = state.answers[state.activeSetId] || {};

        let listItemsHTML = activeSet.questions.map((q, index) => {
            let statusClass = '';
            let isActive = index === state.currentIndex ? 'active' : '';
            
            // Note: Previously answers were keyed by q.id, but in Store and QuizRenderer 
            // they are now keyed by question index to match state logic. Wait, let's check
            // if answers are keyed by index or q.id. In QuizRenderer, we keyed by index:
            // `[state.currentIndex]: { selectedIndex, isCorrect }`
            // Let's use index here too.
            const answerRecord = currentSetAnswers[index];
            if (answerRecord !== undefined) {
                statusClass = answerRecord.isCorrect ? 'correct' : 'incorrect';
            }

            return `
                <li class="nav-grid-item ${isActive} ${statusClass}" data-index="${index}" role="button" tabindex="0" aria-label="Question ${index + 1}">
                    <span>${index + 1}</span>
                </li>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="sidebar-card">
                <h3>Quiz Progress</h3>
                <ul class="nav-grid-list" id="sidebar-nav-list">
                    ${listItemsHTML}
                </ul>
            </div>
        `;
    }
}
