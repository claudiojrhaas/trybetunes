import React from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// Matheus Almeida, Rodrigo Macedo

class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { music } = this.props;
    console.log(music);
    const response = await getFavoriteSongs();
    if (response.some((track) => track.trackId === music.trackId)) {
      this.setState({ isChecked: true, loading: false });
      return;
    }
    this.setState({ loading: false });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.isChecked : target.value;
    this.setState(
      {
        [name]: value,
      }, async () => this.addFavoriteList(),
    );
  };

  addFavoriteList = async () => {
    const { isChecked } = this.state;
    const { music } = this.props;
    if (isChecked) {
      this.setState({ loading: true });
      await addSong(music);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(music);
      this.setState({ loading: false });
    }
  }

  // validationFavorite = async () => {
  //   const { music } = this.props;
  //   const response = await getFavoriteSongs();
  //   const responseValidation = response.some((track) => track.trackId === music.trackId);
  //   this.setState({ checked: responseValidation });
  // }

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
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
