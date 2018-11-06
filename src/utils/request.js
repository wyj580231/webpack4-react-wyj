import fetch from "isomorphic-fetch";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function loadingControl() {
  //   if (window.loadingCount > 0) {
  //     if (document.getElementById("camloading")) {
  //       document.getElementById("camloading").style.display = "";
  //       document.querySelector("body").style.opacity = "0.6";
  //     }
  //   } else {
  //     if (document.getElementById("camloading")) {
  //       document.getElementById("camloading").style.display = "none";
  //       document.querySelector("body").style.opacity = "1";
  //     }
  //   }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, param = {}) {
  //url=url.replace("/camapi","http://localhost:11773/api");
  param = { ...param, method: "GET", isStringify: true };
  let { body, method, isStringify } = param;
  if (method.toUpperCase() === "GET") {
    if (body) {
      url += "?";
      for (let key in body) {
        let typeStr = Object.prototype.toString.call(body[key]);
        if (typeStr === "[object Array]") {
          for (let value of body[key]) {
            url += `${key}=${value}&`;
          }
        } else if (
          typeStr === "[object String]" ||
          typeStr === "[object Number]"
        ) {
          url += `${key}=${body[key]}&`;
        } else {
          alert(
            `暂不支持GET传递${typeStr}类型参数,请自行扩展或改用POST传参!`,
            false
          );
          throw new Error(
            `暂不支持GET传递${typeStr}类型参数,请自行扩展或改用POST传参!`,
            false
          );
        }
      }
      url = url.substring(0, url.length - 1);
    }
    url +=
      (url.includes("?") ? "&r=" : "?r=") +
      localStorage.getItem("loginTimestamp");
    body = undefined;
  } else {
    if (body) {
      if (isStringify) {
        body = JSON.stringify(body);
      } else {
        let params = new URLSearchParams();
        for (let key in body) {
          let typeStr = Object.prototype.toString.call(body[key]);
          if (typeStr === "[object Array]") {
            for (let value of body[key]) {
              params.append(key, value);
            }
          } else {
            params.set(key, body[key]);
          }
        }
        body = params;
      }
    } else body = undefined;
  }
  if (!window.loadingCount) {
    window.loadingCount = 1;
  } else window.loadingCount++;
  loadingControl();
  return fetch(url, {
    mode: "cors",
    method,
    headers: {
      "Content-Type": isStringify
        ? "application/json; charset=UTF-8"
        : "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
      Authorization: sessionStorage.getItem("Authorization") || "" // 从sessionStorage中获取access token
    },
    body
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      window.loadingCount--;
      loadingControl();
      if (!["OK", "REDIRECT"].includes(data.result || data.Result)) {
        alert(data.message, false);
        return;
      }
      return data;
    })
    .catch(err => {
      window.loadingCount--;
      loadingControl();
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            alert("404路径错误!", false);
            break;
          default:
            alert("服务器发生错误!", false);
            break;
        }
        return;
      }
    });
}
