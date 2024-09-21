import dayjs from 'dayjs';

export function formatNumberWithDots(number: string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function hidePhoneNumber(phoneNumber: string) {
    const start = phoneNumber.slice(0, 3);
    const end = phoneNumber.slice(-2);
    const hiddenPart = '*'.repeat(phoneNumber.length - 5);
    return `${start}${hiddenPart}${end}`;
}

export const validateBirthday = (value: string | null) => {
    if (value === null) {
        return null; // No validation needed if the value is null
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        return 'Invalid date format (dd/mm/yyyy)';
    }
    const [day, month, year] = value.split('/').map(Number);
    const birthday = dayjs(`${year}-${month}-${day}`);
    if (!birthday.isValid()) {
        return 'Invalid date';
    }
    if (birthday.isAfter(dayjs())) {
        return 'Birthday cannot be in the future';
    }
    return null;
};

export function generate6DigitCode() {
    const min = 100000;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
}
