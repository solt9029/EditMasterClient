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
import axios from 'axios';
import config from '../../config';
import { connect } from 'react-redux';
import { openErrorModal } from '../../actions/errorModal';
import { openSuccessModal } from '../../actions/successModal';

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
    this.create = this.create.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  async create() {
    const data = {
      bpm: this.props.config.bpm.value,
      videoId: this.props.config.videoId.value,
      username: this.props.config.username.value,
      offset: this.props.config.offset.value,
      speed: this.props.config.speed.value,
      comment: this.props.config.comment.value,
      notes: this.props.notes,
    };

    try {
      const result = await axios.post(
        `http://${config.api.host}:${config.api.port}/scores/create`,
        data
      );
      this.props.openSuccessModal(result.data.id);
    } catch (error) {
      this.props.openErrorModal(error.response.data.errors);
      console.log(error.response.data.errors);
    }
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
            {(this.props.match.path === constants.route.scores.new ||
              this.props.match.path === constants.route.scores.show) &&
              !this.props.notFound && (
                <Button
                  color="success"
                  className="my-2 my-sm-2"
                  onClick={this.create}
                >
                  保存
                </Button>
              )}
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

const mapStateToProps = state => ({
  notes: state.editor.notes,
  config: state.config,
});
const mapDispatchToProps = dispatch => ({
  openErrorModal(errors) {
    dispatch(openErrorModal(errors));
  },
  openSuccessModal(id) {
    dispatch(openSuccessModal(id));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
