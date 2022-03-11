
const localHistory = localStorage.getItem("history")
const historyEl = document.querySelector(".history")
const inputEl = document.getElementById("input-el")
const searchContentEl = document.querySelector(".search-content")
let history = []

if (localHistory){
   history = JSON.parse(localHistory)
}

inputEl.addEventListener("keydown", function(e){
   searchContentEl.innerHTML += e.code
   if(e.code === "Enter") {
      search()
   }
})

addEventListener("click", function(e) {
   let element = e.target

   if(element.classList.contains("s-bar")){ 
      searchContentEl.classList.add("active")
      historyEl.classList.remove("off")
      renderHistory()
   } else {
      historyEl.classList.add("off")
      searchContentEl.classList.remove("active")
   }
})

function renderHistory(){
   historyEl.innerHTML = ""
   for(let i = 0; i < history.length; i++){
      if (i >= 6) return 

      historyEl.innerHTML += `
      <div class="link s-bar">
         <img src="images/clock.svg" class="s-bar" alt="clock">
         <p onclick="redirect('${history[i]}')">${history[i]}</p>
         <button class="s-bar" onclick="apaga(${i})">delete</button>
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
   // trim serve para apagar os espaços adjacentes
}

function saveInHistory(item, add=true) {
   if (add === true) {
      history.unshift(item)
   }
   localStorage.setItem("history", JSON.stringify(history))
}
