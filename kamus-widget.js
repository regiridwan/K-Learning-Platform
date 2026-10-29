(function () {
  // 1. Inject Style CSS Popup Frame ke Halaman
  const style = document.createElement("style");
  style.innerHTML = `
    /* Tombol Floating Kamus */
    #dict-popup-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: #e11d48;
      color: #ffffff;
      border: none;
      padding: 12px 20px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.95rem;
      box-shadow: 0 8px 24px rgba(225, 29, 72, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-family: 'Inter', system-ui, sans-serif;
      transition: all 0.2s ease;
    }
    #dict-popup-btn:hover {
      transform: translateY(-2px);
      background: #be123c;
      box-shadow: 0 12px 28px rgba(225, 29, 72, 0.5);
    }

    /* Popup Modal Container */
    #dict-iframe-container {
      position: fixed;
      right: 24px;
      bottom: 80px;
      width: min(560px, 94vw);
      height: min(700px, 85vh);
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.35);
      z-index: 100000;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    #dict-iframe-container.open {
      display: flex;
    }

    /* Header Handle untuk Menggeser Popup */
    .dict-iframe-header {
      background: #1e293b;
      color: #ffffff;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      user-select: none;
      touch-action: none;
      font-family: 'Inter', sans-serif;
    }
    .dict-iframe-header.drag {
      cursor: grabbing;
    }
    .dict-iframe-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.92rem;
    }
    .dict-iframe-title .logo {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #e11d48;
      color: #ffffff;
      display: grid;
      place-items: center;
      font-size: 0.75rem;
    }
    #dict-iframe-close {
      background: rgba(255, 255, 255, 0.15);
      border: 0;
      color: #ffffff;
      border-radius: 8px;
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: grid;
      place-items: center;
      font-size: 0.9rem;
    }
    #dict-iframe-close:hover {
      background: #e11d48;
    }

    /* Element Iframe tempat memuat kamus.html secara utuh */
    #dict-frame-element {
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);

  // 2. Inject HTML Elements ke Body
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button id="dict-popup-btn" title="Buka Kamus Melayang">
      <span>📖</span> <span>Kamus</span>
    </button>

    <div id="dict-iframe-container">
      <div class="dict-iframe-header" id="dict-iframe-drag-handle">
        <div class="dict-iframe-title">
          <span class="logo">한</span>
          <span>Kamus Korea</span>
        </div>
        <button id="dict-iframe-close" title="Tutup Popup (X)">✕</button>
      </div>
      <iframe id="dict-frame-element" src="kamus.html" title="Kamus Korea Interaktif"></iframe>
    </div>
  `;
  document.body.appendChild(wrapper);

  // 3. Logika Buka / Tutup & Draggable
  const container = document.getElementById("dict-iframe-container");
  const triggerBtn = document.getElementById("dict-popup-btn");
  const closeBtn = document.getElementById("dict-iframe-close");
  const dragHandle = document.getElementById("dict-iframe-drag-handle");

  triggerBtn.onclick = () => {
    container.classList.toggle("open");
  };

  closeBtn.onclick = () => {
    container.classList.remove("open");
  };

  // Fitur Geser Popup (Draggable)
  let dr = null;
  dragHandle.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#dict-iframe-close")) return;
    dr = {
      dx: e.clientX - container.offsetLeft,
      dy: e.clientY - container.offsetTop,
    };
    dragHandle.setPointerCapture(e.pointerId);
    dragHandle.classList.add("drag");
  });

  dragHandle.addEventListener("pointermove", (e) => {
    if (!dr) return;
    let x = Math.min(
      Math.max(0, e.clientX - dr.dx),
      window.innerWidth - container.offsetWidth,
    );
    let y = Math.min(
      Math.max(0, e.clientY - dr.dy),
      window.innerHeight - container.offsetHeight,
    );
    container.style.left = x + "px";
    container.style.top = y + "px";
    container.style.right = "auto";
    container.style.bottom = "auto";
  });

  const stopDrag = () => {
    dr = null;
    dragHandle.classList.remove("drag");
  };
  dragHandle.addEventListener("pointerup", stopDrag);
  dragHandle.addEventListener("pointercancel", stopDrag);
})();
