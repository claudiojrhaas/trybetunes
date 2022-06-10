import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoadingAddMusicToFavorite: false,
    isCheckedFavoriteSong: false,
  }

  componentDidMount() {
    this.checkFavorite();
  }

  addFavoriteList = async () => {
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    await addSong(music);
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

   checkFavorite = async () => {
     const { music: { trackId } } = this.props;
     const response = await getFavoriteSongs();
     if (response.some((track) => track.trackId === trackId)) {
       this.setState({ isCheckedFavoriteSong: true });
     }
   }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') && target.checked;
    this.setState({
      [name]: value,
    });
    this.addFavoriteList();
  };

  render() {
    const { isCheckedFavoriteSong, isLoadingAddMusicToFavorite } = this.state;
    const { music } = this.props;

    return (
      <div>
        <div key={ music.trackId }>
          <p>{ music.trackName }</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ music.trackId }>
            Favorita
            <input
              type="checkbox"
              id={ music.trackId }
              name="isCheckedFavoriteSong"
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ this.handleChange }
              checked={ isCheckedFavoriteSong }
            />
          </label>
          { isLoadingAddMusicToFavorite && <Loading /> }
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
