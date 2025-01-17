document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const input = document.querySelector(".form_input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = input.value;
    if (username) {
      getUser(username);
    }
  });

  getUser("GitHub");
})

const renderUser = function (data) {
  const avatar = document.querySelector(".user_avatar");
  const displayName = document.querySelector(".user_name");
  const userName = document.querySelector(".user_username");
  const dateJoined = document.querySelector(".user_date-joined");
  const bio = document.querySelector(".user_bio");
  const repos = document.querySelector(".user_stats-repo");
  const followers = document.querySelector(".user_stats-followers");
  const following = document.querySelector(".user_stats-following");
  const userLocation = document.querySelector(".user_location");
  const userWebsite = document.querySelector(".user_info-website");
  const xUrl = document.querySelector(".user_info-x");
  const company = document.querySelector(".user_info-company");

  avatar.src = data.avatar_url;

  displayName.textContent = data.name || data.login;
  userName.textContent = `@${data.login}`;
  userName.href = data.html_url;

  const date = new Date(data.created_at);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getUTCFullYear();
  dateJoined.textContent = `Joined ${day} ${month} ${year}`;

  bio.textContent = data.bio || "This profile has no bio";
  bio.style.opacity = data.bio ? 1 : 0.5;

  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;

  userLocation.textContent = data.location || "Not Available";
  userLocation.style.opacity = data.location ? 1 : 0.5;

  if (data.blog) {
    userWebsite.textContent = data.blog;
    userWebsite.href = data.blog;
    userWebsite.style.opacity = 1;
  } else {
    userWebsite.textContent = "Not Available";
    userWebsite.style.opacity = 0.5;
    userWebsite.removeAttribute("href");
  }

  if (data.x_username) {
    xUrl.textContent = data.x_username;
    xUrl.href = `https://x.com/${data.x_username}`;
    xUrl.style.opacity = 1;
  } else {
    xUrl.textContent = "Not Available";
    xUrl.style.opacity = 0.5;
    xUrl.removeAttribute("href");
  }

  if (data.company) {
    company.textContent = data.company;
    const companyLink = data.company.slice(1);
    company.href = `https://github.com/${companyLink}`;
    company.style.opacity = 1;
  } else {
    company.textContent = "Not Available";
    company.style.opacity = 0.5;
    company.removeAttribute("href");
  }
};

const getUser = async function (username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const errMsg = document.querySelector(".form_error-msg");
    if (!res.ok) {
      errMsg.style.display = "block";
      throw new Error("No results");
    }

    errMsg.style.display = "none";

    const data = await res.json();
    renderUser(data);
  } catch (err) {
    console.error(err.message);
  }
};