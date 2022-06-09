import React from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  }

  componentDidMount() {
    this.validationFavorite();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      }, this.addFavoriteList,
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
    this.setState({ checked: responseValidation });
  }

  render() {
    const { loading, checked } = this.state;
    const { music } = this.props;

    return (
      <div>
        { loading ? <Loading />
          : (
          // Lógica do filter tirada de uma thread no slack: https://trybecourse.slack.com/archives/C0320DL79QS/p1653336494328899?thread_ts=1653335589.448189&cid=C0320DL79QS

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
                  name="checked"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ this.handleChange }
                  checked={ checked }
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
