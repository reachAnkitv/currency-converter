let enteredfrom=document.querySelector("#entryfrom");
let enteredto=document.querySelector("#toresult");
let showfrom=document.querySelector("#selectfrom");
let showto=document.querySelector("#selectresult");
let convert=document.querySelector("#btn");
let clearall=document.querySelector("#clr");
let interchange=document.querySelector("#itc");

let interchangecurr=()=>{
    let temp=showto.value;
    showto.value=showfrom.value;
    showfrom.value=temp;
    goto();
}

let doit=()=>{
    goto();
}
let wipe=()=>{
    enteredfrom.value=0;
    enteredto.value=0;
showfrom.value="USD";
showto.value="USD";
}
async function bring(a){
    let x="https://api.exchangerate-api.com/v4/latest/"+a;
    let b=await fetch(x);
    return await b.json();
}
let goto=()=>{
    
    let entval=enteredfrom.value;
    let enteredunit=showfrom.value;
    let outunit=showto.value;
    let outval=enteredto.value;
    let coefficient;
    let promise=bring(enteredunit);
    promise.then((e)=>{
        for(key in e){
            if(key==="rates"){
                let x=e[key];
                for(let i in x){
                    if(i===outunit){
                        coefficient=x[i];
                        break;
                    }
                }
                break;
            }
        }
        
        enteredto.value=coefficient*entval;
    })
    promise.catch((bb)=>{
        enteredfrom.value="some error";
        enteredto.value="some error";
    })
    
}
let gofrom=()=>{
    let entval=enteredto.value;
    let enteredunit=showto.value;
    let outunit=showfrom.value;
    let outval=enteredfrom.value;
    let coefficient;

    let promise=bring(enteredunit);
    promise.then((e)=>{
        for(key in e){
            if(key==="rates"){
                let x=e[key];
                for(let i in x){
                    if(i===outunit){
                        coefficient=x[i];
                        break;
                    }
                }
                break;
            }
        }
        
        enteredfrom.value=coefficient*entval;
    })
    promise.catch((bb)=>{
        enteredfrom.value="some error";
        enteredto.value="some error";
    })
    
}

enteredfrom.addEventListener("input",goto);
enteredto.addEventListener("input",gofrom);
showfrom.addEventListener("input",goto);
showto.addEventListener("change",goto);
convert.addEventListener("click",doit);
clearall.addEventListener("click",wipe);
interchange.addEventListener("click",interchangecurr);
