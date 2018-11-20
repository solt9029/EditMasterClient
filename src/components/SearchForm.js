import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import qs from 'qs';
import propTypes from 'prop-types';

export default class NavbarSearchForm extends Component {
  preventDefault(event) {
    event.preventDefault();
  }

  search = () => {
    const { keyword, history } = this.props;
    const search = qs.stringify(
      {
        page: 1,
        keyword,
      },
      { addQueryPrefix: true }
    );
    history.push({
      search,
    });
  };

  setKeyword = event => {
    this.props.setKeyword(event.target.value);
  };

  render() {
    return (
      <Form inline onSubmit={this.preventDefault}>
        <Input
          type="search"
          className="my-2 mr-sm-2"
          placeholder="検索"
          value={this.props.keyword}
          onChange={this.setKeyword}
        />
        <Button
          outline
          color="success"
          className="my-2 my-sm-2"
          type="submit"
          onClick={this.search}
        >
          検索
        </Button>
      </Form>
    );
  }
}

NavbarSearchForm.propTypes = {
  keyword: propTypes.string,
  setKeyword: propTypes.func,
};
