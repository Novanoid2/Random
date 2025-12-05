/*current todo: find out why changing width theres a bar on the bottom? (something to do w .boxes), 
make seperate web for bilety, search for bugs/things to shorten translate \/ to other langs, zrob .nav pionowo i done
(4 objects w translations for each language, the translations get applied from current_lang)?*/
getData();

async function getData() {
    try {
        const raw = await fetch(`https://raw.githubusercontent.com/Novanoid2/Random/main/PoloniaCantante/info.json`);
        if (raw.ok) {
            const data = await raw.json();
            applyData(data);
            return;
        }
        makeErrorDiv();
    } catch (err) {
        console.error(err);
        makeErrorDiv();
    }
}

async function applyData(file) {
    for (let key in file) {
        let el = document.getElementById(key);
        if (el) {
            if (/prz[0-3]b/.test(key)) el.innerHTML = file[key].replace(" e", " €");
            else el.innerHTML = file[key];
        } else {
            console.warn(`Element with id ${key} not found.`);
            makeErrorDiv();
        }
    }
}

async function makeErrorDiv() {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Wystąpił błąd po naszej stronie, możliwe że niektóre informacje nie są poprawnie. Pracujemy nad rozwiązaniem.";
    errorDiv.style = "position: absolute; top: 200px; width: 80%; text-align: center; background-color: red; color: white; font-size: 1.3vw; padding: 10px; z-index: 1; left: 50%; transform: translateX(-50%);";
    document.body.appendChild(errorDiv);
}

let current_lang = navigator.language.toUpperCase();
let langs = [`PL`, "EN", "NL", "FR"];

document.getElementById("lang").onclick = () => {
    document.getElementById("contactInfoBox").setAttribute("hidden", "");
    document.getElementById("pomocBox").setAttribute("hidden", "");
    const box = document.getElementById("langBox");
    const buttonPos = document.getElementById("lang").getBoundingClientRect();

    if (box.hasAttribute("hidden")) {
        if (window.innerWidth - (buttonPos.left + buttonPos.width / 2 - 50) < 100) {
            box.style.left = `${buttonPos.left + buttonPos.width / 2 - 87}px`;
            box.style.top = `${buttonPos.top + buttonPos.height + 20}px`;
        } else {
            box.style.left = `${buttonPos.left + buttonPos.width / 2 - 47}px`;
            box.style.top = `${buttonPos.top + buttonPos.height + 20}px`;
        }

        box.innerHTML = `<ul>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${current_lang}.html" style="margin-left: -24px; font-family: Kepler; font-size: 1.6rem;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[0]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.6rem;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[1]}.html" style="margin-left: -10px; font-family: Kepler; font-size: 1.6rem;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[2]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.6rem;">${langs[2]}</a>
        </ul>
        <hr style="border: none;">
         <svg width="30" height="20" style="position: absolute; top: -20px; right: 30px;">
        <polygon points="15,10 0,20 30,20" fill="white" />
        </svg>`;

        box.removeAttribute("hidden");
        setTimeout(() => box.style.opacity = 1, 10);
    } else {
        box.setAttribute("hidden", "");
        box.style.opacity = 0;
    }
}

document.getElementById("dolacz").onclick = () => {
    document.getElementById("langBox").setAttribute("hidden", "");
    document.getElementById("pomocBox").setAttribute("hidden", "");
    const box = document.getElementById("contactInfoBox");
    const buttonPos = document.getElementById("dolacz").getBoundingClientRect();
    if (box.hasAttribute("hidden")) {
        box.style.left = `${buttonPos.left + buttonPos.width / 2 - 150}px`;
        box.style.top = `${buttonPos.top + buttonPos.height + 40}px`;
        box.removeAttribute("hidden");
        setTimeout(() => box.style.opacity = 1, 10);
    } else {
        box.setAttribute("hidden", "");
        box.style.opacity = 0;
    }
}

document.getElementById("pomoc").onclick = () => {
    document.getElementById("langBox").setAttribute("hidden", "");
    document.getElementById("contactInfoBox").setAttribute("hidden", "");
    const box = document.getElementById("pomocBox");
    const buttonPos = document.getElementById("pomoc").getBoundingClientRect();
    if (box.hasAttribute("hidden")) {
        box.style.left = `${buttonPos.left + buttonPos.width / 2 - 250}px`;
        box.style.top = `${buttonPos.top + buttonPos.height + 40}px`;
        console.log(buttonPos);
        box.removeAttribute("hidden");
        setTimeout(() => box.style.opacity = 1, 10);
    } else {
        box.setAttribute("hidden", "");
        box.style.opacity = 0;
    }
}

document.getElementById('onas').onclick = () => document.getElementById('boxONas').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('koncert').onclick = () => document.getElementById('boxKoncerty').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('proby').onclick = () => document.getElementById('boxProby').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('zdjecia').onclick = () => document.getElementById('boxZdjecia').scrollIntoView({ behavior: "smooth", block: "center" });

for (let lang in arr = ["zdjęcia", "pictures", "fotos", "photos"]) {//PL, EN, NL, FR
    if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === arr[lang]) {
        current_lang = langs[lang];
        langs.splice(lang, 1);
    }
}

if (window.innerWidth < 545) document.getElementById("h1").innerHTML = `Witamy na stronie<br>Polonia Cantante!`

//if (window.innerWidth < 1050)

window.addEventListener('resize', () => { location.reload(); });

document.documentElement.style.setProperty(`--dl`, `PL`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 22px;');