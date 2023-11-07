const Person = (props) => {
  const announcement = props.age > 18 ? "Please go vote!" : "You must be 18";
  const Name = props.name.length > 8 ? props.name.slice(0, 6) : props.name;
  return (
    <div>
      <h2>{Name}</h2>
      <p> Learn some information about this person </p>
      <h3> {announcement} </h3>
      <b>Hobbies:</b>
      <ul>
        {props.hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};
