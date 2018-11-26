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
import NavbarBrand from './NavbarBrand';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  matchScoresCreatePathname,
  matchScoresIndexPathname,
} from '../utils/url';

const StyledNavbar = styled(ReactstrapNavbar)`
  font-family: 'HG行書体';
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

const isScoresCreateActive = (match, location) => {
  return matchScoresCreatePathname(location.pathname);
};

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
    const { location, error, isLoading } = this.props;

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <NavbarBrand />
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <StyledNavLink
                tag={RRNavLink}
                isActive={isScoresCreateActive}
                to={routes.SCORES.NEW}
              >
                創作
              </StyledNavLink>
              <StyledNavLink tag={RRNavLink} exact to={routes.SCORES.INDEX}>
                作品一覧
              </StyledNavLink>
              <StyledNavLink tag={RRNavLink} exact to={routes.HELP}>
                ヘルプ
              </StyledNavLink>
            </Nav>
            {matchScoresCreatePathname(location.pathname) &&
              !error &&
              !isLoading && (
                <Fragment>
                  <TjaExportButton />
                  <CreateButton />
                </Fragment>
              )}
            {matchScoresIndexPathname(location.pathname) && <SearchForm />}
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}
