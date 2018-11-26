import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  Nav,
  NavLink,
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { routes } from '../constants';
import SearchForm from '../containers/SearchForm';
import TjaExportButton from '../containers/TjaExportButton';
import CreateButton from '../containers/CreateButton';
import { Link } from 'react-router-dom';
import NavbarBrand from './NavbarBrand';

const StyledNavbar = styled(ReactstrapNavbar)`
  font-family: 'HG行書体';
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { match, error, isLoading } = this.props;

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <NavbarBrand />
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <StyledNavLink
                tag={Link}
                active={
                  (match.path === routes.SCORES.SHOW ||
                    match.path === routes.SCORES.NEW) &&
                  !error &&
                  !isLoading
                }
                to={routes.SCORES.NEW}
              >
                創作
              </StyledNavLink>
              <StyledNavLink
                tag={Link}
                active={match.path === routes.SCORES.INDEX}
                to={routes.SCORES.INDEX}
              >
                作品一覧
              </StyledNavLink>
              <StyledNavLink
                tag={Link}
                active={match.path === routes.HELP}
                to={routes.HELP}
              >
                ヘルプ
              </StyledNavLink>
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
