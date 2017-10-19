/*
  Readable: App.js
  By Chris Leung

  Description:

  React component that controls the UI of the application. Shows the site title
  and a navigation bar at the top of every page. Uses React Router to
  display the correct page (component) to the user based on the current URL.

  Props:
    categories: <Redux State> Required. Use convertCategoriesToArray in
      helpers.js to convert state object to an array for convenience.
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as CategoryActions from '../actions/categoryActions'
import AddPost from './AddPost'
import Edit from './Edit'
import ListPosts from './ListPosts'
import NavigationBar from './NavigationBar'
import ViewPost from './ViewPost'
import '../../style/App.css'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.dispatch(CategoryActions.fetchCategories())
  }

  render() {
    // Add default category to array of categories that shows all posts
    let categories = [{path:Constants.DEFAULT_CATEGORY_PATH,name:Constants.DEFAULT_CATEGORY_NAME}]
    // If categories have been loaded from Redux Store, add them
    if(this.props.categories) {
      categories = [...categories,...this.props.categories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>
            {Constants.SITE_TITLE}
          </h2>
        </div>
        <NavigationBar
          categories={categories}
        />
        <div className="Content">
          { categories.map(category => (
            <Route
              exact
              path={`/${category.path}`}
              key={category.path}
              render={() =>(
                <ListPosts
                  categoryName={category.name}
                  categoryPath={category.path}
                />
              )}
            />
          ))}
          { categories.map(category => (
            <Route
              exact
              path={`/${category.path}/:postId`}
              key={category.path}
              component={ViewPost}
            />
          ))}
          <Route
            exact
            path={`/${Constants.PATH_ADD_POST}`}
            component={AddPost}
          />
          <Route
            exact
            path={`/${Constants.PATH_EDIT}/:postId/:commentId?`}
            component={Edit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  categories: Helpers.convertCategoriesToArray(store.categories)
})

export default withRouter(connect(mapStateToProps)(App));
