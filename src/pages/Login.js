import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { nameUser, isDisableBtnLogin, handleChange, onClickSaveUser } = this.props;

    return (
      <div data-testid="page-login">
        Login..............
        <input
          type="text"
          placeholder="name"
          data-testid="login-name-input"
          value={ nameUser }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisableBtnLogin }
          onClick={ onClickSaveUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  nameUser: PropTypes.string.isRequired,
  isDisableBtnLogin: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClickSaveUser: PropTypes.func.isRequired,
};

export default Login;
