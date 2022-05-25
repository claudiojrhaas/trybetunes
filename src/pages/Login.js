import React from 'react';

import { createUser } from '../services/userAPI';
// import Loading from './Loading';

class Login extends React.Component {
  state = {
    nameUser: '',
    isDisableBtnLogin: true,
    logado: false,
  }

  onClickSaveUser = async () => {
    const { nameUser } = this.state;
    await createUser({ name: nameUser });
    this.setState({ logado: true });
  }

  validateBtnLogin = () => {
    const { nameUser } = this.state;
    const inputMinLength = 2;

    if (nameUser.length >= inputMinLength) {
      this.setState({ isDisableBtnLogin: false });
    } else {
      this.setState({ isDisableBtnLogin: true });
    }
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nameUser: value,
    }, this.validateBtnLogin());
  }

  render() {
    const { nameUser, isDisableBtnLogin } = this.state;

    return (
      <div data-testid="page-login">
        Login..............
        <input
          type="text"
          placeholder="name"
          data-testid="login-name-input"
          value={ nameUser }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisableBtnLogin }
          onClick={ this.onClickSaveUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
