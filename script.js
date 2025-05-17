function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(raw => {
      if (!raw.ok) {
        throw new Error("User not found");
      }
      return raw.json();
    });
}

function decorateProfileData(data) {
  return `
    <div class="flex items-center space-x-4">
      <img src="${data.avatar_url}" alt="User Avatar" class="w-16 h-16 rounded-full border border-gray-500">
      <div>
        <h2 class="text-xl font-semibold text-white">${data.name || "No Name Provided"}</h2>
        <p class="text-sm text-gray-400">@${data.login}</p>
      </div>
    </div>
    <p class="text-gray-300 mt-4">${data.bio || "No bio available."}</p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-600">
      <div>
        <div class="text-sm text-gray-400">Repositories</div>
        <div class="text-lg font-medium text-white mt-1">${data.public_repos}</div>
      </div>
      <div>
        <div class="text-sm text-gray-400">Followers</div>
        <div class="text-lg font-medium text-white mt-1">${data.followers}</div>
      </div>
      <div>
        <div class="text-sm text-gray-400">Following</div>
        <div class="text-lg font-medium text-white mt-1">${data.following}</div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      <div>
        <div class="text-sm text-gray-400">Location</div>
        <div class="text-white">${data.location || "N/A"}</div>
      </div>
      <div>
        <div class="text-sm text-gray-400">Blog</div>
        <a href="${data.blog || '#'}" target="_blank" class="text-blue-400 hover:underline">${data.blog || "N/A"}</a>
      </div>
    </div>
  `;
}

const usernameinp = document.querySelector(".usernameinp");
const profileContainer = document.getElementById("profile");
const form = document.getElementById("searchForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username)
      .then((data) => {
        const html = decorateProfileData(data);
        profileContainer.innerHTML = html;
      })
      .catch((err) => {
        profileContainer.innerHTML = `<p class="text-red-400 mt-4">${err.message}</p>`;
      });
  } else {
    alert("Please enter a username");
  }
});
