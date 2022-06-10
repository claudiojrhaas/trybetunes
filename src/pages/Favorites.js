import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
  }

  componentDidMount() {
    this.getListFavorites();
  }

  getListFavorites = async () => {
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({ favoriteList: response });
  }

  render() {
    const { favoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas Favoritas:</h3>
        {
          favoriteList.map((favorite) => (
            <MusicCard
              key={ favorite.trackId }
              music={ favorite }
            />
          ))
        }

      </div>
    );
  }
}

export default Favorites;
