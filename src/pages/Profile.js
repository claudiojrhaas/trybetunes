import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loadingPrintUser: false,
    infosUser: '',
  }

  componentDidMount() {
    this.getRecoverUser();
  }

  getRecoverUser = async () => {
    this.setState({ loadingPrintUser: true });
    const responseUser = await getUser();
    this.setState({
      loadingPrintUser: false,
      infosUser: responseUser,
    });
  }

  render() {
    const {
      loadingPrintUser,
      infosUser,
    } = this.state;
    const { name, image, email, description } = infosUser;

    return (
      <div data-testid="page-profile">
        <Header />
        { loadingPrintUser ? <Loading />
          : (
            <div>
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <div>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt="Imagem do usuário"
                />
              </div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
