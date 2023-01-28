export default function resetForm() {
    const { id, name, value } = newCourseForm.elements;
    id.value = 0;
    name.value = '';
    value.value = 0;
}