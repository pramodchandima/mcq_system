export const QuizRenderer = (question, answerRecord) => {
    const isAnswered = answerRecord !== undefined;
    const selectedOption = isAnswered ? answerRecord.selectedIndex : null;
    const isCorrect = isAnswered ? answerRecord.isCorrect : null;

    const optionsHTML = question.options.map((option, index) => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        let btnClass = 'option-btn';
        
        if (isAnswered) {
            if (index === question.correctAnswerIndex) {
                btnClass += ' correct';
            } else if (index === selectedOption) {
                btnClass += ' incorrect selected';
            }
        }

        return `
            <button class="${btnClass}" data-option-index="${index}" ${isAnswered ? 'disabled' : ''}>
                <span class="option-letter">${letters[index] || (index+1)}</span>
                <span class="option-text">${option}</span>
            </button>
        `;
    }).join('');

    let explanationHTML = '';
    if (isAnswered) {
        explanationHTML = `
            <div class="explanation-box visible">
                <h4>${isCorrect ? 'Correct!' : 'Incorrect!'}</h4>
                <div class="explanation-text">${question.explanation}</div>
            </div>
        `;
    }

    return `
        <div class="quiz-card active">
            <div class="question-header">
                <h2 class="question-title">${question.questionText}</h2>
                ${question.resourcePath ? `<img src="${question.resourcePath}" alt="Question Image" class="question-image">` : ''}
            </div>
            
            <div class="options-container" id="options-container">
                ${optionsHTML}
            </div>
            
            ${explanationHTML}
            
            <div class="action-container">
                <button class="btn btn-primary" id="next-btn" ${!isAnswered ? 'disabled' : ''}>
                    Next Question
                </button>
            </div>
        </div>
    `;
};
