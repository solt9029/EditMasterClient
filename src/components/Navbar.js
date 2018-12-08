import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar as RNavbar,
  NavbarToggler,
  Container,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import SearchForm from '../containers/SearchForm';
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
    const {
      location,
      error,
      isLoading,
      createScore,
      exportTjaFile,
    } = this.props;

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
                  <Button
                    color="info"
                    className="my-2 mr-2"
                    onClick={exportTjaFile}
                  >
                    太鼓さん次郎エクスポート
                  </Button>
                  <Button
                    color="success"
                    className="my-2 mr-2"
                    onClick={createScore}
                  >
                    保存
                  </Button>
                </Fragment>
              )}
            {matchScoresIndexPathname(location.pathname) && <SearchForm />}
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}
