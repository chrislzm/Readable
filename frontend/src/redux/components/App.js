import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import '../../style/App.css'
import '../../style/divTable.css'
import * as BackendAPI from '../../utils/api'
import { addNewPost, addNewCategory } from '../actions'
import { convertCategoriesToArray } from '../../utils/helpers'
import * as Constants from '../../utils/constants'
import ListPosts from './ListPosts'
import AddPost from './AddPost'
import ViewPost from './ViewPost'
import CategoryBar from './CategoryBar'
import Edit from './Edit'

class App extends Component {

  componentDidMount() {
    BackendAPI.getCategories().then(categories => {
      for(const category of categories) {
        const {name, path} = category
        this.props.dispatch(addNewCategory(name,path))
      }
    })
    BackendAPI.getAllPosts().then(posts => {
      for(const post of posts) {
        const {id,...content} = post
        this.props.dispatch(addNewPost(id,content))
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
        <Route exact path={`/${Constants.EDIT_PATH}/:postId`} component={Edit}/>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  categories: convertCategoriesToArray(store.categories)
})

export default withRouter(connect(mapStateToProps)(App));
