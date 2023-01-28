export default function getCheckedClassDays() {
    const classDaycheckBoxes = [...document.querySelectorAll('.classDaysCheckbox')];
    return classDaycheckBoxes.map(checkbox => checkbox.checked ? checkbox.name : '').filter(elem => !!elem).join(',');
}