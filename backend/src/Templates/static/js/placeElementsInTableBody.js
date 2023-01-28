export default function placeElementsInTableBody(tableBody, elements) {
    const tr = document.createElement('tr');
    elements.forEach(element => {
        element.classList = 'text-center align-middle';
        tr.appendChild(element);
    });
    tableBody.appendChild(tr);
}