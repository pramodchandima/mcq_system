import { saveProgress, loadProgress } from '../utils/storage.js';

class Store {
    constructor() {
        this.state = {
            view: 'landing',
            activeSetId: null,
            currentIndex: 0,
            answers: {},
            theme: localStorage.getItem('theme') || 'dark'
        };
        this.listeners = [];

        this.init();
    }

    init() {
        // Load saved progress
        const savedData = loadProgress();
        if (savedData) {
            // Migration check
            if (savedData.answers && !savedData.answers['set-rad-l6'] && Object.keys(savedData.answers).length > 0) {
                this.state.answers = { 'set-rad-l6': savedData.answers };
                this.state.currentIndex = savedData.currentIndex || 0;
            } else {
                this.state = { ...this.state, ...savedData };
            }
            this.state.view = 'landing'; // Always start at landing
        }
        
        // Apply initial theme
        document.documentElement.setAttribute('data-theme', this.state.theme);
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        
        // Persist progress if it's related to quiz data
        if ('currentIndex' in newState || 'answers' in newState) {
            saveProgress({
                view: this.state.view,
                activeSetId: this.state.activeSetId,
                currentIndex: this.state.currentIndex,
                answers: this.state.answers
            });
        }

        // Persist theme
        if ('theme' in newState) {
            localStorage.setItem('theme', this.state.theme);
            document.documentElement.setAttribute('data-theme', this.state.theme);
        }

        this.notify();
    }

    resetProgress() {
        this.state = {
            ...this.state,
            view: 'landing',
            activeSetId: null,
            currentIndex: 0,
            answers: {}
        };
        saveProgress(this.state);
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export const store = new Store();
