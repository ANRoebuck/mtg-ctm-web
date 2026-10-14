const columns = [
    ['CardSearch', 'searchTerm'],
    ['Seller', 'seller'],
    ['Title', 'title'],
    ['Subtitle', 'subtitle'],
    ['Expansion', 'expansion'],
    ['Foil', 'isFoil'],
    ['PriceText', 'price_textRepresentation'],
    ['PriceAbsolute', 'price_relativeUnits'],
    ['Link', 'productRef'],
];

// prefixing with ' stops spreadsheets treating scraped text as a formula
const FORMULA_CHARS = /^[=+\-@\t\r]/;

const quote = (text) => `"${text.replace(/"/g, '""')}"`;

// numbers are left bare so spreadsheets and parsers treat them as numeric
const formatValue = (key, value) => {
    if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '';
    if (key === 'isFoil') return quote(value ? 'Yes' : 'No');
    if (value === undefined || value === null) return quote('');
    const text = String(value);
    return quote(FORMULA_CHARS.test(text) ? `'${text}` : text);
};

export const pricesToCsv = (prices) => {
    const header = columns.map(([title]) => quote(title)).join(',');
    const rows = prices.map((p) => columns.map(([, key]) => formatValue(key, p[key])).join(','));
    return [header, ...rows].join('\r\n');
};

export const downloadCsv = (filename, csv) => {
    // BOM so Excel reads UTF-8 (£, accents) correctly
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
