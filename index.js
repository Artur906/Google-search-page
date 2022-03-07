const inputEl = document.getElementById("input-el")
let pesquisa = "https://www.google.com/search?q=";

inputEl.addEventListener("keydown", function(e){
   if(e.code === "Enter") {
      let text = inputEl.value
      text = formatando(text)
      inputEl.value = text
   }
})

function formatando(texto) {
   for(let i = 0; i < texto.length; i++){
      console.log(texto[i])
      if(texto[i] === " "){
         texto[i] = "+"
      }
   }
   console.log(texto[5])

   return texto
}