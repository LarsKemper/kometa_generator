(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function(data, filename, mime, bom) {
    var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
    var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();

        // Fixes "webkit blob resource error 1"
        setTimeout(function() {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }, 200)
    }
}

},{}],2:[function(require,module,exports){
const fileDownload = require("js-file-download");
const fontPath = "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap";
const kometaHTML = html => 
`<!DOCTYPE html>
 <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link href="https://lars-kemper.com/css/tailwind.css" rel="stylesheet">
      <link href="${fontPath}" rel="stylesheet">
      <title>Kometa</title>
    </head>
   <body>${html}</body>
 </html>`;

document.getElementById("delete").addEventListener("click", function(){
    let snippets = document.getElementById("drop-right");
    snippets.removeChild(snippets.lastChild);
})

document.getElementById("generate").addEventListener("click", event => {
    let selectedBlocks = [];
    let selectedSnippets = document.querySelectorAll("#drop-right > .item");

    for (var i = 0; i < selectedSnippets.length; i++) {
        selectedBlocks.push(selectedSnippets[i].id);
    }
    console.log(selectedBlocks);

    let html = "";

    Promise.all(
        selectedBlocks.map(template =>
        fetch(`../templates/${template}.html`).then(
            response => response.text()
            )
        )
    ).then(templateString => {
        html += templateString.join("");
        fileDownload(kometaHTML(html), "kometa.html");
    });
});
},{"js-file-download":1}]},{},[2]);
