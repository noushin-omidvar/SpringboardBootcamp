const Tweet = (props) => {
  return (
    <div>
      <p> {props.message}</p>
      <span>{props.name}</span>
      <span> {props.username}</span>
      <span> {props.date}</span>
    </div>
  );
};
