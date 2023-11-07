const tweets = [
  {
    name: "John Doe",
    username: "@johndoe",
    date: "2 hours ago",
    message: "This is my first tweet!",
  },
  {
    name: "Jane Smith",
    username: "@janesmith",
    date: "1 hour ago",
    message: "Hello Twitter!",
  },
  {
    name: "Alice Johnson",
    username: "@alicej",
    date: "30 minutes ago",
    message: "Tweeting away!",
  },
];

const persons = [
  { name: "Jane", age: 16, hobbies: ["swimming", "chess"] },
  { name: "John", age: 22, hobbies: ["soccer", "pingpong", "anime"] },
];
function App() {
  return (
    <div>
      <div>
        {persons.map((person) => (
          <Person
            name={person.name}
            age={person.age}
            hobbies={person.hobbies}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
