export default function resetForm() {
    const { name, id } = newUserForm.elements;
    if(id.value) {
        name.value = '';
        id.value = '';
    }
}