import React, { PropTypes, Component } from 'react';
import Actions from "../actions.js";
import { Button } from 'react-bootstrap';

import { Messages } from 'meteor/nova:core';

class NewsletterButton extends Component {
  constructor(props) {
    super(props);
    this.subscriptionAction = this.subscriptionAction.bind(this);
  }
  
  subscriptionAction() {
    const action = Users.getSetting(this.props.user, 'newsletter_subscribeToNewsletter', false) ? 
      'newsletter.removeUser' : 'newsletter.addUser';

    Actions.call(action, this.props.user, (error, result) => {
      if (error) {
        console.log(error);
        Messages.flash(error.message, "error");
      } else {
        this.props.successCallback(result);
      }
    });
  }

  render() {
    const isSubscribed = Users.getSetting(this.props.user, 'newsletter_subscribeToNewsletter', false);

    return (
      <Button
        className="newsletter-button"
        onClick={this.subscriptionAction}
        bsStyle="primary"
      >
        {isSubscribed ? this.props.unsubscribeText : this.props.subscribeText}
      </Button>
    )
  }
}

NewsletterButton.propTypes = {
  user: React.PropTypes.object.isRequired,
  successCallback: React.PropTypes.func.isRequired,
  subscribeText: React.PropTypes.string,
  unsubscribeText: React.PropTypes.string
};

NewsletterButton.defaultProps = {
  subscribeText: "Subscribe",
  unsubscribeText: "Unsubscribe"
};

module.exports = NewsletterButton;
export default NewsletterButton;