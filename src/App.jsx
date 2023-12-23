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

  const handleDownload = async (imageUrl, index) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Save the image blob to local storage
      const fileName = `image_${index}.jpg`;
      localStorage.setItem(fileName, JSON.stringify(blob));

      // Create a link to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
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
        <button className="button" onClick={fetchImages}>
          Send
        </button>
      </div>
      <div className="images">
        {results.map((item, index) => (
          <div className="output" key={index}>
            <img src={item.urls.regular} alt={`Images${index}`} />
            <button
              className="download-button"
              onClick={() => handleDownload(item.urls.regular, index)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
