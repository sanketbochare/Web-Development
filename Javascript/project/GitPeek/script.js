const url = "https://api.github.com/users";
const profile_picture = document.getElementById("profile-picture");
const name = document.getElementById("name");
const user_id = document.getElementById("user-id");
const visit_btn = document.getElementById("visit-profile");
const skills = document.getElementById("skills");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const status = document.getElementById("status");
const profile = document.getElementById("profile");

let data;
let user_name;

function SearchProfile() {
  user_name = document.getElementById("textfield").value.trim();
  if (!user_name) return;
  status.style.display = "block";
  status.textContent = "Loading...";
  status.className = "status loading";
  fetchProfile(`${url}/${user_name}`);
}

const fetchProfile = async (user) => {
  try {
    const res = await fetch(user);
    data = await res.json();
    if (res.status !== 200) throw new Error("User not found");

    profile_picture.src = data.avatar_url || "";
    name.textContent = data.name || "No Name";
    user_id.textContent = `@${data.login || ""}`;
    skills.textContent = data.bio || "No bio";
    followers.textContent = data.followers || 0;
    following.textContent = data.following || 0;
    visit_btn.textContent = "Check Profile";

    visit_btn.onclick = () => window.open(data.html_url, "_blank");

    profile.classList.add("show");
    status.style.display = "none";
  } catch (error) {
    status.textContent = "User not found or error fetching data";
    status.className = "status error";
    profile.classList.remove("show");
  }
};
