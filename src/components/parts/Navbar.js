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

class Navbar extends Component {
  render() {
    return (
      <ReactstrapNavbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">創作の達人</NavbarBrand>
          <NavbarToggler onClick={this.props.toggle} />
          <Collapse isOpen={this.props.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/scores/new">創作</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/scores">作品一覧</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/help">ヘルプ</NavLink>
              </NavItem>
            </Nav>
            <Form inline onSubmit={e => e.preventDefault()}>
              <Input type="search" placeholder="検索" />
              <Button outline color="success" type="submit">
                検索
              </Button>
            </Form>
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
