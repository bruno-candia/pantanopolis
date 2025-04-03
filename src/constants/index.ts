export const TILE = {
  SIZE: 0.5,
  HEIGHT: 0.15,
  FULL_HEIGHT: 0.5,

  POSITION: {
    BOTTOM: 0,
    TOP: 0.15,
    GROUND: -0.3,
  },

  GRID_OFFSET: 1,

  SCALE: {
    NORMAL: 1,
  },
};

export const BIG_TILE = {
  GRID_SIZE: 5,

  EMPTY_CHANCE: 0.2,

  SPACING: 5.5,
};

export const COLORS = {
  GRASS: '#548e59',
  SAND: '#b79f6c',
  PATH: '#8a7f6d',
  MOUNTAIN: '#a0a0a0',
  CASTLE: '#858585',
  CASTLE_TOP: '#a10000',
  PORTAL: '#42a5f5',
  ENEMY: '#ff0000',
  TOWER: '#4527a0',
  BACKGROUND: '#2b2b2b',
  TEXT: '#ffffff',
  UI_BG: '#1d1d1d',
  UI_BORDER: '#454545',
  UI_BORDER_HIGHLIGHT: '#aaaaaa',
};

export const TERRAIN = {
  GRASS: 'grass' as const,
  PATH: 'path' as const,
  MOUNTAIN: 'mountain' as const,
  CASTLE: 'castle' as const,
  PORTAL: 'portal' as const,
  EMPTY: 'empty' as const,
};

export const MAP = {
  SIZE: {
    SMALL: 5,
    MEDIUM: 8,
    LARGE: 12,
  },

  PORTAL_COUNT: {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
  },

  PROBABILITIES: {
    EMPTY: 0.2,
    MOUNTAIN: 0.15,
  },

  MIN_CASTLE_PORTAL_DISTANCE: 9,
};

export const DIRECTIONS = {
  east: [0, Math.PI / 2, 0],
  west: [0, -Math.PI / 2, 0],
  north: [0, Math.PI, 0],
  south: [0, -Math.PI * 2, 0],
  none: [0, 0, 0],
};
