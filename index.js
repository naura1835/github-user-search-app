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

searchBtn.addEventListener("click", () => {
  getUser(searchBar.value).then((user) => {
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
    bio.textContent = user.bio || "This user has no bio";
    repo.textContent = user.public_repos;
    followers.textContent = user.followers;
    following.textContent = user.following;
    address.textContent = user.location || "Not available";
    twitter.textContent = user.twitter_username || "Not available";
    website.textContent = user.blog || "Not available";
    company.textContent = user.company || "Not available";
  });
  //   Array.from(social).forEach((sm) => {
  //     console.log("ayoxxx");
  //     if (sm.textContent == "Not available") {
  //       console.log("ayo");
  //       sm.style.color = "red";
  //     }
  //   });
});
async function getUser(value) {
  try {
    const res = await fetch(`https://api.github.com/users/${value}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {}
}
