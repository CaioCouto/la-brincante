import { Container, Nav, Navbar } from 'react-bootstrap';

import styles from './navbar.module.css';

export default function NavBar() {
  function changeNavbarBottomBorderRadius(e) {
    const borderBottomRadius = 20;
    const button = e.target.parentElement;
    const navbar = button.parentElement.parentElement;
    const buttonIsCollapsed = button.classList.contains('collapsed');
    if(!buttonIsCollapsed) return navbar.style.borderRadius = '0'
    navbar.style.borderRadius = `0 0 ${borderBottomRadius}px ${borderBottomRadius}px`;
  }

  return (
    <Navbar expand="lg" variant="dark" className={ `${styles['navbar']}`}>
      <Container>
        <Navbar.Brand className={ styles['navbarBrand'] } href="/">LaBrincante</Navbar.Brand>
        <Navbar.Toggle
          className={ styles['navbarDropdownButton'] } 
          style={{ '&>*': { color: '#fff' } }} 
          onClick={ (e) => changeNavbarBottomBorderRadius(e) }
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav as="ul" className="ms-auto">
            <Nav.Link className={ styles['navbarText'] } href="/">Home</Nav.Link>
            <Nav.Link className={ styles['navbarText'] } href="/alunos">Alunos</Nav.Link>
            <Nav.Link className={ styles['navbarText'] } href="/cursos">Cursos</Nav.Link>
            <Nav.Link className={ styles['navbarText'] } href="/matriculas">Matrículas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}