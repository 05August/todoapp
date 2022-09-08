
const Header=()=>{
  return <div className="header">
    <div className="new-task">
      <div className="btn-new-task">Create New Task</div>
    </div>
    <div className="search-task">
      <input type="text" placeholder="Type something to search" name="searchInput" id="search-input"/>
      <label for="searchInput">Search</label>
    </div>
  </div>
}

export default Header;