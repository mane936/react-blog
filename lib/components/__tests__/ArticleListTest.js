import React from 'react';
import ArticleList from '../ArticleList';

// import renderer from 'react-test-renderer'; // We don't use this anymore because of the following explanation.
import { shallow } from 'enzyme';

/* When using Context API it brought us a problem:
Now our jest tests fail, since the whole integrated tree is rendered, including the child of ArticleList.
To solve it we can use Shallow Rendering, that will assume that where Article should go, it's going to go
*/
describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: { id: 'a'},
      b: { id: 'b'},
    },
  };

    // This doesn't work anymore since Context API
  //   store: {
  //     lookupAuthor: jest.fn(()=> ({})) // fake jest function that returns a fake object
  //   }
  // };

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );
    // expect(wrapper.node.props.children.length).toBe(2); is the same as saying the following:
    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
    // If anything changes on the ArticleList component or its children, the snapshot will fail.
  });
});
