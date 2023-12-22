import { useState } from "react";
import "./index.css";

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const fetchImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=_-3c9DmqjLkglthRIse_XRCzccJVHVOaYmPWPkf6KRw&query=${value}&per_page=40`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
      });
  };

  return (
    <>
      <div className="container">
        <span className="span">Search</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="button" onClick={() => fetchImages()}>
          Send
        </button>
      </div>
        {
          <div className="images">
            {results.map((item) => {
              return (
                <img src={item.urls.regular}  />
              );
            })}
          </div>
        }
    </>
  );
}

export default App;

//_-3c9DmqjLkglthRIse_XRCzccJVHVOaYmPWPkf6KRw
