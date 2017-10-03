import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import '../../style/App.css'
import '../../style/divTable.css'
import * as BackendAPI from '../../utils/api'
import { addNewPost, addNewCategory } from '../actions'
import { convertCategoriesToArray } from '../../utils/helpers'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'
import * as Constants from '../../constants'
import CategoryBar from './CategoryBar'
import EditPost from './EditPost'

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
            />
          )}/>
        ))}
        { categories.map(category => (
          <Route exact path={`/${category.path}/:postId`} key={category.path} component={ViewPost}/>
        ))}
        <Route exact path={`/${Constants.CREATE_POST_PATH}`} component={CreatePost}/>
        <Route exact path={`/${Constants.EDIT_POST_PATH}/:postId`} component={EditPost}/>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  categories: convertCategoriesToArray(store.categories)
})

export default withRouter(connect(mapStateToProps)(App));
