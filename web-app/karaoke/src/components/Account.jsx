import React, { Component } from 'react';

class Account extends Component {
  componentDidMount() {
    console.log('Account component rendered');
  }

  render() {
    return (
      <>This is the account page. </>
    );
  }
}

export default Account;
