import { response } from "express";
import axios from "axios";

// export const getUser = async (req, res) => {
//   const { contest, username } = req.body;
//   const userlist = [];

//   try {
//     const fetchPromises = async (username) => {
//       let i = 0;
//     const len  = username.length;
//     console.log(username);
//     //i=len-1;
//     while (username[i] !== undefined) {
//       const url = `https://lccn.lbao.site/api/v1/contest-records/user?contest_name=${contest}&username=${username[i]}&archived=false`;
//       const response = await fetch(url);
//       const data = await response.json();
//         console.log(data);
//       if (data && data[0]) {
//         userlist.push(data[0]);
//       }
//       i++;
//     }

//     };

//     await Promise.all(fetchPromises(username));
//      res.status(200).json(userlist);
//   } catch (error) {

//     res.status(200).json({ message: "Server error ..." });
//   }
// };

export const getUser = async (req, res) => {
  const { contest, username } = req.body;

  try {
    const fetchUserData = async (username) => {
      const userlist = [];
      let count = 0;

      // Creating a Promise for each fetch operation
      const fetchPromises = username.map((name) => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const url = `https://lccn.lbao.site/api/v1/contest-records/user?contest_name=${contest}&username=${name}&archived=false`;
            const response = await axios.get(url);

            // if (response.ok) {
            const data = response.data;
            if (data && data[0]) {
              userlist.push(data[0]);
              // console.log(data[0].username);
              // }
            }

            resolve(); // Resolve the Promise after the fetch operation
          }, count);

          count += 1000; // Increase the delay for the next request
        });
      });

      // Execute all the fetch operations with timeouts
      await Promise.all(fetchPromises);

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
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "success") {
      res.status(200).json({ message: "Valid user" });
    } else {
      res.status(400).json({ message: "User not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
