
const localHistory = localStorage.getItem("history")
const historyEl = document.querySelector(".history")
const inputEl = document.getElementById("input-el")
const searchContentEl = document.querySelector(".search-content")
let history = []

if (localHistory){
   history = JSON.parse(localHistory)
}

inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      search()
   }
})

inputEl.addEventListener("focus", function(){
   searchContentEl.classList.add("active")
   renderHistory()

})

function renderHistory(){
   historyEl.innerHTML = ""
   for(let i = 0; i < history.length; i++){
      historyEl.innerHTML += `
      <div class="link">
         <p onclick="redirect('${history[i]}')">${history[i]}</p>
         <button onclick="apaga(${i})">delete</button>
      </div>
      `
   }          
}

function apaga(index){
   history.splice(index, 1)
   console.log(history)
   saveInHistory(null, false)
   renderHistory()
}


function search(){
   let url = getInput()
   if(url != ""){
      saveInHistory(url)
      redirect(url)
   } 
}

function formatando(text) {
   text = text.replace(/ /g, "+")
   return text
}

function redirect(url) {
   let pesquisa = "https://www.google.com/search?q=";
   url = formatando(url)
   pesquisa += url
   inputEl.value = ""
   window.location.href = pesquisa
}

function getInput() {
   return inputEl.value.trim()
}

function saveInHistory(item, add=true) {
   if (add === true) {
      history.unshift(item)
   }
   localStorage.setItem("history", JSON.stringify(history))
}
