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
import Header from './components/Header';

class App extends React.Component {
  state = {
    nameUser: '',
    isDisableBtnLogin: true,
    redirect: false,
    loading: false,
  }

  onClickSaveUser = async () => {
    const { nameUser } = this.state;
    console.log('oi');
    this.setState({ loading: true });
    await createUser({ name: nameUser });
    this.setState({ loading: false, redirect: true });
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
    const { redirect, loading } = this.state;

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              { ...this.state }
              handleChange={ this.handleChange }
              onClickSaveUser={ this.onClickSaveUser }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
        <div>
          { redirect && <Redirect to="/search" /> }
          { loading && <Loading /> }
        </div>
      </div>
    );
  }
}

export default App;
