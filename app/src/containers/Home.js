import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PublicHome from '../components/public/Home';

class Home extends React.Component {
  render() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/home"/>
    }
    return <PublicHome history={history} />
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated
})

Home = connect(
  mapStateToProps
)(Home)

export default Home;
