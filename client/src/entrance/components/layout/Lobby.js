/*
**  Author: Jit (Sarbojit Mukherjee)
**  Desc:   Provies entrance to all sub-modules, or offices in the Baanda building.
**          
**  Date:   Julye 9, 2018
**  Version:0.01
*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Lobby extends Component {
  componentDidMount() {
    // console.log(
    //   'this.props.auth.isAuthenticated:' + this.props.auth.isAuthenticated
    // );
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      //console.log('render, NOT or !isAuthenticated in Navbar');
      return <Redirect to="/login" />;
    }
    return (
      <div className="lobby">
        <div className="lobbyheader">
          <div className="row text-center text_blue">
            <div className="col-12">
              <div className="headerpic">
                <span className="align-baseline-middle">
                  <h1>Earth Lobby</h1>
                </span>
                <span className="align-baseline-middle">
                  <h4>For a future society</h4>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lobby.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Lobby);
