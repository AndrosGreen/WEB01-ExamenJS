var plataforma = "Netflix";
var plan = 1;
var costoPorMes = 100;
var descuento = 1.0;
var total = 100;

window.onload = function (){
    actualizarTotal();
}

function actualizarTotal (){
    total = plan * costoPorMes * descuento;
    var txtTotal = document.getElementById('txtTotal');
    var cardTotal = document.getElementById('cardTotal');
    txtTotal.innerHTML = total;
    cardTotal.innerText = total;
}

function updateCard (){
    var txtPlataforma = document.getElementById('cardPlataforma');
    var txtPlan = document.getElementById('cardPlan');

    txtPlataforma.innerText = plataforma;
    if(plan === 1) txtPlan.innerText = "1 mes";
    if(plan === 3) txtPlan.innerText = "3 meses";
    if(plan === 6) txtPlan.innerText = "6 meses";
    if(plan === 12) txtPlan.innerText = "1 año";

    var imgPlataforma = document.getElementById('imgPlataforma')

    if(plataforma === "Netflix") imgPlataforma.setAttribute('src','./img/netflix.png');
    if(plataforma === "HBO Max") imgPlataforma.setAttribute('src','./img/hbo.webp');
    if(plataforma === "Disney+") imgPlataforma.setAttribute('src','./img/disney.webp');
    if(plataforma === "Prime Video") imgPlataforma.setAttribute('src','./img/prime.jpg');
}

function updatePlataforma (){
    if(plataforma === "Netflix") costoPorMes = 100;
    if(plataforma === "HBO Max") costoPorMes = 110;
    if(plataforma === "Disney+") costoPorMes = 120;   
    if(plataforma === "Prime Video") costoPorMes = 100;
}

function handleChangePlataforma (event){
    plataforma = event.target.value;
    console.log(plan);
    updatePlataforma();
    updateCard();
    actualizarTotal();
}

function handleChangePlan (event){
    plan = parseInt( event.target.value );
    actualizarTotal();
    updateCard();
}

function handleChangeDescuento (event){
    descuento = parseFloat( event.target.value );
    actualizarTotal();
}

function openCard(){
    document.getElementById("confirmar-pedido").style = "";
}

function registrarPedido(){
    if(validarNombre()){
        console.log("yes");
        document.getElementById("confirmar-pedido").style = "display: none";
    }
}

function validarNombre (){
    var txtNombre = document.getElementById('txtNombre').value;
    if(txtNombre.trim().length === 0){
        document.getElementById('errorNombre').innerText = "Nombre no puede estar vacio";
        return false;
    }
    if(txtNombre.trim().length < 4 || txtNombre.trim().length > 60){
        document.getElementById('errorNombre').innerText = "Nombre debe tener entre 4 y 60 caracteres";
        return false;
    }
    return true;
}