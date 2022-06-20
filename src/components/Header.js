import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = { nameUser: '' }

  componentDidMount() {
    this.getRecoverUser();
  }

  getRecoverUser = async () => {
    const responseUser = await getUser();
    console.log(responseUser);
    this.setState({
      nameUser: responseUser.name,
    });
  }

  render() {
    const { nameUser } = this.state;

    return (
      <>
        <header
          data-testid="header-component"
          className="header-component"
        >
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </header>
        <div>{ nameUser }</div>
      </>
    );
  }
}

export default Header;
