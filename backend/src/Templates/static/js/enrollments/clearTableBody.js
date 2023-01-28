export default function clearTableBody() {
    const tableBody = document.querySelector('#classesTableBody');
    while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
}