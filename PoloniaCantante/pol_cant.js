/*current todo: fix navBoxes pos when pionowo, media queries, search for bugs/things to shorten, done
zrobic rozne wersje*/
const langs = ["PL", "EN", "NL", "FR"];
const valueArr = ["zdjęcia", "pictures", "fotos", "photos"] //PL, EN, NL, FR
const place = valueArr.indexOf(document.getElementById("zdjecia").textContent.trim().toLowerCase());
let current_lang = langs[place] || "EN";
langs.splice(place, 1);

fetch('https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/koncertyInfo.json')
    .then(raw => {
        if (raw.ok) return raw.json();
        makeErrorDiv('Mrn: Fetch failed in koncertyInfo.json');
    })
    .then(data => {
        for (let key in data) {
            let el = document.getElementById(key);
            if (el) {
                if (/prz[0-3]b/.test(key)) el.innerHTML = data[key].replace("e", "€");
                else el.innerHTML = data[key];
            } else console.warn(`Mrn: Element with id '${key}' not found in html.`);
        }
    }).catch(err => makeErrorDiv(err + 'from koncertyInfo.json'));

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

const ML = window.innerWidth <= 1350 ? -26 : -22; //ML = margin-left for lang links
document.getElementById("langBox").innerHTML += `<ul>
          <a href='#' style="margin-left: -35px; font-family: Kepler;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[0]}.html" style="margin-left: ${ML}px; font-family: Kepler;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[1]}.html" style="margin-left: ${ML}px; font-family: Kepler;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[2]}.html" style="margin-left: ${ML}px; font-family: Kepler;">${langs[2]}</a>
        </ul>`;

setTimeout(() => {
    for (let helpBox of ["langBox", "contactInfoBox", "pomocBox"]) {
        const box = document.getElementById(helpBox);
        const buttonPos = helpBox === 'langBox' ? document.getElementById("lang").getBoundingClientRect() : (helpBox === "contactInfoBox" ? document.getElementById("dolacz").getBoundingClientRect() : document.getElementById("pomoc").getBoundingClientRect());
        const boxPos = box.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (helpBox === 'langBox') box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2) - 15}px`;
        else {
            box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2)}px`;
            box.innerHTML += `<svg width="30" height="20" style="position: absolute; top: -19px; right: ${boxPos.width / 2 - 15}px;">
                                <polygon points="15,0 0,20 30,20" fill="white" />
                             </svg>`;
        }

        if (window.innerWidth <= screen.width * 0.6) box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 40}px`;
        else box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 30}px`;

        box.setAttribute("hidden", "");
    }


    if (window.innerWidth <= 545) {
        const w = document.getElementById("welcome");
        if (current_lang === 'PL') w.innerHTML = "Wiatmy na stronie<br>Polonia Cantante!";
        else if (current_lang === 'EN') w.innerHTML = "Welcome to the<br>Polonia Cantane website!";
        else if (current_lang === 'NL') w.innerHTML = "Welkom bij de website<br>van Polonia Cantante!";
        else w.innerHTML = "Bienvenu(e) sur le site<br>de Polonia Cantante!";//FR

        document.getElementById("welcomeDiv").style.height = `10vh`;
    }
}, 80);//please dont abuse this time frame🙏

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
    for (let other of arr) { document.getElementById(other).setAttribute("hidden", ""); document.getElementById(other).style.opacity = 0; }
    const box = document.getElementById(id);

    if (box.hasAttribute("hidden")) {
        box.removeAttribute("hidden");
        setTimeout(() => box.style.opacity = 1, 10);
    } else {
        box.setAttribute("hidden", "");
        box.style.opacity = 0;
    }
}

function scrollToId(id) {
    if (id === 'boxKoncerty') document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
}

//.navBar style for small screens
if (window.innerWidth < 1050) {
    document.getElementById("navBar").style.flexDirection = "column-reverse";
    document.getElementById("navBar").style.alignItems = "center";
    document.getElementById("navBar").style.gap = "15px";
}

window.addEventListener('resize', () => { location.reload(); });

document.documentElement.style.setProperty(`--dl`, `PL`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');