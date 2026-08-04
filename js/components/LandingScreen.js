export const LandingScreen = (quizSets) => {
    const cardsHTML = quizSets.map((set) => {
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

    return `
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
};
