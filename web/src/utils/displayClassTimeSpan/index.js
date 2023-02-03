import minutesToHours from "../minutesToHours";

export default function displayClassTimeSpan(data, today) {
    /**
     * @returns String
     * 
     * Retorna uma string formatada da seguinte forma
     * 
     *  "Horário inicial da Aula - Horário final da Aula"
     * 
     * O *horário final* é calculado à partir da soma dos 
     * inteiros classTime e classTimeDuration, que
     * represetam o número de minutos em um determinado
     * horário.
     */

    const days = data.classDays.split(',');
    const times = data.classTime.split(',');
    const durations = data.duration.split(',');
    const todayIndex = days.indexOf(today.toString());
    const todayClassTime = days.length === times.length ? parseInt(times[todayIndex]) : parseInt(times[0]);
    const todayClassDuration = days.length === times.length ? parseInt(durations[todayIndex]) : parseInt(durations[0]);        
    return minutesToHours(todayClassTime) + ' - ' + minutesToHours(todayClassTime + todayClassDuration);
}