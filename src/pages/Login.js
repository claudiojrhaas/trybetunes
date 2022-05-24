import React from 'react';

class Login extends React.Component {
  state = {
    nameUser: '',
    validateBtnLogin: false,
  }

  validateBtnLogin = () => {
    const { userName, validateBtnLogin } = this.state;}

    nameUser.length >= 3 ? this.setState({ validateBtnLogin: true }) : this.setState({validateBtnLogin: false })
  }

  render() {
    const { nameUser, validateBtnLogin } = this.state;

    return (
      <div data-testid="page-login">
        <Form>Login
          <label htmlFor="login-name">
            <input
              id="login-name"
              type="text"
              placeholder="name"
              data-testid="login-name-input"
              value={ nameUser }
              onChange="?"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ validateBtnLogin }
            onSubmit="?"
          >
            Entrar
          
          </button>
        </Form>
      </div>
    );
  }
}

export default Login;
