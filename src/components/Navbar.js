import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  Nav,
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { routes } from '../constants';
import SearchForm from '../containers/SearchForm';
import TjaExportButton from '../containers/TjaExportButton';
import CreateButton from '../containers/CreateButton';
import NavItem from './NavItem';
import NavbarBrand from './NavbarBrand';

const StyledNavbar = styled(ReactstrapNavbar)`
  font-family: 'HG行書体';
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
    const { match, notFound, error, isLoading } = this.props;

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <NavbarBrand />
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem
                active={
                  (match.path === routes.SCORES.SHOW ||
                    match.path === routes.SCORES.NEW) &&
                  !notFound
                }
                to={routes.SCORES.NEW}
              >
                創作
              </NavItem>
              <NavItem
                active={match.path === routes.SCORES.INDEX}
                to={routes.SCORES.INDEX}
              >
                作品一覧
              </NavItem>
              <NavItem active={match.path === routes.HELP} to={routes.HELP}>
                ヘルプ
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
