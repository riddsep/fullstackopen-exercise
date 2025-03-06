import { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(countries);

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCountry();
  }, []);

  const filteredCountry = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  return (
    <div>
      <label htmlFor="search">
        Find Countries{" "}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {loading ? (
        <p>Loading....</p>
      ) : query && filteredCountry.length >= 10 ? (
        <p>Kurang spesifik</p>
      ) : (
        <ul>
          {filteredCountry?.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
