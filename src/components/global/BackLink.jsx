import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default function BackLink(props) {
  return (
    <Link to={props.to} title={props.title} {...props} className="icon-back-link">
      <KeyboardBackspaceIcon fontSize="inherit" />
    </Link>
  )
}
