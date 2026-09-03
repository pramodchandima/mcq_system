import { store } from '../core/Store.js';

export class AppHeader {
    constructor(containerId, quizSets) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.render();
        this.bindEvents();
        
        // Subscribe to state changes
        store.subscribe((state) => this.update(state));
    }

    render() {
        const state = store.getState();
        const isLight = state.theme === 'light';
        
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><span>Light Mode</span>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Dark Mode</span>`;

        this.container.innerHTML = `
            <header class="app-header">
                <div class="header-title" style="cursor: pointer;">
                    <h1>MCQ Practice</h1>
                    <p>Master your concepts</p>
                </div>
                <div class="header-controls">
                    <button id="theme-toggle" class="btn btn-secondary btn-small" aria-label="Toggle dark or light theme">
                        ${isLight ? moonIcon : sunIcon}
                    </button>
                    <div class="header-stats" style="display: ${state.view === 'quiz' ? 'flex' : 'none'};">
                        <button id="home-btn" class="btn btn-secondary btn-small" aria-label="Go to home screen">Home</button>
                        <button id="reset-btn" class="btn btn-secondary btn-small" aria-label="Reset quiz progress">Reset Progress</button>
                        <div class="score-badge" id="global-score-badge">
                            <span>Score:</span> <span class="score-val" id="global-score">0/0</span>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const target = e.target.closest('button') || e.target.closest('.header-title');
            if (!target) return;

            if (target.id === 'theme-toggle') {
                const newTheme = store.getState().theme === 'light' ? 'dark' : 'light';
                store.setState({ theme: newTheme });
            } 
            else if (target.id === 'home-btn' || target.classList.contains('header-title')) {
                store.setState({ view: 'landing' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else if (target.id === 'reset-btn') {
                window.dispatchEvent(new Event('show-reset-modal'));
            }
        });
    }

    calculateScore(state) {
        let score = 0;
        const setAnswers = state.answers[state.activeSetId] || {};
        for (let key in setAnswers) {
            if (setAnswers[key].isCorrect) score++;
        }
        return score;
    }

    update(state) {
        // Update Theme button icon
        const themeBtn = this.container.querySelector('#theme-toggle');
        if (themeBtn) {
            const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><span>Light Mode</span>`;
            const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Dark Mode</span>`;
            themeBtn.innerHTML = state.theme === 'light' ? moonIcon : sunIcon;
        }

        // Update Visibility of stats
        const headerStats = this.container.querySelector('.header-stats');
        if (headerStats) {
            headerStats.style.display = state.view === 'quiz' ? 'flex' : 'none';
        }

        // Update Score if in quiz
        if (state.view === 'quiz' && state.activeSetId) {
            const scoreVal = this.container.querySelector('#global-score');
            if (scoreVal) {
                const activeSet = this.quizSets.find(s => s.id === state.activeSetId);
                const totalQ = activeSet ? (activeSet.questionCount || (activeSet.questions ? activeSet.questions.length : 0)) : 0;
                const score = this.calculateScore(state);
                scoreVal.textContent = `${score}/${totalQ}`;
            }
        }
    }
}
