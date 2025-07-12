// Create animated background particles
function createParticles() {
  const bgAnimation = document.getElementById('bgAnimation');
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    bgAnimation.appendChild(particle);
  }
}

createParticles();

let user = document.getElementById('userID')

async function fetchApi(userid){
    const response = await fetch(`https://api.github.com/users/${userid}`);
    const result = await response.json()
    displayUser(result)
}

document.getElementById('btn').addEventListener('click',()=>{
    document.getElementById("profile").innerHTML=`<span class="loader-container"><span class="loader"></span></span>`
    let userid=user.value;
    fetchApi(userid)
})

function displayUser(result){
  const {avatar_url, name, bio, public_repos, followers, following, html_url}= result

    if(!avatar_url){
      document.getElementById('profile').innerHTML=` <p class="message">User Not Found!</p>`
      return
    }
    
  document.getElementById('profile').innerHTML=
    `<div class="left-section">
        <img src="${avatar_url}" alt="Profile Picture" class="profile-pic">
        <div class="username">${name}</div>
        <div class="bio">${bio}</div>
      </div>

      <div class="right-section">
        <div class="stats">
          <div class="stat">
            <div>${public_repos}</div>
            <div>Repositories</div>
          </div>
          <div class="stat">
            <div>${followers}</div>
            <div>Followers</div>
          </div>
          <div class="stat">
            <div>${following}</div>
            <div>Following</div>
          </div>
        </div>

        <a href=${html_url} target='_blank'>
          <div class="button-container">
          <button class="profile-button">View Profile</button>
        </div>
        </a>
      </div>`
}



const themeToggleBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
