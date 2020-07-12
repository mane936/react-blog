import StateApi from 'state-api';
// /\ this package we created it.
// we'll push our project to deploy without this package state-api
// and things will work normaly because we'll have uploaded the package to npm
// ofcourse before upload the pacakge to node we'll need to trapile it with buble,
// because it's a bad idea to upload packages that use features that node still don't
import { data } from '../testData';

const store = new StateApi(data);


// Data testing with JEST

describe('DataApi', () =>{
  it('exposes articles as an object', () => {
    const articles = store.getState().articles;
    const articleId = data.articles[0].id;
    const articleTitle = data.articles[0].title;

    expect(articles).toHaveProperty(articleId);
    expect(articles[articleId].title).toBe(articleTitle);
  });
  it('exposes authors as an object', () => {
    const authors = store.getState().authors;
    const authorId = data.authors[0].id;
    const authorFirstName = data.authors[0].firstName;

    expect(authors).toHaveProperty(authorId);
    expect(authors[authorId].firstName).toBe(authorFirstName);

  });
});
