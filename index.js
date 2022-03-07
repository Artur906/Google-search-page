const inputEl = document.getElementById("input-el")
let pesquisa = "https://www.google.com/search?q=";

inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      let text = inputEl.value
      text = formatando(text)
      pesquisa += text
      inputEl.value = ""
      window.location.href = pesquisa
   }
})

function formatando(text) {
   text = text.replace(/ /g, "+")
   return text
}