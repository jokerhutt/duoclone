const leftOffsets = [
    'ml-0',
    'ml-20',
    'ml-36',
    'ml-16',
    'mr-4',
    'mr-20',
    'mr-0',
    'mr-16',
    'mr-0',
    'ml-16',
    'ml-36',
] 

const rightOffsets = [
    'ml-0',
    'mr-20',
    'mr-36',
    'mr-16',
    'ml-4',
    'ml-20',
    'ml-0',
    'ml-16',
    'ml-0',
    'mr-16',
    'mr-36',
];

const shouldInvert = (index: number) => index % 2 == 0

export const getOffset = (index: number, idx: number) => shouldInvert(index) ? leftOffsets[idx] : rightOffsets[idx]