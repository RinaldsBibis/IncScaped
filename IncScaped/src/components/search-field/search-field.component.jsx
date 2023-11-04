
import './search-field.styles.scss';

function SearchInputComponent({ value, onChange, name, placeholder}) {
    return (
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
      </div>
    );
  }
  
  export default SearchInputComponent;