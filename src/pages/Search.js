import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SearchArtist from '../components/SearchArtist';
import AlbumNotFound from '../components/AlbumNotFound';

class Search extends React.Component {
  state = {
    nameUserPrinted: '',
    printUser: false,
    loading: true,
    responseAlbum: false,
    printAlbum: '',
    albumNotFound: false,
    printArtist: '',
  }

  async componentDidMount() {
    const { nameUserPrinted } = this.state;
    const responseUser = await getUser(nameUserPrinted);
    this.setState({
      nameUserPrinted: responseUser.name,
      printUser: true,
      loading: false,
    });
  }

  callAlbumAPI = async () => {
    const { searchInput, clearInput } = this.props;
    const responseAlbumAPI = await searchAlbumsAPI(searchInput);
    this.setState({
      printAlbum: responseAlbumAPI,
      responseAlbum: true,
      printArtist: searchInput,
    });
    if (responseAlbumAPI.length === 0) this.setState({ albumNotFound: true });
    clearInput();
  }

  render() {
    const {
      nameUserPrinted,
      printUser,
      loading,
      responseAlbum,
      printAlbum,
      albumNotFound,
      printArtist,
    } = this.state;
    const { handleChange, searchInput } = this.props;
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
            name="searchInput"
            type="text"
            placeholder="Pesquisar"
            data-testid="search-artist-input"
            value={ searchInput }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ inputMinLength > searchInput.length }
            onClick={ this.callAlbumAPI }
          >
            Pesquisar
          </button>
          <span>
            { albumNotFound && <AlbumNotFound /> }
            { responseAlbum && <p>{ `Resultado de álbuns de: ${printArtist}` }</p> }
            { responseAlbum
            && (<SearchArtist
              printAlbum={ printAlbum }
            />) }
          </span>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Search;
