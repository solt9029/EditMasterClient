import React from 'react';
import { Nav, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { Routes } from '../constants';
import { NavLink as RRNavLink } from 'react-router-dom';
import { matchPathnames } from '../utils/url';

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

/**
 * @param {Object} match
 * @param {Object} location
 * @return {boolean}
 */
const isActive = (match, location) => {
  return matchPathnames(location.pathname, [
    Routes.SCORES.SHOW,
    Routes.SCORES.NEW,
  ]);
};

const NavLinkList = () => {
  return (
    <Nav className="mr-auto" navbar>
      <StyledNavLink tag={RRNavLink} isActive={isActive} to={Routes.SCORES.NEW}>
        創作
      </StyledNavLink>
      <StyledNavLink tag={RRNavLink} exact to={Routes.SCORES.INDEX}>
        作品一覧
      </StyledNavLink>
      <StyledNavLink tag={RRNavLink} exact to={Routes.HELP}>
        ヘルプ
      </StyledNavLink>
    </Nav>
  );
};

export default NavLinkList;
