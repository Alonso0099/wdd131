const year = document.querySelector("#currentYear");
year.textContent = new Date().getFullYear();


const lastMod =document.querySelector("#lastModified");
lastMod.textContent = `Last Modification: ${document.lastModified}`;

//This are notes for me
/* 
    const: create a fix variable that can not be re
    year: its the name of the variable
    document: represents the HTML page
    querySelector is to target the ID that I want to apply the JS rule
    #currentYear: is the ID in the HTML "#" is important and is case sensitive (should be the same)
    year.textContent: text that goes in the "year" element or "#currentYear" element. "=" assign what I write to the write in th element
    ``: whatever I write between the backticks will be the the "text" value closing with ${...}
    ${document.lastModified}: return the string (text) with the time and date of the last modification in the document.
*/