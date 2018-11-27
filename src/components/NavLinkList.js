import React from 'react';
import { Nav, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { routes } from '../constants';
import { NavLink as RRNavLink } from 'react-router-dom';
import { matchScoresCreatePathname } from '../utils/url';

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

/**
 * @param {Object} match
 * @param {Object} location
 * @return {boolean}
 */
const isScoresCreateActive = (match, location) => {
  return matchScoresCreatePathname(location.pathname);
};

const NavLinkList = () => {
  return (
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
  );
};

export default NavLinkList;
