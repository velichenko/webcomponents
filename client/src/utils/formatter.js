export const addZero = num => String(num).length === 1 ? `0${num}` : num;

export const formattedDate = (timestamp, separator = '.') => {
    const date = new Date(timestamp);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return addZero(day) + separator + addZero(month) + separator + year;
};

export const pluralize = (value, [one, two, five]) => {
    let num = Math.abs(value) % 100;

    if (num >= 5 && num <= 20) {
        return five;
    }

    num %= 10;

    if (num === 1) {
        return one;
    }

    if (num >= 2 && num <= 4) {
        return two;
    }

    return five;
};
