import axios from "axios";
import "./Home.css";
import React, { useEffect, useState } from "react";

//get data from localStorage
const getLocalStorage = () => {
  const list = localStorage.getItem("results");
  if (list) {
    return JSON.parse(localStorage.getItem("results"));
  } else {
    return [];
  }
};

const Home = () => {
  const [datas, setDatas] = useState(getLocalStorage());

  const fetchData = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(`https://randomuser.me/api`);
      setDatas(results);
      localStorage.setItem("results", JSON.stringify(results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    fetchData();
  };

  return (
    <>
      {datas.map((data, index) => {
        const { title, first, last } = data.name;
        const { email } = data;
        return (
          <>
            <div className="container py-3">
              <div className="card bg-success text-white">
                <div className="card-body" key={index}>
                  <p>
                    Complate Name :- {title} {first} {last}
                  </p>
                  <p>Email :- {email}</p>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={clickHandler}
                >
                  Refresh
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Home;
