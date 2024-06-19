import { useGlobalContext } from "./context";
import { useFetch } from "./useFetch";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const { data, error, isPending } = useFetch(`${url}&query=${searchTerm}`);
  console.log(data);

  if (isPending) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (error) {
    return (
      <section className="image-container">
        <h4>{error}</h4>
      </section>
    );
  }
  function splitdate(string) {
    return string.split("T", 1);
  }

  return (
    <section className="gallery">
      <ul className="images">
        {data &&
          data.results.map((item) => {
            const url = item.urls.regular;
            const date = item.created_at;
            const createdAt = splitdate(date);

            return (
              <li className="img" key={item.id}>
                <div className="max-x-sm rounded overflow-hidden shadow-lg w-100">
                  <img src={url} alt={item.alt_description} className="w-50" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-purple-500 text-xl mb-2">
                      Photo by <strong>{item.user.name}</strong>
                    </div>
                    <ul>
                      <li>
                        <strong>Likes: </strong> {item.likes}
                      </li>
                      {item.description && <li>{item.description}</li>}
                      <li>
                        <strong>Created At: </strong> {createdAt}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
export default Gallery;
