function FilterButton(props) {
    return (
      <button 
        type="button" 
        className="btn toggle-btn" 
        aria-pressed={props.isPressed}
        onClick={() => {
          console.log("Button clicked:", props.name);
          // console.log("Current filter objects:", props.filter_name);
          props.setFilter(props.name);
        }}
      >
        <span className="visually-hidden">Show </span>
        <span>{props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
  
  export default FilterButton;
  