import React from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// Matheus Almeida, Rodrigo Macedo

class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
  }

  componentDidMount() {
    this.validationFavorite();
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

  addFavoriteList = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
  }

  validationFavorite = async () => {
    const { music } = this.props;
    const response = await getFavoriteSongs();
    const responseValidation = response.some((track) => track.trackId === music.trackId);
    this.setState({ isChecked: responseValidation });
  }

  render() {
    const { loading, isChecked } = this.state;
    const { music } = this.props;

    return (
      <div>
        { loading ? <Loading />
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
  music: PropTypes.shape({}).isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
