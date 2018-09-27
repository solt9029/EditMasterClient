import React, { Component } from 'react';
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
import withRouter from 'react-router-dom/withRouter';
import constants from '../../constants';

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
    const target =
      (this.props.match.path === constants.route.scores.show ||
        this.props.match.path === constants.route.scores.new) &&
      !this.props.notFound
        ? '_blank'
        : '';

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <Logo tag={Link} to={constants.route.index} target={target} />
          <NavbarBrand tag={Link} to={constants.route.index} target={target}>
            <StyledSpan>創作の達人</StyledSpan>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem
                active={
                  (this.props.match.path === constants.route.scores.show ||
                    this.props.match.path === constants.route.scores.new) &&
                  !this.props.notFound
                }
              >
                <StyledNavLink
                  tag={Link}
                  to={constants.route.scores.new}
                  target={target}
                >
                  創作
                </StyledNavLink>
              </NavItem>
              <NavItem
                active={this.props.match.path === constants.route.scores.index}
              >
                <StyledNavLink
                  tag={Link}
                  to={constants.route.scores.index}
                  target={target}
                >
                  作品一覧
                </StyledNavLink>
              </NavItem>
              <NavItem active={this.props.match.path === constants.route.help}>
                <StyledNavLink
                  tag={Link}
                  to={constants.route.help}
                  target={target}
                >
                  ヘルプ
                </StyledNavLink>
              </NavItem>
            </Nav>
            {this.props.match.path === constants.route.scores.index && (
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
            )}
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}

export default withRouter(Navbar);
