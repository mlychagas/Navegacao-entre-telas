import { useEffect } from 'react';

function API() {
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/authentication';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer e5b35cd790583ec7ffbbf90ec40a9c60'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }, []);

  return <h1>Testando TMDB</h1>;
}

export default API;
