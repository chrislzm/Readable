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
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h2>Categories</h2>
        <ul>
          <li><Link to="/">All</Link></li>
          { this.props.categories && this.props.categories.map( category => (
            <li><Link to={category.path} >{capitalize(category.name)}</Link></li>
          )) }
        </ul>
        <Route path='/' component={ListPosts}/>
        <Route path='/:category' component={ListPosts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(App));
