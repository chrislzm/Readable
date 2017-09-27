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
    let categories = [{path:Constants.DEFAULT_CATEGORY_PATH,name:Constants.DEFAULT_CATEGORY_NAME}]
    if(this.props.categories) {
      // Add forward slash to all paths so React Router can match the path exactly
      const storeCategories = this.props.categories.map(category => {
        return {path:'/' + category.path,name: category.name}
      })
      categories = [...categories,...storeCategories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Online Forum</h2>
        </div>
        <h2>Categories</h2>
        <ul>
          { categories.map( category => (
            <li key={category.path}><Link to={category.path}>{capitalize(category.name)}</Link></li>
          )) }
        </ul>
        { categories.map(category => (
          <Route exact path={category.path} key={category.path} render={() =>(
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

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(App));
