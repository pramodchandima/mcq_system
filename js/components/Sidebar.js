export const Sidebar = (questions, currentIndex, answers) => {
    let listItemsHTML = questions.map((q, index) => {
        let statusClass = '';
        let isActive = index === currentIndex ? 'active' : '';
        
        if (answers[q.id] !== undefined) {
            statusClass = answers[q.id].isCorrect ? 'correct' : 'incorrect';
        }

        return `
            <li class="nav-item ${isActive} ${statusClass}" data-index="${index}">
                <div class="nav-status-icon"></div>
                <span>Question ${index + 1}</span>
            </li>
        `;
    }).join('');

    return `
        <div class="sidebar-card">
            <h3>Quiz Progress</h3>
            <ul class="nav-list" id="sidebar-nav-list">
                ${listItemsHTML}
            </ul>
        </div>
    `;
};
