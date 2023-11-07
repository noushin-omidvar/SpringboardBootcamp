function Alert(props) {
  return (
    <div className={`alert alert-${props.variant}`} role="alert">
      {props.children}
    </div>
  );
}
