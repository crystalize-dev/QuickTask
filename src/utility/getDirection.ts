export type DirectionType = 'left' | 'right' | 'bottom' | 'top';

export const getDirection = (direction: DirectionType) => {
    switch (direction) {
        case 'left': {
            const leftVariants = {
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.5
                    }
                },
                hidden: {
                    x: -10,
                    opacity: 0
                }
            };
            return {
                margin: 'right-full-gap',
                align: 'flex-row',
                variants: leftVariants
            };
        }
        case 'right': {
            const rightVariants = {
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.5
                    }
                },
                hidden: {
                    x: 10,
                    opacity: 0
                }
            };
            return {
                margin: 'left-full-gap',
                align: 'flex-row',
                variants: rightVariants
            };
        }
        case 'top': {
            const topVariatns = {
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.5
                    }
                },
                hidden: {
                    y: -10,
                    opacity: 0
                }
            };
            return {
                margin: 'bottom-full-gap',
                align: 'flex-col',
                variants: topVariatns
            };
        }
        case 'bottom': {
            const bottomVariants = {
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.5
                    }
                },
                hidden: {
                    y: 10,
                    opacity: 0
                }
            };
            return {
                margin: 'top-full-gap',
                align: 'flex-col',
                variants: bottomVariants
            };
        }
    }
};
