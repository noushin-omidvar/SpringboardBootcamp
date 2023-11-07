function Card(props) {
  return (
    <div className="card">
      <img src={props.imageUrl} className="card-img-top" alt={props.imageAlt} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.children}</p>
      </div>
    </div>
  );
}
