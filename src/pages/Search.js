import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    nameUserPrinted: '',
    printUser: false,
    loading: true,
  }

  async componentDidMount() {
    const { nameUserPrinted } = this.state;
    const response = await getUser(nameUserPrinted);
    this.setState({
      nameUserPrinted: response.name,
      printUser: true,
      loading: false,
    });
  }

  render() {
    const { nameUserPrinted, printUser, loading } = this.state;
    const { handleChange, searchMusic } = this.props;
    const inputMinLength = 2;

    return (
      <div data-testid="page-search">
        <div data-testid="header-user-name">
          { loading && <Loading /> }
          { printUser && nameUserPrinted }
          <Header />
        </div>
        <div>
          <input
            name="searchMusic"
            type="text"
            placeholder="Pesquisar"
            data-testid="search-artist-input"
            value={ searchMusic }
            onChange={ handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ inputMinLength > searchMusic.length }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchMusic: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Search;
