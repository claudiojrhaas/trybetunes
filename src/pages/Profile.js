import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loadingUserData: false,
    printProfile: false,
    name: '',
    email: '',
    image: '',
    description: '',
  }

  componentDidMount() {
    this.getRecoverUser();
  }

  getRecoverUser = async () => {
    this.setState({ loadingUserData: true });
    const responseUser = await getUser();
    console.log(responseUser.name);
    this.setState({
      loadingUserData: false,
      printProfile: true,
      name: responseUser.name,
      email: responseUser.email,
      image: responseUser.image,
      description: responseUser.description,
    });
  }

  render() {
    const {
      loadingUserData,
      printProfile,
      name,
      email,
      image,
      description,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loadingUserData && <Loading /> }
        {
          printProfile
            && (
              <div>
                <h4>{ name }</h4>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt="Imagem do usuário"
                />
                <div>{ email }</div>
                <div>{ description }</div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
