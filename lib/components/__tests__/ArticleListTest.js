import React from 'react';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: { id: 'a'},
      b: { id: 'b'},
    },
    store: {
      lookupAuthor: jest.fn(()=> ({})) // fake jest function that returns a fake object
    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <ArticleList
        {...testProps}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    // If anything changes on the ArticleList component or its children, the snapshot will fail.
  });
});
