'use strict';
let topMsg = 15;
let inputSentence = '';
const supabase = createClient(
    'https://iwmlttiwxdptxjoppayb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bWx0dGl3eGRwdHhqb3BwYXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODQ4ODMsImV4cCI6MjA4OTc2MDg4M30.p0qVLnX2hNcC_ZRSoLwyGLod55k1qeyE8j_68ZPJOAA'
    //anon public:
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bWx0dGl3eGRwdHhqb3BwYXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODQ4ODMsImV4cCI6MjA4OTc2MDg4M30.p0qVLnX2hNcC_ZRSoLwyGLod55k1qeyE8j_68ZPJOAA
);

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

//GET (pobieranie danych)
const { data, error } = await supabase
    .from('dictionary')
    .select('*');

console.log(data ?? error, typeof data, Array.isArray(data));


/* todo later idk:
await supabase.auth.signInWithPassword({
  email: "bernardeugeniuszkk@gmail.com",
  password: "xXlh2jtSutu9QXLn"
});

const { data, error } = await supabase.auth.getUser();

console.log(data);
console.log(error);
console.log(data.session);
*/

async function aiResponse(input) {
    //addVocab(inputSentence);
    return generate(input);
}

async function addVocab(sentence) {
    const sentenceArr = sentence.replaceAll(/\.\;\'\"\\\/\!\,\?\(\)/g, "").split(" ");
    let wordToAdd = '';
    let vocabToAdd = [];

    sentenceArr.forEach((current, next, secondNext, thirdNext, fourthNext) => {
        //monogram
        if (sentenceArr.length > 1) {
            if (!data[current] && next) data[current] = [next];
            else if (!data[current].has(next) && next) data[current].push(next);
        }

        //digram
        if (sentenceArr.length > 2) {
            if (!data[current + next] && next && secondNext) data[current + next] = [secondNext];
            else if (!data[current + next].has(secondNext) && next && secondNext) data[current + next].push(secondNext);
        }

        //trigram 
        if (sentenceArr.length > 3) {
            if (!data[current + next + secondNext] && next && secondNext && thirdNext) data[current + next + secondNext] = [thirdNext];
            else if (!data[current + next + secondNext].has(thirdNext) && next && secondNext && thirdNext) data[current + next + secondNext].push(thirdNext);
        }

        //quad?gram 
        if (sentenceArr.length > 4) {
            if (!data[current + next + secondNext + thirdNext] && next && secondNext && thirdNext && fourthNext) data[current + next + secondNext + thirdNext] = [fourthNext];
            else if (!data[current + next + secondNext + thirdNext].has(thirdNext) && next && secondNext && thirdNext && fourthNext) data[current + next + secondNext + thirdNext].push(fourthNext);
        }
    });

    // POST (dodawanie)
    await supabase.from('dictionary').insert({
        words: wordToAdd,
        next_words: vocabToAdd,
        numerical: 1//,
        //user_id: (await supabase.auth.getUser()).data.user.id
    });

    console.log('done adding');
}

function generate(start) {
    let word = start;
    let sentence = word;
    console.log(word, sentence);
    let wordCount = Math.round(Math.random() * (inputSentence.split(' ').length * (Math.random() * 15)));
    wordCount < 5 ? wordCount += wordCount : wordCount;
    wordCount > 20 ? wordCount -= 5 : wordCount;

    for (let i = 0; i < wordCount; i++) {
        console.log(wordCount);
        const next = nextWord(word);
        if (!next || /\%\e/.test(next)) break;
        sentence += " " + next;
        word = next;
    }

    console.log(word, sentence);
    return sentence;
}

function nextWord(word) {
    const options = data[word];

    if (!options) {
        const optionLocal = data[word.replaceAll("ą", "a").replaceAll("ę", "e").replaceAll("ł", "l").replaceAll("ó", "o").replaceAll("ń", "n").replaceAll("ć", "c").replaceAll("ż", "z").replaceAll("ź", "z").replaceAll("ś", "s")]
        if (optionLocal) return optionLocal[Math.floor(Math.random() * optionLocal.length)];

        //returns a random word from a random key if not found
        return data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]];
        //return undefined;
    }
    //returns a random word from key "word"
    return options[Math.floor(Math.random() * options.length)];
}

async function sendMsg(msg) {
    inputSentence = msg;
    const textDiv = document.createElement("div");
    const text = document.createElement("h4");

    textDiv.classList.add("textUser");
    textDiv.classList.add("message");
    textDiv.style = `position:absolute;top:${topMsg}px;right:10px;max-width:85%;left:auto;font-size:x-large;background-color:grey;padding:10px;color:black;opacity 0;transition:opacity 0.6s ease;`;
    text.style = "margin:0;overflow-wrap:break-word;";
    text.textContent = msg;
    textDiv.appendChild(text);
    document.getElementById("top").appendChild(textDiv);
    document.getElementById("input").value = '';
    topMsg += document.querySelectorAll(".message")[document.querySelectorAll(".message").length - 1].offsetHeight + 15;
    msg = msg.toLowerCase();

    setTimeout(() => textDiv.style.opacity = 1, 10);

    const responseDiv = document.createElement("div");
    const responseText = document.createElement("h4");

    responseDiv.classList.add("textAI");
    responseDiv.classList.add("message");
    responseText.style = "margin:0;overflow-wrap:break-word;";
    responseText.textContent = "...";
    responseDiv.style = `position:absolute;top:${topMsg}px;left:10px;right:auto;font-size: x-large;background-color:grey;padding:10px;color:black;max-width: 85%;opacity:0;transition:opacity 0.6s ease;`;
    responseDiv.appendChild(responseText);
    document.getElementById("top").appendChild(responseDiv);

    setTimeout(() => responseDiv.style.opacity = 1, 10);

    const response = await aiResponse(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))] || msg);
    //const response = await generate(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))] || msg);

    document.querySelectorAll(".message h4")[document.querySelectorAll(".message h4").length - 1].textContent = response;
    document.getElementById('top').scrollTop = document.getElementById('top').scrollHeight;
    topMsg += document.querySelectorAll(".message")[document.querySelectorAll(".message").length - 1].offsetHeight + 15;
}


document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

document.getElementById("send").addEventListener("click", (e) => {
    if (document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

document.querySelectorAll('.polishSigns').forEach(i => i.addEventListener('click', () => { document.getElementById("input").value += i.textContent }));