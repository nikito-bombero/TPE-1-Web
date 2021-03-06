"use strict"

//let APIurl = "http://localhost/web/Entrega/TPE-1-WEB/api/comments/";
let APIurl = "http://localhost/web2/TPE-1-WEB/api/comments/"
let info = document.getElementById('info-user');
let itemInfo = document.getElementById('info-item');
let itemId = itemInfo.dataset.infoItem;


/**
 * Botón que envía mediante API REST un comentario
 */
// Instancio la app VUE
let app = new Vue({
    el: "#comments",
    data: {
        loading: false,
        comments: [],
        userName: info.dataset.user,
        rol: info.dataset.rol,
        promedio: 0
    },
    methods: {
        deleteComment: function (id) {
            delete_comment(id);
        },
    }
});

//se recarga cada 30 seg
document.getElementById("btn-reload").addEventListener('click', getComments);
setInterval(getComments, 30000);

getComments();

/**
 * Realiza el promedio de puntajes ingresados en los comentarios de los usuarios
 */
function promedio(comments) {
    let suma = 0;
    if (comments.length == 0) {
        return 0;
    }
    for (let i = 0; i < comments.length; i++) {
        suma += parseInt(comments[i].votos);
    }
    return suma / comments.length;
}

/**
 *  Trae todos los comentarios mediante API REST
 */
async function getComments() {

    app.loading = true;
    try {
        let respuesta = await fetch(APIurl + itemId);
        let comments = await respuesta.json();
        app.promedio = promedio(comments);
        app.comments = comments;
        app.loading = false;
    }
    catch (e) {
        console.log(e);
    }
}

// Botón agregar comentario
document.querySelector("#btn-addComment").addEventListener('click', addComment);

/**
 * Envía un comentario mediante API REST
 */
async function addComment() {
    try {
        let data = {
            "comentario": document.querySelector("#comentario").value,
            "id_torneo_fk": itemId,
            "votos": document.querySelector("#puntaje").value,
            "id_usuario_fk": info.dataset.userid
        }
        console.log(data);
        let respuesta = await fetch(APIurl + itemId, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(data)
        });
        let json = await respuesta.json();
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * Elimina un comentario 
 */
async function delete_comment(id) {
    try {
        let response = await fetch(APIurl + id, {
            "method": "DELETE"
        });
        let json = await response.json();
        getComments();
    }
    catch (e) {
        console.log(e);
    }
}