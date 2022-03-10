
const localHistory = localStorage.getItem("history")
const linksHistory = document.getElementById("links")
const deleteBtns = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const historyEl = document.querySelector(".history")
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
   renderHistory()

   if(history.length === 0){
      inputEl.classList.remove("active")
   } else {
      inputEl.classList.add("active")
   }
   historyEl.classList.toggle("active")
})

inputEl.addEventListener("blur", function(){
   historyEl.classList.toggle("active")
   inputEl.classList.toggle("active")
})

function renderHistory(){

   linksHistory.innerHTML = ""
   for(let i = 0; i < history.length; i++){
      linksHistory.innerHTML += `
      <li class="history-item" onclick="redirect('${history[i]}')">
         ${history[i]}
      </li>`
   }
      
   deleteBtns.innerHTML = ""
   for(let i = 0; i < history.length; i++){
      deleteBtns.innerHTML += `
         <li>
            <button onclick="apaga(${i})">delete</button>
         </li>`
   }         
}

function apaga(index){
   history.splice(index, 1)
   console.log(history)
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

function saveInHistory(item) {
   history.unshift(item)
   localStorage.setItem("history", JSON.stringify(history))
}
