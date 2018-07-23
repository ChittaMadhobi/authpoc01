import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid">
        <nav className="navbar fixed-bottom navbar-expand-sm bg-dark navbar-dark justify-content-center text-light">
          Copyright &copy; {new Date().getFullYear()} Baanda &nbsp;{' '}
        </nav>
      </footer>
    );
  }
  z;
}

export default Footer;
