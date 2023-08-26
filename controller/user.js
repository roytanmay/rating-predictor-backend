import { response } from "express";
import axios from "axios";

export const getUser = async (req, res) => {
  const { contest, username } = req.body;

  try {
    const fetchUserData = async (username) => {
      const userlist = [];
      let count = 0;

      // Creating a Promise for each fetch operation
      const fetchPromises = username.map((name, index) => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const url = `https://lccn.lbao.site/api/v1/contest-records/user?contest_name=${contest}&username=${name}&archived=false`;
            const response = await axios.get(url);

            // if (response.ok) {
            const data = response.data;
            if (data) {
              if (data[0]) {
                userlist.push(data[0]);
              } else if (index === username.length - 1) {
                userlist.push(data[0]);
              }
            }

            resolve(); // Resolve the Promise after the fetch operation
          }, count);

          count += 1500; // Increase the delay for the next request
        });
      });

      // Execute all the fetch operations with timeouts
      await Promise.all(fetchPromises);

      // userlist.push(null);
      // if(userlist.length === 0) {
      //   userlist.push(null);
      // }
      return userlist; // Return the collected userlist
    };

    const data = await fetchUserData(username);
    // console.log(data.length);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error..." });
  }
};

export const addFriend = async (req, res) => {
  const { username } = req.body;
  const url = `https://leetcode-api.cyclic.app/${username}`;

  try {
    const response = await axios.get(url);
    const data = await response.data;
    if (data.status === "success") {
      res.status(200).json({ message: "Valid user" });
    } else {
      res.status(404).json({ message: "User not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Enter valid Username / Server error" });
  }
};
