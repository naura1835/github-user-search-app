let search = document.querySelector(".search-icon");
let searchBar = document.querySelector('[type="search"]');
let searchBtn = document.querySelector(".btn");
let profileCard = document.querySelector(".profile-card");
let social = document.querySelectorAll(".social__platform");

let profilePicture = document.querySelector(".profile-pic");
let yourName = document.querySelector(".full-name");
let createdAt = document.querySelector(".created");
let userName = document.querySelector(".username");
let bio = document.querySelector(".bio");
let repo = document.querySelector(".repo");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let address = document.querySelector(".location");
let twitter = document.querySelector(".twitter");
let website = document.querySelector(".website");
let company = document.querySelector(".company");

search.addEventListener("click", () => {
  searchBar.focus();
});
const debounce = (cb, delay = 500) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
searchBtn.addEventListener(
  "click",
  debounce(() => {
    getUser(searchBar.value)
      .then((user) => {
        if (user.message == "Not Found") {
          console.log();
          if (profileCard.style.display == "grid") {
            // checks whether profile-card is visible because of prior search
            profileCard.style.display = "none";
          }
          if (document.querySelector(".user-not-found")) return;
          const container = document.createElement("article");
          container.classList.add("user-not-found");
          let message = (document.createElement("h2").textContent =
            "User not found");
          container.append(message);
          document.body.children[0].append(container);
        } else {
          if (document.querySelector(".user-not-found")) {
            //checks whether user not found card is visible beacsue of prior search
            document.body.children[0].removeChild(
              document.querySelector(".user-not-found")
            );
          }
          let d = new Date(user.created_at);
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          profileCard.style.display = "grid";

          profilePicture.src = `${user.avatar_url}`;
          yourName.textContent = user.name;
          createdAt.textContent = `Joined ${d.getDate()} ${
            months[d.getMonth()]
          } ${d.getFullYear()}`;
          userName.textContent = `@${user.login}`;
          bio.textContent = user.bio || "This profile has no bio";
          repo.textContent = user.public_repos;
          followers.textContent = user.followers;
          following.textContent = user.following;
          address.textContent = user.location || "Not available";
          twitter.textContent = user.twitter_username || "Not available";
          website.textContent = user.blog || "Not available";
          company.textContent = user.company || "Not available";

          if (bio.textContent == "This profile has no bio") {
            bio.style.color = "#8A91A1";
          }

          Array.from(document.querySelectorAll(".social__platform")).forEach(
            (platform) => {
              if (platform.children[1].textContent == "Not available") {
                Array.from(platform.children[0].children).forEach((pth) => {
                  pth.style.fill = "#8A91A1";
                });
                platform.children[1].style.color = "#8A91A1";
              }
            }
          );
        }
      })
      .catch((err) => console.log(err));
  })
);
async function getUser(value) {
  try {
    const res = await fetch(`https://api.github.com/users/${value}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

let mode = document.querySelector('[type="checkbox"]');
let label = document.querySelector('[for="choice"]');

//for when user clicks the mode switch input
mode.addEventListener("click", () => {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.body.classList.remove("light-mode");
    document.body.classList.remove("dark-mode");
    if (mode.checked) {
      label.textContent = "light";
      mode.style.backgroundImage = "url('images/sun.svg')";
      document.body.classList.add("dark-mode");
    } else {
      label.textContent = "dark";
      mode.style.backgroundImage = "url('images/moon.svg')";
      document.body.classList.add("light-mode");
    }
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.remove("dark-mode");
    if (mode.checked) {
      label.textContent = "dark";
      mode.style.backgroundImage = "url('images/moon.svg')";
      document.body.classList.add("light-mode");
    } else {
      label.textContent = "light";
      mode.style.backgroundImage = "url('images/sun.svg')";
      document.body.classList.add("dark-mode");
    }
  }
});

//for the label and icon
window.addEventListener("load", () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    label.textContent = "dark";
    mode.style.backgroundImage = "url('/images/moon.svg')";
  }
});

//for when user changes color scheme
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (event) => {
    mode.checked = false;
    document.body.classList.remove("light-mode");
    document.body.classList.remove("dark-mode");
    if (event.matches) {
      label.textContent = "dark";
      mode.style.backgroundImage = "url('/images/moon.svg')";
    } else {
      label.textContent = "light";
      mode.style.backgroundImage = "url('/images/sun.svg')";
    }
  });
