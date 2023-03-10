import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Grid } from "@mui/material";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import Recommendations from "../components/Modals/Recommendations";
import Header from "../components/Typography/Header";
import Title from "../components/Typography/Title";


function Dashboard() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  let id = authState.id;
  const [userInfo, setUserInfo] = useState({});
  const [myItems, setMyItems] = useState([]);
  const [myPastItems, setMyPastItems] = useState([]);
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [gotMail, setGotMail] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:33123/auth/fetchyall/${id}`)
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
          navigate("/");
        } else {
          setUserInfo(response.data);

          // check if they have mail
          axios
            .get(`https://localhost:33123/mail/newmail/${id}`)
            .then((respi) => {
              if (respi.data.gotmail === true) {
                setGotMail(true);
              }
            })
            .catch((error) => {});

          axios
            .get(`https://localhost:33123/items/fetchByUser/${id}`)
            .then((res) => {
              const available = res.data.filter((value) => {
                return (
                  value.state === "EXPECTED" || value.state === "AVAILABLE"
                );
              });
              const past = res.data.filter((value) => {
                return value.state === "PURCHASED" || value.state === "EXPIRED";
              });

              setMyItems(available);
              setMyPastItems(past);
            })
            .catch((error) => {
              navigate("/");
            });

          axios
            .get(`https://localhost:33123/items/mywatchlist/${id}`)
            .then((resbidy) => {
              setMyWatchlist(resbidy.data);
            })
            .catch((error) => {
              navigate("/");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gotMail]);

  return (
    <div style={{ height: 1010 }}>
      <div className="container">
        <Title title={`${userInfo.name} ${userInfo.surname}`} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <div className="searchInputs">
            <Header text={`${userInfo.location}, ${userInfo.country}`} />
          </div>
        </Grid>
      </Grid>

      <Recommendations />
      <div className="profileContainer">
        <div className="informationSection">
          <div className="container">
            <button
              className="buttonito"
              onClick={() => {
                navigate("/createitem");
              }}
            >
              CREATE A NEW AUCTION
            </button>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
