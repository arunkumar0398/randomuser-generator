import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import {
  FaEnvelopeOpen,
  FaUserCircle,
  FaCalendarTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser
} from "react-icons/fa";
import { formatPhone, dateFormat } from "./FormatMethods";
import "./App.css";

// Higher Order Function (to lowercase both user typed name and the user name
// present in api, in order to match them)
const isSearched = (searchUser) => (each) =>
  each.name.first.toLowerCase().includes(searchUser.toLowerCase());

const App = () => {
  const [myApi, setMyApi] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((data) => data.json())
      .then((json_result) => {
        setData(json_result.results);
        let myApi = renderData(json_result.results);
        setMyApi(myApi);
      });
  }, []);

  const renderData = (data) => {
    return data.map((item, idx) => {
      return (
        <div key={idx} className="card">
          <div className="img-card">
            <img src={item.picture.large} alt="" />
          </div>
          <div className="u-details">
            <p className="name">
              <FaUserCircle className="soc-icon" />{" "}
              <span className="name">
                {item.name.first + " " + item.name.last}{" "}
              </span>
            </p>
            <p>
              <FaUser className="soc-icon" /> <span>{item.login.username}</span>
            </p>
            <p>
              <FaEnvelopeOpen className="soc-icon" /> <span> {item.email}</span>
            </p>
            <p>
              <FaCalendarTimes className="soc-icon" />{" "}
              <span> {dateFormat(item.dob.date)} </span>
            </p>
            <p>
              <FaMapMarkerAlt className="soc-icon" />
              <span>
                {item.location.city +
                  ", " +
                  item.location.state +
                  " - " +
                  item.location.postcode}
              </span>
            </p>
            <p>
              <FaPhoneAlt className="soc-icon" />{" "}
              <span> {formatPhone(item.phone)} </span>
            </p>
          </div>
          {/* <hr className="hr-line" /> */}
        </div>
      );
    });
  };

  // get current post
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 10 = 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0
  const currentPosts = myApi?.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

  // search users by user input
  const handleSearchInput = (e) => {    
    setSearchUser(e.target.value);
    const newData = renderData(
      data.filter((item) =>
        item.name.first.toLowerCase().includes(e.target.value)
      )
    );
    setMyApi(newData);

  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Search value={myApi}  onChange={handleSearchInput} />

      {currentPosts}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={myApi?.length}
        paginate={paginate}
      />
    </div>
  );
};

const Search = ({ onChange }) => {
  return (
    <div className="form-input">
      <input
        type="text"
        autoFocus={true}
        placeholder="search users"
        onChange={onChange}
      />
    </div>
  );
};

export default App;
