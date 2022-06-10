import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoadingAddMusicToFavorite: false,
    isCheckedFavoriteSong: false,
  }

  componentDidMount() {
    this.checkFavorite();
  }

  changeFavoriteList = async () => {
    const { isCheckedFavoriteSong } = this.state;
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    if (isCheckedFavoriteSong) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

  checkFavorite = () => {
    const { music: { trackId }, favorites } = this.props;
    const responseValidation = favorites.some((track) => track.trackId === trackId);
    if (responseValidation) {
      this.setState({
        isCheckedFavoriteSong: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') && target.checked;
    this.setState({
      [name]: value,
    }, this.changeFavoriteList);
  };

  render() {
    const { isCheckedFavoriteSong, isLoadingAddMusicToFavorite } = this.state;
    const { music } = this.props;

    return (
      <div>
        { isLoadingAddMusicToFavorite
          ? <Loading />
          : (
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
            </div>
          )}
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
  favorites: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
