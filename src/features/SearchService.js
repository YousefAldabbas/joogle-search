import axios from "axios";

const search = async (searchTerm) => {
  const res = await axios.get(
    `https://google-search3.p.rapidapi.com/api/v1/search/q=${searchTerm}+jordan`,
   { headers: {
    "X-User-Agent": "desktop",
    "X-Proxy-Location": "ME",
    "X-RapidAPI-Key": process.env.REACT_APP_KEY ,
    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
  }}
  );
  return res.data
};

const searchService = {
  search,
};

export default searchService;
