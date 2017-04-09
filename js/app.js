import Vue from './vue';
var clipboard = new Clipboard('.btnCopiarMail');

new Vue({
  el: '#VueApp',
  data: {
    version: '1.1.0',
    tareas: JSON.parse(localStorage.getItem('tareas')) ? JSON.parse(localStorage.getItem('tareas')) : [],
    nuevaTarea: {
      nombre: '',
      usuario: '',
      ticket: 0,
      desc: ''
    },
    mostrarTareasEspeciales: false,
    tecnico: localStorage.getItem('tecnico') ? localStorage.getItem('tecnico') : 0,
    tecnicos: [
      {
        nombre: 'Paulo Vazquez',
        mail:   'vazquezp@lmneuquen.com.ar'
      },
      {
        nombre: 'David Infante',
        mail:   'infanted@lmneuquen.com.ar'
      },
      {
        nombre: 'Santiago Castellanos',
        mail:   'castellanos@lmneuquen.com'
      },
      {
        nombre: 'Germán Del Tedesco',
        mail:   'deltedescog@lmneuquen.com.ar'
      }
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
          ticket: this.nuevaTarea.ticket != 0 ? this.nuevaTarea.ticket : 'Sin Ticket',
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
      mail += 'Tecnico: ' + this.tecnicos[this.tecnico].nombre;

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
      mail += '<h3>Tecnico: ' + this.tecnicos[this.tecnico].nombre + '</h3>\n';
      mail += '<hr>\n';

      if (this.tareas)
      {
        mail += '<ul>\n';
        this.tareas.forEach(function(tarea){
          mail += '\n';
          mail += '<li><h3>Tarea: ' + tarea.nombre + '</h3></li>\n';
          mail += '<li><h3>Usuario: ' + tarea.usuario + '</h3></li>\n';
          mail += '<li><h3>Ticket: ' + tarea.ticket + '</h3></li>\n';
          mail += '<li><h3>Descripcion: ' + tarea.desc + '</h3></li>\n';
          mail += '<hr>';
        });
        mail += '</ul>\n';
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
      if (window.confirm('¿Seguro desea enviar el mail de novedades?'))
      {
        $.ajax({
          method: 'GET',
          url: 'mail.php',
          data: {
            'mailTecnico': this.tecnicos[this.tecnico].mail,
            'nombreTecnico': this.tecnicos[this.tecnico].nombre,
            'cuerpoMail': this.armarMailHTML(),
            'fecha': this.obtenerFecha(),
            'ajax': true
          },
          success: function (data) {
            console.log(data);
          }
        });
      }
    },
    guardarTecnico: function() {
      localStorage.setItem('tecnico',this.tecnico);
    },
    eliminarTodasLasTareas: function() {
      if(window.confirm('¿Confirma que desea eliminar todas als tareas?'))
      {
        this.tareas = [];
        this.guardarEnLS();
      }
    },
    agregarTarea: function(tar) {
      var tareaEspecial = {};
      switch (tar) {
        case 'TrabajoDeProsper':
          tareaEspecial = {
            nombre: 'Trabajos De Prosper',
            usuario: this.tecnicos[this.tecnico].nombre,
            ticket: 'Sin Ticket',
            desc: 'Se realizaron los trabajos de prosper correspondientes.'
          };
          this.tareas.push(tareaEspecial);
          this.guardarEnLS();
          break;

          case 'ImpresionCodigos':
            tareaEspecial = {
              nombre: 'Impresión De Códigos',
              usuario: this.tecnicos[this.tecnico].nombre,
              ticket: 'Sin Ticket',
              desc: 'Se imprimieron los códigos de barra.'
            };
            this.tareas.push(tareaEspecial);
            this.guardarEnLS();
            break;

            case 'SmartCycles':
              tareaEspecial = {
                nombre: 'Smart Cycles',
                usuario: this.tecnicos[this.tecnico].nombre,
                ticket: 'Sin Ticket',
                desc: 'Se realizaron los Smart Cycles correspondientes.'
              };
              this.tareas.push(tareaEspecial);
              this.guardarEnLS();
              break;

        default:
            return;
      }
    }
  }
});
