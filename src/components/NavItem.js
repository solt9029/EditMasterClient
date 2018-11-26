import React from 'react';
import { NavItem as RNavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  font-size: 1em;
`;

const NavItem = ({ active, to, children }) => {
  return (
    <RNavItem active={active}>
      <StyledNavLink tag={Link} to={to}>
        {children}
      </StyledNavLink>
    </RNavItem>
  );
};

export default NavItem;
