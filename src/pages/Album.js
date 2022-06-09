import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    isLoadingAddMusicToFavorite: false,
    isLoadingMusicList: false,
    showArtist: '',
    showCollect: '',
    requestAPI: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      isLoadingMusicList: true,
      requestAPI: response,
      showArtist: response[0].artistName,
      showCollect: response[0].collectionName,
    });
  }

  addFavoriteList = async () => {
    const { music } = this.props;
    this.setState({ isLoadingAddMusicToFavorite: true });
    await addSong(music);
    this.setState({ isLoadingAddMusicToFavorite: false });
  }

  validationFavorite = async () => {
    const { music } = this.props;
    const response = await getFavoriteSongs();
    const responseValidation = response.some((track) => track.trackId === music.trackId);
    this.setState({ isChecked: responseValidation });
  }

  render() {
    const { isLoadingMusicList,
      showArtist,
      showCollect,
      requestAPI,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">{ isLoadingMusicList && showArtist }</div>
        <div data-testid="album-name">{ isLoadingMusicList && showCollect }</div>
        <div>
          {
            isLoadingMusicList
            && requestAPI
              .filter((trackId) => trackId.trackId)
              .map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  { ...music }
                  { ...this.state }
                  addFavoriteList={ this.addFavoriteList }
                  validationFavorite={ this.validationFavorite }
                />))
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
