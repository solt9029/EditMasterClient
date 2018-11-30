import React, { Fragment } from 'react';
import { NavbarBrand as RNavbarBrand } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Routes } from '../constants';

const Logo = styled(RNavbarBrand)`
  background: url('/images/icon.png') no-repeat left center;
  background-size: contain;
  height: 45px;
  width: 45px;
`;

const Brand = styled.span`
  font-size: 1.5em;
`;

const NavbarBrand = () => {
  return (
    <Fragment>
      <Logo tag={Link} to={Routes.INDEX} />
      <RNavbarBrand tag={Link} to={Routes.INDEX}>
        <Brand>創作の達人</Brand>
      </RNavbarBrand>
    </Fragment>
  );
};

export default NavbarBrand;
