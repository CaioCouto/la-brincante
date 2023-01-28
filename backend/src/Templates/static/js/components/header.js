function returnElementArray(pages, tagName) {
    return new Array(pages.length).fill(0).map(_ => document.createElement(tagName));
}

export default function Header() {
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Alunos', path: '/alunos' },
        { name: 'Cursos', path: '/cursos' },
        { name: 'Matrículas', path: '/matriculas' }
    ];
    const header = document.querySelector('#header');
    const nav = document.createElement('nav');
    const navDiv = document.createElement('div');
    const navBrand = document.createElement('a');
    const navMenuButton = document.createElement('button');
    const navMenuButtonIcon = document.createElement('span');
    const navMenu = document.createElement('div');
    const navMenuList = document.createElement('ul');
    const navMenuListItem = returnElementArray(pages, 'li');
    const navLink = returnElementArray(pages, 'a');

    nav.classList = 'navbar navbar-expand-md navbar-light bg-light';
    navDiv.classList = 'container-md';
    navBrand.classList = 'navbar-brand';
    navBrand.textContent = 'LaBrincante';
    navBrand.href = '/';

    navMenuButton.classList = 'navbar-toggler';
    navMenuButton.setAttribute('data-bs-toggle',"collapse");
    navMenuButton.setAttribute('data-bs-target',"#navbarNav");
    navMenuButtonIcon.classList = 'navbar-toggler-icon';

    navMenu.id = 'navbarNav';
    navMenu.classList = 'collapse navbar-collapse';
    navMenuList.classList = 'navbar-nav ms-auto';
    for (let i = 0; i < pages.length; i++) {
        navMenuListItem[i].classList = 'nav-item';
        navLink[i].classList = window.location.pathname === pages[i].path ? 'nav-link active' : 'nav-link';
        navLink[i].href = pages[i].path;
        navLink[i].textContent = pages[i].name;
        navMenuListItem[i].appendChild(navLink[i]);
        navMenuList.appendChild(navMenuListItem[i]);
    }

    header.appendChild(nav);
    nav.appendChild(navDiv);
    navDiv.appendChild(navBrand);
    navDiv.appendChild(navMenuButton);
    navDiv.appendChild(navMenu);
    navMenuButton.appendChild(navMenuButtonIcon);
    navMenu.appendChild(navMenuList);
}
