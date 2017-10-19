/*
  Readable: components/NavigationBar.js
  By Chris Leung

  Description:

  Stateless functional React component that displays the navigation bar for the
  Readable app. Lists category names that hyperlink to each category. Gets the
  current category from the Redux store and highlights it using CSS classes.

  Props:
    categories: <Array> Required. An array of objects that have two
      properties:
        path: <String> Category path
        name: <String> Category name
    currentCategory: <Redux State> Required.
*/

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavigationBar(props) {
  const { categories, currentCategory } = props
  return (
    <ul className="CategoryBar">
      { categories.map( category => {
        const liClassName = category.path === currentCategory.path ? "CurrentCategory" : "OtherCategory"
        return (
          <li
            key={category.path}
            className={liClassName}>
            <Link
              to={'/' + category.path}>
              {category.name}
            </Link>
          </li>
        )
      }) }
    </ul>
  )
}

NavigationBar.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.object.isRequired
}

const mapStateToProps = (store) => ({
  currentCategory:store.currentCategory
})

export default connect(mapStateToProps)(NavigationBar)
