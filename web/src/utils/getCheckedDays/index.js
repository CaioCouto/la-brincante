import weekdays from "../weekdays"

export default function getCheckedDays(classDays) {
    return classDays.filter(day => day.checked).map(day => weekdays.indexOf(day.label));
}