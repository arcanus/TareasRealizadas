!function(e){function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}var t={};a.m=e,a.c=t,a.i=function(e){return e},a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},a.p="dist",a(a.s=0)}([function(e,a){new Clipboard(".btnCopiarMail");new Vue({el:"#VueApp",data:{tareas:JSON.parse(localStorage.getItem("tareas")),nuevaTarea:{nombre:"",usuario:"",ticket:"",desc:""},tecnico:localStorage.getItem("tecnico"),tecnicos:["Paulo Vazquez","David Infante","Santiago Castellanos","German Del Tedesco"]},methods:{eliminarTarea:function(e){this.tareas.splice(e,1),this.guardarEnLS()},guardarEnLS:function(){localStorage.setItem("tareas",JSON.stringify(this.tareas))},resetFormTareas:function(){this.nuevaTarea.nombre="",this.nuevaTarea.usuario="",this.nuevaTarea.ticket="",this.nuevaTarea.desc=""},submitFormTarea:function(e){this.tareas.push({nombre:this.nuevaTarea.nombre,usuario:this.nuevaTarea.usuario,ticket:this.nuevaTarea.ticket,desc:this.nuevaTarea.desc}),this.guardarEnLS(),this.resetFormTareas(),e.preventDefault()},cargarTareas:function(){var e="";return e="Tareas Realizadas:\n",e+="==================\n\n",e+="Fecha: "+this.obtenerFecha()+"\n",e+="Técnico: "+this.tecnicos[this.tecnico],this.tareas.forEach(function(a){e+="\n\n",e+="Tarea: "+a.nombre+"\n",e+="Usuario: "+a.usuario+"\n",e+="Ticket: "+a.ticket+"\n",e+="Descripcion: "+a.desc}),e},obtenerFecha:function(){var e=new Date,a=e.getDate(),t=e.getMonth()+1,n=e.getFullYear();return a<10&&(a="0"+a),t<10&&(t="0"+t),e=t+"/"+a+"/"+n},enviarMail:function(){alert("Función momentaneamente deshabilitada...")},guardarTecnico:function(){localStorage.setItem("tecnico",this.tecnico)}}})}]);