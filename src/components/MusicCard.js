import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoadingAddMusicToFavorite: false,
    isChecked: false,
  }

  async componentDidMount() {
    const { validationFavorite } = this.props;
    await validationFavorite();
  }

  addFavoriteList = async () => {
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    await addSong(music);
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') && target.checked;
    this.setState(
      {
        [name]: value,
      }, async () => this.addFavoriteList(),
    );
  };

  render() {
    const { isChecked, isLoadingAddMusicToFavorite } = this.state;
    const { music } = this.props;

    return (
      <div>
        { isLoadingAddMusicToFavorite ? <Loading />
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
                  name="isChecked"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ this.handleChange }
                  checked={ isChecked }
                />
              </label>
            </div>)}
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
  validationFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
