export default function displayClassTimeSpan(classTime, duration) {
    const pad0InStr = (x) => x < 10 ? '0'+x : x;
    const durationInMiliseconds = duration * 60 * 1000;
    const [ classTimeHour, classTimeMinutes ] = classTime.split(':');
    const [ start, end ] = [ new Date(), new Date() ];
    start.setHours(classTimeHour);
    start.setMinutes(classTimeMinutes);
    end.setTime(start.getTime() + durationInMiliseconds);
    return `${classTime} - ${pad0InStr(end.getHours())}:${pad0InStr(end.getMinutes())}`;
}