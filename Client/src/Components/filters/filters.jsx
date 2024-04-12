function Filters({ filters }) {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  }

  return (
    <>
      <div className="filter-container">
        {filters.map((filter) => (
          <div>
            {filter.label && (
              <label>{filter.label}</label>
            )}
            <select className="filter-select" name={filter.name} onChange={(e) => filter.onChange(e.target.value)}>
              <option hidden="true" className="filter-option">
                {filter.title}
              </option>
              {filter.options.map((option) => (
                <option className="filter-option" key={option.key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}

export default Filters;
