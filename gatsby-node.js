exports.createPages = async ({ graphql, actions: { createRedirect, createPage } }) => {
  let data = await graphql(`
    {
      dataJson {
        redirects {
          slug
          URL
        }
        additionalPages {
          path
          component
        }
      }
      allPageDataJson {
        edges {
          node {
            name
            path
          }
        }
      }
    }
  `);

  if (data.errors) {
    console.log('Error with data', data.errors);
    return;
  }

  let structure = data.data.dataJson;
  let subpages = data.data.allPageDataJson;

  const redirectTemplate = require.resolve('./src/templates/Redirect.jsx');
  const subpageTemplate = require.resolve('./src/pages/subpage.jsx');

  structure.redirects.forEach((redirection) => {
    createRedirect({
      force: true,
      redirectInBrowser: true,
      toPath: `${redirection.URL}`,
      fromPath: `${redirection.slug}`,
    });
    createPage({
      path: `${redirection.slug}`,
      component: redirectTemplate,
      context: {
        slug: redirection.slug,
      },
    });
  });

  structure.additionalPages.forEach((bonusPage) => {
    createPage({
      path: `${bonusPage.path}`,
      component: require.resolve(bonusPage.component),
    });
  });

  subpages.edges.forEach((subpage) => {
    createPage({
      path: subpage.node.path,
      component: subpageTemplate,
      context: {
        name: subpage.node.name,
      },
    });
  });
};
