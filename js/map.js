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
    code: "01-101",
    roomNumber: "00-101",
    department: "ADMINISTRATION",
    windows: "2",
    doors: "1",
    status: "ACTIVE",
    notes: "Standard public reception area. No architectural discrepancies recorded.",
    revision: "REV. 01"
  },
  "SECURITY CHECKPOINT": {
    code: "01-102",
    roomNumber: "00-102",
    department: "SECURITY",
    windows: "0",
    doors: "2",
    status: "CONTROLLED",
    notes: "Primary access-control point. Staff screening and visitor processing.",
    revision: "REV. 01"
  },
  "STORAGE ROOM": {
    code: "01-103",
    roomNumber: "00-103",
    department: "FACILITIES",
    windows: "0",
    doors: "1",
    status: "ACTIVE",
    notes: "General storage allocation. Inventory records maintained separately.",
    revision: "REV. 01"
  },
  "JANITORIAL OFFICE": {
    code: "01-104",
    roomNumber: "00-104",
    department: "FACILITIES",
    windows: "1",
    doors: "1",
    status: "ACTIVE",
    notes: "Janitorial workspace and supplies. Access restricted to facilities personnel.",
    revision: "REV. 01"
  },
  "STAIRWELL": {
    code: "STAIR-01",
    roomNumber: "STAIR-B",
    department: "FACILITIES",
    windows: "0",
    doors: "2",
    status: "ACTIVE",
    notes: "Primary vertical circulation. Connects the first floor with adjacent levels.",
    revision: "REV. 01"
  },
  "OFFICES": {
    code: "01-105",
    roomNumber: "00-105",
    department: "ADMINISTRATION",
    windows: "8",
    doors: "4",
    status: "ACTIVE",
    notes: "General administrative office allocation. Individual room assignments are not shown on this plan.",
    revision: "REV. 01"
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
  if (!data) return;

  // Keep the compact left-hand selection summary.
  roomInfo.innerHTML = `
    <span class="label">SELECTED ROOM</span>
    <h3>${name}</h3>
    <p>ROOM ${data.code}<br><br>${data.notes}</p>
  `;

  // Populate the large room record on the right.
  document.getElementById("detailCode").textContent = data.code;
  document.getElementById("detailTitle").textContent = name;
  document.getElementById("detailRoomNumber").textContent = data.roomNumber;
  document.getElementById("detailDepartment").textContent = data.department;
  document.getElementById("detailWindows").textContent = data.windows;
  document.getElementById("detailDoors").textContent = data.doors;
  document.getElementById("detailStatus").textContent = data.status;
  document.getElementById("detailNotes").textContent = data.notes;
  document.getElementById("detailRevision").textContent = data.revision;

  status.textContent = `${data.code} // ${name}`;
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


// Initial room selection.
selectRoom("THE LOBBY");
