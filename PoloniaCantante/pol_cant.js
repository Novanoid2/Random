//current todo: add counter to see how many users online / total, search for bugs/things to shorten
//spotkanie: archive koncerty, bilety: "musi sie pojawiac qr kod", wyslac potwierdzenie na mail, "qr moze sie zmieniac", koncerty img src beda przesylac, pol cant yt link
//prob change the dolaczSeperate buttons logic to js and css?
const langs = ["PL", "EN", "NL", "FR"];
const default_lang = "PL";
let current_lang = langs.includes(default_lang) ? default_lang : "EN" || "PL";
langs.splice(langs.indexOf(current_lang), 1);
let currentVConcerts, currentVLangs;
let langChange = true;
let first = true;
let fetched = false;
!localStorage?.getItem("lastFetchDate") ? localStorage.setItem("lastFetchDate", JSON.stringify(Date.now())) : null;

async function loadKeys() {//load keys from cache
    for (let key of ["key_langs", "key_concerts"]) {
        const cached = localStorage.getItem(key);
        if (cached) {
            const data = JSON.parse(cached);
            //passes data to applying function
            key === "key_langs" ? currentVLangs = data["v"] : currentVConcerts = data["v"];
            key === "key_langs" ? await applyData("languages", data, 21) : await applyData("koncertyInfo", data, 21);
        } else {
            //if no cache it fetches the jsons and get saved to localStorage in applyData();
            try {
                fetched = true;
                console.log(`fetched: ${fetched}`);
                const data = key === "key_langs" ? await fetchData("languages", 27) : await fetchData("koncertyInfo", 27);
                key === "key_langs" ? await applyData("languages", data, 28) : await applyData("koncertyInfo", data, 28);
            } catch (e) {
                fetched = false;
                console.warn("Mrn: loadKeys: fetch failed, using fallback (aka cache you stupid)", e);
            }
        }
    }
}

async function fetchData(type, from) {//fetch jsons? lol
    console.log(`fetching data: ${type}...`, from);
    try {
        const fetched = await fetch(`https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/${type}.json`);
        if (!fetched.ok) {
            await showErrorDiv(`fetchData ${type}.json`);
            throw new Error(`Mrn: Fetch failed in datafetch ${type}.json`);
        }
        console.log(`finished fetching ${type}`, from); //kind of misleading but who cares really?
        return await fetched.json();
    } catch (err) {
        await showErrorDiv(`fetchData ${type}.json`);
        console.error(`Mrn: Wrong link in datafetch ${type}.json`, err, from);
        throw new Error(`Mrn: Fetch failed in datafetch ${type}.json`);
    }
}

async function applyData(type, dataPassed, from) {//applies the jsons, duhhh
    console.log(`applying data: ${type}...`, from);

    if (type === "koncertyInfo") {
        const data = dataPassed || await fetchData(type, from);
        if (data["v"] !== currentVConcerts || first) { //if version is different
            first = false;
            const concert = document.querySelectorAll(".concert");
            data.concerts.forEach((info, i) => {
                const box = concert[i];
                if (!box) return;

                if (!info.ended) {
                    if (box.querySelector(".dates")) box.querySelector(".dates").innerHTML = "📅 " + info?.date;
                    if (box.querySelector(".times")) box.querySelector(".times").innerHTML = "🕓 " + info?.time;
                    if (box.querySelector(".adresses")) box.querySelector(".adresses").innerHTML = "📌 " + info?.adress;
                    if (box.querySelector(".prices")) box.querySelector(".prices").innerHTML = "€" + info?.price;
                    if (box.querySelector("img")) box.querySelector("img").src = info?.src;
                    box.style.opacity = 1;
                } else {
                    box.querySelectorAll("br").forEach(i => i.remove()); //remove br's
                    if (box.querySelector(".dates")) box.querySelector(".dates").innerHTML = info.date;
                    if (box.querySelector("img")) box.querySelector("img").src = info.src;
                    box.querySelector(".times").innerHTML = JSON.parse(localStorage.getItem("key_langs"))?.[current_lang]?.concertEndedText;
                    for (let cls of ['.adresses', ".prices", ".buttons"]) if (box.querySelector(cls)) box.querySelector(cls).remove();
                    box.style.opacity = 0.5;
                    box.setAttribute("ended", "");
                }
            });

            localStorage.setItem("key_concerts", JSON.stringify(data)); //updates cache
            currentVConcerts = data["v"];
        }
        console.log(`done applying ${type}!!1!1`);
    } else if (type === "languages") {
        let data = dataPassed || await fetchData(type, from);
        let dataLang = data[current_lang];
        if (data["v"] !== currentVLangs || langChange) { //if version is different or language changed
            langChange = false;
            for (let key in dataLang) {
                if (key === "bilet") document.querySelectorAll(".ticket").forEach(i => i.textContent = dataLang[key]);
                else {
                    let el = document.getElementById(key);
                    if (el) el.innerHTML = dataLang[key];
                    else console.warn(`Mrn: Element with id '${key}' not found in html.`);
                }
            }
            document.querySelectorAll(`.concert[ended]`).forEach(i => i.querySelector(".times").innerHTML = dataLang.concertEndedText);
            if (data["ppl"]?.add.length !== 0 || data["ppl"]?.rm.length !== 0) editGrupy(data["ppl"], 103);
            localStorage.setItem("key_langs", JSON.stringify(data)); //updates cache
            currentVLangs = data["v"];
        }
        console.log(`done applying ${type}!!1!1`);
    } else console.log(`Hey ChatGPT, fix this! (none or wrong 'type(=${type})' given in applyData)`);
}

loadKeys(); //initial load from cache
setInterval(async () => {
    await applyData("languages", null, 112);
    await applyData("koncertyInfo", null, 113);
}, 1000 * 60 * 10); //check for updates every 10 min

//add the "onlick" attribute to change language accordingly
let order = 0;
for (let tag of document.querySelectorAll("#langBox a")) {
    let langs = ["PL", "EN", "NL", "FR"]; //shut up i know duplication is stupid
    tag.innerHTML = `${langs[order]}`;
    tag.setAttribute("onclick", `changeLang('${langs[order]}')`);
    order++;
}

function changeLang(lang) {
    current_lang = /FR|EN|NL|PL/.test(lang.toUpperCase().trim()) ? lang.toUpperCase().trim() : current_lang;
    langChange = true;
    applyData("languages", JSON.parse(localStorage.getItem("key_langs")), "langChange");
    adjustBoxes();
}

function adjustBoxes() {
    for (let helpBox of ["langBox", "contactInfoBox", "pomocBox"]) {
        const box = document.getElementById(helpBox);
        const buttonPos = helpBox === 'langBox' ? document.getElementById("lang").getBoundingClientRect() : (helpBox === "contactInfoBox" ? document.getElementById("dolacz").getBoundingClientRect() : document.getElementById("pomoc").getBoundingClientRect());
        const boxPos = box.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        //Adjust the navBoxes positions
        if (window.innerWidth < 950) {
            let top = 30;
            if (helpBox === 'langBox') top = 60;
            box.style.left = `${buttonPos.left - boxPos.width - top}px`;
            //old code for helpBox: box.style.top = `${buttonPos.top / 2 + scrollY / 2}px`;
            box.style.top = `${buttonPos.top + scrollY - buttonPos.height / 2}px`;
        } else {
            box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2)}px`;
            box.style.top = `${buttonPos.top + scrollY + buttonPos.height + 35}px`;
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
            svg.style.top = "-19px";
            svg.style.right = 'auto';
            svg.style.left = `${newBoxPos.width / 2 - 15}px`;
        }

        box.setAttribute("hidden", ""); //hides navBoxes lol
        box.style.opacity = 0;
    }
}

requestAnimationFrame(() => adjustBoxes()); //first navBoxes adjustement, right after load

//Shows an error message on (top of) the screen
let allowError = true;
async function showErrorDiv(info) {
    if (allowError) {
        allowError = false;
        document.getElementById("errorMsg").removeAttribute("hidden");
        console.warn("Mrn: error from: " + info);
    } else console.log("Mrn: Error div blocked from " + info);
}

//set pictures in boxGrupy, with timeout because sometimes it would load too fast and couldnt find the .src in the pic folder
setTimeout(() => {
    document.querySelectorAll("#boxGrupy li img").forEach(img => {
        img.src = `pics/headshot/${img.alt.toLowerCase().trim()}.png`;
        img.onerror = function () { this.src = 'pics/placeholder.jpg'; }; //if no image is found
    });
}, 5);

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

function editGrupy(dataPassed, from) {//adds / removes people from grupyBox
    console.log("editing grupy...", from);
    const grupyBox = document.getElementById("boxGrupy");
    dataPassed["rm"].forEach(name => {
        const li = grupyBox.querySelector(`li img[alt='${name}']`);
        if (li) li.parentElement.remove();
    });

    dataPassed["add"].forEach(name => {
        //if you get an error on line below, its most likely because of name isnt complete or languages json if fucked up
        if (document.getElementById(name.split("_")[1]).contains(document.querySelector(`li img[alt='${name.split("_")[0]}']`))) return;
        console.log(`Mrn: for debugging: adding: ${name}`);
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.setAttribute("alt", name.split("_")[0]);
        img.onerror = function () { this.src = 'pics/placeholder.jpg'; }; //if no image found in files
        img.src = `pics/headshot/${name.split("_")[0].toLowerCase().trim()}.png`;
        li.appendChild(img);
        const h2 = document.createElement("h2");
        h2.innerHTML = name.split("_")[0];
        li.appendChild(h2);
        document.getElementById(name.split("_")[1]).querySelector("ol").appendChild(li);
    });

    console.log("finished editing grupy");
}

async function manualFetchCall() {//check this
    const buttonA = document.getElementById("manualFetch");
    buttonA.parentElement.setAttribute('disabled', '');
    buttonA.textContent = '...';
    setTimeout(() => {
        buttonA.parentElement.removeAttribute('disabled');
        buttonA.textContent = JSON.parse(localStorage.getItem('key_langs'))[current_lang].manualFetch;
        document.getElementById("fetchlabel").textContent = "";
    }, 3000);
    try {
        await applyData("languages", null, 'htmlCall');
        await applyData("koncertyInfo", null, 'htmlCall');
        document.getElementById("fetchlabel").textContent = "✔️";
    } catch (e) {
        document.getElementById("fetchlabel").textContent = "❌";
        console.error("Mrn: manualFetchCall: fetch failed", e);
    }
}

//scrolls ig? w- wtf am i supposed to explain
function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
}

//pretty self-explanatory
let resizeRAF;
window.addEventListener('resize', () => { toggleBox("all"); cancelAnimationFrame(resizeRAF); resizeRAF = requestAnimationFrame(() => { adjustBoxes(); }); });

//fetched again on load w if statements
document.addEventListener('DOMContentLoaded', () => {
    //if last fetch date is more than two hours ago, it fetches again (2 * 1000 * 60 * 60)
    if (Date.now() - JSON.parse(localStorage.getItem("lastFetchDate")) >= 7200000) {
        localStorage.setItem("lastFetchDate", JSON.stringify(Date.now()));
        if (!fetched) {
            applyData("languages", null, "fetch@dom");
            applyData("koncertyInfo", null, "fetch@dom");
            console.warn("fetched at dom");
        }
    }
});
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');