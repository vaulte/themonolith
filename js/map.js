const viewport = document.getElementById("svgViewport");
const wrap = document.getElementById("canvasWrap");
const blueprint = document.getElementById("blueprint");
const coordinates = document.getElementById("coordinates");
const roomInfo = document.getElementById("roomInfo");
const status = document.getElementById("status");

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let startX = 0;
let startY = 0;

const roomData = {
  "THE LOBBY": {
    id: "ROOM 01",
    description: "Main public entrance and reception area."
  },
  "SECURITY CHECKPOINT": {
    id: "ROOM 02",
    description: "Controlled access checkpoint between the lobby and internal facility areas."
  },
  "STORAGE ROOM": {
    id: "ROOM 03",
    description: "General facility storage."
  },
  "JANITORIAL OFFICE": {
    id: "ROOM 04",
    description: "Janitorial supplies and staff workspace."
  },
  "STAIRWELL": {
    id: "ROOM 05",
    description: "Vertical circulation between building levels."
  },
  "OFFICES": {
    id: "ROOM 06",
    description: "Administrative and staff office area."
  }
};

function renderTransform() {
  viewport.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

function selectRoom(name) {
  document.querySelectorAll(".room").forEach(el => el.classList.remove("highlighted"));
  document.querySelectorAll(".room-link").forEach(el => el.classList.remove("selected"));

  const room = [...document.querySelectorAll(".room")]
    .find(el => el.dataset.room === name);

  if (room) room.classList.add("highlighted");

  const button = [...document.querySelectorAll(".room-link")]
    .find(el => el.dataset.room === name);

  if (button) button.classList.add("selected");

  const data = roomData[name];

  roomInfo.innerHTML = `
    <span class="label">SELECTED ROOM</span>
    <h3>${name}</h3>
    <p>${data.id}<br><br>${data.description}</p>
  `;

  status.textContent = `${data.id} // ${name}`;
}

document.querySelectorAll(".hitbox").forEach(hitbox => {
  hitbox.addEventListener("click", e => {
    e.stopPropagation();
    selectRoom(hitbox.dataset.room);
  });
});

document.querySelectorAll(".room-link").forEach(button => {
  button.addEventListener("click", () => selectRoom(button.dataset.room));
});

document.getElementById("zoomIn").addEventListener("click", () => {
  scale = Math.min(3, scale + 0.15);
  renderTransform();
});

document.getElementById("zoomOut").addEventListener("click", () => {
  scale = Math.max(.5, scale - 0.15);
  renderTransform();
});

document.getElementById("zoomReset").addEventListener("click", () => {
  scale = 1;
  offsetX = 0;
  offsetY = 0;
  renderTransform();
});

wrap.addEventListener("wheel", e => {
  e.preventDefault();
  const direction = e.deltaY < 0 ? 1 : -1;
  scale = Math.max(.5, Math.min(3, scale + direction * .1));
  renderTransform();
}, { passive: false });

wrap.addEventListener("pointerdown", e => {
  if (e.button !== 0) return;
  dragging = true;
  wrap.classList.add("dragging");
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
  wrap.setPointerCapture(e.pointerId);
});

wrap.addEventListener("pointermove", e => {
  const rect = blueprint.getBoundingClientRect();
  const svgX = ((e.clientX - rect.left) / rect.width) * 1200;
  const svgY = ((e.clientY - rect.top) / rect.height) * 800;

  coordinates.textContent =
    `X: ${String(Math.round(svgX)).padStart(4, "0")}  Y: ${String(Math.round(svgY)).padStart(4, "0")}`;

  if (!dragging) return;
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  renderTransform();
});

wrap.addEventListener("pointerup", e => {
  dragging = false;
  wrap.classList.remove("dragging");
  try { wrap.releasePointerCapture(e.pointerId); } catch (_) {}
});

wrap.addEventListener("pointercancel", () => {
  dragging = false;
  wrap.classList.remove("dragging");
});

renderTransform();
