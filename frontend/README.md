# Readable Front-End Server

To install and start the front-end server, run the following commands in this directory:

* `npm install`
* `npm start`

After running "npm start", a web browser will open the address http://localhost:3000/ where the application will launch.

## Features

This application provides all the basic features of an online forum. In addition, the following has been implemented:
* Auto-Select Category: When adding a new post, the current category you are viewing will be pre-selected as the category for the new post
* Category Navigation Bar: All available categories are listed in the navigation bar and are clickable. The current category is highlighted in purple.
* Sort Field and Order: Clicking on the "Date" or "Votes" column header in category view will sort by those fields. To change the sort direction, click the current sort field column. The arrow direction will change to indicate ascending or descending sort order.

## Usage Notes

The default sort method for both posts and comments is by number of votes in descending order. This application is anonymous, with no authentication or authorization. Comments and posts accept any username/name for creation and editing.

## Developer Reference

### Category Object

Readable stores the categories in the Redux store in the "categories" object, where each property key is a category name, and the value of that key is the URL path to that category.

Please note that the category value of posts should match the category name and NOT the category path. Category names are case insensitive, but should preferably be all lowercased.

### Post Objects

Readable posts objects contain the following properties. In the Redux store, the unique id is used as the key, and the value is an object that hold the rest of the attributes below:

| Attribute |	Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| id        | String  | Unique identifier                                |
| timestamp | Integer | Time created (Unix time)                         |
| title     | String  | Post title                                       |
| body      | String  | Post body                                        |
| author    | String  | Post author                                      |
| category  | String  | A category provided by the server                |
| voteScore | Integer | Votes the post has received (default: 1)         |
| deleted   | Boolean | Flag if post has been 'deleted' (default: false) |

### Comment Objects

Readable comment objects contain the following properties. In the Redux store, the unique parentId is used as the key, and the value is an object that holds all of the comments as separate properties -- each property uses the unique comment id as the key, and the value is the content of the comment, which contains the rest of the attributes below:

| Attribute |	Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| id        | String  | Unique identifier                                |
| parentId  | String  | id of the parent post                            |
| timestamp | Integer | Time created (Unix time)                         |
| body      | String  | Comment body                                     |
| author    | String  | Comment author                                   |
| voteScore | Integer | Votes the comment has received (default: 1)      |
| deleted   | Boolean | Flag if comment has been 'deleted'               |
| deleted   | Boolean | Flag if parent post 'deleted' but comment is not |
