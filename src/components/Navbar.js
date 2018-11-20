import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import SearchForm from '../containers/SearchForm';
import TjaExportButton from '../containers/TjaExportButton';
import CreateButton from '../containers/CreateButton';

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

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { match, notFound, error, isLoading } = this.props;

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <Logo tag={Link} to={routes.INDEX} />
          <NavbarBrand tag={Link} to={routes.INDEX}>
            <StyledSpan>創作の達人</StyledSpan>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem
                active={
                  (match.path === routes.SCORES.SHOW ||
                    match.path === routes.SCORES.NEW) &&
                  !notFound
                }
              >
                <StyledNavLink tag={Link} to={routes.SCORES.NEW}>
                  創作
                </StyledNavLink>
              </NavItem>
              <NavItem active={match.path === routes.SCORES.INDEX}>
                <StyledNavLink tag={Link} to={routes.SCORES.INDEX}>
                  作品一覧
                </StyledNavLink>
              </NavItem>
              <NavItem active={match.path === routes.HELP}>
                <StyledNavLink tag={Link} to={routes.HELP}>
                  ヘルプ
                </StyledNavLink>
              </NavItem>
            </Nav>
            {(match.path === routes.SCORES.NEW ||
              match.path === routes.SCORES.SHOW) &&
              !error &&
              !isLoading && (
                <Fragment>
                  <TjaExportButton />
                  <CreateButton />
                </Fragment>
              )}
            {match.path === routes.SCORES.INDEX && <SearchForm />}
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}
