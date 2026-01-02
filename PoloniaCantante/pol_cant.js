//current todo: add placeholders in grupy, button go back in bilety, fn to check from time to time the json's, search for bugs/things to shorten, zrobic rozne wersje, gotowy
const langs = ["PL", "EN", "NL", "FR"];
const linkLang = window.location.href.slice(-7).replace(/\.html/, "");
const current_lang = langs.includes(linkLang) ? linkLang : "NL" || "EN";
langs.splice(langs.indexOf(current_lang), 1);

fetch('https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/koncertyInfo.json')
    .then(raw => {
        if (raw.ok) return raw.json();
        makeErrorDiv('Mrn: Fetch failed in koncertyInfo.json');
    })
    .then(data => {
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
    }).then(() => {
        fetch(`https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/languages.json`)
            .then(raw => {
                if (raw.ok) return raw.json();
                makeErrorDiv('Mrn: Fetch failed in languages.json');
            }).then(data => {
                data = data[current_lang]
                for (let key in data) {
                    let el = document.getElementById(key);
                    if (el) el.innerHTML = data[key];
                    else console.warn(`Mrn: Element with id '${key}' not found in html.`);
                }
            }).catch(err => makeErrorDiv(err + " from languages.json"));
    });

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

setTimeout(() => {
    for (let helpBox of ["langBox", "contactInfoBox", "pomocBox"]) {
        const box = document.getElementById(helpBox);
        const buttonPos = helpBox === 'langBox' ? document.getElementById("lang").getBoundingClientRect() : (helpBox === "contactInfoBox" ? document.getElementById("dolacz").getBoundingClientRect() : document.getElementById("pomoc").getBoundingClientRect());
        const boxPos = box.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (window.innerWidth < 950) {
            if (helpBox === 'langBox') {
                box.style.left = `${buttonPos.left - boxPos.width - 60}px`;
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: 17px; right: -30px;">
                                    <polygon points="20,10 0,0 0,20" fill="white" />
                                  </svg>`;
                box.style.top = `${buttonPos.top / 2 + scrollY / 2}px`;
            } else {
                box.style.left = `${buttonPos.left - boxPos.width - 30}px`;
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: 17px; right: -30px;">
                                    <polygon points="20,10 0,0 0,20" fill="white" />
                                  </svg>`;
                box.style.top = `${buttonPos.top + scrollY - buttonPos.height / 2}px`;
            }

        } else {
            if (helpBox === 'langBox') {
                box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2) - 15}px`;
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: -19px; right: ${boxPos.width / 2 - 25}px;">
                                <polygon points="15,0 0,20 30,20" fill="white" />
                             </svg>`;
            } else {
                box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2)}px`;
                box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: -19px; right: ${boxPos.width / 2 - 15}px;">
                                <polygon points="15,0 0,20 30,20" fill="white" />
                             </svg>`;
            }

            if (window.innerWidth <= screen.width * 0.6) box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 40}px`;
            else box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 30}px`;
        }

        box.setAttribute("hidden", "");
    }

    if (window.innerWidth <= 680) {
        console.log(1321);
        const w = document.getElementById("welcome");
        if (current_lang === 'PL') w.innerHTML = "Wiatmy na stronie<br>Polonia Cantante!";
        else if (current_lang === 'EN') w.innerHTML = "Welcome to the<br>Polonia Cantane website!";
        else if (current_lang === 'NL') w.innerHTML = "Welkom bij de website<br>van Polonia Cantante!";
        else w.innerHTML = "Bienvenu(e) sur le site<br>de Polonia Cantante!";//FR
    }
}, 75);//please dont abuse this time frame🙏

let allowError = true;

async function makeErrorDiv(info) {
    if (allowError) {
        allowError = false;
        document.getElementById("errorMsg").removeAttribute("hidden");
        console.error("Mrn: error from: " + info);
    } else console.log("Mrn: Error div blocked from " + info);
}

function toggleBox(id) {
    let arr = ["langBox", "contactInfoBox", "pomocBox"];
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

function scrollToId(id) {
    if (id === 'boxKoncerty') document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
}

window.addEventListener('resize', () => { location.reload(); });

document.documentElement.style.setProperty(`--dl`, `PL`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');