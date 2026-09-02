import { store } from '../core/Store.js';

export class LandingScreen {
    constructor(containerId, quizSets, subjects) {
        this.container = document.getElementById(containerId);
        this.quizSets = quizSets;
        this.subjects = subjects || [];
        this.selectedSubjectId = null; // null means "all subjects overview"

        this.handleClick = this.handleClick.bind(this);
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
        this.container.removeEventListener('click', this.handleClick);
        if (this.unsubscribe) this.unsubscribe();
        this.container.innerHTML = '';
    }

    bindEvents() {
        this.container.addEventListener('click', this.handleClick);
    }

    handleClick(e) {
        // Handle Back button click
        const backBtn = e.target.closest('.back-to-subjects-btn');
        if (backBtn) {
            this.selectedSubjectId = null;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Handle Subject tab click
        const tabBtn = e.target.closest('.subject-tab-btn');
        if (tabBtn) {
            const subjectId = tabBtn.dataset.subjectId;
            this.selectedSubjectId = subjectId === 'all' ? null : subjectId;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Handle Subject card click
        const subjectCard = e.target.closest('.subject-card');
        if (subjectCard && !e.target.closest('.start-quiz-btn')) {
            const subjectId = subjectCard.dataset.subjectId;
            if (subjectId) {
                this.selectedSubjectId = subjectId;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }

        // Handle Start Quiz button click
        const quizBtn = e.target.closest('.start-quiz-btn');
        if (quizBtn) {
            const setId = quizBtn.dataset.setId;
            if (setId) {
                store.setState({ 
                    view: 'quiz', 
                    activeSetId: setId, 
                    currentIndex: 0 
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    renderSubjectOverview() {
        const subjectCardsHTML = this.subjects.map(subject => {
            const setNum = this.quizSets.filter(s => s.subjectId === subject.id).length;
            const badgeText = setNum > 0 ? `${setNum} Quiz ${setNum === 1 ? 'Set' : 'Sets'}` : 'Coming Soon';
            const isComingSoon = setNum === 0;

            return `
                <div class="subject-card ${isComingSoon ? 'coming-soon' : ''}" data-subject-id="${subject.id}">
                    <div class="subject-card-header" style="background: ${subject.bgGradient}">
                        <div class="subject-card-icon">${subject.icon}</div>
                        <span class="subject-card-badge" style="background: ${subject.badgeColor}">${badgeText}</span>
                    </div>
                    <div class="subject-card-body">
                        <div class="subject-card-code">${subject.code}</div>
                        <h3 class="subject-card-title">${subject.title}</h3>
                        <p class="subject-card-desc">${subject.description}</p>
                    </div>
                    <div class="subject-card-footer">
                        <button class="btn ${isComingSoon ? 'btn-secondary' : 'btn-primary'} select-subject-btn" data-subject-id="${subject.id}">
                            ${isComingSoon ? 'View Subject Details' : 'Explore Quizzes →'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="landing-header">
                <h2>Select a Subject</h2>
                <p>Choose a subject below to access its practice questions and modules.</p>
            </div>
            
            <div class="subject-cards-grid">
                ${subjectCardsHTML}
            </div>
        `;
    }

    renderSubjectDetail(subject) {
        const subjectQuizzes = this.quizSets.filter(s => s.subjectId === subject.id);

        let contentHTML = '';
        if (subjectQuizzes.length === 0) {
            contentHTML = `
                <div class="empty-subject-card">
                    <div class="empty-icon">${subject.icon}</div>
                    <h3>Quizzes Coming Soon</h3>
                    <p>Practice question sets for <strong>${subject.title}</strong> are currently under preparation.</p>
                    <button class="btn btn-secondary back-to-subjects-btn">← Back to All Subjects</button>
                </div>
            `;
        } else {
            const quizCardsHTML = subjectQuizzes.map(set => {
                return `
                    <div class="quiz-set-card">
                        <div class="quiz-set-icon">${subject.icon}</div>
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

            contentHTML = `
                <div class="quiz-sets-grid">
                    ${quizCardsHTML}
                </div>
            `;
        }

        return `
            <div class="subject-detail-header">
                <button class="btn btn-secondary btn-small back-to-subjects-btn">
                    ← Back to All Subjects
                </button>
                <div class="subject-title-area">
                    <span class="subject-title-icon">${subject.icon}</span>
                    <div>
                        <h2>${subject.subtitle || subject.title}</h2>
                        <p>${subject.description}</p>
                    </div>
                </div>
            </div>
            ${contentHTML}
        `;
    }

    render() {
        if (store.getState().view !== 'landing') return;

        // Subject Tabs Navigation
        const tabsHTML = `
            <div class="subject-tabs">
                <button class="subject-tab-btn ${this.selectedSubjectId === null ? 'active' : ''}" data-subject-id="all">
                    📚 All Subjects
                </button>
                ${this.subjects.map(s => {
                    const setNum = this.quizSets.filter(q => q.subjectId === s.id).length;
                    return `
                        <button class="subject-tab-btn ${this.selectedSubjectId === s.id ? 'active' : ''}" data-subject-id="${s.id}">
                            ${s.icon} ${s.code} ${setNum > 0 ? `(${setNum})` : ''}
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        let mainBodyHTML = '';
        if (this.selectedSubjectId === null) {
            mainBodyHTML = this.renderSubjectOverview();
        } else {
            const subject = this.subjects.find(s => s.id === this.selectedSubjectId);
            if (subject) {
                mainBodyHTML = this.renderSubjectDetail(subject);
            } else {
                mainBodyHTML = this.renderSubjectOverview();
            }
        }

        this.container.innerHTML = `
            <div class="landing-container active">
                ${tabsHTML}
                ${mainBodyHTML}
            </div>
        `;
    }
}
