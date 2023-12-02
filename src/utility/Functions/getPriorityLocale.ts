export const getPriorityLocale = (
    label: string,
    t: (path: string) => string
) => {
    switch (label) {
        case 'Based on deadline':
            return t('basedOn');
        case 'low':
            return t('low');
        case 'medium':
            return t('medium');
        case 'high':
            return t('high');
        case 'very high':
            return t('veryHigh');
        default:
            return label;
    }
};
