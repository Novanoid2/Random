let current_lang;
let langs = ["PL", "EN", "NL", "FR"];

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

if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === "zdjęcia") { current_lang = "PL"; langs.splice(0, 1); }
else if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === "pictures") { current_lang = "EN"; langs.splice(1, 1); }
else if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === "fotos") { current_lang = "NL"; langs.splice(2, 1); }
else if (document.getElementById("zdjecia").textContent.trim().toLowerCase() === "photos") { current_lang = "FR"; langs.splice(3, 1); }

document.getElementById("lang").onclick = function () {
    if (!document.body.contains((document.getElementById("langBox")))) {
        let lang = document.getElementById("lang").getBoundingClientRect();
        let div = document.createElement("div");
        if (window.innerWidth - (lang.left + lang.width / 2 - 50) < 100) div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 90}px; background-color: white; height: 170px; width: 98px; z-index: 2; border-radius: 20px; opacity: 0; transition: opacity 0.7s;`;
        else div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 50}px; background-color: white; height: 170px; width: 98px; z-index: 2; border-radius: 20px; opacity: 0; transition: opacity 0.7s;`;
        div.id = "langBox";
        div.innerHTML = `<ul>
          <a href="http://127.0.0.1:5500/pol_cantante/pol_cant${current_lang}.html" style="margin-left: -24px; font-family: Kepler; font-size: 1.8rem;"><strong>>${current_lang}<</strong></a>
          <br>
          <a href="http://127.0.0.1:5500/pol_cantante/pol_cant${langs[0]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">${langs[0]}</a>
          <br>
          <a href="http://127.0.0.1:5500/pol_cantante/pol_cant${langs[1]}.html" style="margin-left: -10px; font-family: Kepler; font-size: 1.8rem;">${langs[1]}</a>
          <br>
          <a href="http://127.0.0.1:5500/pol_cantante/pol_cant${langs[2]}.html" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">${langs[2]}</a>
        </ul>`;
        document.body.appendChild(div);
        setTimeout(() => div.style.opacity = 1, 10);
    } else document.body.removeChild(document.getElementById("langBox"));
}

document.getElementById('onas').onclick = () => document.getElementById('boxONas-border').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('koncert').onclick = () => document.getElementById('boxKoncerty-border').scrollIntoView({ behavior: "smooth", block: "center" });

//document.getElementById('bilet').onclick = () => document.getElementById('boxBilety-border').scrollIntoView({ behavior: 'smooth' });

document.getElementById('pomoc').onclick = () => document.getElementById('boxPomoc-border').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('zdjecia').onclick = () => document.getElementById('boxZdjecia-border').scrollIntoView({ behavior: "smooth", block: "center" });

document.getElementById('dolacz').onclick = () => document.getElementById('boxDolacz-border').scrollIntoView({ behavior: "smooth", block: "center" });

//window.addEventListener('resize', () => { location.reload(); });

document.documentElement.style.setProperty(`--dl`, `Pl`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 22px;');