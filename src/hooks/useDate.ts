import React from 'react';

export const useDate = () => {
    const [curDate, setCurDate] = React.useState<string>('');

    React.useEffect(() => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        setCurDate(`${year}-${month}-${day}`);
    }, []);

    return { curDate };
};
