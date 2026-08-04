import { store } from '../core/Store.js';

export class LandingScreen {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
    }

    mount() {
        this.bindEvents();
        this.render();
        this.unsubscribe = store.subscribe(() => {
            if (store.getState().view === 'landing') {
                this.render();
            }
        });
    }

    unmount() {
        this.container.removeEventListener('click', this.handleStartQuiz);
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleStartQuiz);
    }

    handleStartQuiz(e) {
        const btn = e.target.closest('.start-quiz-btn');
        if (!btn) return;

        const setId = btn.dataset.setId;
        if (setId) {
            // Check if there's saved progress to resume, but we actually just reset the current index if starting fresh
            // or if they had progress, the store handles merging, but we should just set the active set.
            // If they click start, they go to wherever they left off in that set.
            const savedState = store.getState();
            let resumeIndex = 0;
            if (savedState.answers[setId]) {
                 // Try to resume from the last unanswered or just go to 0
                 // Let's keep the existing logic: if they had progress, `currentIndex` was restored by store init,
                 // but if they switch sets, they start at 0 unless we store currentIndex per set.
                 // Currently `currentIndex` is global. We will just reset it to 0 when starting a set.
                 resumeIndex = 0; // Wait, if we want to resume, we might need a more complex logic. 
                 // Let's just set it to 0 as in original. The user can use sidebar to navigate.
            }
            store.setState({ 
                view: 'quiz', 
                activeSetId: setId, 
                currentIndex: 0 
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    render() {
        if (store.getState().view !== 'landing') return;

        const cardsHTML = this.quizSets.map((set) => {
            return `
                <div class="quiz-set-card">
                    <div class="quiz-set-icon">📚</div>
                    <div class="quiz-set-info">
                        <h3>${set.title}</h3>
                        <p>${set.description}</p>
                        <div class="quiz-set-meta">
                            <span class="meta-badge">${set.questions.length} Questions</span>
                        </div>
                    </div>
                    <button class="btn btn-primary start-quiz-btn" data-set-id="${set.id}">Start Practice</button>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="landing-container active">
                <div class="landing-header">
                    <h2>Available Practice Sets</h2>
                    <p>Select a topic below to begin your practice session.</p>
                </div>
                <div class="quiz-sets-grid">
                    ${cardsHTML}
                </div>
            </div>
        `;
    }
}
