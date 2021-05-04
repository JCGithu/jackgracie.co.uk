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
        I haven't made this page yet.
      </p>
    </main>
  );
};

export default NotFoundPage;
