import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { request } = this.props;

    return (
      <div>
        { request
          // Lógica do filter tirada de uma thread no slack: https://trybecourse.slack.com/archives/C0320DL79QS/p1653336494328899?thread_ts=1653335589.448189&cid=C0320DL79QS
          .filter((_song, index) => index > 0)
          .map((music) => (
            <div key={ music.trackId }>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <span>{ music.trackName }</span>
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
