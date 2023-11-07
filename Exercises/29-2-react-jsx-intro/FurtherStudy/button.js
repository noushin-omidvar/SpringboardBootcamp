function Button(props) {
  return (
    <button type="button" className={`btn btn-${props.variant}`}>
      {props.children}
    </button>
  );
}
