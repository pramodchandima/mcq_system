import { questions } from './data/questions.js';
import { saveProgress, loadProgress, clearProgress } from './utils/storage.js';
import { Sidebar } from './components/Sidebar.js';
import { QuizRenderer } from './components/QuizRenderer.js';
import { ResultScreen } from './components/ResultScreen.js';
import { LandingScreen } from './components/LandingScreen.js';

// Mocking quiz sets
const quizSets = [
    {
        id: 'set-rad-l6',
        title: 'Rapid Application Development',
        description: 'Lesson 06: Considerations on Developing Rapid Applications (Security & Quality)',
        questions: questions
    }
];

let state = {
    view: 'landing', // 'landing' or 'quiz'
    activeSetId: null,
    currentIndex: 0,
    answers: {}, // { "set-rad-l6": { "q1": { selectedIndex: 1, isCorrect: false }, ... } }
};

const elements = {
    sidebarContainer: document.getElementById('sidebar-container'),
    mainContentArea: document.getElementById('main-content-area'),
    globalScore: document.getElementById('global-score'),
    resetBtn: document.getElementById('reset-btn'),
    homeBtn: document.getElementById('home-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    modal: document.getElementById('confirm-modal'),
    modalConfirmBtn: document.getElementById('modal-confirm-btn'),
    modalCancelBtn: document.getElementById('modal-cancel-btn'),
    appHeaderStats: document.querySelector('.header-stats'),
    headerTitle: document.querySelector('.header-title')
};

const init = () => {
    // Theme setup
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><span>Light Mode</span>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Dark Mode</span>`;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeToggle.innerHTML = savedTheme === 'light' ? moonIcon : sunIcon;

    elements.themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            elements.themeToggle.innerHTML = sunIcon;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            elements.themeToggle.innerHTML = moonIcon;
        }
    });

    const savedData = loadProgress();
    if (savedData) {
        // Migration check from old state format
        if (savedData.answers && !savedData.answers['set-rad-l6'] && Object.keys(savedData.answers).length > 0) {
             state.answers = { 'set-rad-l6': savedData.answers };
             state.currentIndex = savedData.currentIndex || 0;
        } else {
             state = { ...state, ...savedData };
         }
        // Always start at landing view by default
        state.view = 'landing'; 
    }

    elements.resetBtn.addEventListener('click', () => {
        elements.modal.classList.add('show');
    });

    elements.modalCancelBtn.addEventListener('click', () => {
        elements.modal.classList.remove('show');
    });

    elements.modalConfirmBtn.addEventListener('click', () => {
        elements.modal.classList.remove('show');
        handleReset();
    });

    const goHome = () => {
        state.view = 'landing';
        saveProgress(state);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    elements.homeBtn.addEventListener('click', goHome);
    elements.headerTitle.addEventListener('click', goHome);
    
    render();
};

const calculateScore = (setId) => {
    let score = 0;
    const setAnswers = state.answers[setId] || {};
    for (let key in setAnswers) {
        if (setAnswers[key].isCorrect) score++;
    }
    return score;
};

const getActiveQuestions = () => {
    const set = quizSets.find(s => s.id === state.activeSetId);
    return set ? set.questions : [];
};

const render = () => {
    if (state.view === 'landing') {
        elements.sidebarContainer.style.display = 'none';
        elements.appHeaderStats.style.display = 'none'; 
        elements.mainContentArea.innerHTML = LandingScreen(quizSets);
        
        const startBtns = document.querySelectorAll('.start-quiz-btn');
        startBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const setId = e.currentTarget.getAttribute('data-set-id');
                state.activeSetId = setId;
                state.view = 'quiz';
                
                // Reset index if we finished it previously
                const activeQ = getActiveQuestions();
                if (state.currentIndex >= activeQ.length) {
                    state.currentIndex = 0;
                }
                saveProgress(state);
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
        return;
    }

    // Quiz View
    elements.sidebarContainer.style.display = 'flex';
    elements.appHeaderStats.style.display = 'flex';
    
    const activeQuestions = getActiveQuestions();
    const currentScore = calculateScore(state.activeSetId);
    elements.globalScore.textContent = `${currentScore}/${activeQuestions.length}`;

    const setAnswers = state.answers[state.activeSetId] || {};

    // Render Sidebar
    elements.sidebarContainer.innerHTML = Sidebar(activeQuestions, state.currentIndex, setAnswers);
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            state.currentIndex = index;
            saveProgress(state);
            render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Render Quiz Content
    if (state.currentIndex >= activeQuestions.length) {
        elements.mainContentArea.innerHTML = ResultScreen(currentScore, activeQuestions.length);
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                state.currentIndex = 0;
                state.view = 'landing';
                saveProgress(state);
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } else {
        const currentQuestion = activeQuestions[state.currentIndex];
        const answerRecord = setAnswers[currentQuestion.id];
        
        elements.mainContentArea.innerHTML = QuizRenderer(currentQuestion, answerRecord);

        // Attach Events
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (setAnswers[currentQuestion.id]) return; 
                
                const selectedIndex = parseInt(e.currentTarget.getAttribute('data-option-index'));
                const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
                
                if(!state.answers[state.activeSetId]) {
                    state.answers[state.activeSetId] = {};
                }
                state.answers[state.activeSetId][currentQuestion.id] = { selectedIndex, isCorrect };
                saveProgress(state);
                render();
            });
        });

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                state.currentIndex++;
                saveProgress(state);
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
};

const handleReset = () => {
    clearProgress();
    state = { view: 'landing', activeSetId: null, currentIndex: 0, answers: {} };
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', init);
