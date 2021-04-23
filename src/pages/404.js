import * as React from 'react';

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: 'Poppins',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: '2rem',
  maxWidth: 320,
};

const paragraphStyles = {};

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry{' '}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{' '}
        we couldn’t find what you were looking for.
      </p>
    </main>
  );
};

export default NotFoundPage;
