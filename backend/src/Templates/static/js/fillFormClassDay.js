import weekdays from './weekdaysArray.js';

export default function fillFormClassDay(classDays='') {
    const formClassDays = document.querySelector('#formClassDays');
    weekdays.forEach((day, index) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        
        div.classList = 'w-50';
        label.classList = 'form-label w-50 text-capitalize';
        label.htmlFor = `${day}Check`;
        label.textContent = day;
        input.classList = 'classDaysCheckbox';
        input.id = `${day}Check`;
        input.type = 'checkbox';
        input.name = `${index}`;
        input.checked = classDays.search(day) !== -1;
        input.disabled = !!classDays; 
        
        div.appendChild(label);
        div.appendChild(input);
        formClassDays.appendChild(div);        
    });
    
}