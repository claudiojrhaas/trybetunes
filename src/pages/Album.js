import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    isLoadingMusicList: false,
    showArtist: '',
    showCollect: '',
    requestAPI: [],
    favorites: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      isLoadingMusicList: true,
      requestAPI: response,
      showArtist: response[0].artistName,
      showCollect: response[0].collectionName,
      favorites: await getFavoriteSongs(),
    });
  }

  render() {
    const { isLoadingMusicList,
      showArtist,
      showCollect,
      requestAPI,
      favorites,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">{ isLoadingMusicList && showArtist }</div>
        <div data-testid="album-name">{ isLoadingMusicList && showCollect }</div>
        <div>
          {
            isLoadingMusicList
              ? (requestAPI
                .filter((trackId) => trackId.trackId)
                .map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    { ...this.state }
                    favorites={ favorites }
                  />)))
              : <Loading />
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
