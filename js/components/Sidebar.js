export const Sidebar = (questions, currentIndex, answers) => {
    let listItemsHTML = questions.map((q, index) => {
        let statusClass = '';
        let isActive = index === currentIndex ? 'active' : '';
        
        if (answers[q.id] !== undefined) {
            statusClass = answers[q.id].isCorrect ? 'correct' : 'incorrect';
        }

        return `
            <li class="nav-grid-item ${isActive} ${statusClass}" data-index="${index}">
                <span>${index + 1}</span>
            </li>
        `;
    }).join('');

    return `
        <div class="sidebar-card">
            <h3>Quiz Progress</h3>
            <ul class="nav-grid-list" id="sidebar-nav-list">
                ${listItemsHTML}
            </ul>
        </div>
    `;
};
