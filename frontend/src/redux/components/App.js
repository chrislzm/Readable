/*
  Readable: App.js
  By Chris Leung

  Description:

  React component that controls the UI of the application. Shows the site title
  and a navigation bar at the top of every page. Uses React Router to
  display the correct page (component) to the user based on the current URL.

  Props:
    Redux Store State (mapped to props)

*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import * as Constants from '../../utils/constants'
import * as BackendAPI from '../../utils/api'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
import AddPost from './AddPost'
import Edit from './Edit'
import ListPosts from './ListPosts'
import NavigationBar from './NavigationBar'
import ViewPost from './ViewPost'
import '../../style/App.css'
import '../../style/divTable.css'

class App extends Component {

  componentDidMount() {
    BackendAPI.getCategories().then(categories => {
      for(const category of categories) {
        const {name, path} = category
        this.props.dispatch(ReduxStoreActions.addNewCategory(name,path))
      }
    })
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
          <h2>{Constants.SITE_TITLE}</h2>
        </div>
        <NavigationBar categories={categories}/>
        { categories.map(category => (
          <Route
            exact path={`/${category.path}`}
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
            exact path={`/${category.path}/:postId`}
            key={category.path}
            component={ViewPost}
          />
        ))}
        <Route
          exact path={`/${Constants.PATH_ADD_POST}`}
          component={AddPost}
        />
        <Route
          exact path={`/${Constants.PATH_EDIT}/:postId/:commentId?`}
          component={Edit}
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  categories: Helpers.convertCategoriesToArray(store.categories)
})

export default withRouter(connect(mapStateToProps)(App));
