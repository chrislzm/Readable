import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import '../../style/App.css'
import * as BackendAPI from '../../utils/api'
import { setCategories } from '../actions'
import { capitalize } from '../../utils/helpers'
import ListPosts from './ListPosts'
class App extends Component {

  componentDidMount() {
    BackendAPI.getCategories().then(categories => this.props.dispatch(setCategories(categories)))
  }

  render() {
    const listPostsURLPaths = ['/','/:category']
    let categoryNamesAndPaths = [{path:'/',name:'All'}]
    if(this.props.categories) {
      categoryNamesAndPaths = [...categoryNamesAndPaths,...this.props.categories]
    }

    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h2>Categories</h2>
        <ul>
          { categoryNamesAndPaths.map( category => (
            <li><Link to={category.path} >{capitalize(category.name)}</Link></li>
          )) }
        </ul>
        { listPostsURLPaths.map(path => (
          <Route exact path={path} component={ListPosts}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(App));
