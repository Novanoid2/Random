'use strict';
let topMsg = 15;
let inputSentence = '';
let dataObject = {};
let numAdded = 1;
const supabase = createClient(
    'https://iwmlttiwxdptxjoppayb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bWx0dGl3eGRwdHhqb3BwYXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODQ4ODMsImV4cCI6MjA4OTc2MDg4M30.p0qVLnX2hNcC_ZRSoLwyGLod55k1qeyE8j_68ZPJOAA'
    //anon public:
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bWx0dGl3eGRwdHhqb3BwYXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODQ4ODMsImV4cCI6MjA4OTc2MDg4M30.p0qVLnX2hNcC_ZRSoLwyGLod55k1qeyE8j_68ZPJOAA
);

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

//GET (pobieranie danych)
let { data, error } = await supabase
    .from('dictionary')
    .select('*');

data.forEach(i => { dataObject[i.words] = { numerical: i.numerical, next_words: i.next_words } });
console.log(dataObject);
data = dataObject;

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
    console.info(`inputSentence for vocab: ${inputSentence}`);
    addVocab(inputSentence);
    return generate(input);
}

async function appendToBackend(createOrAdd, origWord, appendWord) {
    return true; //temporary block
    if (createOrAdd === "create") {
        supabase.from('dictionary').insert({
            words: origWord,
            next_words: appendWord,
            numerical: 1//,
            //user_id: (await supabase.auth.getUser()).data.user.id
        });

    } else if (createOrAdd === "add") {
        supabase.rpc('array_append', {
            orig: origWord,
            new_word: appendWord
        });

    } else console.error("nuh uh, wrong action silly");
}

async function addVocab(sentence) {
    const sentenceArr = sentence.split(" ");

    for (let i = 0; i < sentenceArr.length - 1; i++) {
        const current = sentenceArr[i];
        const next = sentenceArr[i + 1];
        const secondNext = sentenceArr[i + 2];
        const thirdNext = sentenceArr[i + 3];
        const fourthNext = sentenceArr[i + 4];
        console.log(`word volgorde:`, current, next, secondNext, thirdNext, fourthNext);
        console.log(`somthing idk:`, data[current], data[current]?.next_words, data[current]?.next_words.includes(next) || false, "=", next || undefined);

        //monogram
        if (sentenceArr.length > 1) {
            if (!data[current] && next) appendToBackend("create", current, next);
            else if (!data[current]?.next_words.includes(next) && next) appendToBackend("add", current, next);
        }

        //digram
        if (sentenceArr.length > 2) {
            const word = current + " " + next;
            if (!data[word] && next && secondNext) appendToBackend("create", word, secondNext);
            else if (!data[word]?.next_words.includes(secondNext) && next && secondNext) appendToBackend("add", word, secondNext);
        }

        //trigram 
        if (sentenceArr.length > 3) {
            const word = current + " " + next + " " + secondNext;
            if (!data[word] && next && secondNext && thirdNext) appendToBackend("create", word, thirdNext);
            else if (!data[word]?.next_words.includes(thirdNext) && next && secondNext && thirdNext) appendToBackend("add", word, thirdNext);
        }

        //quad?gram 
        if (sentenceArr.length > 4) {
            const word = current + " " + next + " " + secondNext + " " + thirdNext;
            if (!data[word] && next && secondNext && thirdNext && fourthNext) appendToBackend("create", word, fourthNext);
            else if (!data[word]?.next_words.includes(thirdNext) && next && secondNext && thirdNext && fourthNext) appendToBackend("add", word, fourthNext);
        }
    };

    console.log(`done adding '${sentence}' x${numAdded++} (${sentenceArr.length > 1 ? true : false})`);
}

function generate(start) {
    let word = start;
    let sentence = word;
    console.log("current word:", "'" + word + "'", "current sentence:", "'" + sentence + "'");
    let wordCount = Math.round(Math.random() * (inputSentence.split(' ').length * (Math.random() * 0)));
    wordCount < 5 ? wordCount += 5 : wordCount;
    wordCount > 20 ? wordCount -= 5 : wordCount;

    for (let i = 0; i < wordCount; i++) {
        console.log('wordcount:', wordCount, 'num:', i);
        const next = nextWord(word);
        if (!next) break;
        if (/\%\e/.test(next)) { const nextReplaced = next.replace(/\%\e/g, ""); sentence += " " + nextReplaced; break; };

        sentence += " " + next;
        word = next;
    }

    console.log("last word:", word, "last sentence:", sentence);
    return sentence;
}

function nextWord(word) {
    word = word.replace('\n', '');
    const options = data[word]?.next_words;
    console.log("full:", data[word] || 'not found', `word: ${word}`, "options:", options || 'not found');

    if (!options) {
        word = word.replace(/[ąęłóńćżźś]/g, (char) => ({
            'ą': 'a',
            'ę': 'e',
            'ł': 'l',
            'ó': 'o',
            'ń': 'n',
            'ć': 'c',
            'ż': 'z',
            'ź': 'z',
            'ś': 's'
        }[char]));
        const optionLocal = data[word]?.next_words;
        if (optionLocal) return optionLocal[Math.floor(Math.random() * optionLocal.length)];
        console.log('backup', optionLocal);
        //returns a random word from a random key if not found
        //return data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]];
        return '(słownictwo mi się skonczyło)%e';
    }

    //returns a random word from key "word"
    return options[Math.floor(Math.random() * options.length)];
}

async function sendMsg(msg) {
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
    msg = msg.replaceAll(/[^\p{L}\s]/gu, "").replaceAll(/\s+/g, " ").toLowerCase();
    inputSentence = msg;

    setTimeout(() => textDiv.style.opacity = 1, 10);

    const responseDiv = document.createElement("div");
    const responseText = document.createElement("h4");

    responseDiv.classList.add("textAI");
    responseDiv.classList.add("message");
    responseText.style = "margin:0;overflow-wrap:break-word;";
    responseText.textContent = "nie rozmawiam po polsku, sorki";
    responseDiv.style = `position:absolute;top:${topMsg}px;left:10px;right:auto;font-size:x-large;background-color:grey;padding:10px;color:black;max-width: 85%;opacity:0;transition:opacity 0.6s ease;`;
    responseDiv.appendChild(responseText);
    document.getElementById("top").appendChild(responseDiv);

    setTimeout(() => responseDiv.style.opacity = 1, 10);

    const response = await aiResponse(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))].replace('\n', '') || msg);
    //const response = await generate(msg.split(" ")[Math.floor(Math.random() * (msg.split(" ").length - 1))] || msg);

    document.querySelectorAll(".message h4")[document.querySelectorAll(".message h4").length - 1].textContent = response;
    document.getElementById('top').scrollTop = document.getElementById('top').scrollHeight;
    topMsg += document.querySelectorAll(".message")[document.querySelectorAll(".message").length - 1].offsetHeight + 15;
}


document.getElementById("input").addEventListener("keydown", e => {
    if (e.key === "Enter" && document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

document.getElementById("send").addEventListener("click", e => {
    if (document.getElementById("input").value.trim().length !== 0) {
        e.preventDefault();
        sendMsg(document.getElementById("input").value);
    }
});

document.querySelectorAll('.polishSigns').forEach(i => i.addEventListener('click', () => { document.getElementById("input").value += i.textContent }));