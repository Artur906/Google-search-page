const localHistory = localStorage.getItem("history")
const historyEl = document.querySelector(".history")
const inputEl = document.getElementById("input-el")
const searchContentEl = document.querySelector(".search-content")
let history = []

// Verificando se existe alguma pesquisa guardada no local Storage
if (localHistory){
   history = JSON.parse(localHistory)
}

// Escutando quando o usuário aperta Enter
inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      search()
   }
})

// Verificando se o usuário está clicando na área que contem a barra de pesquisa, ou na área do histórico
// Pra diminuir a quantidade de verificações eu coloquei a classe s-bar em todos os elementos, essa classe só serve para essa verificação
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

// inserindo o histórico no HTML
function renderHistory(){
   historyEl.innerHTML = ""
   for(let i = 0; i < history.length; i++){
      if (i >= 6) return 
      historyEl.innerHTML += `
      <div class="link s-bar">
         <img src="images/clock.svg" class="s-bar" alt="clock">
         <p onclick="redirect('${history[i]}')" id="p${i}"></p>
         <button class="s-bar" onclick="apaga(${i})">delete</button>
      </div>
      ` 
      // para evitar que o usuário consiga inserir código no meu HTML
      let pEl = document.getElementById(`p${i}`)
      pEl.textContent = history[i]
   }          
}

// funções relacionadas a manipulação do input do usuário
function search(){
   let url = getInput()
   if(url != ""){
      saveInHistory(url)
      redirect(url)
   } 
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
   renderHistory()
}

function redirect(url) {
   let pesquisa = "https://www.google.com/search?q=";
   url = formatando(url)
   pesquisa += url
   inputEl.value = ""
   window.location.href = pesquisa
}

function formatando(text) {
   text = text.replace(/ /g, "+")
   return text
}

function apaga(index){
   history.splice(index, 1)
   saveInHistory(null, false)
}