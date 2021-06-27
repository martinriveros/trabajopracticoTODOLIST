window.onload=()=>renderLocalData();

let listaDeTareas=[];
let fullfilled = [];


if(JSON.parse(localStorage['localData']!=='')){
  listaDeTareas = JSON.parse(localStorage['localData'])
};

function enablebtn(){
   document.querySelector('#addbtn').removeAttribute("disabled");
}


function agregarTarea (e){

  e.preventDefault();
  let input = e.path[1][0].value // texto del input

  if (input!==''){
    const tarea = {};
    tarea.id = Math.floor(Math.random()*4000);
    tarea.task = input;
    tarea.fulfilled = false; // uno de los estados de la tarea (completada)
    tarea.removed = false; // otro de los estados de la tarea (eliminada)
    tarea.later = false; // el otro estado de la tarea (luego)
    
    listaDeTareas.push(tarea);
    
    saveLocalStorage(listaDeTareas);
    renderLocalData();
  }
}

function renderLocalData(){
  
  let listaDeTareas = getLocalStorage();
  
  let contenedor='';
  
  if(document.querySelector('.claseContenedor')!==null){
    document.querySelector('.claseContenedor').remove();
  }  
    
  contenedor = document.createElement('div');
  contenedor.classList.add('claseContenedor')  
  contenedor.innerHTML=`<h2>Tareas pendientes</h2>`
  listaDeTareas.forEach(renglon=>{
    if(renglon.fulfilled===false && renglon.removed===false && renglon.later===false) {
  
  contenedor.innerHTML += `
                          <div class="contTarea">
                          <div class="tarea">${renglon.task}</div><div class='botones'>  <button class='done' onclick=donebtn(${renglon.id})>DONE</button>  <button class='later' onclick=laterbtn(${renglon.id})>LATER</button>  <button class='remove' onclick=removebtn(${renglon.id})>REMOVE</button></div></div>
                          <br>
    `}})
  contenedor.innerHTML +=`<h2>Tareas para realizar luego</h2>`
  
  listaDeTareas.forEach(renglon=>{
    
    if(renglon.later===true && renglon.removed===false && renglon.fulfilled===false){
    contenedor.innerHTML +=`
                ${renglon.task} <button class='done' onclick=donebtn(${renglon.id})>DONE</button>  <button class='remove' onclick=removebtn(${renglon.id})>REMOVE</button>
                <br>
     
    `}})
  
    contenedor.innerHTML +=`<h2>Tareas eliminadas</h2>`
  
    listaDeTareas.forEach(renglon=>{
      
      if(renglon.removed===true){
      contenedor.innerHTML +=`
                  ${renglon.task} <button class='done' onclick=undo(${renglon.id})>UNDO</button>
                  <br>
       
      `}})

  document.body.appendChild(contenedor)

}


function saveLocalStorage(list){
  localStorage['localData'] = JSON.stringify(list)
}

function getLocalStorage(){
  return JSON.parse(localStorage['localData'])

}

function donebtn(esto){
  
  listaDeTareas.forEach(tarea=>{
    if(tarea.id===esto){
      tarea.fulfilled=true
    }
  })
   
  saveLocalStorage(listaDeTareas);
  renderLocalData();

};

function laterbtn(esto){
listaDeTareas.forEach(tarea=>{
  if(tarea.id===esto){
  tarea.later=true

  }
})

saveLocalStorage(listaDeTareas);
renderLocalData();

}

function removebtn(esto){
  listaDeTareas.forEach(tarea=>{
    if(tarea.id===esto){
      tarea.removed=true
      tarea.later=false
    }
  })
   
  saveLocalStorage(listaDeTareas);
  renderLocalData();
};

function undo(esto){
  listaDeTareas.forEach(tarea=>{
    if(tarea.id===esto){
      tarea.removed=false;
    }
  })
   
  saveLocalStorage(listaDeTareas);
  renderLocalData();
};