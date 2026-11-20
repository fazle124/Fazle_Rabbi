import { db, configured } from "./firebase.js";
import {
  addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query,
  serverTimestamp, setDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const $ = (selector) => document.querySelector(selector);
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const menuButton = $(".menu-toggle");
const nav = $(".main-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });
}

const form = $("#contact-form");
const status = $("#form-status");
if (form && status) {
  if (configured) status.textContent = "Your message will be sent securely to the portfolio database.";
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!configured || !db) {
      status.textContent = "Firebase is not configured yet. Follow README.md to connect your database.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.textContent = "Sending your message…";
    try {
      const payload = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim(),
        createdAt: serverTimestamp(),
        status: "new"
      };
      if (!payload.name || !payload.email || !payload.message) throw new Error("Please complete all fields.");
      await addDoc(collection(db, "contactMessages"), payload);
      form.reset();
      status.textContent = "Thank you! Your message has been sent.";
    } catch (error) {
      console.error(error);
      status.textContent = "Message could not be sent. Check Firebase setup and Firestore Rules.";
    } finally {
      submit.disabled = false;
    }
  });
}

// Privacy-conscious visitor statistics: one aggregate daily document per browser/day.
// A client-side counter can be manipulated; do not use it for business-critical analytics.
// For reliable statistics, move increments to a trusted Cloud Function and enable App Check.
async function recordVisit() {
  if (!configured || !db) return;
  const today = new Date().toISOString().slice(0, 10);
  const ref = doc(db, "visitorStats", today);
  try {
    const snap = await getDoc(ref);
    const current = snap.exists() ? Number(snap.data().visits || 0) : 0;
    await setDoc(ref, { date: today, visits: current + 1, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.info("Visitor statistics are not enabled or permitted by current rules.", error);
  }
}
recordVisit();

// Optional dynamic projects: when publicProjects documents exist, replace the static project list.
// Static content remains visible if the collection is empty or not configured.
async function loadProjects() {
  const target = $("#project-list");
  if (!target || !configured || !db) return;
  try {
    const result = await getDocs(query(collection(db, "publicProjects"), orderBy("order", "asc"), limit(6)));
    if (result.empty) return;
    target.innerHTML = "";
    result.forEach((item) => {
      const data = item.data();
      const article = document.createElement("article");
      article.className = "project-card";
      const art = document.createElement("div");
      art.className = "project-art art-blue";
      const mark = document.createElement("span");
      mark.textContent = data.shortName || "PR";
      art.append(mark);
      const info = document.createElement("div");
      info.className = "project-info";
      const type = document.createElement("span");
      type.className = "project-type";
      type.textContent = data.category || "PROJECT";
      const title = document.createElement("h3");
      title.textContent = data.title || "Untitled project";
      const description = document.createElement("p");
      description.textContent = data.description || "";
      info.append(type, title, description);
      article.append(art, info);
      target.append(article);
    });
  } catch (error) {
    console.info("Showing built-in project examples.", error);
  }
}
loadProjects();
