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
    searchMusic: '',
  };

  onClickSaveUser = async () => {
    const { nameUser } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameUser });
    this.setState({ loading: false, redirect: true });
    console.log(createUser);
  };

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
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
    );
  };

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
              handleChange={ this.handleChange }
              validateBtnLogin={ this.validateBtnLogin }
              { ...this.state }
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
        <div>
          {redirect && <Redirect to="/search" />}
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

export default App;
