const STORAGE_KEY = 'mcq_practice_data';

export const saveProgress = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to localStorage', e);
    }
};

export const loadProgress = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Error loading from localStorage', e);
    }
    return null;
};

export const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
};
