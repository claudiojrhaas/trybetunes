import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loadingList: false,
    showArtist: '',
    showCollect: '',
    request: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      loadingList: true,
      request: response,
      showArtist: response[0].artistName,
      showCollect: response[0].collectionName,
    });
  }

  render() {
    const { loadingList, showArtist, showCollect, request } = this.state;
    const { handleChange } = this.props;

    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">{ loadingList && showArtist }</div>
        <div data-testid="album-name">{ loadingList && showCollect }</div>
        <div>
          { loadingList
          && <MusicCard request={ request } handleChange={ handleChange } /> }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
