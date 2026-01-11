//current todo: change how lang changing works, search for bugs/things to shorten, c&p dif lang, dif ver (combine both v here into one and rm poziom), gotowe
const langs = ["PL", "EN", "NL", "FR"];
const linkLang = window.location.href.replace(/\.(html|htm)/, "").slice(-2).toUpperCase();
const current_lang = langs.includes(linkLang) ? linkLang : "NL" || "EN";
langs.splice(langs.indexOf(current_lang), 1);
let currentJson1, currentJson2;

async function fetchDataAndApply() {
    fetch('https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/koncertyInfo.json')
        .then(raw => {
            if (raw.ok) return raw.json();
            showErrorDiv('Mrn: Fetch failed in koncertyInfo.json');
        })
        .then(data => {
            let tmpJson1 = data;
            if (tmpJson1 !== currentJson1) {
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
                currentJson1 = tmpJson1;
            } //else: doesnt do anything
        }).catch(err => showErrorDiv(err + " from koncerty.json"))
        .then(() => {
            fetch(`https://raw.githubusercontent.com/Miren-3/Random/refs/heads/everything/PoloniaCantante/languages.json`)
                .then(raw => {
                    if (raw.ok) return raw.json();
                    showErrorDiv('Mrn: Fetch failed in languages.json');
                }).then(data => {
                    data = data[current_lang];
                    let tmpJson2 = data;
                    if (tmpJson2 !== currentJson2) {
                        for (let key in data) {
                            let el = document.getElementById(key);
                            if (el) el.innerHTML = data[key];
                            else console.warn(`Mrn: Element with id '${key}' not found in html.`);
                        }
                        currentJson2 = tmpJson2;
                    } //else: doesnt do anything
                }).catch(err => showErrorDiv(err + " from languages.json"));
        });
}

fetchDataAndApply();
setInterval(() => {
    fetchDataAndApply(); //check for updates every 60s
}, 60000);

//Set the the correct language redirection links
let order = -1;
for (let tag of document.querySelectorAll("#langBox a")) {
    if (order != -1) {
        tag.href = tag.href.replace(/LANG/, `${langs[order]}`);
        tag.innerHTML = `${langs[order]}`;
    } else tag.innerHTML = `>${current_lang}<`;
    order++;
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
            if (helpBox === 'langBox') box.style.left = `${(buttonPos.left + buttonPos.width / 2) - (boxPos.width / 2) - 5}px`;
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
            svg.style.left = "auto";
            svg.style.right = "-30px";
        } else {
            polygon.setAttribute("points", "15,0 0,20 30,20");
            svg.style.top = "-19px";
            svg.style.right = "auto";
            svg.style.left = `${newBoxPos.width / 2 - 15}px`;
        }

        box.setAttribute("hidden", ""); //hides navBoxes lol
        box.style.opacity = 0;
    }
}

requestAnimationFrame(() => adjustBoxes()); //first navBoxes adjustement right after load

//Shows an error message on (top of) the screen
let allowError = true;
async function showErrorDiv(info) {
    if (allowError) {
        allowError = !allowError;
        document.getElementById("errorMsg").removeAttribute("hidden");
        console.error("Mrn: error from: " + info);
    } else console.log("Mrn: Error div blocked from " + info);
}

//set pictures for in grupy
document.querySelectorAll("g ol li img").forEach(img => {
    img.src = "pics/placeholder.jpg";
    // img.src = `pics/${img.alt.toLowerCase().strip()}.png` || `pics/${img.alt.toLowerCase().strip()}.jpg`
});

//toggle navBoxes visibility when one of them is pressed
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

//pretty self-explanatory
let resizeRAF;
window.addEventListener('resize', () => { toggleBox("all"); cancelAnimationFrame(resizeRAF); resizeRAF = requestAnimationFrame(() => { adjustBoxes(); }); });

//document.documentElement.style.setProperty(`--dl`, `PL`);
//console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 20px;');