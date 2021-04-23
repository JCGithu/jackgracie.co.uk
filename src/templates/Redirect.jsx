import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query redirectQuery($slug: String!) {
    dataJson(redirects: { elemMatch: { slug: { eq: $slug } } }) {
      redirects {
        URL
        slug
      }
    }
  }
`;

const Redirect = ({ data }) => {
  const redirect = data.dataJson.redirects[0];
  console.log(data);

  return (
    <div className="redirect">
      <p>Redirecting!</p>
      <p>{redirect.URL}</p>
    </div>
  );
};
export default Redirect;
