import "./CategoryFilter.css";

function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-filter__btn ${active === cat ? "category-filter__btn--active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
