const container = document.getElementById("container");
const play = document.getElementById("play"); 


play.addEventListener("click", function(){
    const difficolta = document.getElementById("difficolta").value;
    createGrid(difficolta);
});

function createGrid(x){
    const boxes = document.querySelectorAll(".box");
    for (let i=0; i< boxes.length; i++){
        boxes[i].remove();
    }
    const elem = document.getElementById("risultato");
    elem.innerHTML="";

    let numero = 0;
    if (x == "Hard"){
        numero = 49;
    }
    else if (x == "Medium"){
        numero = 81;
    }
    else{
        numero = 100;
    }

    //tiro a sorte i 16 numeri
    const bombe = [];
    for(let i=1; i<=16;i++){
        while(true){
            let bomba = Math.floor(Math.random() *numero) +1;
            if(checkBomba(bomba, bombe) == false){
                bombe.push(bomba);
                break;
            }
        }
    }
    console.log(bombe);

    for(let i=1; i<=numero;i++){
        let box = document.createElement("div");
        box.classList.add("box");
        if (x == "Hard"){
            box.classList.add("box-7");
        }
        else if (x == "Medium"){
            box.classList.add("box-9");
        }
        else{
            box.classList.add("box-10");
        }
        if (checkBomba(i, bombe) == true){
            box.addEventListener("click", function(){
                box.classList.add("red");
                console.log(`Hai cliccato la bomba ${i} - HAI PERSO`);
                const boxes = document.querySelectorAll(".box");
                for (let i=0; i<boxes.length; i++){
                    // rimpiazzo ogni box con il proprio clone in modo da levare ogni eventlistener
                    boxes[i].replaceWith(boxes[i].cloneNode(true));
                }
                const elem = document.getElementById("risultato");
                elem.innerHTML="Hai perso!";
            })
        }
        else{
            box.addEventListener("click", function(){
                box.classList.add("colored");
                console.log(`Hai cliccato la cella ${i}`);
            })
        }
        box.innerHTML=`${i}`;
        container.appendChild(box);
    }
}

function checkBomba(numero, lista){
    for(let i=0; i<lista.length;i++){
        if(lista[i] == numero){
            return true;
        }
    }
    return false;
}
