import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import '../../style/App.css'
import * as BackendAPI from '../../utils/api'
import { addNewPost, addNewCategory } from '../actions'
import { capitalize, convertCategoriesToArray } from '../../utils/helpers'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import * as Constants from '../../constants'

class App extends Component {

  componentDidMount() {
    BackendAPI.getCategories().then(categories => {
      for(const category of categories) {
        const {path, name} = category
        this.props.dispatch(addNewCategory(path,name))
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
    let categories = [{path:Constants.DEFAULT_CATEGORY_PATH,name:Constants.DEFAULT_CATEGORY_NAME}]
    // If categories have been loaded from store
    if(this.props.categories) {
      categories = [...categories,...this.props.categories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Online Forum</h2>
        </div>
        <h2>Categories</h2>
        <ul>
          { categories.map( category => (
            <li key={category.path}><Link to={'/' + category.path}>{capitalize(category.name)}</Link></li>
          )) }
        </ul>
        { categories.map(category => (
          <Route exact path={'/' + category.path} key={category.path} render={() =>(
            <ListPosts
              categoryPath={category.path}
              categoryName={category.name}
            />
          )}/>
        ))}
        <Route path='/createPost/:categoryPath?' component={CreatePost}/>
      </div>
    );
  }
}

const mapStateToProps = (store) => (convertCategoriesToArray(store.categories))

export default withRouter(connect(mapStateToProps)(App));
