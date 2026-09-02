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
import { questions_wad_2024, questions_wad_iit_2023 } from './data/wad_questions.js';

// Subjects List
export const subjects = [
    {
        id: 'rad',
        code: 'RAD',
        title: 'Rapid Application Development',
        subtitle: 'RAD (Rapid Application Development)',
        description: 'Master core concepts of Rapid Application Development, SDLC models, Requirements, OOAD, Architecture, and UI Design.',
        icon: '⚡',
        badgeColor: '#ec4899',
        bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))'
    },
    {
        id: 'wad',
        code: 'WAD',
        title: 'Web Application Development',
        subtitle: 'WAD (Web Application Development)',
        description: 'Master modern Web Application Development technologies, HTML5, CSS3, JavaScript, APIs, and Web Frameworks.',
        icon: '🌐',
        badgeColor: '#3b82f6',
        bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.15))'
    }
];

// Aggregate quiz sets
export const quizSets = [
    {
        id: 'set-rad-l1',
        subjectId: 'rad',
        title: 'RAD - L1: Introduction',
        description: 'Introduction to Rapid Application Development',
        questions: questions_rad_l1
    },
    {
        id: 'set-rad-l2',
        subjectId: 'rad',
        title: 'RAD - L2: SDLC',
        description: 'Software Development Life Cycle',
        questions: questions_rad_l2
    },
    {
        id: 'set-rad-l3',
        subjectId: 'rad',
        title: 'RAD - L3: Requirements',
        description: 'Requirements Engineering',
        questions: questions_rad_l3
    },
    {
        id: 'set-rad-l3-part2',
        subjectId: 'rad',
        title: 'RAD - L3: Req Eng Part 2',
        description: 'Requirements Elicitation & Analysis',
        questions: questions_rad_l3_part2
    },
    {
        id: 'set-rad-l4',
        subjectId: 'rad',
        title: 'RAD - L4: Analysis & Design',
        description: 'System Analysis and Design Concepts',
        questions: questions_rad_l4
    },
    {
        id: 'set-rad-l4-part2',
        subjectId: 'rad',
        title: 'RAD - L4: OOAD',
        description: 'Object-Oriented Analysis and Design',
        questions: questions_rad_l4_part2
    },
    {
        id: 'set-rad-l5',
        subjectId: 'rad',
        title: 'RAD - L5: Architecture',
        description: 'Software Architecture and Design Patterns',
        questions: questions_rad_l5
    },
    {
        id: 'set-rad-l6',
        subjectId: 'rad',
        title: 'RAD - L6: User Interface',
        description: 'UI Design Principles and Best Practices',
        questions: questions_rad_l6
    },
    {
        id: 'set-wad-2024',
        subjectId: 'wad',
        title: 'WAD - Quiz 2024',
        description: 'Web Application Development Quiz 2024 (PHP, Sessions, REST, Files, Databases)',
        questions: questions_wad_2024
    },
    {
        id: 'set-wad-iit-2023',
        subjectId: 'wad',
        title: 'WAD - Quiz IIT 2023',
        description: 'Web Application Development Quiz IIT 2023 Practice Set',
        questions: questions_wad_iit_2023
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
                this.currentViewInstance = new LandingScreen('main-content-area', quizSets, subjects);
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
