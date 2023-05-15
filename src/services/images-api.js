const URL = 'https://pixabay.com/api/';
const KEY = '34679822-1c5a5d4931a74610a4cbe01cd';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Oops... there are no  images matching your search... `)
      );
    }
  );
}

export default fetchImages;
