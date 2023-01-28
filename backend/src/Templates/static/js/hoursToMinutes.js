export default function hoursToMinutes([ hoursStr, minutesStr ]) {
    const hoursInMinutes = parseInt(hoursStr) * 60;
    return minutesStr === '00' ? hoursInMinutes : hoursInMinutes + parseInt(minutesStr);
}