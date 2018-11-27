import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar as RNavbar,
  NavbarToggler,
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import SearchForm from '../containers/SearchForm';
import TjaExportButton from '../containers/TjaExportButton';
import CreateButton from '../containers/CreateButton';
import NavbarBrand from './NavbarBrand';
import {
  matchScoresCreatePathname,
  matchScoresIndexPathname,
} from '../utils/url';
import NavLinkList from './NavLinkList';

const StyledNavbar = styled(RNavbar)`
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
    const { location, error, isLoading } = this.props;

    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <NavbarBrand />
          <NavbarToggler onClick={this.toggle} className="my-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavLinkList />
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
