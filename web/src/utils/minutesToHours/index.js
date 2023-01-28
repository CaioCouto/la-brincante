export default function minutesToHours(minutes) {
    const hours = minutes / 60;
    if(Number.isInteger(hours)) return hours < 10 ? `0${hours}:00` : `${hours}:00`;
    const minutesBase60 = ((hours - Math.floor(hours)) * 60).toFixed(0);
    const minutesStr = minutesBase60 < 10 ? '0'+minutesBase60 : String(minutesBase60);
    return hours < 10 ? `0${Math.floor(hours)}:${minutesStr}` : `${Math.floor(hours)}:${minutesStr}`;
}