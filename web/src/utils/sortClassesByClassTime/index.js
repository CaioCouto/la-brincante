export default function sortClassesByClassTime(classes, today) {
    /**
     * Via Passagem por referência, o array
     * 'classes' está sendo ordenado de acordo
     * com o classTime do dia selecionado (today).
     * Nem classDays e nem classTimes jamais terão
     * tamanho igual a 0 ou maio do que 2. 
     */
    classes.sort((a,b) => {
        const [ daysA, daysB ] = [ a.classDays.split(','), b.classDays.split(',')];
        const [ timesA, timesB ] = [ a.classTime.split(','), b.classTime.split(',')];
        const [ todayIndexA, todayIndexB ] = [ daysA.indexOf(today), daysB.indexOf(today) ];
        if(timesA.length > timesB.length) { return parseInt(timesA[todayIndexA]) - parseInt(timesB[0]); }
        else if(timesA.length < timesB.length) { return parseInt(timesA[0]) - parseInt(timesB[todayIndexB]); }
        else if (timesA.length === 1) { return parseInt(timesA[0]) - parseInt(timesB[0]); }
        return parseInt(timesA[todayIndexA]) - parseInt(timesB[todayIndexB]);
    });
}