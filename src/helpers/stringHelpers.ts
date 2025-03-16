export const HasValue = (value?: string | null): boolean => {
return typeof value === 'string' && value.length > 0;
};

export const UndefinedIfEmpty = (value?: string, fallback?: string): string | undefined => {
if (value === undefined) return fallback;

if (typeof value === 'string') {
    if (value.trim() === '') {
    return fallback;
    }
}

return value;
};

export const UndefinedIfEmptyNumber = (
value?: string | number,
fallback?: number,
): number | undefined => {
if (value === undefined) return fallback;

if (typeof value === 'number') {
    return value;
}

if (value.trim() === '') {
    return fallback;
}

return parseInt(value, 10);
};
