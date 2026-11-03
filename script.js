const $ = (s) => document.querySelector(s);
const cache = {};

// Photo + summary from Wikipedia (no key needed)
async function info(place) {
  if (cache[place.wiki]) return cache[place.wiki];
  try {
    const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(place.wiki));
    const d = await r.json();
    return (cache[place.wiki] = { img: d.thumbnail?.source || "", text: d.extract || "", url: d.content_urls?.desktop?.page || "" });
  } catch { return { img: "", text: "", url: "" }; }
}

// ---- World map ----
const map = L.map("worldmap", { worldCopyJump: true, minZoom: 2 }).setView([22, 15], 2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18, attribution: "© OpenStreetMap contributors",
}).addTo(map);

const markers = {};
PLACES.forEach((p) => {
  markers[p.name] = L.marker([p.lat, p.lng], { title: p.name }).addTo(map).on("click", () => show(p));
});

async function show(p) {
  map.flyTo([p.lat, p.lng], 6, { duration: 1.1 });
  $("#panel").innerHTML = `<p class="empty">Loading ${p.name}…</p>`;
  const i = await info(p);
  const dir = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
  $("#panel").innerHTML = `
    ${i.img ? `<img src="${i.img}" alt="${p.name}">` : ""}
    <div class="body">
      <h3>${p.name}</h3><p class="country">${p.country} · ${p.continent}</p>
      <p>${i.text.slice(0, 340)}${i.text.length > 340 ? "…" : ""}</p>
      <div class="facts"><p><b>Best time:</b> ${p.best}</p><p><b>Guide tip:</b> ${p.tip}</p></div>
      <a class="btn" target="_blank" rel="noopener" href="${dir}">Get directions</a>
      ${i.url ? ` <a href="${i.url}" target="_blank" rel="noopener">Read more</a>` : ""}
    </div>`;
  if (window.innerWidth < 900) $("#panel").scrollIntoView({ behavior: "smooth" });
}

// ---- Place cards with filters ----
const continents = ["All", ...new Set(PLACES.map((p) => p.continent))];
let active = "All";

function drawFilters() {
  $("#filters").innerHTML = continents.map((c) => `<button class="${c === active ? "on" : ""}" data-c="${c}">${c}</button>`).join("");
}
function drawGrid() {
  const list = PLACES.filter((p) => active === "All" || p.continent === active);
  $("#grid").innerHTML = list.map((p, n) => `
    <button class="card" data-n="${p.name}"><img alt="${p.name}" loading="lazy"><div><h3>${p.name}</h3><p>${p.country}</p></div></button>`).join("");
  list.forEach(async (p) => {
    const i = await info(p);
    const img = document.querySelector(`.card[data-n="${CSS.escape(p.name)}"] img`);
    if (img && i.img) img.src = i.img;
  });
}
$("#filters").addEventListener("click", (e) => {
  if (e.target.dataset.c) { active = e.target.dataset.c; drawFilters(); drawGrid(); }
});
$("#grid").addEventListener("click", (e) => {
  const c = e.target.closest(".card");
  if (!c) return;
  const p = PLACES.find((x) => x.name === c.dataset.n);
  $("#map").scrollIntoView({ behavior: "smooth" });
  show(p);
});
drawFilters(); drawGrid();

// ---- Guides ----
$("#guideList").innerHTML = GUIDES.map((g) => `
  <article class="guide"><h3>${g.name}</h3><p class="r">${g.region}</p><p>${g.note}</p>
  <p><b>Languages:</b> ${g.langs}</p><p><b>From:</b> ${g.price}</p>
  <a class="btn" href="#contact" data-guide="${g.name}">Ask ${g.name.split(" ")[0]}</a></article>`).join("");
$("#guideList").addEventListener("click", (e) => {
  const g = e.target.dataset.guide;
  if (g) { $("[name=topic]").value = "Hire a guide"; $("[name=message]").value = `Hi, I would like to book ${g}. `; }
});

// ---- Contact form: sends an email through the Python server ----
$("#contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg"), btn = $("#sendBtn");
  btn.disabled = true; msg.className = "formmsg"; msg.textContent = "Sending…";
  try {
    const res = await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(f))),
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || "Could not send.");
    msg.className = "formmsg ok"; msg.textContent = d.note || "Thanks! We will reply by email soon.";
    f.reset();
  } catch (err) { msg.className = "formmsg err"; msg.textContent = err.message; }
  btn.disabled = false;
});
