export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

// Used in both App.js and Editor.js
export function convertCategoriesToArray(categories) {
  const categoryArray = Object.keys(categories).map(key => (
    {path:key,name:categories[key]}
  ))
  return categoryArray
}

// https://stackoverflow.com/a/105074/7602403
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function sortByDateDescending(a,b) {
  return sortByDate(a,b,false)
}

export function sortByDateAscending(a,b) {
  return sortByDate(a,b,true)
}

function sortByDate(a,b,ascending) {
  if((a.timestamp < b.timestamp) ^ ascending) return 1
  if(a.timestamp === b.timestamp) return 0
  if((a.timestamp > b.timestamp) ^ ascending) return -1
}

export function sortByVotesDescending(a,b) {
  return sortByVotes(a,b,false)
}

export function sortByVotesAscending(a,b) {
  return sortByVotes(a,b,true)
}

function sortByVotes(a,b,ascending) {
  if((a.voteScore < b.voteScore) ^ ascending) return 1
  if(a.voteScore === b.voteScore) return 0
  if((a.voteScore > b.voteScore) ^ ascending) return -1
}
