import React from 'react';

import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    nameUserPrinted: '',
    printUser: false,
    loading: true,
  }

  async componentDidMount() {
    const { nameUserPrinted } = this.state;
    const response = await getUser(nameUserPrinted);
    this.setState({
      nameUserPrinted: response.name,
      printUser: true,
      loading: false,
    });
  }

  render() {
    const { nameUserPrinted, printUser, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div data-testid="header-user-name">
          { loading && <Loading /> }
          { printUser && nameUserPrinted }
        </div>
        <h1>Search</h1>
      </div>
    );
  }
}

export default Search;
