import NavBar from './components/NavBar'
import GifContainer from './components/GifContainer'
import GifSearch from './components/GifSearch'
import { handleFetch } from './utils';
import { useState, useEffect } from 'react';
// import API_KEY from './config';

const URL = `/api/gifs`

function App() {
  const [gifs, setGifs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await handleFetch(URL);
      if (error) setErrorMessage(error.message);
      if (data) setGifs(data.data);
    }
    doFetch();
  }, []);

  return (
    <div>
      <NavBar color='black' title="Giphy Search" />
      <div className="ui container">
        <GifContainer gifs={gifs} />
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default App;
