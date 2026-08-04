import { store } from './core/Store.js';
import { AppHeader } from './components/Header.js';
import { ConfirmModal } from './components/ConfirmModal.js';
import { Sidebar } from './components/Sidebar.js';
import { LandingScreen } from './components/LandingScreen.js';
import { QuizRenderer } from './components/QuizRenderer.js';
import { ResultScreen } from './components/ResultScreen.js';
import { 
    questionsL1 as questions_rad_l1,
    questionsL2 as questions_rad_l2,
    questionsL3 as questions_rad_l3,
    questionsL32 as questions_rad_l3_part2,
    questionsL4 as questions_rad_l4,
    questionsL41 as questions_rad_l4_part2,
    questionsL5 as questions_rad_l5,
    questions as questions_rad_l6
} from './data/questions.js';

// Aggregate quiz sets
export const quizSets = [
    {
        id: 'set-rad-l1',
        title: 'RAD - L1: Introduction',
        description: 'Introduction to Rapid Application Development',
        questions: questions_rad_l1
    },
    {
        id: 'set-rad-l2',
        title: 'RAD - L2: SDLC',
        description: 'Software Development Life Cycle',
        questions: questions_rad_l2
    },
    {
        id: 'set-rad-l3',
        title: 'RAD - L3: Requirements',
        description: 'Requirements Engineering',
        questions: questions_rad_l3
    },
    {
        id: 'set-rad-l3-part2',
        title: 'RAD - L3: Req Eng Part 2',
        description: 'Requirements Elicitation & Analysis',
        questions: questions_rad_l3_part2
    },
    {
        id: 'set-rad-l4',
        title: 'RAD - L4: Analysis & Design',
        description: 'System Analysis and Design Concepts',
        questions: questions_rad_l4
    },
    {
        id: 'set-rad-l4-part2',
        title: 'RAD - L4: OOAD',
        description: 'Object-Oriented Analysis and Design',
        questions: questions_rad_l4_part2
    },
    {
        id: 'set-rad-l5',
        title: 'RAD - L5: Architecture',
        description: 'Software Architecture and Design Patterns',
        questions: questions_rad_l5
    },
    {
        id: 'set-rad-l6',
        title: 'RAD - L6: User Interface',
        description: 'UI Design Principles and Best Practices',
        questions: questions_rad_l6
    }
];

class App {
    constructor() {
        this.currentViewInstance = null;
        this.init();
    }

    init() {
        // Initialize permanent components
        new AppHeader('header-container', quizSets);
        new ConfirmModal('modal-container');
        
        const sidebar = new Sidebar('sidebar-container', quizSets);
        sidebar.mount();

        // Subscribe to view changes
        store.subscribe((state) => this.handleViewChange(state));
        
        // Initial render
        this.handleViewChange(store.getState());
    }

    handleViewChange(state) {
        const view = state.view;
        
        // If view didn't change, do nothing at the App router level
        if (this.currentViewName === view) return;
        this.currentViewName = view;

        // Unmount current view
        if (this.currentViewInstance && typeof this.currentViewInstance.unmount === 'function') {
            this.currentViewInstance.unmount();
        }

        // Mount new view
        switch (view) {
            case 'landing':
                this.currentViewInstance = new LandingScreen('main-content-area', quizSets);
                break;
            case 'quiz':
                this.currentViewInstance = new QuizRenderer('main-content-area', quizSets);
                break;
            case 'result':
                this.currentViewInstance = new ResultScreen('main-content-area', quizSets);
                break;
        }

        if (this.currentViewInstance && typeof this.currentViewInstance.mount === 'function') {
            this.currentViewInstance.mount();
        }
    }
}

// Bootstrap app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
