import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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
      isSaveButtonDisabled: true,
    });
  }

  onClickSaveButton = async () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    const { history } = this.props;
    this.setState({ loadingUserData: true });
    await updateUser({ name, email, image, description });
    this.setState({ loadingUserData: false },
      history.push('/profile'));
  }

  getValidationSaveButton = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    if (name.length
      && email.length
      && image.length
      && description.length) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      }, this.getValidationSaveButton,
    );
  };

  render() {
    const {
      loadingUserData,
      printProfile,
      name,
      email,
      description,
      image,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loadingUserData && <Loading /> }
        {
          printProfile
            && (
              <div>
                <h1>Editar perfil</h1>
                <form>
                  <label htmlFor="image">
                    Imagem:
                    <input
                      type="text"
                      name="image"
                      data-testid="edit-input-image"
                      onChange={ this.handleInputChange }
                      value={ image }
                    />
                  </label>
                  <label htmlFor="name">
                    Nome:
                    <input
                      type="text"
                      name="name"
                      data-testid="edit-input-name"
                      onChange={ this.handleInputChange }
                      value={ name }
                    />
                  </label>
                  <label htmlFor="email">
                    E-mail:
                    <input
                      type="text"
                      name="email"
                      data-testid="edit-input-email"
                      onChange={ this.handleInputChange }
                      value={ email }
                    />
                  </label>
                  <label htmlFor="description">
                    Descrição:
                    <input
                      type="text"
                      name="description"
                      data-testid="edit-input-description"
                      onChange={ this.handleInputChange }
                      value={ description }
                    />
                  </label>
                  <button
                    data-testid="edit-button-save"
                    type="button"
                    disabled={ isSaveButtonDisabled }
                    onClick={ this.onClickSaveButton }
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
