import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  Container,
  Button,
} from 'reactstrap';
import { toggle } from '../../actions/navbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Logo = styled(NavbarBrand)`
  background: url('/images/icon.png') no-repeat left center;
  background-size: contain;
  height: 45px;
  width: 45px;
`;

const StyledBrandSpan = styled.span`
  font-family: 'HG行書体';
  font-size: 30px;
`;

const StyledNavLink = styled(NavLink)`
  font-family: 'HG行書体';
  font-size: 17px;
`;

class Navbar extends Component {
  render() {
    return (
      <ReactstrapNavbar className="py-0" color="light" light expand="md">
        <Container>
          <Logo
            tag={Link}
            to="/"
            target={this.props.targetBlank ? '_blank' : ''}
          />
          <NavbarBrand
            tag={Link}
            to="/"
            target={this.props.targetBlank ? '_blank' : ''}
          >
            <StyledBrandSpan>創作の達人</StyledBrandSpan>
          </NavbarBrand>
          <NavbarToggler onClick={this.props.toggle} />
          <Collapse isOpen={this.props.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem active={this.props.active === 'scoresNew'}>
                <StyledNavLink
                  tag={Link}
                  to="/scores/new"
                  target={this.props.targetBlank ? '_blank' : ''}
                >
                  創作
                </StyledNavLink>
              </NavItem>
              <NavItem active={this.props.active === 'scoresIndex'}>
                <StyledNavLink
                  tag={Link}
                  to="/scores"
                  target={this.props.targetBlank ? '_blank' : ''}
                >
                  作品一覧
                </StyledNavLink>
              </NavItem>
              <NavItem active={this.props.active === 'help'}>
                <StyledNavLink
                  tag={Link}
                  to="/help"
                  target={this.props.targetBlank ? '_blank' : ''}
                >
                  ヘルプ
                </StyledNavLink>
              </NavItem>
            </Nav>
            {this.props.form ? (
              <Form inline onSubmit={e => e.preventDefault()}>
                <Input type="search" className="mr-sm-2" placeholder="検索" />
                <Button
                  outline
                  color="success"
                  className="my-2 my-sm-0"
                  type="submit"
                >
                  検索
                </Button>
              </Form>
            ) : (
              ''
            )}
          </Collapse>
        </Container>
      </ReactstrapNavbar>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.navbar.isOpen,
});
const mapDispatchToProps = dispatch => ({
  toggle() {
    dispatch(toggle());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
