import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchArtist extends React.Component {
  render() {
    const { printAlbum } = this.props;

    return (
      <div>
        {
          printAlbum.map((i) => (
            <div key={ i.artistId }>
              <img src={ i.artworkUrl100 } alt={ i.collectionName } />
              <h4>{ i.collectionName }</h4>
              <p>{ i.artistName }</p>
              <Link
                data-testid={ `link-to-album-${i.collectionId}` }
                to={ `/album/${i.collectionId}` }
              >
                Acessar
              </Link>
            </div>
          ))
        }
      </div>
    );
  }
}

SearchArtist.propTypes = {
  printAlbum: PropTypes.string.isRequired,
};

export default SearchArtist;
