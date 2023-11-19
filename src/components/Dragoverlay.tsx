import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import { DetailedReactHTMLElement, useEffect, useState } from 'react';
import React from 'react';

interface DragOverlayProps {
    activeId: UniqueIdentifier | null;
}

export default function Dragoverlay({ activeId }: DragOverlayProps) {
    const [activeElement, setActiveElement] = useState<DetailedReactHTMLElement<
        { dangerouslySetInnerHTML: { __html: string } },
        HTMLElement
    > | null>(null);

    useEffect(() => {
        if (!activeId) return;

        const element = document.getElementById(activeId.toString());

        if (!element) return;

        const reactElement = React.createElement('div', {
            dangerouslySetInnerHTML: { __html: element.outerHTML }
        });

        setActiveElement(reactElement);
    }, [activeId]);

    return <DragOverlay>{activeElement}</DragOverlay>;
}
