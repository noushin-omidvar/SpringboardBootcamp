const App = () => {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="YourNameHEre" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
