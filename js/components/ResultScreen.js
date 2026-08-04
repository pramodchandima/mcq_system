export const ResultScreen = (score, total) => {
    const percentage = Math.round((score / total) * 100) || 0;
    
    return `
        <div class="result-card quiz-card active">
            <h2>Quiz Completed!</h2>
            <p>You have answered all questions.</p>
            
            <div class="result-stats">
                <div class="stat-box">
                    <span class="stat-num">${score} / ${total}</span>
                    <span class="stat-lbl">Score</span>
                </div>
                <div class="stat-box">
                    <span class="stat-num">${percentage}%</span>
                    <span class="stat-lbl">Accuracy</span>
                </div>
            </div>
            
            <button class="btn btn-primary" id="restart-btn">Restart Quiz</button>
        </div>
    `;
};
