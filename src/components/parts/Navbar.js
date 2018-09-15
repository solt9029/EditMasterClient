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
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Logo = styled(NavbarBrand)`
  background: url('/images/icon.png') no-repeat left center;
  background-size: contain;
  height: 45px;
  width: 45px;
`;

const StyledNavbar = styled(ReactstrapNavbar)`
  font-family: 'HG行書体';
`;

const StyledSpan = styled.span`
  font-size: 1.5em;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
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
            <StyledSpan>創作の達人</StyledSpan>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
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
                  className="my-2 my-sm-2"
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
      </StyledNavbar>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
