import { store } from '../core/Store.js';

export class ConfirmModal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="modal-overlay" id="confirm-modal-overlay">
                <div class="modal-content">
                    <h3 class="modal-title">Reset Progress?</h3>
                    <p class="modal-text">Are you sure you want to reset your progress? All your marks and saved answers will be permanently lost.</p>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
                        <button class="btn btn-primary btn-danger" id="modal-confirm-btn">Yes, Reset</button>
                    </div>
                </div>
            </div>
        `;
        // Initially hide the modal, it gets shown by adding 'show' class to 'confirm-modal-overlay'
        // Actually, the original index.html has `.modal-overlay` with id `confirm-modal`. 
        // We will make the container *be* the modal wrapper, or render inside it.
        // Let's assume the container is `<div id="modal-container"></div>`
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const overlay = this.container.querySelector('.modal-overlay');
            if (!overlay) return;

            if (e.target.id === 'modal-cancel-btn' || e.target === overlay) {
                this.hide();
            } else if (e.target.id === 'modal-confirm-btn') {
                store.resetProgress();
                this.hide();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Listen for custom event or just expose a show method.
        // For simplicity, we can listen for click events on the document
        // Or better, let Header.js dispatch a custom event, or since Store is global, 
        // we can just expose this component to the global scope or listen to a custom window event.
        window.addEventListener('show-reset-modal', () => {
            this.show();
        });
    }

    show() {
        const overlay = this.container.querySelector('.modal-overlay');
        if (overlay) overlay.classList.add('show');
    }

    hide() {
        const overlay = this.container.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('show');
    }
}
