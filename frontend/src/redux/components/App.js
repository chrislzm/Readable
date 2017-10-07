import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import * as Constants from '../../utils/constants'
import * as BackendAPI from '../../utils/api'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
import AddPost from './AddPost'
import CategoryBar from './CategoryBar'
import Edit from './Edit'
import ListPosts from './ListPosts'
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
    // Setup categories with default category that shows all posts
    let categories = [{path:Constants.ALL_POSTS_CATEGORY_PATH,name:Constants.ALL_POSTS_CATEGORY_NAME}]
    // If categories have been loaded from store
    if(this.props.categories) {
      categories = [...categories,...this.props.categories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>{Constants.SITE_TITLE}</h2>
        </div>
        <CategoryBar categories={categories}/>
        { categories.map(category => (
          <Route exact path={`/${category.path}`} key={category.path} render={() =>(
            <ListPosts
              categoryName={category.name}
              categoryPath={category.path}
            />
          )}/>
        ))}
        { categories.map(category => (
          <Route exact path={`/${category.path}/:postId`} key={category.path} component={ViewPost}/>
        ))}
        <Route exact path={`/${Constants.ADD_POST_PATH}`} component={AddPost}/>
        <Route exact path={`/${Constants.EDIT_PATH}/:postId/:commentId?`} component={Edit}/>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  categories: Helpers.convertCategoriesToArray(store.categories)
})

export default withRouter(connect(mapStateToProps)(App));
