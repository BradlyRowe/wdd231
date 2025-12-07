// Dungeon tile definitions
export const tiles = [
    {
        id: 'eraser',
        name: 'Eraser',
        title: 'Eraser (Clear Single Cell)',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--cell-bg)"/>
            <line x1="20" y1="20" x2="80" y2="80" stroke="var(--accent-red)" stroke-width="4"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="var(--accent-red)" stroke-width="4"/>
        </svg>`
    },
    {
        id: 'floor',
        name: 'Floor',
        title: 'Room Floor',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-dark)"/>
            <rect x="10" y="10" width="80" height="80" fill="var(--tile-floor-medium)"/>
            <rect x="20" y="20" width="25" height="25" fill="var(--tile-floor-light)" opacity="0.3"/>
            <rect x="55" y="55" width="25" height="25" fill="var(--tile-floor-light)" opacity="0.3"/>
            <rect x="20" y="55" width="25" height="25" fill="var(--tile-floor-light)" opacity="0.2"/>
            <rect x="55" y="20" width="25" height="25" fill="var(--tile-floor-light)" opacity="0.2"/>
        </svg>`
    },
    {
        id: 'wall-top',
        name: 'Top Wall',
        title: 'Top Wall',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect width="100" height="40" fill="var(--tile-wall-dark)"/>
            <rect width="100" height="35" fill="var(--tile-wall-medium)"/>
            <line x1="0" y1="35" x2="100" y2="35" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="20" y="8" width="15" height="20" fill="var(--tile-wall-accent)" opacity="0.5"/>
            <rect x="65" y="8" width="15" height="20" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'wall-bottom',
        name: 'Bottom Wall',
        title: 'Bottom Wall',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect y="60" width="100" height="40" fill="var(--tile-wall-dark)"/>
            <rect y="65" width="100" height="35" fill="var(--tile-wall-medium)"/>
            <line x1="0" y1="65" x2="100" y2="65" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="20" y="72" width="15" height="20" fill="var(--tile-wall-accent)" opacity="0.5"/>
            <rect x="65" y="72" width="15" height="20" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'wall-left',
        name: 'Left Wall',
        title: 'Left Wall',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect width="35" height="100" fill="var(--tile-wall-medium)"/>
            <line x1="35" y1="0" x2="35" y2="100" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="8" y="20" width="20" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
            <rect x="8" y="65" width="20" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'wall-right',
        name: 'Right Wall',
        title: 'Right Wall',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect x="60" width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect x="65" width="35" height="100" fill="var(--tile-wall-medium)"/>
            <line x1="65" y1="0" x2="65" y2="100" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="72" y="20" width="20" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
            <rect x="72" y="65" width="20" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'corner-top-right',
        name: 'Top-Right Corner',
        title: 'Top-Right Corner',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect x="60" width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect width="100" height="40" fill="var(--tile-wall-dark)"/>
            <line x1="65" y1="0" x2="65" y2="35" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <line x1="65" y1="35" x2="100" y2="35" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="77" y="8" width="15" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'corner-top-left',
        name: 'Top-Left Corner',
        title: 'Top-Left Corner',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect width="100" height="40" fill="var(--tile-wall-dark)"/>
            <line x1="35" y1="0" x2="35" y2="35" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <line x1="0" y1="35" x2="35" y2="35" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="8" y="8" width="15" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'corner-bottom-left',
        name: 'Bottom-Left Corner',
        title: 'Bottom-Left Corner',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect y="60" width="100" height="40" fill="var(--tile-wall-dark)"/>
            <line x1="35" y1="65" x2="35" y2="100" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <line x1="0" y1="65" x2="35" y2="65" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="8" y="77" width="15" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'corner-bottom-right',
        name: 'Bottom-Right Corner',
        title: 'Bottom-Right Corner',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect x="60" width="40" height="100" fill="var(--tile-wall-dark)"/>
            <rect y="60" width="100" height="40" fill="var(--tile-wall-dark)"/>
            <line x1="65" y1="65" x2="65" y2="100" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <line x1="65" y1="65" x2="100" y2="65" stroke="var(--tile-wall-line)" stroke-width="2"/>
            <rect x="77" y="77" width="15" height="15" fill="var(--tile-wall-accent)" opacity="0.5"/>
        </svg>`
    },
    {
        id: 'hdoor',
        name: 'Horizontal Door',
        title: 'Horizontal Door',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect x="35" y="10" width="30" height="80" fill="var(--tile-door-dark)"/>
            <rect x="37" y="12" width="26" height="76" fill="var(--tile-door-medium)"/>
            <line x1="37" y1="50" x2="63" y2="50" stroke="var(--tile-door-line)" stroke-width="1"/>
            <circle cx="57" cy="50" r="3" fill="var(--tile-door-handle)"/>
            <rect x="40" y="15" width="20" height="30" fill="var(--tile-door-panel)" opacity="0.3"/>
            <rect x="40" y="55" width="20" height="30" fill="var(--tile-door-panel)" opacity="0.3"/>
        </svg>`
    },
    {
        id: 'vdoor',
        name: 'Vertical Door',
        title: 'Vertical Door',
        svg: `<svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="var(--tile-floor-medium)"/>
            <rect x="10" y="35" width="80" height="30" fill="var(--tile-door-dark)"/>
            <rect x="12" y="37" width="76" height="26" fill="var(--tile-door-medium)"/>
            <line x1="50" y1="37" x2="50" y2="63" stroke="var(--tile-door-line)" stroke-width="1"/>
            <circle cx="50" cy="57" r="3" fill="var(--tile-door-handle)"/>
            <rect x="15" y="40" width="30" height="20" fill="var(--tile-door-panel)" opacity="0.3"/>
            <rect x="55" y="40" width="30" height="20" fill="var(--tile-door-panel)" opacity="0.3"/>
        </svg>`
    }
];
