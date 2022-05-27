import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  }

  addFavoriteList = async () => {
    const { request } = this.props;
    this.setState({ loading: true });
    await addSong(request);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.props;
    const { request } = this.props;

    return (
      <div>
        { loading && <Loading /> }
        { request
          // Lógica do filter tirada de uma thread no slack: https://trybecourse.slack.com/archives/C0320DL79QS/p1653336494328899?thread_ts=1653335589.448189&cid=C0320DL79QS
          .filter((_song, index) => index > 0)
          .map((music) => (
            <div key={ music.trackId }>
              <p>{ music.trackName }</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="checkbox">
                Favorita
                <input
                  type="checkbox"
                  name="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onClick={ this.addFavoriteList }
                />
              </label>
            </div>
          )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  request: PropTypes.string.isRequired,
};

export default MusicCard;
