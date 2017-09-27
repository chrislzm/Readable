import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../style/App.css'
import * as ServerAPI from '../../api/ServerAPI'
import { setCategories } from '../actions'

class App extends Component {

  componentDidMount() {
    ServerAPI.getCategories().then(categories => this.props.dispatch(setCategories(categories)))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul>
          { this.props.categories && this.props.categories.map( category => (
            <li>{category.name}</li>
          )) }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(App);
