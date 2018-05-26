import React, { Component } from 'react';
import PropTypes from "prop-types";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

class App extends Component {

  static propTypes = {
    socialMedia: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired
    })).isRequired
  };

  render() {
    return (
      <div>
        <Header isCollapsed={false} />
        <Footer fixed={true} socialMedia={this.props.socialMedia}/>
      </div>
    );
  }
}

export default App;
