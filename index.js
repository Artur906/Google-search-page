const localHistory = localStorage.getItem("history")
const inputEl = document.getElementById("input-el")
let history = []
let pesquisa = "https://www.google.com/search?q=";
if (localHistory){
   history = JSON.parse(localHistory)
}

inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      let text = inputEl.value
      history.push(text)
      localStorage.setItem("history", JSON.stringify(history))
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