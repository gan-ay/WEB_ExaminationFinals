// Scroll button
function scrollToSection() {
    document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
}

// Gallery modal
function openModal(img) {
    document.getElementById("imgModal").style.display = "flex";
    document.getElementById("modalImg").src = img.src;
}

function closeModal() {
    document.getElementById("imgModal").style.display = "none";
}

// Contact form validation
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let status = document.getElementById("statusMsg");

    if (name === "" || email === "" || message === "") {
        status.innerHTML = "Please fill out all fields.";
        status.style.color = "red";
        return false;
    }

    status.innerHTML = "Message sent successfully!";
    status.style.color = "green";
    return false;
}

document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const ids = [
    "year", "year-gallery", "year-about",
    "year-contact", "year-dest", "year-tours"
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  initScrollTopButtons();
  initGallery();
  initDestinations();
  initContactForm();
});


function initScrollTopButtons() {
  const btns = document.querySelectorAll(".topBtn");

  window.addEventListener("scroll", () => {
    btns.forEach(btn => {
      if (window.scrollY > 200) btn.style.display = "block";
      else btn.style.display = "none";
    });
  });

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}


function scrollToSection() {
  const section = document.getElementById("featured");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}


function initGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const images = [
    "seed/pic1", "seed/pic2", "seed/pic3",
    "seed/pic4", "seed/pic5", "seed/pic6"
  ];

  let html = "";
  images.forEach(seed => {
    html += `
      <div class="col-6 col-md-4">
        <img src="https://picsum.photos/${seed}/500/350"
             class="img-fluid rounded shadow-sm gallery-img"
             data-bs-toggle="modal"
             data-bs-target="#imageModal"
             onclick="setModalImage(this.src)">
      </div>`;
  });

  grid.innerHTML = html;
}

function setModalImage(src) {
  const modalImg = document.getElementById("modalImage");
  if (modalImg) modalImg.src = src;
}


function initDestinations() {
  const container = document.getElementById("destinationCards");
  const search = document.getElementById("searchInput");
  const filter = document.getElementById("regionFilter");

  if (!container) return;

  const destinations = [
    { name: "Coastal Haven", region: "coast", img: "seed/d1" },
    { name: "Mountain Peak Basecamp", region: "mountain", img: "seed/d2" },
    { name: "Old Heritage Town", region: "culture", img: "seed/d3" },
    { name: "Blue Reef Cove", region: "coast", img: "seed/d4" }
  ];

  function render() {
    const text = search.value.toLowerCase();
    const region = filter.value;

    container.innerHTML = destinations
      .filter(d =>
        (region === "all" || d.region === region) &&
        d.name.toLowerCase().includes(text)
      )
      .map(d => `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="https://picsum.photos/${d.img}/800/450" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${d.name}</h5>
              <p class="card-text text-capitalize">${d.region} region</p>
            </div>
          </div>
        </div>
      `)
      .join("");
  }

  render();
  search.addEventListener("input", render);
  filter.addEventListener("change", render);
}


function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
    form.classList.remove("was-validated");
  });
}