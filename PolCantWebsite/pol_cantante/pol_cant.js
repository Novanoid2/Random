let current_lang = navigator.language.toUpperCase();
let langs = [`PL`, "EN", "NL", "FR"];
let boxesExist = false;

async function getData() {
    let data = await fetch(`https://api.github.com/repos/Novanoid2/Random/contents/PolCantWebsite/pol_cantante/info.json`)
        .then(d => d.json())
        .then(d =>
            fetch(
                `https://api.github.com/repos/Novanoid2/random/git/blobs/${d.sha}`
            )
        )
        .then(d => d.json())
        .then(d => JSON.parse(atob(d.content)));
    applyData(data)
}

getData();

async function applyData(file) {
    for (let key in file) {
        let el = document.getElementById(key)
        if (el) {
            if (/prz[0-3]b/.test(key)) el.innerHTML = file[key].replace(" e", " €");
            else el.innerHTML = file[key];
        }
    }
}

for (let lang in arr = ["zdjęcia", "pictures", "fotos", "photos"]) {//PL, EN, NL, FR
    if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === arr[lang]) {
        current_lang = langs[lang];
        langs.splice(lang, 1);
    }
}

document.getElementById("lang").onclick = () => {
    if (!document.body.contains((document.getElementById("langBox")))) {
        if ((document.body.contains(document.getElementById("contactInfoBox")))) document.body.removeChild(document.getElementById("contactInfoBox"));
        if ((document.body.contains(document.getElementById("pomocBox")))) document.body.removeChild(document.getElementById("pomocBox"));

        const lang = document.getElementById("lang").getBoundingClientRect();
        const div = document.createElement("div");

        if (window.innerWidth - (lang.left + lang.width / 2 - 50) < 100) div.style = `position: absolute;
        top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 90}px; background-color: white;
        height: 170px; width: 98px; z-index: 2; border-radius: 20px; opacity: 0; transition: opacity 0.7s; box-shadow: 0px 0px 25px black`;

        else div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 50}px;
        background-color: white; height: 170px; width: 100px; z-index: 1; border-radius: 20px; opacity: 0;
        transition: opacity 0.7s; box-shadow: 0px 0px 25px black`;

        div.id = "langBox";
        div.innerHTML = `<ul>
          <a href="http://127.0.0.1:5500/PolCantWebsite/pol_cantante/pol_cant${current_lang}.html" style="margin-left: -24px; font-family: Kepler; font-size: 1.8rem;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/PolCantWebsite/pol_cantante/pol_cant${langs[0]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PolCantWebsite/pol_cantante/pol_cant${langs[1]}.html" style="margin-left: -10px; font-family: Kepler; font-size: 1.8rem;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/PolCantWebsite/pol_cantante/pol_cant${langs[2]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">${langs[2]}</a>
        </ul>`;

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

        //holy shit why is this so long
        div.style = `position: absolute; left: ${buttonPos.left + buttonPos.width / 2 - 175}px;
        top: ${buttonPos.top + buttonPos.height + 20}px; background-color: white; height: 175px; width: 355px;
        z-index: 1; opacity: 0; transition: opacity 0.7s; border-radius: 20px; font-size: 1.5rem;
        font-weight: bold; text-align: center; opacity: 0; transition: opacity 1s; box-shadow: 0px 0px 25px black`;

        div.id = "contactInfoBox";
        div.innerHTML = `<hr style="border: none;">
              Kontakt z nami: 
            <hr style="width: 80%;">
            &middot; +32 nie wiem
            <br>
              lub
            <br>
            &middot; jakis_tam@email.com`;

        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("contactInfoBox"));
}
//todo
document.getElementById("pomoc").onclick = () => {
    if (!document.body.contains((document.getElementById("pomocBox")))) {
        if ((document.body.contains(document.getElementById("langBox")))) document.body.removeChild(document.getElementById("langBox"));
        if ((document.body.contains(document.getElementById("contactInfoBox")))) document.body.removeChild(document.getElementById("contactInfoBox"));
        const buttonPos = document.getElementById("pomoc").getBoundingClientRect();
        const div = document.createElement("div");

        //holy shit why is this so long
        div.style = `position: absolute; left: ${buttonPos.left + buttonPos.width / 2 - 175}px;
        top: ${buttonPos.top + buttonPos.height + 20}px; background-color: white; height: 175px; width: 355px;
        z-index: 1; opacity: 0; transition: opacity 0.7s; border-radius: 20px; font-size: 1.5rem;
        font-weight: bold; text-align: center; opacity: 0; transition: opacity 1s; box-shadow: 0px 0px 25px black`;

        div.id = "pomocBox";
        div.innerHTML = `<hr style="border: none;">
              Kontakt z nami: 
            <hr style="width: 80%;">
            &middot; +32 nie wiem
            <br>
              lub
            <br>
            &middot; jakis_tam@email.com`;

        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("contactInfoBox"));
}

document.getElementById('onas').onclick = () => document.getElementById('boxONas-border').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('koncert').onclick = () => document.getElementById('boxKoncerty-border').scrollIntoView({ behavior: "smooth", block: "center" });

//document.getElementById('bilet').onclick = () => document.getElementById('boxBilety-border').scrollIntoView({ behavior: 'smooth' });

//document.getElementById('pomoc').onclick = () => document.getElementById('boxPomoc-border').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('zdjecia').onclick = () => document.getElementById('boxZdjecia-border').scrollIntoView({ behavior: "smooth", block: "center" });

//document.getElementById('dolacz').onclick = () => document.getElementById('boxDolacz-border').scrollIntoView({ behavior: "smooth", block: "center" });

window.addEventListener('resize', () => { location.reload(); });

document.documentElement.style.setProperty(`--dl`, `Pl`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 22px;');