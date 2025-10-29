export function addCommasToNumbers(number) {
    console.log("🚀 ~ file: formatNumber.js:2 ~ addCommasToNumbers ~ number:", number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
