import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';
// Very important to place styles object outside the component (Global), because if not React will render Styles each time it renders the component.

// So basically, every part of the component we want only to be rendered ONCE, we should place it outside.

// The reason it's okay to make it global it's because it doesn't depend on anything in particular of the Article component.

// We are looking for a presentational direction. So we do that by extracting functionalities and setting them to different entities.
const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.8em',
    color: '#888',
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 20,
  }
};

const dateDisplay = (dateString) =>
  new Date(dateString).toDateString();


class Article extends PureComponent {

  render() {
    const { article, author } = this.props;
    return(
      <div style={styles.article}>
        <div style={styles.title}>{article.title}</div>
        <div style={styles.date}>
          {dateDisplay(article.date)}
        </div>
        <div style={styles.author}>
          <a href={author.website}>{author.firstName} {author.lastName}
          </a>
        </div>
        <div style={styles.body}>{article.body}</div>
      </div>
    );
  }

}
// for more typecheking features we can use FlowType (by FB) and it's for all the javascript, not only react
Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};

const extraProps = (store, originalProps) => {
  return {
    author: store.lookupAuthor(originalProps.article.authorId),
  };
};

// We need somehow to simplify the testing process, and context variables (from Context API) put difficulties on it, That's why we need to set up a Container in order to extract the store context varaible and pass it as a prop to the Article component. For this we use a Higher Order Component.

export default storeProvider(extraProps)(Article);
