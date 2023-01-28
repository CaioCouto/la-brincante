import weekdaysArray from "./weekdaysArray.js";

export default function formatClassDays(classDays) {
    return classDays
    return classDays.split(',').map(day => weekdaysArray[Number(day)]).join(' / ');
}