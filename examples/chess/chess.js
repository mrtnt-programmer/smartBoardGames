var couleur = [] 
var piece = []
var colonneChoisie , ligneChoisie


function fabriqueTable(){
  var couleurDeCase = 'caseBlanche'
  document.write('<table>')
  document.write('<tr>')  
  document.write('</tr>')
  for(var l = 0; l<8; l++){
    document.write('<tr>')
    for(var c = 0; c<8; c++){
      document.write('<td class = "'+couleurDeCase+'" id="'+l+','+c+'"></td>')      
      couleurDeCase = (couleurDeCase == 'caseBlanche') ? 'caseNoire' : 'caseBlanche'
    }
    document.write('</tr>')
    couleurDeCase = (couleurDeCase == 'caseBlanche') ? 'caseNoire' : 'caseBlanche'
  }
  document.write('</table>')   
}

function resetTable(){
  for(var l = 0; l<8; l++){
    couleur[l] = []
    piece[l] = []
    for(var c = 0; c<8; c++){
      couleur[l][c] = 'vide'
      piece[l][c] = 'vide'
      if(l==0 || l==1 ){
        couleur[l][c] = 'noir'
      }
      if(l==7 || l==6 ){
        couleur[l][c] = 'blanc'
      }
      if(l==6 || l==1){
        piece[l][c] = 'pion'
      }
      if(l==7 || l==0){
        switch(c){
          case 0:
          case 7:
            piece[l][c] = 'tour'
            break
          case 1:
          case 6:
            piece[l][c] = 'cavalier'
            break
          case 2:
          case 5:
            piece[l][c] = 'fou'
            break
          case 4:
            piece[l][c] = 'roi'
            break
          case 3:
            piece[l][c] = 'dame'
            break            
        }
      }
    }
  }
  document.getElementById('message').innerHTML =''
  document.getElementById('restart').innerHTML ='' 
  affichePiece1()
}

function affichePiece1(){
  var initiale = 'P', couleurDePiece = 'b'
  for(var l = 0; l<8; l++){
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide' && couleur[l][c] == 'blanc' ){
        document.getElementById(l+','+c).innerHTML = "<input type='image' src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%' onclick='choisitPiece("+l+","+c+")'>"
      }
      if(piece[l][c] != 'vide' && couleur[l][c] == 'noir' ){
        document.getElementById(l+','+c).innerHTML = "<img src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%'>"
      }
      if(piece[l][c] == 'vide'){
        document.getElementById(l+','+c).innerHTML = ''
      }
    }
  }
}

function affichePiece2(){
  var initiale = 'P', couleurDePiece = 'b'
  for(var l = 0; l<8; l++){
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide'){
        document.getElementById(l+','+c).innerHTML = "<input type='image' src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%' onclick='choisitArrivee("+l+","+c+")'>"
      }
      else{
        document.getElementById(l+','+c).innerHTML = "<input class='caseVide' type='button' onclick='choisitArrivee("+l+","+c+")'>"
      }
    }
  }
}

function choisitPiece(ligne, colonne){
  ligneChoisie = ligne
  colonneChoisie = colonne
  affichePiece2()
}

function choisitArrivee(l,c){  
  if(coupAutoriseGlobal(ligneChoisie, colonneChoisie,l,c,'blanc')){
    piece[l][c] = piece[ligneChoisie][colonneChoisie]
    couleur[l][c] = couleur[ligneChoisie][colonneChoisie]
    if(piece[l][c] == 'pion' && l == 0){
      piece[l][c] = promotion()
      alert(piece[l][c])
    }
    piece[ligneChoisie][colonneChoisie] = 'vide'
    couleur[ligneChoisie][colonneChoisie] = 'vide'
    if (victoire('blanc')){
      document.getElementById('message').innerHTML = 'Tu as gagné !'
      enleveBouton()
      restart()
    }
    else if(pat('noir')){
      document.getElementById('message').innerHTML = 'Pat !'
      enleveBouton()
      restart()
    }
    else{ 
      coupOrdi()
      if (victoire('noir')){
        document.getElementById('message').innerHTML = "J'ai gagné !"
        enleveBouton()
        restart()
      if (pat('blanc')){
          document.getElementById('message').innerHTML = 'Pat !'
          enleveBouton()
          restart()
        }
      }
    }
  }
  affichePiece1()
}

function promotion(){
  enleveBouton()
  document.getElementById('message').innerHTML = "<input type='image' src='images/Db.png' alt='' width='90%' height='90%' onclick='return \'dame\''>"  
}

function peutJouer(joueur){
  for(var ligneDepart = 0; ligneDepart<8; ligneDepart++){
    for(var colonneDepart = 0; colonneDepart<8; colonneDepart++){
      if(couleur[ligneDepart][colonneDepart] == joueur){
        for(var ligneArrivee = 0; ligneArrivee<8; ligneArrivee++){
          for(var colonneArrivee = 0; colonneArrivee<8; colonneArrivee++){
            if(coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur)){
              return true
            }
          }
        }
      }
    }
  }
  return false
}

function victoire(joueur){
  var adversaire = (joueur == 'blanc') ? 'noir' :'blanc'
  return roiEnEchec(adversaire) && !peutJouer(adversaire)
}

function pat(joueur){
  return !peutJouer(joueur) && !roiEnEchec(joueur)
}

function enleveBouton(){
  var initiale = 'P', couleurDePiece = 'b'
  for(var l = 0; l<8; l++){
    for(var c = 0; c<8; c++){
      switch(piece[l][c]){
        case 'pion':
          initiale = 'P'
          break
        case 'tour':
          initiale = 'T'
          break
        case 'cavalier':
          initiale = 'C'
          break
        case 'fou':
          initiale = 'F'
          break
        case 'roi':
          initiale = 'R'
          break
        case 'dame':
          initiale = 'D'
          break
      }
      couleurDePiece = (couleur[l][c] == 'blanc') ? 'b' : 'n'
      if(piece[l][c] != 'vide'){
        document.getElementById(l+','+c).innerHTML = "<img src='images/"+initiale+couleurDePiece+".png' alt='' width='90%' height='90%'>"
      }
      else{
        document.getElementById(l+','+c).innerHTML = ''
      }
    }
  }
}


function restart(){
  //a faire
}

function coupOrdi(){
  var meilleureValeur = 10000
  var meilleureLigneDepart, meilleureLigneArrivee, meilleureColonneDepart, meilleureColonneArrivee
  for(var ligneDepart = 0; ligneDepart<8; ligneDepart++){
    for(var colonneDepart = 0; colonneDepart<8; colonneDepart++){
      if (couleur[ligneDepart][colonneDepart] == 'noir'){
        for(var ligneArrivee = 0; ligneArrivee<8; ligneArrivee++){
          for(var colonneArrivee = 0; colonneArrivee<8; colonneArrivee++){
            if(coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,'noir')){
              var souvenirPiece = piece[ligneArrivee][colonneArrivee]
              var souvenirCouleur = couleur[ligneArrivee][colonneArrivee] 
              piece[ligneArrivee][colonneArrivee] = piece[ligneDepart][colonneDepart]
              couleur[ligneArrivee][colonneArrivee] = couleur[ligneDepart][colonneDepart]
              piece[ligneDepart][colonneDepart] = 'vide'
              couleur[ligneDepart][colonneDepart] = 'vide'
              if (calculeValeur()<meilleureValeur){
                meilleureValeur = calculeValeur()
                meilleureLigneDepart = ligneDepart
                meilleureLigneArrivee = ligneArrivee
                meilleureColonneDepart = colonneDepart
                meilleureColonneArrivee = colonneArrivee
              }
              piece[ligneDepart][colonneDepart] = piece[ligneArrivee][colonneArrivee]
              couleur[ligneDepart][colonneDepart] = couleur[ligneArrivee][colonneArrivee]
              piece[ligneArrivee][colonneArrivee] = souvenirPiece
              couleur[ligneArrivee][colonneArrivee] = souvenirCouleur
            }
          }
        }
      }
    }
  }
  piece[meilleureLigneArrivee][meilleureColonneArrivee] = piece[meilleureLigneDepart][meilleureColonneDepart]
  couleur[meilleureLigneArrivee][meilleureColonneArrivee] = couleur[meilleureLigneDepart][meilleureColonneDepart]
  piece[meilleureLigneDepart][meilleureColonneDepart] = 'vide'
  couleur[meilleureLigneDepart][meilleureColonneDepart] = 'vide'
  document.getElementById('message').innerHTML = meilleureValeur  
}

function calculeValeur(){
  var nombreDePoints = 0, signe
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(piece[ligne][colonne] != 'vide'){
        signe = (couleur[ligne][colonne] == 'blanc') ? 1 : -1
//         Valeur des pieces
        switch(piece[ligne][colonne]){
          case 'pion':
            nombreDePoints = nombreDePoints + signe
            break
          case 'cavalier' :
          case 'fou' :  
            nombreDePoints = nombreDePoints + signe * 3
            break
          case 'tour':
            nombreDePoints = nombreDePoints + signe * 5
            break
          case 'dame':
            nombreDePoints = nombreDePoints + signe * 10
            break  
        }
//         controle du centre
        for(var ligneDuCentre = 3; ligneDuCentre<5; ligneDuCentre++){
          for(var colonneDuCentre = 3; colonneDuCentre<5; colonneDuCentre++){
            if (piece[ligneDuCentre][colonneDuCentre] == 'vide' && coupAutoriseGlobal(ligne, colonne, ligneDuCentre, colonneDuCentre, couleur[ligne][colonne])){              nombreDePoints = nombreDePoints + signe * 2  
            }
          }
        }
      }
    }
  }
  return nombreDePoints
}

function roiEnEchec(joueur){
  var ligneDuRoi, colonneDuRoi
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(piece[ligne][colonne] == 'roi' && couleur[ligne][colonne] == joueur){
        ligneDuRoi = ligne
        colonneDuRoi = colonne
      }
    }
  }
  var adversaire = (joueur == 'blanc') ? 'noir' :'blanc'
  for(var ligne = 0; ligne<8; ligne++){
    for(var colonne = 0; colonne<8; colonne++){
      if(couleur[ligne][colonne] == adversaire && coupAutorisePiece(ligne, colonne, ligneDuRoi, colonneDuRoi, adversaire)){
        return true
      }
    }
  }
  return false
}

function coupAutorisePiece(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur){
  var testeCaseArrivee = false, testeRegle = false, differenceColonne, differenceLigne
  
  testeCaseArrivee = couleur[ligneArrivee][colonneArrivee] != joueur
  
  differenceLigne = Math.abs(ligneArrivee - ligneDepart)
  differenceColonne = Math.abs(colonneArrivee - colonneDepart)
  switch(piece[ligneDepart][colonneDepart]){
    case 'cavalier':
      testeRegle = (differenceColonne == 1 && differenceLigne == 2) || (differenceColonne == 2 && differenceLigne == 1)
      break
    case 'roi':
      testeRegle = (differenceColonne <= 1 && differenceLigne <= 1)
      break
    case 'tour':
      testeRegle = (differenceColonne == 0 || differenceLigne == 0) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'fou':
      testeRegle = (differenceColonne == differenceLigne) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'dame':
      testeRegle = (differenceColonne == differenceLigne || differenceColonne == 0 || differenceLigne == 0) && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee)
      break
    case 'pion':
      var sensPion = (joueur == 'blanc') ? -1 : 1
      var ligneDePion = ( joueur == 'blanc') ? 6 : 1
      if(piece[ligneArrivee][colonneArrivee] == 'vide'){
        testeRegle = ((ligneArrivee - ligneDepart) == sensPion && differenceColonne == 0)
          || (ligneDepart == ligneDePion && differenceColonne == 0 && differenceLigne == 2 && pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee))
      }
      else{
        testeRegle = ((ligneArrivee - ligneDepart) == sensPion && differenceColonne == 1)
      }
      break
    default:
      testeRegle = true
  }
  return testeCaseArrivee && testeRegle
}

function coupAutoriseGlobal(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur){
  if(coupAutorisePiece(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee,joueur)){
    var souvenirPiece = piece[ligneArrivee][colonneArrivee]
    var souvenirCouleur = couleur[ligneArrivee][colonneArrivee] 
    piece[ligneArrivee][colonneArrivee] = piece[ligneDepart][colonneDepart]
    couleur[ligneArrivee][colonneArrivee] = couleur[ligneDepart][colonneDepart]
    piece[ligneDepart][colonneDepart] = 'vide'
    couleur[ligneDepart][colonneDepart] = 'vide'
    var testeEchec = roiEnEchec(joueur)
    piece[ligneDepart][colonneDepart] = piece[ligneArrivee][colonneArrivee]
    couleur[ligneDepart][colonneDepart] = couleur[ligneArrivee][colonneArrivee]
    piece[ligneArrivee][colonneArrivee] = souvenirPiece
    couleur[ligneArrivee][colonneArrivee] = souvenirCouleur
    return ! testeEchec
  }
  else{
    return false
  }
}
  
function pasDobstacle(ligneDepart,colonneDepart,ligneArrivee,colonneArrivee){
  var ligneCourante = ligneDepart, colonneCourante = colonneDepart
  var pasDeLigne = 0, pasDeColonne = 0
  if(ligneDepart > ligneArrivee){
    pasDeLigne = -1
  }
  if(ligneDepart < ligneArrivee){
    pasDeLigne = 1
  }
  if(colonneDepart > colonneArrivee){
    pasDeColonne = -1
  }
  if(colonneDepart < colonneArrivee){
    pasDeColonne = 1
  }
  ligneCourante = ligneCourante + pasDeLigne
  colonneCourante = colonneCourante + pasDeColonne
  while(ligneCourante != ligneArrivee || colonneCourante != colonneArrivee){
    if(piece[ligneCourante][colonneCourante] != 'vide'){
      return false
    }
    ligneCourante = ligneCourante + pasDeLigne
    colonneCourante = colonneCourante + pasDeColonne
  }
  return true
}