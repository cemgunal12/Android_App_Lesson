
function StudentControls({
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
}) {
  const handleSortToggle = () => {
    setSortBy(sortBy === 'high-low' ? 'low-high' : 'high-low');
  };

  return (
    <div className="controls">
      {/* (Search) */}
      <input
        type="text"
        className="input search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* (Filter) */}
      <div className="filters">
        <button
          className={`filter-btn ${filterBy === 'all' ? 'active' : ''}`}
          onClick={() => setFilterBy('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filterBy === 'pass' ? 'active' : ''}`}
          onClick={() => setFilterBy('pass')}
        >
          Pass
        </button>
        <button
          className={`filter-btn ${filterBy === 'fail' ? 'active' : ''}`}
          onClick={() => setFilterBy('fail')}
        >
          Fail
        </button>
      </div>

      {/* (Sort) */}
      <button className="btn sort-btn" onClick={handleSortToggle}>
        {}
        Sort: {sortBy === 'high-low' ? 'High → Low' : 'Low → High'}
      </button>
    </div>
  );
}

export default StudentControls;