import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  render() {
    const { user, token, exit } = this.props;
    return(
      <div>
        <Navbar id="header" collapseOnSelect>
          <Navbar.Header>

            <Navbar.Brand>
              <Link to="/" className='brand'>Flerse</Link>
            </Navbar.Brand>
            <Navbar.Toggle />

          </Navbar.Header>
          <Navbar.Collapse>
          {
            token
            ? <Nav pullRight>
                <NavDropdown title={ <b>{user.nickname}</b> } id='header-dropdown' pullRight>

                  <LinkContainer to={"/user/" + user.nickname}>
                    <MenuItem className='menu-item' >Profile</MenuItem>
                  </LinkContainer>

                  <LinkContainer to='/about'>
                    <MenuItem className='menu-item' >About us</MenuItem>
                  </LinkContainer>

                  <MenuItem className='menu-item' onClick={exit}>Exit</MenuItem>

                </NavDropdown>
              </Nav>
            : <Nav pullRight>
              <LinkContainer to='/signin'>
                <NavItem>Log in</NavItem>
              </LinkContainer>
              <LinkContainer to='/signup'>
                <NavItem>Sign up</NavItem>
              </LinkContainer>
              </Nav>
          }
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

const mapState = ({ user, token }, { children }) => ({ user, token, children });

const mapDispatch = dispatch => ({
  exit: () => dispatch({type: 'REMOVE_TOKEN'})
})

export default connect(mapState, mapDispatch)(Header);
