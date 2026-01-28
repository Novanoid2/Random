//current todo: update codepsace, 2 koncerty rocznie, koncert info pop out with transform thingy + title, search for bugs/things to shorten, dif wesbite versions, gotowe (= done)
//mami: koncerty: swiper + kazdy przeszly i przyszly (na bokach fade out), przeszle: guilt trip ze ne przyszli lol + info mineło
//|/kpe/ _ /kpe/ _ /k/ _ /k/ _ /kpy/ _ /kpy/ |
const langs = ["PL", "EN", "NL", "FR"];
const default_lang = "NL";
const cache_keys = ["key_langs", "key_concerts"];
let current_lang = langs.includes(default_lang) ? default_lang : "EN" || "PL";
langs.splice(langs.indexOf(current_lang), 1);
let currentVConcerts, currentVLangs;
let langChange = true;
let counter = 0;

async function loadKeys() {//load keys from cache
    for (let key of cache_keys) {
        const cached = localStorage.getItem(key);
        if (cached) {
            //passes data to applying function
            const data = JSON.parse(cached);
            //key === "key_langs" ? currentVLangs = data["v"] : currentVConcerts = data["v"];
            key === "key_langs" ? await applyData("languages", data, 18) : await applyData("koncertyInfo", data, 18);
        } else {
            //if no cache it fetches the jsons and get saved to localStorage in applyData();
            try {
                const data = key === "key_langs" ? await fetchData("languages", 22) : await fetchData("koncertyInfo", 22);
                key === "key_langs" ? await applyData("languages", data, 23) : await applyData("koncertyInfo", data, 23);
            } catch (e) {
                console.warn("Mrn: loadKeys: fetch failed, using fallback (aka cache you stupid)");
            }
        }
    }
}

async function fetchData(type, from) {//fetch jsons? lol
    console.log(`fetching data: ${type}...`, from);
    try {
        //actual fetch xd
        const fetched = await fetch(`https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/${type}.json`);
        if (!fetched.ok) {
            await showErrorDiv(`fetchData ${type}.json`);
            throw new Error(`Mrn: Fetch failed in datafetch ${type}.json`);
        }
        console.log(`finished fetching ${type}`, from); //kind of misleading but who cares really?
        return await fetched.json();
    } catch (err) {
        await showErrorDiv(`fetchData ${type}.json`);
        console.error(`Mrn: Wrong link in datafetch ${type}.json`, err);
        throw err;
    }
}

async function applyData(type, dataPassed, from) {//applies the jsons, duhhh
    console.log(`applying data: ${type}...`, from);

    if (type === "koncertyInfo") {
        const data = dataPassed || await fetchData(type, from);
        let tmpVConcerts = data["v"];
        if (tmpVConcerts !== currentVConcerts) { //if version is different
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
            localStorage.setItem("key_concerts", JSON.stringify(data)); //updates cache
            currentVConcerts = tmpVConcerts;
        }
    } else if (type === "languages") {
        let data = dataPassed || await fetchData(type, from);
        let tmpVLangs = data["v"];
        let dataLang = data[current_lang];
        if (tmpVLangs !== currentVLangs || langChange) { //if version is different or language changed
            langChange = false;
            for (let key in dataLang) {
                let el = document.getElementById(key);
                if (el) el.innerHTML = dataLang[key];
                else console.warn(`Mrn: Element with id '${key}' not found in html.`);
            }
            if (data["ppl"]) editGrupy(data["ppl"], 81);
            localStorage.setItem("key_langs", JSON.stringify(data)); //updates cache
            currentVLangs = tmpVLangs;
        }
    } else console.log("Hey ChatGPT, fix this! (none or wrong 'type' given in applyData)");
    console.log(`done applying data ${type}!!11!1`);
}

loadKeys(); //initial load from cache
setInterval(async () => {
    await applyData("languages", null, 91);
    await applyData("koncertyInfo", null, 92);
}, 1000 * 60 * 10); //check for updates every 10 min

//add the "onlick" attribute to change language accordingly
let order = 0;
for (let tag of document.querySelectorAll("#langBox a")) {
    let langs = ["PL", "EN", "NL", "FR"]; //shut up i know this is stupid
    tag.innerHTML = `${langs[order]}`;
    tag.setAttribute("onclick", `changeLang('${langs[order]}')`);
    order++;
}

function changeLang(lang) {
    current_lang = lang.toUpperCase();
    langChange = true;
    applyData("languages", JSON.parse(localStorage.getItem(cache_keys[0])), 107);
    adjustBoxes();
}

function editGrupy(dataPassed, from) {//adds / removes people from grupyBox
    console.log("editing grupy...", from);
    const grupyBox = document.getElementById("boxGrupy");
    dataPassed["rm"].forEach(name => {
        const li = grupyBox.querySelector(`li img[alt='${name}']`);
        if (li) li.parentElement.remove();
    });

    dataPassed["add"].forEach(name => {
        if (document.getElementById(name.split("_")[1]).contains(document.querySelector(`li[alt='${name.split("_")[0]}']`))) return;
        console.log(`Mrn: for debugging: ${name}`);
        const li = document.createElement("li");
        li.setAttribute("alt", name.split("_")[0]);
        const img = document.createElement("img");
        img.setAttribute("alt", name.split("_")[0]);
        img.onerror = function () {
            this.src = 'pics/placeholder.jpg'; // place your error.png image instead
        };
        img.src = `pics/headshot/${name.split("_")[0].toLowerCase().trim()}.png`;
        li.appendChild(img);
        const h3 = document.createElement("h3");
        h3.innerHTML = name.split("_")[0];
        li.appendChild(h3);
        document.getElementById(name.split("_")[1]).querySelector("ol").appendChild(li);
    });

    console.log("finished editing grupy");
}


function adjustBoxes() {
    for (let helpBox of ["langBox", "contactInfoBox", "pomocBox"]) {
        const box = document.getElementById(helpBox);
        const buttonPos = helpBox === 'langBox' ? document.getElementById("lang").getBoundingClientRect() : (helpBox === "contactInfoBox" ? document.getElementById("dolacz").getBoundingClientRect() : document.getElementById("pomoc").getBoundingClientRect());
        const boxPos = box.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        //Adjust the navBoxes positions
        if (window.innerWidth < 950) {
            if (helpBox === 'langBox') {
                box.style.left = `${buttonPos.left - boxPos.width - 60}px`;
                box.style.top = `${buttonPos.top / 2 + scrollY / 2}px`;
            } else {
                box.style.left = `${buttonPos.left - boxPos.width - 30}px`;
                box.style.top = `${buttonPos.top + scrollY - buttonPos.height / 2}px`;
            }

        } else {
            if (helpBox === 'langBox') box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2)}px`;
            else box.style.left = `${buttonPos.left + buttonPos.width / 2 - boxPos.width / 2}px`;

            if (window.innerWidth <= screen.width * 0.6) box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 40}px`;
            else box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 30}px`;
        }

        //Adjust svg position
        const newBoxPos = box.getBoundingClientRect();
        const svg = box.querySelector("svg");
        if (!svg) continue;
        const polygon = svg.querySelector("polygon");
        if (window.innerWidth < 950) {
            polygon.setAttribute("points", "20,10 0,0 0,20");
            svg.style.top = "17px";
            svg.style.left = 'auto';
            svg.style.right = "-30px";
        } else {
            polygon.setAttribute("points", "15,0 0,20 30,20");
            svg.style.top = "-18.5px";
            svg.style.right = 'auto';
            svg.style.left = `${newBoxPos.width / 2 - 15}px`;
        }

        box.setAttribute("hidden", ""); //hides navBoxes lol
        box.style.opacity = 0;
    }

    if (window.innerWidth <= 700) {
        const t = document.getElementById("welcome");
        if (current_lang === "PL") t.innerHTML = "Witamy na stronie<br>Polonia Cantante!";
        else if (current_lang === "EN") t.innerHTML = "Welcome to the<br>Polonia Cantante website!";
        else if (current_lang === "NL") t.innerHTML = "Welkom op de website<br>van Polonia Cantante!";
        else if (current_lang === "FR") t.innerHTML = "Bienvenue sur le<br>site de Polonia Cantante!";
    }
}

requestAnimationFrame(() => adjustBoxes()); //first navBoxes adjustement, right after load

//Shows an error message on (top of) the screen
let allowError = true;
async function showErrorDiv(info) {
    if (allowError) {
        allowError = !allowError;
        document.getElementById("errorMsg").removeAttribute("hidden");
        console.warn("Mrn: error from: " + info);
    } else console.log("Mrn: Error div blocked from " + info);
}

//set pictures for in grupy
document.querySelectorAll("#boxGrupy li img").forEach(img => {
    img.onerror = function () {
        this.src = 'pics/placeholder.jpg'; // place your error.png image instead
    };
    img.src = `pics/headshot/${img.alt.toLowerCase().trim()}.png`;

});

//toggle navBoxes visibility when one of them is opened
function toggleBox(id) {
    let arr = ["langBox", "contactInfoBox", "pomocBox"];
    if (id === "all") for (let box of arr) document.getElementById(box).removeAttribute("hidden");
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

//scrolls ig? w- wtf am i supposed to explain
function scrollToId(id) {
    if (id === 'boxKoncerty') document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
}

setInterval(() => counter++, 1000);

//pretty self-explanatory
let resizeRAF;
window.addEventListener('resize', () => { toggleBox("all"); cancelAnimationFrame(resizeRAF); resizeRAF = requestAnimationFrame(() => { adjustBoxes(); }); });

//check files again on load just in case the cache is outdated
document.addEventListener('DOMContentLoaded', async () => { applyData("languages", null, 251); applyData("koncertyInfo", null, 251) });
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');