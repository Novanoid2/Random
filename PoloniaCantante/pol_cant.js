//current todo: SVG na stałe w HTML, w JS zmieniaj `left / top`, search for bugs/things to shorten, zrobic rozne wersje, gotowy
const langs = ["PL", "EN", "NL", "FR"];
const linkLang = window.location.href.slice(-7).replace(/\.html/, "");
const current_lang = langs.includes(linkLang) ? linkLang : "NL" || "EN";
langs.splice(langs.indexOf(current_lang), 1);
let current1, current2;
let tmp1, tmp2;

function fetchDataAndApply() {
    fetch('https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/koncertyInfo.json')
        .then(raw => {
            if (raw.ok) return raw.json();
            showErrorDiv('Mrn: Fetch failed in koncertyInfo.json');
        })
        .then(data => {
            tmp1 = data;
            if (tmp1 !== current1) {
                const koncert = document.querySelectorAll(".koncerty");
                data.concerts.forEach((info, i) => {
                    const box = koncert[i];
                    if (!box) return;

                    box.querySelector("img").src = info.src;
                    box.querySelector(".dates").innerHTML = info.date;
                    box.querySelector(".times").innerHTML = info.time;
                    box.querySelector(".adresses").innerHTML = info.adress;
                    box.querySelector(".prices").innerHTML = "€" + info.price;
                });
                current1 = tmp1;
            }
        }).catch(err => showErrorDiv(err + " from koncerty.json"))
        .then(() => {
            fetch(`https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/languages.json`)
                .then(raw => {
                    if (raw.ok) return raw.json();
                    showErrorDiv('Mrn: Fetch failed in languages.json');
                }).then(data => {
                    data = data[current_lang];
                    tmp2 = data;
                    for (let key in data) {
                        let el = document.getElementById(key);
                        if (el) el.innerHTML = data[key];
                        else console.warn(`Mrn: Element with id '${key}' not found in html.`);
                    }
                }).catch(err => showErrorDiv(err + " from languages.json"));
        });
}
fetchDataAndApply();
setInterval(() => {
    fetchDataAndApply();
}, 60000)

const ML = window.innerWidth <= 1350 ? -26 : -23; //ML = margin-left for lang links
document.getElementById("langBox").innerHTML += `<ul style="font-family: Kepler;">
          <a href='#' style="margin-left: -35px;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[0]}.html" style="margin-left: ${ML}px;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[1]}.html" style="margin-left: ${ML}px;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[2]}.html" style="margin-left: ${ML}px;">${langs[2]}</a>
        </ul>`;

function adjustBoxes(delSVG) {
    for (let helpBox of ["langBox", "contactInfoBox", "pomocBox"]) {
        const box = document.getElementById(helpBox);
        if (delSVG) box.querySelector("svg")?.remove();
        const buttonPos = helpBox === 'langBox' ? document.getElementById("lang").getBoundingClientRect() : (helpBox === "contactInfoBox" ? document.getElementById("dolacz").getBoundingClientRect() : document.getElementById("pomoc").getBoundingClientRect());
        const boxPos = box.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (window.innerWidth < 950) {
            if (helpBox === 'langBox') {
                box.style.left = `${buttonPos.left - boxPos.width - 60}px`;
                box.style.top = `${buttonPos.top / 2 + scrollY / 2}px`;
            } else {
                box.style.transform = "none";
                box.style.left = `${buttonPos.left - boxPos.width - 30}px`;
                box.style.top = `${buttonPos.top + scrollY - buttonPos.height / 2}px`;
            }

        } else {
            if (helpBox === 'langBox') {
                box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2) - 5}px`;
            } else {
                box.style.left = `${buttonPos.left + buttonPos.width / 2}px`;
                box.style.transform = `translateX(-50%)`;
            }

            if (window.innerWidth <= screen.width * 0.6) box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 40}px`;
            else box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 30}px`;
        }

        if (window.innerWidth < 950) {
            box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: 17px; right: -30px;">
                                    <polygon points="20,10 0,0 0,20" fill="white" />
                                  </svg>`;
        } else {
            if (helpBox === 'langBox') {
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: -18px; right: ${boxPos.width / 3.8}px;">
                                <polygon points="15,0 0,20 30,20" fill="white" />
                             </svg>`;
            } else {
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: -19px; right: ${boxPos.width / 2 - 15}px;">
                                <polygon points="15,0 0,20 30,20" fill="white" />
                             </svg>`;
            }
        }

        box.setAttribute("hidden", "");
    }

    const ML = window.innerWidth <= 1350 ? -26 : -23; //ML = margin-left for lang links
    let order = 1;
    for (let tag of document.getElementById("langBox").querySelectorAll("a")) {
        order != 1 ? tag.style.marginLeft = `${ML}px` : null;
        order++;
    }
}

setTimeout(() => {
    adjustBoxes();
}, 75); //please dont abuse this time frame🙏
let allowError = true;

async function showErrorDiv(info) {
    if (allowError) {
        allowError = false;
        document.getElementById("errorMsg").removeAttribute("hidden");
        console.error("Mrn: error from: " + info);
    } else console.log("Mrn: Error div blocked from " + info);
}

document.querySelectorAll("g ol li img").forEach(img => {
    img.src = "pics/placeholder.jpg";
    img.alt = "wtf happened";
});

function toggleBox(id) {
    let arr = ["langBox", "contactInfoBox", "pomocBox"];
    if (id === "all") for (let box of arr) { document.getElementById(box).removeAttribute("hidden"); document.getElementById(box).style.opacity = 0; }
    else {
        arr.splice(arr.indexOf(id), 1);
        for (let other of arr) {
            document.getElementById(other).setAttribute("hidden", "");
            document.getElementById(other).style.opacity = 0;
        }
        const box = document.getElementById(id);

        if (box.hasAttribute("hidden")) {
            box.removeAttribute("hidden");
            setTimeout(() => box.style.opacity = 1, 10);
        } else {
            box.setAttribute("hidden", "");
            setTimeout(() => box.style.opacity = 0, 10);
        }
    }
}

function scrollToId(id) {
    if (id === 'boxKoncerty') document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
}

window.addEventListener('resize', () => { toggleBox("all"); setTimeout(() => { adjustBoxes(true) }, 75); });

//document.documentElement.style.setProperty(`--dl`, `PL`);
//console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');