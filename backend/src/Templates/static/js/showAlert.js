export default function showAlert(alert, type, message) {
    alert.classList.remove('d-none');
    alert.classList.add(`alert-${type}`);
    alert.children[0].textContent = message;
}