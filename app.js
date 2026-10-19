// app.js - TP N° 6: Programación Lógica Aplicada en Prolog
const TP_NUM = "6";
const STORAGE_KEY = `tp${TP_NUM}_progress_v1`;

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupModals();
  setupRadioCardClicks();
  setupListeners();
  setupCodeCopy();
  restoreProgress();
  updateProgress();
});

// 1. Theme Configuration
function setupTheme() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (!toggleBtn) return;
  
  const isDark = localStorage.getItem("theme") === "dark" || 
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// 2. Modals (Git Guide and Bibliografía)
function setupModals() {
  const btnBiblio = document.getElementById("btn-open-biblio-all");
  const modalBiblio = document.getElementById("modal-biblio");
  const closeBiblio = document.getElementById("close-modal-biblio");
  
  if (btnBiblio && modalBiblio && closeBiblio) {
    btnBiblio.addEventListener("click", () => modalBiblio.classList.remove("hidden"));
    closeBiblio.addEventListener("click", () => modalBiblio.classList.add("hidden"));
    modalBiblio.addEventListener("click", (e) => {
      if (e.target === modalBiblio) modalBiblio.classList.add("hidden");
    });
  }

  const btnGit = document.getElementById("btn-git-guide");
  const modalGit = document.getElementById("modal-git");
  const closeGit = document.getElementById("close-modal-git");

  if (btnGit && modalGit && closeGit) {
    btnGit.addEventListener("click", () => modalGit.classList.remove("hidden"));
    closeGit.addEventListener("click", () => modalGit.classList.add("hidden"));
    modalGit.addEventListener("click", (e) => {
      if (e.target === modalGit) modalGit.classList.add("hidden");
    });
  }
}

// 3. Copy Code Support for Base Knowledge Base
function setupCodeCopy() {
  const btnCopyProlog = document.getElementById("btn-copy-prolog");
  const codeBlock = document.getElementById("prolog-base-code");
  if (btnCopyProlog && codeBlock) {
    btnCopyProlog.addEventListener("click", () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        const orig = btnCopyProlog.innerText;
        btnCopyProlog.innerText = "✅ ¡Código Copiado!";
        setTimeout(() => { btnCopyProlog.innerText = orig; }, 2000);
      }).catch(() => {
        alert("No se pudo copiar automáticamente. Por favor copia el texto manualmente.");
      });
    });
  }
}

// 5. Radio Card Interactive Click Support
function setupRadioCardClicks() {
  document.querySelectorAll(".radio-card").forEach(card => {
    const radio = card.querySelector("input[type='radio']");
    if (!radio) return;
    
    card.addEventListener("click", (e) => {
      if (e.target.tagName !== "INPUT") {
        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
}

// 6. Global Listeners and Auto-save
function setupListeners() {
  // Selects, Radios, and Inputs
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-ex], [data-student]")) {
      saveProgress();
      updateProgress();
    }
  });

  // Student info inputs (typing)
  document.querySelectorAll("[data-student]").forEach(input => {
    input.addEventListener("input", () => {
      saveProgress();
    });
  });

  // Buttons for export / preview
  const btnExportTop = document.getElementById("btn-export-json");
  const btnExportBottom = document.getElementById("btn-export-json-footer");
  const btnPreview = document.getElementById("btn-preview-json");
  const btnCopy = document.getElementById("btn-copy-json");

  if (btnExportTop) btnExportTop.addEventListener("click", exportJSON);
  if (btnExportBottom) btnExportBottom.addEventListener("click", exportJSON);
  if (btnPreview) btnPreview.addEventListener("click", togglePreview);
  if (btnCopy) btnCopy.addEventListener("click", copyJSON);
}

// 7. Data Collection
function getAnswers() {
  const studentInfo = {};
  document.querySelectorAll("[data-student]").forEach(el => {
    const key = el.getAttribute("data-student");
    studentInfo[key] = el.value.trim();
  });

  const answers = {};

  // Selects
  document.querySelectorAll("select[data-ex]").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    if (!answers[exId]) answers[exId] = {};
    answers[exId][key] = el.value || "";
  });

  // Radios
  document.querySelectorAll("input[type='radio'][data-ex]:checked").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    if (!answers[exId]) answers[exId] = {};
    answers[exId][key] = el.value || "";
  });

  // Hidden inputs (if any)
  document.querySelectorAll("input[type='hidden'][data-ex]").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    if (!answers[exId]) answers[exId] = {};
    answers[exId][key] = el.value || "";
  });

  return { studentInfo, answers };
}

// 8. LocalStorage Persistence
function saveProgress() {
  const data = getAnswers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    
    // Restore answers
    if (data.answers) {
      Object.keys(data.answers).forEach(exId => {
        const exAnswers = data.answers[exId];
        Object.keys(exAnswers).forEach(key => {
          const val = exAnswers[key];
          if (!val) return;

          // Selects
          const select = document.querySelector(`select[data-ex='${exId}'][data-key='${key}']`);
          if (select) {
            select.value = val;
          }

          // Radios
          const radio = document.querySelector(`input[type='radio'][data-ex='${exId}'][data-key='${key}'][value='${val}']`);
          if (radio) {
            radio.checked = true;
          }
        });
      });
    }

    // Restore student info
    if (data.studentInfo) {
      document.querySelectorAll("[data-student]").forEach(el => {
        const key = el.getAttribute("data-student");
        if (data.studentInfo[key]) {
          el.value = data.studentInfo[key];
        }
      });
    }
  } catch (e) {
    console.error("Error al restaurar progreso guardado:", e);
  }
}

// 9. Progress Calculation (Excluding student info)
function updateProgress() {
  const questionKeys = new Set();
  const answeredKeys = new Set();
  
  // Selects
  document.querySelectorAll("select[data-ex]").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    const uniqueKey = `${exId}:${key}`;
    questionKeys.add(uniqueKey);
    if (el.value && el.value !== "") {
      answeredKeys.add(uniqueKey);
    }
  });

  // Radios (grouped by exId:key)
  document.querySelectorAll("input[type='radio'][data-ex]").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    const uniqueKey = `${exId}:${key}`;
    questionKeys.add(uniqueKey);
    if (el.checked) {
      answeredKeys.add(uniqueKey);
    }
  });

  // Hidden inputs
  document.querySelectorAll("input[type='hidden'][data-ex]").forEach(el => {
    const exId = el.getAttribute("data-ex");
    const key = el.getAttribute("data-key");
    const uniqueKey = `${exId}:${key}`;
    questionKeys.add(uniqueKey);
    if (el.value && el.value !== "") {
      answeredKeys.add(uniqueKey);
    }
  });
  
  const total = questionKeys.size;
  const answered = answeredKeys.size;
  const percentage = total === 0 ? 0 : Math.round((answered / total) * 100);
  
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.innerText = `${answered} de ${total} completados (${percentage}%)`;
}

// 10. JSON Export & Preview Payload
function getPayload() {
  const data = getAnswers();
  return JSON.stringify({
    tp_id: `LAB1-2026-TP${TP_NUM}`,
    student: data.studentInfo,
    answers: data.answers
  }, null, 2);
}

function exportJSON() {
  const jsonStr = getPayload();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `respuestas_tp${TP_NUM}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function togglePreview() {
  const container = document.getElementById("preview-container");
  const code = document.getElementById("preview-code");
  if (!container || !code) return;
  
  if (container.classList.contains("hidden")) {
    code.textContent = getPayload();
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
  }
}

function copyJSON() {
  const jsonStr = getPayload();
  navigator.clipboard.writeText(jsonStr).then(() => {
    alert("JSON copiado al portapapeles con éxito.");
  }).catch(() => {
    alert("No se pudo copiar automáticamente. Por favor copia el texto manualmente.");
  });
}
