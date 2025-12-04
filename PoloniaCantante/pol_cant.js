/*current todo: finish proby(make a second swiper somehow), find out why changing width theres a bar on the bottom? (something to do w .boxes), 
make seperate web for bilety, search for bugs/things to shorten translate to other langs and done*/
//change the popping-up info boxes to html w "aria-hidden" or whatev and not a long ass javascript command lol
//for later -> use document.getElementById("test").removeAttribute("hidden"); because i just tested it and it works! yippie

function pushErrorDiv() {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "We have encountered an error, some parts of the website may not work correctly, we are working on a fix.";
    errorDiv.style = "position: absolute; top: 200px; width: 80%; text-align: center; background-color: red; color: white; font-size: 1.3vw; padding: 10px; z-index: 1; left: 50%; transform: translateX(-50%);";
    document.body.appendChild(errorDiv);
}

getData();

async function getData() {
    try {
        const raw = await fetch(`https://raw.githubusercontent.com/Novanoid2/Random/main/PoloniaCantante/info.json`);
        if (raw.ok) {
            const data = await raw.json();
            applyData(data);
            return;
        }
        pushErrorDiv();
    } catch (err) {
        console.error(err);
        pushErrorDiv();
    }
}

async function applyData(file) {
    for (let key in file) {
        let el = document.getElementById(key);
        if (el) {
            if (/prz[0-3]b/.test(key)) el.innerHTML = file[key].replace(" e", " €");
            else el.innerHTML = file[key];
        }
    }
}

let current_lang = navigator.language.toUpperCase();
let langs = [`PL`, "EN", "NL", "FR"];

document.getElementById("lang").onclick = () => {
    if (!document.body.contains((document.getElementById("langBox")))) {
        if ((document.body.contains(document.getElementById("contactInfoBox")))) document.body.removeChild(document.getElementById("contactInfoBox"));
        if ((document.body.contains(document.getElementById("pomocBox")))) document.body.removeChild(document.getElementById("pomocBox"));

        const lang = document.getElementById("lang").getBoundingClientRect();
        const div = document.createElement("div");
        //holy shit why is this so long
        if (window.innerWidth - (lang.left + lang.width / 2 - 50) < 100) div.style = `position: absolute;
        top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 87}px; background-color: white;
        height: auto; width: 90px; border-radius: 20px; opacity: 0; transition: opacity 0.8s;
        box-shadow: 0px 0px 25px black font-family: Palatino`;

        else div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 47}px;
        background-color: white; height: auto; width: 90px; border-radius: 20px; opacity: 0;
        transition: opacity 0.8s; box-shadow: 0px 0px 25px black; font-family: Palatino; z-index: 2;`;

        div.id = "langBox";
        div.innerHTML = `<ul>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${current_lang}.html" style="margin-left: -24px; font-family: Kepler; font-size: 1.6rem;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[0]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.6rem;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[1]}.html" style="margin-left: -10px; font-family: Kepler; font-size: 1.6rem;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PoloniaCantante/pol_cant${langs[2]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.6rem;">${langs[2]}</a>
        </ul>
        <hr style="border: none;">`;

        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("langBox"));
}

document.getElementById("dolacz").onclick = () => {
    if (!document.body.contains((document.getElementById("contactInfoBox")))) {
        if ((document.body.contains(document.getElementById("langBox")))) document.body.removeChild(document.getElementById("langBox"));
        if ((document.body.contains(document.getElementById("pomocBox")))) document.body.removeChild(document.getElementById("pomocBox"));
        const buttonPos = document.getElementById("dolacz").getBoundingClientRect();
        const div = document.createElement("div");

        div.style = `position: absolute; left: ${buttonPos.left + buttonPos.width / 2 - 175}px;
        top: ${buttonPos.top + buttonPos.height + 20}px; background-color: white; height: auto; width: 350px;
        opacity: 0; transition: opacity 0.7s; border-radius: 20px; font-size: 1.4rem; z-index: 2;
        font-weight: bold; text-align: center; opacity: 0; transition: opacity 0.8s; box-shadow: 0px 0px 25px black`;

        div.id = "contactInfoBox";
        div.innerHTML = `<hr style="border: none;">
         Chcesz dołączyć do nas?
         Kontakt z nami:
        <hr style="width: 80%;">
        &middot; +32 nie wiem
        <br>
        lub
        <br>
        &middot; jakis_tam@email.com
        <hr style="border: none;">`;

        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("contactInfoBox"));
}

document.getElementById("pomoc").onclick = () => {
    if (!document.body.contains((document.getElementById("pomocBox")))) {
        if ((document.body.contains(document.getElementById("langBox")))) document.body.removeChild(document.getElementById("langBox"));
        if ((document.body.contains(document.getElementById("contactInfoBox")))) document.body.removeChild(document.getElementById("contactInfoBox"));
        const buttonPos = document.getElementById("pomoc").getBoundingClientRect();
        const div = document.createElement("div");

        div.style = `position: absolute; left: ${buttonPos.left + buttonPos.width / 2 - 175}px;
        top: ${buttonPos.top + buttonPos.height + 20}px; background-color: white; height: auto; width: 355px;
        opacity: 0; transition: opacity 0.7s; border-radius: 20px; font-size: 1.4rem; z-index: 2;
        font-weight: bold; text-align: center; opacity: 0; transition: opacity 0.8s; box-shadow: 0px 0px 25px black`;

        div.id = "pomocBox";
        div.innerHTML = `<hr style="border: none;">
            Można nas wesprzeć na tym koncie: 
            <hr style="width: 80%;">
            &middot; BE10 xxxx xxxx xxxx
            <hr style="border: none;">`;

        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("pomocBox"));
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