import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { stringifySearchQuery } from '../utils/url';
import PropTypes from 'prop-types';

const SearchForm = ({ keyword, setKeyword, history }) => {
  const onSubmit = event => {
    event.preventDefault();
  };

  const onClick = () => {
    const search = stringifySearchQuery(keyword);
    history.push({
      search,
    });
  };

  const onChange = event => {
    setKeyword(event.target.value);
  };

  return (
    <Form inline onSubmit={onSubmit}>
      <Input
        type="search"
        className="my-2 mr-sm-2"
        placeholder="検索"
        value={keyword}
        onChange={onChange}
      />
      <Button
        outline
        color="success"
        className="my-2 my-sm-2"
        type="submit"
        onClick={onClick}
      >
        検索
      </Button>
    </Form>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
};
