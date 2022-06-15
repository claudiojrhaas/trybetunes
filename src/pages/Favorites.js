import React from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
    loadingFavoriteList: false,
  }

  componentDidMount() {
    this.getListFavorites();
  }

  getListFavorites = async () => {
    this.setState({ loadingFavoriteList: true });
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({
      favoriteList: response,
      loadingFavoriteList: false,
    });
  }

  render() {
    const { favoriteList, loadingFavoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas Favoritas:</h3>
        {
          loadingFavoriteList ? <Loading />
            : (
              favoriteList.map((favorite) => (
                <MusicCard
                  key={ favorite.trackId }
                  music={ favorite }
                  getListFavorites={ this.getListFavorites }
                />
              ))
            )
        }

      </div>
    );
  }
}

export default Favorites;
