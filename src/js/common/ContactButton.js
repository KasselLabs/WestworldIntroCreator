import React from 'react';

const ContactButton = ({ customText = 'If you have any questions, please check our FAQ or contact us through the link:' }) => {
  const link = (
    <a
      href="https://help.kassellabs.io/westworld/"
      rel="noopener noreferrer"
      target="_blank"
      className="link"
    >
      FAQ and Contact
    </a>
  );

  if (customText) {
    return (
      <p>
        {customText}{' '}
        {link}
      </p>
    );
  }

  return link;
};

export default ContactButton;
