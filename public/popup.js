const CLIENT_ID = "78m81c58vzpvwe";
const URI =  "http://localhost:3000/oauth/linkedin/login/callback"

const url = new URL("https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social");

url.searchParams.set("client_id", CLIENT_ID);
url.searchParams.set("redirect_uri", URI);

const popupA = document.getElementById("oauth-linkedin-popup");
popupA.setAttribute("href", url);
popupA.addEventListener("click", (event) => {
  event.preventDefault();

  const features = {
    popup: "yes",
    width: 600,
    height: 700,
    top: "auto",
    left: "auto",
    toolbar: "no",
    menubar: "no",
  };

  const strWindowsFeatures = Object.entries(features)
    .reduce((str, [key, value]) => {
      if (value == "auto") {
        if (key === "top") {
          const v = Math.round(
            window.innerHeight / 2 - features.height / 2
          );
          str += `top=${v},`;
        } else if (key === "left") {
          const v = Math.round(
            window.innerWidth / 2 - features.width / 2
          );
          str += `left=${v},`;
        }
        return str;
      }

      str += `${key}=${value},`;
      return str;
    }, "")
    .slice(0, -1);

  window.open(url, "_blank", strWindowsFeatures);
});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.origin !== window.location.origin) {
    console.warn(`Message received by ${event.origin}; IGNORED.`);
    return;
  }

  const access_token = event.data;

  console.log(access_token); // save this in storage, cookie and use it with GitHub REST API
}