import {toast} from 'react-toastify';
import axios from 'axios';

export const netCall = (url, method, body) => {

    // const apiUrl = "https://api.libertoe.ir/"
    const apiUrl = "http://localhost:8080/"

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        // const res = fetch(apiUrl + url, {
        //     method: method,
        //     headers: { "Content-Type": "application/json" },
        //     body: body,
        //   });
        const res = await axios({
          method: method,
          url: apiUrl + url,
          headers: {
            // "Cache-Control": "no-cache",
            // "Content-Type": "application/json",
            "access-token": token,
          },
          data: body,
          //params: JSON.stringify(args)
          //data: bodyPreparer(args)
        });

        const result = res.data;
          resolve({status:res.status,data: result});
      } catch (err) {
        if (err.response && err.response.status) {
          if (err.response.status === 400) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([400, "Bad Request"]);
          } else if (err.response.status === 401) {
            toast.error(String(err.response.data.detail), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([401, "unAuthorized"]);
          } else if (err.response.status === 404) {
            toast.error(String(err.response.data), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([404, "not found"]);
          } else if (err.response.status === 403) {
            toast.error(String(err.response.data), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([403, "forbidden"]);
          } else if (err.response.status === 415) {
            toast.error(String(err.response.data.name), {
              style: { width: "22rem", height: "5rem", fontSize: "1rem" },
            });
            resolve([415, "Unsupported Media Type"]);
          } else {
            alert(err);
            resolve(["381", "Network error: " + JSON.stringify(err)]);
          }
        } else {
          resolve(["381", "Network error: " + JSON.stringify(err)]);
        }
      }
    })();
  });
};

export const getProducts = async ()=>{
    const res = await axios({
        method: "get",
        url: "https://libertoe.ir/wp-json/wc/v3/products?per_page=100",
        headers: {
          // "Cache-Control": "no-cache",
          // "Content-Type": "application/json",
          "Authorization": "Basic Y2tfMjcyZTA3MTFmMTZhOGM0YTQwNzVlYTkzMTVkMTYyMWI0YWYxMmYwNjpjc184Y2I0ODVkZWViZmJhN2RjY2EwZDNiN2Q4NTcwNTE2YzYwYjI1ODdh",
        },
        // data: body,
        //params: JSON.stringify(args)
        //data: bodyPreparer(args)
      });
      console.log(res);
      return res
}
