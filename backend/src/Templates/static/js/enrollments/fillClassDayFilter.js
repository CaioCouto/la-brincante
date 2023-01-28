import weekdays from '../weekdaysArray.js';

export default function fillClassDayFilter() {
    const classDayFilter = document.querySelector('#classDayFilter');
    weekdays.forEach((day, index) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        
        div.classList = 'col-6 col-md-5 col-lg-4 d-flex justify-content-start gap-2';
        label.classList = 'form-label m-0 w-50 text-capitalize';
        label.htmlFor = `${day}Check`;
        label.textContent = day;
        input.classList = 'classDaysFilter';
        input.id = `${day}Check`;
        input.type = 'checkbox';
        input.name = `${index}`;
        div.appendChild(label);
        div.appendChild(input);
        classDayFilter.appendChild(div);
    });
    
}