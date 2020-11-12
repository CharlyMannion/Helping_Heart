import React, { Component } from 'react';
import {Link} from '@reach/router'
import ErrorContainer from "../styledComponents/ErrorContainer"
import ErrorSpan from "../styledComponents/ErrorSpan"

class ErrorDisplay extends Component {
  render() {
    return (
      <ErrorContainer>
        <ErrorSpan>Oops! It looks like this page does not exist!</ErrorSpan>
        <Link to='/'>
          <ErrorSpan>Please click here to return home safely!</ErrorSpan>
        </Link>
      </ErrorContainer>
    );
  }
}

export default ErrorDisplay;