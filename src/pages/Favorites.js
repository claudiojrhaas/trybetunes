import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorites: [],
  }

  async componentDidMount() {
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({ favorites: response });
  }

  render() {
    const { favorites } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favorites.map((favorite) => (
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
