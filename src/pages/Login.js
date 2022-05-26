import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { nameUser, handleChange, onClickSaveUser } = this.props;
    const inputMinLength = 3;

    return (
      <div data-testid="page-login">
        Login..............
        <input
          name="nameUser"
          type="text"
          placeholder="name"
          data-testid="login-name-input"
          value={ nameUser }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ inputMinLength > nameUser.length }
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
  handleChange: PropTypes.func.isRequired,
  onClickSaveUser: PropTypes.func.isRequired,
};

export default Login;
