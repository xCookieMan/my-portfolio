// ======================
// 1. Typing Effect
// ======================
const techWords = [
  "Web Developer",
  "Web Designer",
  "Frontend Developer",
  "Backend Developer",
];
let word = 0,
  index = 0;
const typingSpeed = 150,
  erasingSpeed = 80,
  delayBetween = 1000;
const rotatorElem = document.getElementById("rotator");

function typeWord() {
  if (index < techWords[word].length) {
    rotatorElem.textContent += techWords[word].charAt(index);
    index++;
    setTimeout(typeWord, typingSpeed);
  } else {
    setTimeout(eraseWord, delayBetween);
  }
}

function eraseWord() {
  if (index > 0) {
    rotatorElem.textContent = techWords[word].substring(0, index - 1);
    index--;
    setTimeout(eraseWord, erasingSpeed);
  } else {
    word = (word + 1) % techWords.length;
    setTimeout(typeWord, typingSpeed);
  }
}

typeWord();

// ======================
// 2. Starfield Animation
// ======================
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let stars = [];
const numStars = 300;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.7 + 0.2,
    alpha: Math.random(),
    delta: Math.random() * 0.02,
  });
}

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y -= star.speed;
    if (star.y < 0) star.y = canvas.height;
  });
  requestAnimationFrame(animate);
}

animate();

// ======================
// 3. UFO Hover Buttons
// ======================
document.querySelectorAll(".view-btn").forEach((button) => {
  const ufos = [
    {
      el: button.querySelector(".ufo.big"),
      midX: 20,
      endX: 180,
      speedMid: 1500,
      speedEnd: 800,
      delay: 0,
      topShift: -20,
    },
    {
      el: button.querySelectorAll(".ufo.small")[0],
      midX: 20,
      endX: 180,
      speedMid: 1500,
      speedEnd: 800,
      delay: 0,
      topShift: -15,
    },
    {
      el: button.querySelectorAll(".ufo.small")[1],
      midX: 20,
      endX: 180,
      speedMid: 1500,
      speedEnd: 800,
      delay: 1500,
      topShift: -25,
    },
    {
      el: button.querySelectorAll(".ufo.small")[2],
      midX: 20,
      endX: 180,
      speedMid: 1500,
      speedEnd: 800,
      delay: 2000,
      topShift: -10,
    },
  ];
  let hoverActive = false;
  let trailIntervals = [];

  function reset(ufo) {
    ufo.el.style.transition = "none";
    ufo.el.style.transform = `translateY(-50%) translateX(-50px)`;
    ufo.el.style.opacity = 0;
  }

  function animateU(ufo) {
    setTimeout(() => {
      ufo.el.style.transition = `transform ${ufo.speedMid}ms ease-in-out, opacity 0.2s`;
      ufo.el.style.transform = `translateY(${ufo.topShift}px) translateX(${ufo.midX}px)`;
      ufo.el.style.opacity = 1;
    }, ufo.delay);
    setTimeout(() => {
      ufo.el.style.transition = `transform ${ufo.speedEnd}ms cubic-bezier(0.9,0,0.1,1)`;
      ufo.el.style.transform = `translateY(-50%) translateX(${ufo.endX}px)`;
    }, ufo.delay + ufo.speedMid + 50);
  }

  function createTrail(ufo) {
    const rect = ufo.el.getBoundingClientRect();
    const parent = ufo.el.parentElement.getBoundingClientRect();
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.classList.add("trail");
      ufo.el.parentElement.appendChild(dot);
      dot.style.left = `${rect.left - parent.left + rect.width / 2}px`;
      dot.style.top = `${rect.top - parent.top + rect.height / 2}px`;
      const angle = Math.random() * 20 - 10;
      const distance = Math.random() * 15 + 5;
      const duration = Math.random() * 0.4 + 0.2;
      dot.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
      setTimeout(() => {
        dot.style.transform = `translate(${distance}px, ${angle}px)`;
        dot.style.opacity = 0;
        setTimeout(() => dot.remove(), duration * 1000);
      }, 10);
    }
  }

  button.addEventListener("mouseenter", () => {
    if (hoverActive) return;
    hoverActive = true;
    button.classList.add("hover-active");
    ufos.forEach(reset);
    ufos.forEach((ufo) => {
      animateU(ufo);
      let ti = setInterval(() => createTrail(ufo), 150);
      trailIntervals.push(ti);
    });
  });

  button.addEventListener("mouseleave", () => {
    hoverActive = false;
    button.classList.remove("hover-active");
    trailIntervals.forEach((ti) => clearInterval(ti));
    trailIntervals = [];
    ufos.forEach(reset);
  });
});

// ======================
// 4. Contact Form Input Effects
// ======================
const form = document.querySelector(".contact-form");
const inputs = form ? form.querySelectorAll("input, textarea") : [];

if (form) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const rect = input.getBoundingClientRect();
      const parentRect = form.getBoundingClientRect();

      const star = document.createElement("div");
      star.classList.add("trail");
      star.style.background = `hsl(${Math.random() * 360},80%,70%)`;
      star.style.left = `${
        rect.left - parentRect.left + Math.random() * rect.width
      }px`;
      star.style.top = `${
        rect.top - parentRect.top + Math.random() * rect.height
      }px`;

      form.appendChild(star);

      const dx = (Math.random() - 0.5) * 20;
      const dy = -Math.random() * 20 - 5;

      star.animate(
        [
          { transform: `translate(0,0)`, opacity: 1 },
          { transform: `translate(${dx}px,${dy}px)`, opacity: 0 },
        ],
        { duration: 500 + Math.random() * 300, easing: "ease-out" }
      );

      setTimeout(() => star.remove(), 900);
    });
  });
}

// ======================
// 5. Blast Button + Backend Fetch
// ======================
const btn = document.getElementById("shootButton");
const aim = document.getElementById("aim");

if (btn && aim && form) {
  // Aim tracking
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    aim.style.left = `${e.clientX - rect.left}px`;
    aim.style.top = `${e.clientY - rect.top}px`;
  });

  btn.addEventListener("mouseenter", () => {
    aim.style.opacity = 1;
    aim.classList.add("glow");
  });

  btn.addEventListener("mouseleave", () => {
    aim.style.opacity = 0;
    aim.classList.remove("glow");
  });

  // Click handler (animation + API call)
  btn.addEventListener("click", () => {
    btn.classList.add("blast");

    const rect = btn.getBoundingClientRect();
    const parentRect = form.getBoundingClientRect();
    const cx = rect.left - parentRect.left + rect.width / 2;
    const cy = rect.top - parentRect.top + rect.height / 2;

    // Shockwave
    const shock = document.createElement("div");
    shock.classList.add("shockwave");
    shock.style.left = cx + "px";
    shock.style.top = cy + "px";
    form.appendChild(shock);
    setTimeout(() => shock.remove(), 600);

    // Fire Particles
    const fireColors = ["red", "yellow", "orange", "white"];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 12 + 4;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.background =
        fireColors[Math.floor(Math.random() * fireColors.length)];

      const angle = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 120;

      p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      p.style.left = cx + "px";
      p.style.top = cy + "px";

      form.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }

    // Smoke
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("div");
      s.classList.add("smoke");
      const size = Math.random() * 25 + 15;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.background = "rgba(200,200,200,0.5)";
      s.style.left = cx + (Math.random() * 40 - 20) + "px";
      s.style.top = cy + "px";
      s.style.position = "absolute";
      s.style.borderRadius = "50%";
      form.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }

    // ======================
    // FETCH TO BACKEND
    // ======================
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields.");
      setTimeout(() => btn.classList.remove("blast"), 300);
      return;
    }

    fetch("https://nakulkoli.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("✅ Message sent successfully!");
          // Reset form
          if (nameInput) nameInput.value = "";
          if (emailInput) emailInput.value = "";
          if (messageInput) messageInput.value = "";
        } else {
          alert("❌ " + (data.error || "Failed to send message."));
        }
      })
      .catch((err) => {
        console.error("Network Error:", err);
        alert("⚠️ Could not connect to server. Is backend running?");
      })
      .finally(() => {
        setTimeout(() => btn.classList.remove("blast"), 300);
      });
  });
}
