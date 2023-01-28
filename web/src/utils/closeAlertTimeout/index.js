export default function closeAlertTimeout(setAlert, timeout) {
    setTimeout(() => {
        setAlert({ show: false })
    }, timeout);
}
