import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import '../../style/App.css'
import * as BackendAPI from '../../utils/api'
import { setCategories } from '../actions'
import { capitalize } from '../../utils/helpers'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import * as Constants from '../../constants'

class App extends Component {

  componentDidMount() {
    BackendAPI.getCategories().then(categories => this.props.dispatch(setCategories(categories)))
    BackendAPI.getAllPosts().then(posts => console.log(posts))
  }

  render() {
    const listPostsURLPaths = ['/','/:categoryPath']
    let categoryNamesAndPaths = [{path:Constants.DEFAULT_CATEGORY_PATH,name:Constants.DEFAULT_CATEGORY_NAME}]
    if(this.props.categories) {
      categoryNamesAndPaths = [...categoryNamesAndPaths,...this.props.categories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Online Forum</h2>
        </div>
        <h2>Categories</h2>
        <ul>
          { categoryNamesAndPaths.map( category => (
            <li key={category.path}><Link to={category.path}>{capitalize(category.name)}</Link></li>
          )) }
        </ul>
        { listPostsURLPaths.map(path => (
          <Route exact path={path} component={ListPosts} key={path}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(App));
