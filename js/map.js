(() => {
        const wrap = document.getElementById("canvasWrap");
        const viewport = document.getElementById("svgViewport");
        const blueprint = document.getElementById("blueprint");
        const coordinates = document.getElementById("coordinates");
        const status = document.getElementById("status");
        const roomInfo = document.getElementById("roomInfo");

        let scale = 1,
          offsetX = 0,
          offsetY = 0;
        let dragging = false,
          startX = 0,
          startY = 0;

        const summaries = {
          lobby: [
            "THE LOBBY",
            "ROOM 01-101",
            "Standard public reception area.",
          ],
          security: [
            "SECURITY CHECKPOINT",
            "ROOM 01-102",
            "Controlled access checkpoint.",
          ],
          storage: ["STORAGE ROOM", "ROOM 01-103", "General facility storage."],
          janitorial: [
            "JANITORIAL OFFICE",
            "ROOM 01-104",
            "Janitorial workspace and supplies.",
          ],
          stairwell: ["STAIRWELL", "STAIR-B", "Primary vertical circulation."],
          offices: [
            "OFFICES",
            "ROOM 01-105",
            "General administrative office allocation.",
          ],
        };

        function render() {
          viewport.style.transform = `translate(${offsetX}px,${offsetY}px) scale(${scale})`;
        }

        function selectRoom(id) {
          document.querySelectorAll(".room-record").forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.record === id);
          });

          document.querySelectorAll(".room-link").forEach((button) => {
            button.classList.toggle("selected", button.dataset.room === id);
          });

          document.querySelectorAll(".room").forEach((room) => {
            room.classList.toggle("highlighted", room.dataset.room === id);
          });

          const s = summaries[id];
          roomInfo.innerHTML = `<span class="label">SELECTED ROOM</span>
       <h3>${s[0]}</h3>
       <p class="muted">${s[1]}<br><br>${s[2]}</p>`;

          status.textContent = `ROOM ${id.toUpperCase()} // ${s[0]}`;
        }

        document.querySelectorAll(".room-link,.hitbox").forEach((el) => {
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            selectRoom(el.dataset.room);
          });
        });

        document.getElementById("zoomIn").addEventListener("click", () => {
          scale = Math.min(3, scale + 0.15);
          render();
        });

        document.getElementById("zoomOut").addEventListener("click", () => {
          scale = Math.max(0.5, scale - 0.15);
          render();
        });

        document.getElementById("zoomReset").addEventListener("click", () => {
          scale = 1;
          offsetX = 0;
          offsetY = 0;
          render();
        });

        wrap.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();
            scale = Math.max(
              0.5,
              Math.min(3, scale + (e.deltaY < 0 ? 0.1 : -0.1)),
            );
            render();
          },
          { passive: false },
        );

        wrap.addEventListener("pointerdown", (e) => {
          if (e.button !== 0) return;
          dragging = true;
          wrap.classList.add("dragging");
          startX = e.clientX - offsetX;
          startY = e.clientY - offsetY;
          wrap.setPointerCapture(e.pointerId);
        });

        wrap.addEventListener("pointermove", (e) => {
          const r = blueprint.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 1200;
          const y = ((e.clientY - r.top) / r.height) * 800;
          coordinates.textContent = `X: ${String(Math.max(0, Math.round(x))).padStart(4, "0")}  Y: ${String(Math.max(0, Math.round(y))).padStart(4, "0")}`;

          if (!dragging) return;
          offsetX = e.clientX - startX;
          offsetY = e.clientY - startY;
          render();
        });

        function stopDrag() {
          dragging = false;
          wrap.classList.remove("dragging");
        }
        wrap.addEventListener("pointerup", stopDrag);
        wrap.addEventListener("pointercancel", stopDrag);

        selectRoom("lobby");
        render();
      })();
