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
import { successCreate, failCreate, startCreate } from '../../actions/modal';
import { setKeyword } from '../../actions/navbar';
import history from '../../history';
import qs from 'qs';
import { setPage } from '../../actions/scoreCardPaginate';

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
      video_id: this.props.config.videoId.value,
      username: this.props.config.username.value,
      offset: this.props.config.offset.value,
      speed: this.props.config.speed.value,
      comment: this.props.config.comment.value,
      notes: this.props.notes,
    };

    this.props.startCreate();

    try {
      const result = await axios.post(
        `http://${config.api.host}:${config.api.port}/scores/create`,
        data
      );
      this.props.successCreate(result.data.id);
    } catch (error) {
      this.props.failCreate(error.response.data.errors);
    }
  }

  render() {
    return (
      <StyledNavbar className="py-0" color="light" light expand="md">
        <Container>
          <Logo tag={Link} to={constants.route.index} />
          <NavbarBrand tag={Link} to={constants.route.index}>
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
                <StyledNavLink tag={Link} to={constants.route.scores.new}>
                  創作
                </StyledNavLink>
              </NavItem>
              <NavItem
                active={this.props.match.path === constants.route.scores.index}
              >
                <StyledNavLink tag={Link} to={constants.route.scores.index}>
                  作品一覧
                </StyledNavLink>
              </NavItem>
              <NavItem active={this.props.match.path === constants.route.help}>
                <StyledNavLink tag={Link} to={constants.route.help}>
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
                <Input
                  type="search"
                  className="mr-sm-2"
                  placeholder="検索"
                  value={this.props.keyword}
                  onChange={event => {
                    this.props.setKeyword(event.target.value);
                  }}
                />
                <Button
                  outline
                  color="success"
                  className="my-2 my-sm-2"
                  type="submit"
                  onClick={() => {
                    this.props.setPage(1);
                    const search = qs.stringify(
                      {
                        page: 1,
                        keyword: this.props.keyword,
                      },
                      { addQueryPrefix: true }
                    );
                    history.push({
                      search,
                    });
                  }}
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
  keyword: state.navbar.keyword,
});
const mapDispatchToProps = dispatch => ({
  successCreate(id) {
    dispatch(successCreate(id));
  },
  failCreate(errors) {
    dispatch(failCreate(errors));
  },
  startCreate() {
    dispatch(startCreate());
  },
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
  setPage(page) {
    dispatch(setPage(page));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
