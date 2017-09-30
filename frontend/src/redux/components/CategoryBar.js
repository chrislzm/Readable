import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const CategoryBar = (props) => {
  const { categories, currentCategory } = props
  console.log(currentCategory)
  return (
    <ul className="CategoryBar">
      { categories.map( category => {
        const liClassName = category.path === currentCategory.path ? "CurrentCategory" : "OtherCategory"
        return (

        <li key={category.path} className={liClassName}><Link to={'/' + category.path}>{category.name}</Link></li>
      )}) }
    </ul>
  )
};

const mapStateToProps = (store) => ({
  currentCategory:store.currentCategory
})

export default connect(mapStateToProps)(CategoryBar)
