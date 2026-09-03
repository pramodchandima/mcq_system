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

        // Listen for custom window event to show modal
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
