let topMsg = 15;
let inputSentence = '';

import { words } from "./AI.mjs";

/*
class neuron {
    constructor(value, weight, bias) {
        this.value = value;
        this.weight = weight;
        this.bias = bias;
    }
}

async function aiResponse(input) {
    const result = [];
    input.split(" ").forEach((word) => result.push((new neuron(word, word.length, words[word]?.bias || Math.random()))));
    console.table(JSON.stringify(result));
    return input + "\n\n" + JSON.stringify(result);
}
yeah nvm im not doing LLM    
*/

async function aiResponse(input) {
    return generate(input);
}

document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

document.querySelector("button").addEventListener("click", (e) => {
    if (document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

//add fs to save word into .mjs when used and also instead of one word, make a digram and trigram
function generate(start) {
    let word = start;
    let sentence = word;
    console.log(word, sentence);
    let random = Math.round(Math.random() * (inputSentence.split(' ').length * (Math.random() * 15)))
    for (let i = 0; i < random; i++) {
        console.log(random);
        const next = nextWord(word);
        if (!next) break;
        sentence += " " + next;
        if (next === "jak tam?") break;
        word = next;
    }
    console.log(word, sentence);
    return sentence;
}

//wtf is this
function nextWord(word) {
    const options = words[word];
    if (!options) {
        return words[Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)]][0];
        //return undefined;
    }
    return options[Math.floor(Math.random() * options.length)];
}

async function sendMsg(msg) {
    inputSentence = msg;
    const textDiv = document.createElement("div");
    const text = document.createElement("h4");
    textDiv.classList.add("textUser");
    textDiv.classList.add("message");
    textDiv.style = `position:absolute;top:${topMsg}px;right:10px;max-width:85%;left:auto;font-size:x-large;background-color:grey;padding:10px;color:black;opacity 0;transition:opacity 0.6s ease;`;
    setTimeout(() => textDiv.style.opacity = 1, 10);
    text.style = "margin:0;overflow-wrap:break-word;";
    text.textContent = msg;
    msg = msg.toLowerCase();
    textDiv.appendChild(text);
    document.getElementById("top").appendChild(textDiv);
    document.getElementById("input").value = '';
    topMsg += document.querySelectorAll(".message")[document.querySelectorAll(".message").length - 1].offsetHeight + 15;
    const responseDiv = document.createElement("div");
    const responseText = document.createElement("h4");
    responseDiv.classList.add("textAI");
    responseDiv.classList.add("message");
    responseText.style = "margin:0;overflow-wrap:break-word;";
    responseText.textContent = "...";
    responseDiv.style = `position:absolute;top:${topMsg}px;left:10px;right:auto;font-size: x-large;background-color:grey;padding:10px;color:black;max-width: 85%;opacity:0;transition:opacity 0.6s ease;`;
    setTimeout(() => responseDiv.style.opacity = 1, 10);
    responseDiv.appendChild(responseText);
    document.getElementById("top").appendChild(responseDiv);
    const response = await aiResponse(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))] || msg);
    //const response = await generate(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))] || msg);
    document.querySelectorAll(".message h4")[document.querySelectorAll(".message h4").length - 1].textContent = response;
    document.getElementById('top').scrollTop = document.getElementById('top').scrollHeight;
    topMsg += document.querySelectorAll(".message")[document.querySelectorAll(".message").length - 1].offsetHeight + 15;
}