import React from 'react'
import { Link } from 'react-router-dom'

const ListPosts = (props) => {
  let {category} = props.match.params
  if(!category) {
    category = "All Posts"
  }

  console.log("Category:" + category)
  return(
    <div className="list-posts">
      <h2>{category}</h2>
      <div className="list-posts-title">
        Post Title
      </div>
      <div className="list-books-date">
        Date
      </div>
      <div className="list-posts-votes">
        Votes
      </div>
    </div>
  )
};

export default ListPosts
