import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("apple");
  const [text, setText] = useState("");
  const [title, setTitle] = useState([]);
  // const [isLoading, setIsLoading] = useState(true); // loading state
  const apiURL = `https://newsapi.org/v2/everything?q=${query}&from=2022-06-10&to=2022-06-10&sortBy=popularity&apiKey=b331c3a819564569a5ba6bd1b300efe1`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiURL}`);
      // const data = res.json();

      setPosts(res.data.articles);
      res.data.articles.length = 5;
      console.log(" data retrieved", res.data.articles);
      setTitle(res.data.articles[0]);
    };
    getData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    setText("");
  };

  return (
    <div className="main-div">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          typeof="text"
          name="search"
          id="search"
          placeholder="Search for news"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button>Search</button>
      </form>

      <div className="title">
        <h1>{title.title}</h1>
        <a href={title.url} target="_blank" rel="noopener noreferrer">
          Read whole article
        </a>
      </div>

      <div className="news">
        {(posts || []).map((p) => (
          <post key={p.id} post={p} />
        ))}
        {posts &&
          posts.map((item, index) => {
            return (
              <div key={index} className="cards">
                <h2>{item.title}</h2>
                <img src={item.urlToImage} alt="" />
                <ul>
                  <li>By {item.author}</li>
                  <li>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Whole Article
                    </a>
                  </li>
                </ul>
                <p>
                  Date: {format(new Date(item.publishedAt), "dd MMMM yyyy")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
