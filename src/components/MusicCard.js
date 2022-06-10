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
    console.log('add');
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    await addSong(music);
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

  removeFavotiteList = async () => {
    console.log('remove');
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    await removeSong(music);
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

  changeFavoriteList = () => {
    const { isCheckedFavoriteSong } = this.state;
    if (!isCheckedFavoriteSong) {
      this.removeFavotiteList();
    } else {
      this.addFavoriteList();
    }
  }

  checkFavorite = () => {
    const { music: { trackId }, favorites } = this.props;
    console.log(favorites);
    // this.setState({ isLoadingAddMusicToFavorite: true });
    // this.setState({ isLoadingAddMusicToFavorite: false });
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
    // this.changeFavoriteList();
  };

  render() {
    const { isCheckedFavoriteSong, isLoadingAddMusicToFavorite } = this.state;
    const { music } = this.props;

    return (
      <div>
        { !isLoadingAddMusicToFavorite
          ? (<div key={ music.trackId }>
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
             </div>)
          : <Loading /> }
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
