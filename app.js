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
      mail += 'Técnico: ' + this.tecnicos[this.tecnico];

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
      alert('Función momentaneamente deshabilitada...');
    },
    guardarTecnico: function() {
      localStorage.setItem('tecnico',this.tecnico);
    }
  }
});
