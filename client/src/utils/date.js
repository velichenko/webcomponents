const addZero = num => String(num).length === 1 ? `0${num}` : num;

export const formattedDate = (timestamp, separator = '.') => {
    const date = new Date(timestamp);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return addZero(day) + separator + addZero(month) + separator + year;
};
