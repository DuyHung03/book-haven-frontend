export function formatNumberWithDots(number: string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
