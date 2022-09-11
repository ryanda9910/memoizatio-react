import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MemoChildren } from "./Children";

function App() {
  const getData = useRef(() => {});
  const [timeLeft, setTimeLeft] = useState(10000000);
  const [dataJoke, setDataJoke] = useState(null);
  const [renderTime, setRenderTime] = useState(0);

  const onSubmit = () => {
    getData.current();
  };

  getData.current = async () => {
    try {
      const { data } = await axios.get(
        "https://v2.jokeapi.dev/joke/Any?idRange=0-55"
      );
      setDataJoke(JSON.stringify(data.id));
    } catch (error) {
      console.error("error", error);
    }
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getData.current();
  }, []);

  console.log("parent", renderTime);

  return (
    <div className="App">
      <h1>Hello World </h1>
      <button onClick={() => setRenderTime((prev) => prev + 1)}>
        RE-RENDER APP
      </button>
      <h1>{timeLeft}</h1>
      <MemoChildren onClick={onSubmit} data={dataJoke} />
    </div>
  );
}

export default App;
