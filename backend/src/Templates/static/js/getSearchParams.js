export default function getSearchParams() {
    if (!window.location.search) return false;
    const params = {};
    window.location.search
    .split('?')[1]
    .split('&')
    .forEach(query => {
        const param = query.split('=');
        params[param[0]] = param[1];
    });
    return params;
}
