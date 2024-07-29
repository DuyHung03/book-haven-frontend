export function formatNumberWithDots(number: string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function hidePhoneNumber(phoneNumber: string) {
    const start = phoneNumber.slice(0, 3);
    const end = phoneNumber.slice(-2);
    const hiddenPart = '*'.repeat(phoneNumber.length - 5);
    return `${start}${hiddenPart}${end}`;
}
