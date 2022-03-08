
const localHistory = localStorage.getItem("history")
const inputEl = document.getElementById("input-el")
const historyEl = document.querySelector(".history")
let history = []

if (localHistory){
   history = JSON.parse(localHistory)
}

inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      let url = inputEl.value
      history.push(url)
      localStorage.setItem("history", JSON.stringify(history))
      redirect(url)
   }
})

function redirect(url) {
   let pesquisa = "https://www.google.com/search?q=";
   url = formatando(url)
   pesquisa += url
   inputEl.value = ""
   window.location.href = pesquisa
}

inputEl.addEventListener("focus", function(){
   historyEl.innerHTML = `<ul>`

   for(let i = 0; i < history.length; i++)
      historyEl.innerHTML += `
      <li class="history-item" onclick="redirect('${history[i]}')">
         ${history[i]}
      </li>`

   historyEl.innerHTML += `</ul>`
   historyEl.classList.add("active")
})

inputEl.addEventListener("blur", function(){
    setTimeout(100, historyEl.classList.toggle("active"))
})

function formatando(text) {
   text = text.replace(/ /g, "+")
   return text
}
