const chosen_lang = "Pl";
const default_lang = "Pl";

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

function applyData(file) {
    for (let key in file) {
        let el = document.getElementById(key)
        if (el) {
            if (/prz[0-3]b/.test(key)) el.innerHTML = file[key].replace(": e", ": €");
            else el.innerHTML = file[key];
        }
    }
}

document.getElementById("lang").onclick = function () {
    if (!document.body.contains((document.getElementById("langBox")))) {
        let lang = document.getElementById("lang").getBoundingClientRect();
        let div = document.createElement("div");
        if (window.innerWidth - (lang.left + lang.width / 2 - 50) < 100) div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 90}px; background-color: white; height: 170px; width: 100px; z-index: 2; border-radius: 20px; opacity: 0; transition: opacity 0.7s;`;
        else div.style = `position: absolute; top: ${lang.top + lang.height + 10}px; left: ${lang.left + lang.width / 2 - 50}px; background-color: white; height: 170px; width: 100px; z-index: 2; border-radius: 20px; opacity: 0; transition: opacity 0.7s;`;
        div.id = "langBox";
        div.innerHTML = `<ul>
          <a href="" style="margin-left: -24px; font-family: Kepler; font-size: 1.8rem;"><strong>>PL<</strong></a>
          <br>
          <a href="" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">EN</a>
          <br>
          <a href="" style="margin-left: -10px; font-family: Kepler; font-size: 1.8rem;">NL</a>
          <br>
          <a href="" style="margin-left: -11px; font-family: Kepler; font-size: 1.8rem;">FR</a>
        </ul>`;
        document.body.appendChild(div);
        setTimeout(() => { div.style.opacity = 1; }, 10);
    } else document.body.removeChild(document.getElementById("langBox"));
}

document.getElementById('onas').onclick = () => {
    document.getElementById('boxONas-border').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('koncert').onclick = () => {
    document.getElementById('boxKoncerty-border').scrollIntoView({ behavior: 'smooth' });
};

/*document.getElementById('bilet').onclick = () => {
    document.getElementById('boxBilety-border').scrollIntoView({ behavior: 'smooth' });
};*/

document.getElementById('pomoc').onclick = () => {
    document.getElementById('boxPomoc-border').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('zdjecia').onclick = () => {
    document.getElementById('boxZdjecia-border').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('dolacz').onclick = () => {
    document.getElementById('boxDolacz-border').scrollIntoView({ behavior: 'smooth' });
};

//window.addEventListener('resize', () => { location.reload(); });

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


document.documentElement.style.setProperty(`--dl`, `${default_lang}`);
console.log("%c Hello! watch'ya doing here? ", 'background: #222; color: #bada55; font-size: 22px;');