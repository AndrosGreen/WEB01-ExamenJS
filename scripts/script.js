var plataforma = "Netflix";
var plan = 1;
var costoPorMes = 100;
var descuento = 1.0;
var total = 100;
var id = 0;
var listaProductos = [];

window.onload = function () {
    actualizarTotal();

    cargarRegistros();

    $("#tblProductos").DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
        },
        createdRow: function (row, data, index) {
            if (data[2] == 0) {
                //Colorear toda la fila cuando la existencia sea 0
                $("td", row).eq(2).addClass("table-danger");
            }
        },
        order: [
            [2, "asc"],
            [0, "asc"],
        ],
        dom: "Bfrtip",
        buttons: [
            {
                extend: "copyHtml5",
                text: "Copiar al portapapeles",
            },
            {
                extend: "excelHtml5",
                text: "Exportar a excel",
            },
            {
                extend: "pdfHtml5",
                text: "Exportar a pdf",
            },
        ],
    });
};

function cargarRegistros() {
    document.querySelector("#tblProductos tbody").innerHTML = "";
    listaProductos = localStorage.getItem("lista");
    if (listaProductos) listaProductos = JSON.parse(listaProductos);
    else listaProductos = [];
    console.log(listaProductos);
    for (var i = 0; i < listaProductos.length; i++) {
        agregarATabla(listaProductos[i]);
    }
}

function actualizarTotal() {
    total = plan * costoPorMes * descuento;
    var txtTotal = document.getElementById("txtTotal");
    var cardTotal = document.getElementById("cardTotal");
    txtTotal.innerHTML = total;
    cardTotal.innerText = total;
}

function updateCard() {
    var txtPlataforma = document.getElementById("cardPlataforma");
    var txtPlan = document.getElementById("cardPlan");

    txtPlataforma.innerText = plataforma;
    if (plan === 1) txtPlan.innerText = "1 mes";
    if (plan === 3) txtPlan.innerText = "3 meses";
    if (plan === 6) txtPlan.innerText = "6 meses";
    if (plan === 12) txtPlan.innerText = "1 año";

    var imgPlataforma = document.getElementById("imgPlataforma");

    if (plataforma === "Netflix")
        imgPlataforma.setAttribute("src", "./img/netflix.png");
    if (plataforma === "HBO Max")
        imgPlataforma.setAttribute("src", "./img/hbo.webp");
    if (plataforma === "Disney+")
        imgPlataforma.setAttribute("src", "./img/disney.webp");
    if (plataforma === "Prime Video")
        imgPlataforma.setAttribute("src", "./img/prime.jpg");
}

function updatePlataforma() {
    if (plataforma === "Netflix") costoPorMes = 100;
    if (plataforma === "HBO Max") costoPorMes = 110;
    if (plataforma === "Disney+") costoPorMes = 120;
    if (plataforma === "Prime Video") costoPorMes = 100;
}

function handleChangePlataforma(event) {
    plataforma = event.target.value;
    console.log(plan);
    updatePlataforma();
    updateCard();
    actualizarTotal();
}

function handleChangePlan(event) {
    plan = parseInt(event.target.value);
    actualizarTotal();
    updateCard();
}

function handleChangeDescuento(event) {
    descuento = parseFloat(event.target.value);
    actualizarTotal();
}

function openCard() {
    document.getElementById("confirmar-pedido").style = "";
}

function registrarPedido() {
    if (validarNombre()) {
        document.getElementById("confirmar-pedido").style = "display: none";
        registro = {
            id: id,
            servicio: plataforma,
            tipoPlan: document.getElementById("cardPlan").innerText,
            precio: total,
            cliente: document.getElementById("txtNombre").value,
        };
        listaProductos.push(registro);
        localStorage.setItem("lista", JSON.stringify(listaProductos));
        id++;
        location.reload();
    }
}

function agregarATabla(registro) {
    var tr = document.createElement("tr");
    var tdServicio = document.createElement("td");
    var tdTipoPlan = document.createElement("td");
    var tdPrecio = document.createElement("td");
    var tdCliente = document.createElement("td");

    tdServicio.innerText = registro.servicio;
    tdTipoPlan.innerText = registro.tipoPlan;
    tdPrecio.innerText = registro.precio;
    tdCliente.innerText = registro.cliente;

    tr.append(tdServicio);
    tr.append(tdTipoPlan);
    tr.append(tdPrecio);
    tr.append(tdCliente);

    document.querySelector("#tblProductos tbody").append(tr);
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