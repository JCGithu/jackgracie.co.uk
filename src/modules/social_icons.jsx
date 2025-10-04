import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function socialList(props) {
  return (
    <div className={`social-list ${props.colour}`}>
      <a href="https://twitter.com/JackCGracie">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://www.youtube.com/channel/UCgAoRZj4dO8CXcT3O_WOXnQ">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a href="https://www.instagram.com/jack.c.gracie/">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://www.linkedin.com/in/jack-gracie-b177b791/">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </div>
  );
}
