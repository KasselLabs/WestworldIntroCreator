import React, { Component } from 'react';

import kasselLogo from '../../assets/img/KasselLabsLogo.png';

class NavBar extends Component {
  state = {
    showMenu: false,
  };

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    const { showMenu } = this.state;

    const menu = (
      <ul className="menu">
        <li><a href="/#/donate">DONATE</a></li>
        <li><a href="mailto:kassellabs+westworld@gmail.com">CONTACT</a></li>
        <li>
          <a>ABOUT</a>
          <ul className="dropdown">
            <li><a href="https://kassellabs.io/TermsOfService/WestWorldIntroCreator.html">FAQ</a></li>
            <li><a href="https://kassellabs.io/TermsOfService/WestWorldIntroCreator.html">TERMS OF SERVICE</a></li>
          </ul>
        </li>
        <li><a href="http://kassellabs.io">MORE APPS</a></li>
      </ul>);

    return (
      <nav className="navBar">
        <div className="content">
          <div className="kasselLogo">
            <a href="https://kassellabs.io">
              <img src={kasselLogo} alt="Kassel Labs" height="20" />
            </a>
          </div>
          <label htmlFor="show-menu" className="show-menu">
            <span />
            <span />
            <span />
            <input onChange={this._toggleMenu} type="checkbox" id="show-menu" role="button" />
          </label>
          {menu}
        </div>
        {showMenu && menu}
      </nav>
    );
  }
}

export default NavBar;
