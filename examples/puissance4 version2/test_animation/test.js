var valeur = 2

function animation(){
  valeur = 3 - valeur
  var coup = []
  
  for (var i = 1; i < 7; i++){  
    coup[i] = document.getElementById('no'+valeur+i)
    var delay = (i-1)*2000
    coup[i].style.animationDelay = delay+'ms'
  }
  
  for (var i = 1; i < 7; i++){  
    coup[i].style.animationTimingFunction = 'linear'
    coup[i].style.animationDuration = '30ms' 
    coup[i].style.animationName = 'fade'
  }
  
  coup[6].style.animationName = 'last'
  coup[6].innerHTML = 'O'
}
