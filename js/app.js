import { store } from './core/Store.js';
import { AppHeader } from './components/Header.js';
import { ConfirmModal } from './components/ConfirmModal.js';
import { Sidebar } from './components/Sidebar.js';
import { LandingScreen } from './components/LandingScreen.js';
import { QuizRenderer } from './components/QuizRenderer.js';
import { ResultScreen } from './components/ResultScreen.js';
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

// Aggregate quiz sets with dynamic question loaders
export const quizSets = [
    {
        id: 'set-rad-l1',
        subjectId: 'rad',
        title: 'RAD - L1: Introduction',
        description: 'Introduction to Rapid Application Development',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL1
    },
    {
        id: 'set-rad-l2',
        subjectId: 'rad',
        title: 'RAD - L2: SDLC',
        description: 'Software Development Life Cycle',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL2
    },
    {
        id: 'set-rad-l3',
        subjectId: 'rad',
        title: 'RAD - L3: Requirements',
        description: 'Requirements Engineering',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL3
    },
    {
        id: 'set-rad-l3-part2',
        subjectId: 'rad',
        title: 'RAD - L3: Req Eng Part 2',
        description: 'Requirements Elicitation & Analysis',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL32
    },
    {
        id: 'set-rad-l4',
        subjectId: 'rad',
        title: 'RAD - L4: Analysis & Design',
        description: 'System Analysis and Design Concepts',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL4
    },
    {
        id: 'set-rad-l4-part2',
        subjectId: 'rad',
        title: 'RAD - L4: OOAD',
        description: 'Object-Oriented Analysis and Design',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL41
    },
    {
        id: 'set-rad-l5',
        subjectId: 'rad',
        title: 'RAD - L5: Architecture',
        description: 'Software Architecture and Design Patterns',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questionsL5
    },
    {
        id: 'set-rad-l6',
        subjectId: 'rad',
        title: 'RAD - L6: User Interface',
        description: 'UI Design Principles and Best Practices',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/questions.js')).questions
    },
    {
        id: 'set-wad-l1',
        subjectId: 'wad',
        title: 'WAD - L1: Server-Side Scripting',
        description: 'Introduction to Server-side Scripting & PHP Fundamentals',
        questionCount: 33,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l1
    },
    {
        id: 'set-wad-l2',
        subjectId: 'wad',
        title: 'WAD - L2: My First Web Application',
        description: 'HTML Forms, GET/POST Methods, Input Validation, Sanitization, Query Strings & File Handling',
        questionCount: 34,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l2
    },
    {
        id: 'set-wad-l3',
        subjectId: 'wad',
        title: 'WAD - L3: Object-Oriented PHP',
        description: 'OOP Principles, Classes, Encapsulation, Inheritance, Interfaces, Abstract Classes, Polymorphism, Namespaces & Composer',
        questionCount: 34,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l3
    },
    {
        id: 'set-wad-l4',
        subjectId: 'wad',
        title: 'WAD - L4: Working with Databases',
        description: 'PDO Architecture, DSN Connections, exec() vs query(), ResultSets, Fetching Styles, Prepared Statements & Error Handling',
        questionCount: 34,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l4
    },
    {
        id: 'set-wad-l5',
        subjectId: 'wad',
        title: 'WAD - L5: Personalizing Web Content',
        description: 'Personalization Concepts, User Authentication, Password Hashing/Verify, Session Lifecycle, Cookies & Remember Me Feature',
        questionCount: 34,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l5
    },
    {
        id: 'set-wad-l6',
        subjectId: 'wad',
        title: 'WAD - L6: Web Services',
        description: 'Web Services Architecture, SOAP vs REST vs GraphQL, Statelessness, HTTP Verbs (GET/POST/PUT/DELETE), cURL & API Security',
        questionCount: 34,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_l6
    },
    {
        id: 'set-wad-2024',
        subjectId: 'wad',
        title: 'WAD - Quiz 2024',
        description: 'Web Application Development Quiz 2024 (PHP, Sessions, REST, Files, Databases)',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_2024
    },
    {
        id: 'set-wad-iit-2023',
        subjectId: 'wad',
        title: 'WAD - Quiz IIT 2023',
        description: 'Web Application Development Quiz IIT 2023 Practice Set',
        questionCount: 25,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_iit_2023
    },
    {
        id: 'set-wad-web-services',
        subjectId: 'wad',
        title: 'WAD - Web Services & Security',
        description: 'WAD Web Services Previous Year Questions (Security, RESTful APIs, PHP Web Services)',
        questionCount: 13,
        fetchQuestions: async () => (await import('./data/wad_questions.js')).questions_wad_web_services
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
