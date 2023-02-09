import { useDispatch } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.module.scss';
import { logout } from '../../lib/store/slices/authSlice';
import { useSelector } from 'react-redux';

function Header() {
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        {role === 'USER' ? (
          <Navbar.Brand href="/mainpage" className="nav-buttons">
            Your Budget 30
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/dashboard" className="nav-buttons">
            Dashboard
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {role === 'USER' ? (
            <Nav className="me-auto">
              <NavLink className="nav-buttons" to="/incomes">
                Incomes
              </NavLink>
              <NavLink className="nav-buttons" to="/outcomes">
                Outcomes
              </NavLink>
              <NavLink className="nav-buttons" to="/savings">
                Savings
              </NavLink>
              <NavLink className="nav-buttons" to="/funds">
                Funds
              </NavLink>
            </Nav>
          ) : (
            <Nav className="me-auto"></Nav>
          )}
          <NavLink
            className="nav-buttons d-flex"
            to="/login"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log Out
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <nav>
    //   <NavLink to="/mainpage">Home</NavLink>
    //   <NavLink to="/incomes">Incomes</NavLink>
    //   <NavLink to="/outcomes">Outcomes</NavLink>
    //   <NavLink to="/savings">Savings</NavLink>
    //   <NavLink to="/funds">Funds</NavLink>
    //   <NavLink
    //     to="/login"
    //     onClick={() => {
    //       dispatch(logout());
    //     }}
    //   >
    //     Log Out
    //   </NavLink>
    // </nav>
  );
}

export default Header;
