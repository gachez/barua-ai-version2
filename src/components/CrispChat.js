import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount () {
    Crisp.configure("MY_CRISP_WEBSITE_ID");
  }

  render () {
    return null;
  }
}
export default CrispChat