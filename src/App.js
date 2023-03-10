import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

class App extends React.Component {
  state = {
    nameUser: '',
    isDisableBtnLogin: true,
    redirect: false,
    loading: false,
    searchInput: '',
  };

  onClickSaveUser = async () => {
    const { nameUser } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameUser });
    this.setState({ loading: false, redirect: true });
  };

  // Fiz uma mudança na lógica de validação do botão para não precisar repetir a função dentro de outro componente. A idéia da resolução veio de um problema resolvido no projeto Frontend store pelo meu colega de grupo Arthur Coelho.

  // validateBtnLogin = () => {
  //   const { [ name ] } = this.state;
  //   const inputMinLength = 2;

  //   if (name.length >= inputMinLength) {
  //     this.setState({ isDisableBtnLogin: false });
  //   } else {
  //     this.setState({ isDisableBtnLogin: true });
  //   }
  // };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
    );
  };

  clearInput = () => {
    this.setState({ searchInput: '' });
  }

  render() {
    const { redirect, loading } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                { ...this.state }
                handleChange={ this.handleChange }
                onClickSaveUser={ this.onClickSaveUser }
              />
            ) }
          />
          <Route
            path="/search"
            render={ () => (<Search
              clearInput={ this.clearInput }
              handleChange={ this.handleChange }
              { ...this.state }
            />) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
            />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route
            path="/profile/edit"
            render={ (props) => (<ProfileEdit
              { ...props }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
        <div>
          { /* Lógica de renderização condicinonal desenvolvida com ajuda do summer Humberto Castro durante a monitoria matinal */}
          {redirect && <Redirect to="/search" />}
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

export default App;
