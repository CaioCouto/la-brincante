import weekdays from './weekdaysArray.js';

export default function getTodayDay() {
    const today = new Date(Date.now()).getDay();
    return {
        day: today,
        dayName: weekdays[today] + '-feira',
    };
}