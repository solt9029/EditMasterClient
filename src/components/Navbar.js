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
import { matchPathnames } from '../utils/url';
import NavLinkList from './NavLinkList';
import { Routes } from '../constants';

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

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname === nextProps.location.pathname) {
      return;
    }
    this.setState({
      isOpen: false,
    });
  }

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
            {matchPathnames(location.pathname, [
              Routes.SCORES.NEW,
              Routes.SCORES.SHOW,
            ]) &&
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
            {matchPathnames(location.pathname, [Routes.SCORES.INDEX]) && (
              <SearchForm />
            )}
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}
