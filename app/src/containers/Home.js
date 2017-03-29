import React from 'react';
import { connect } from 'react-redux';
import PublicHome from '../components/PublicHome';
import PrivateHome from '../components/PrivateHome';

class Home extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <PrivateHome />
    }
    return <PublicHome />
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated
})

Home = connect(
  mapStateToProps
)(Home)

export default Home;
