import { PriorityType } from '../Types/Task-Types';

export const getEmoji = (priority: PriorityType | 'based on deadline') => {
    switch (priority) {
        case 'very high':
            return '🔥';
        case 'high':
            return '❗';
        case 'medium':
            return '⚠️';
        case 'low':
            return '🟢';
        case 'based on deadline':
            return '🕒';
        default:
            return '';
    }
};
