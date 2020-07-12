import React from 'react';

// Very important to place styles object outside the component (Global), because if not React will render Styles each time it renders the component.

// So basically, every part of the component we want only to be rendered ONCE, we should place it outside.

// The reason it's okay to make it global it's because it doesn't depend on anything in particular of the Article component.
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

const Article = (props) => {
  const { article, store } = props;
  const author = store.lookupAuthor(article.authorId);
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

};

export default Article;
