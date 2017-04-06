import Vue from './vue';
var clipboard = new Clipboard('.btnCopiarMail');

new Vue({
  el: '#VueApp',
  data: {
    tareas: JSON.parse(localStorage.getItem('tareas')) ? JSON.parse(localStorage.getItem('tareas')) : [],
    n_tareas: 0,
    nuevaTarea: {
      nombre: '',
      usuario: '',
      ticket: '',
      desc: ''
    },
    tecnico: localStorage.getItem('tecnico'),
    tecnicos: [
      'Paulo Vazquez',
      'David Infante',
      'Santiago Castellanos',
      'German Del Tedesco'
    ]
  },
  methods: {
    eliminarTarea: function(i) {
      this.tareas.splice(i, 1);
      this.guardarEnLS();
    },
    guardarEnLS: function() {
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    },
    resetFormTareas: function() {
      this.nuevaTarea.nombre = '';
      this.nuevaTarea.usuario = '';
      this.nuevaTarea.ticket = '';
      this.nuevaTarea.desc = '';
    },
    almacenarTarea: function(e) {
      if (this.tareas)
      {
        this.tareas.push({
          nombre: this.nuevaTarea.nombre,
          usuario: this.nuevaTarea.usuario,
          ticket: this.nuevaTarea.ticket,
          desc: this.nuevaTarea.desc
        });
        this.guardarEnLS();
        this.resetFormTareas();
        e.preventDefault();
        $('#modalNuevaTarea').modal('hide');
      }
    },
    cargarTareas: function() {
      var mail = '';

      mail = 'Tareas Realizadas:\n';
      mail += '==================\n\n';

      mail += 'Fecha: ' + this.obtenerFecha() + '\n';
      mail += 'Tecnico: ' + this.tecnicos[this.tecnico];

      if (this.tareas)
      {
        this.tareas.forEach(function(tarea){
          mail += '\n\n';
          mail += 'Tarea: ' + tarea.nombre + '\n';
          mail += 'Usuario: ' + tarea.usuario + '\n';
          mail += 'Ticket: ' + tarea.ticket + '\n';
          mail += 'Descripcion: ' + tarea.desc;
        });
      }
      return mail;
    },
    armarMailHTML: function() {
      var mail = '';

      mail = '<h1>Tareas Realizadas:</h1>\n';
      mail += '<hr>\n';

      mail += '<h3>Fecha: ' + this.obtenerFecha() + '</h3>\n';
      mail += '<h3>Tecnico: ' + this.tecnicos[this.tecnico] + '</h3>\n';
      mail += '<hr>';

      if (this.tareas)
      {
        this.tareas.forEach(function(tarea){
          mail += '\n';
          mail += '<h3>Tarea: ' + tarea.nombre + '</h3>\n';
          mail += '<h3>Usuario: ' + tarea.usuario + '</h3>\n';
          mail += '<h3>Ticket: ' + tarea.ticket + '</h3>\n';
          mail += '<h3>Descripcion: ' + tarea.desc + '</h3>\n';
          mail += '<hr>';
        });
      }
      return mail;
    },
    obtenerFecha: function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      }

      if(mm<10) {
          mm='0'+mm
      }

      today = mm+'/'+dd+'/'+yyyy;

      return today;
    },
    enviarMail: function() {
      $.ajax({
        method: 'GET',
        url: 'mail.php',
        data: {
          'mailTecnico': 'vazquezp@lmneuquen.com.ar',
          'cuerpoMail': this.armarMailHTML(),
          'ajax': true
        },
        success: function (data) {
          console.log('Mail enviado correctamente!');          
        }
      });
    },
    guardarTecnico: function() {
      localStorage.setItem('tecnico',this.tecnico);
    }
  }
});
