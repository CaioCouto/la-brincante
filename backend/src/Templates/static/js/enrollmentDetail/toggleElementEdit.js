export default function toggleElementEdit(edit, elements) {
    Array(...elements).forEach(element => {
        if(element === enrollmentDetails.form__button) return element.classList.toggle('d-none');
        else if(element.type === 'time' || element.type === 'checkbox' || element === enrollmentDetails.billingDate || element === enrollmentDetails.classDays || element === enrollmentDetails.discount || element === enrollmentDetails.isOnline) {
            [ element.disabled, element.readOnly ] = [ !edit, !edit ];
        }
    });
}