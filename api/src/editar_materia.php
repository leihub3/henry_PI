	<?php
		if (isset($con))
		{
	?>	
	
	<!-- Modal -->
<div class="modal fade" id="MyModalEditarMateria" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel"><i class='glyphicon glyphicon-edit'></i> Editar Materia</h4>
      </div>
      <div class="modal-body">
       <form class="form-horizontal" method="post" id="editar_materia" name="editar_materia">
			<div id="resultados_ajax_editar"></div>
			  
			   <div class="form-group">				
				<label class="col-sm-3 control-label">Código de Carrera:</label>
				<div class="col-sm-8">
					  <input type="text" class="form-control" id="editar_materia_ccarr" name="editar_materia_ccarr" placeholder="Ingresa el Código de Carrera">
				</div>
			  </div>
			  
			  <div class="form-group">				
				<label class="col-sm-3 control-label">Código de Materia:</label>
				<div class="col-sm-8">
					  <input type="number" class="form-control" id="editar_materia_cmat" name="editar_materia_cmat" placeholder="Ingresa el Código de Materia">
				</div>
			  </div>
			   
			   <div class="form-group">				
				<label class="col-sm-3 control-label">Año Calendario:</label>
				<div class="col-sm-8">
					  <input type="number" class="form-control" id="editar_materia_anio" name="editar_materia_anio" placeholder="Ingresa el Año Calendario">
				</div>
			  </div>
			  			  
			  
			  <div class="form-group">
				<label class="col-sm-3 control-label">Período:</label>
				<div class="col-sm-8">
				  <select class="form-control" name="editar_materia_periodo" id="editar_materia_periodo">
				  <option value="noseleccionado">Seleccionar Período</option>
				  <option value="1er Semestre">1er Semestre</option>
				  <option value="2do Semestre">2do Semestre</option>
				  </select>
					</div>
			  </div>
			  
			  <div class="form-group">
				<label class="col-sm-3 control-label">Nombre:</label>
				<div class="col-sm-8">
					  					  
					  <input type="text" class="form-control" id="editar_materia_nombre" name="editar_materia_nombre" placeholder="Nombre de la Materia">
					  <input type="hidden" id="editar_materia_id" name="editar_materia_id">
				</div>
			  </div>
			  
			  <div class="form-group">
				<label class="col-sm-3 control-label">Año de Cursado:</label>
				<div class="col-sm-8">
				  <select class="form-control" name="editar_materia_curso" id="editar_materia_curso">
				  <option value="noseleccionado">Seleccionar Año</option>
				 <option value="1er A&ntilde;o">1er A&ntilde;o</option>
				  <option value="2do A&ntilde;o">2do A&ntilde;o</option>
				  <option value="3er A&ntilde;o">3er A&ntilde;o</option>
				  <option value="4to A&ntilde;o">4to A&ntilde;o</option>
				  <option value="5to A&ntilde;o">5to A&ntilde;o</option>
				  </select>
					</div>
			  </div>
			  
			  <div class="form-group">
				<label class="col-sm-3 control-label">Profesor:</label>
				<div class="col-sm-8">
				  <input type="text" class="form-control" id="editar_materia_profesor" name="editar_materia_profesor" placeholder="Profesor">
					</div>
			  </div>
			  
			  <div class="form-group">
				<label class="col-sm-3 control-label">Aula:</label>
				<div class="col-sm-8">
				  <select class="form-control" name="editar_materia_aula" id="editar_materia_aula">
				  <option value="noseleccionado">Seleccionar Aula</option>
				  <option value="901">901</option>
				  <option value="903">903</option>
				  <option value="904">904</option>
				  <option value="905">905</option>
				  <option value="907">907</option>
				  <option value="908">908</option>
				  <option value="GINAS">Ginastera</option>
				  <option value="MIDI">Midi</option>
				  <option value="S02">S02</option>
				  <option value="Otra 1">Otra 1</option>
				  <option value="Otra 2">Otra 2</option>
				  </select>
					</div>
			  </div>
			  
			  <div class="form-group">
				<label  class="col-sm-3 control-label">Día:</label>
				<div class="col-sm-8">
				  <select class="form-control" name="editar_materia_dia" id="editar_materia_dia" required>
				  <option value="noseleccionado">Seleccionar Día</option>
				  <option value="lunes">Lunes</option>
				  <option value="martes">Martes</option>
				  <option value="miercoles">Miércoles</option>
				  <option value="jueves">Jueves</option>
				  <option value="viernes">Viernes</option>
				  </select>
					</div>
			  </div>
			  
			  <div class="form-group">
				<label  class="col-sm-3 control-label">Hora de Comienzo:</label>
				<div class="col-sm-8">
				 <select class="form-control" name="editar_materia_hcomienzo" id="editar_materia_hcomienzo">
				  <option value="noseleccionado">Seleccionar H. de Comienzo</option>
				  <option value="07:45:00">7:45</option>
				  <option value="08:30:00">8:30</option>
				  <option value="09:30:00">9:30</option>
				  <option value="10:15:00">10:15</option>
				  <option value="11:30:00">11:30</option>
				  <option value="12:15:00">12:15</option>
				  <option value="13:30:00">13:30</option>
				  <option value="14:15:00">14:15</option>
				  <option value="15:10:00">15:10</option>
				  <option value="15:55:00">15:55</option>
				  <option value="16:45:00">16:45</option>
				  <option value="18:00:00">18:00</option>
				  <option value="18:45:00">18:45</option>
				  <option value="19:45:00">19:45</option>
				  <option value="20:30:00">20:30</option>
				  <option value="21:15:00">21:15</option>
				  <option value="22:00:00">22:00</option>
				  </select>
					</div>
			  </div>
			  
			  <div class="form-group">
				<label  class="col-sm-3 control-label">Hora Fin:</label>
				<div class="col-sm-8">
				  <select class="form-control" name="editar_materia_hfin" id="editar_materia_hfin">
				   <option value="noseleccionado">Seleccionar H. Fin</option>
				  <option value="08:30:00">8:30</option>
				  <option value="09:15:00">9:15</option>
				  <option value="10:15:00">10:15</option>
				  <option value="11:00:00">11:00</option>
				  <option value="12:15:00">12:15</option>
				  <option value="13:00:00">13:00</option>
				  <option value="14:15:00">14:15</option>
				  <option value="15:00:00">15:00</option>
				  <option value="15:55:00">15:55</option>
				  <option value="16:40:00">16:40</option>
				  <option value="17:30:00">17:30</option>
				  <option value="18:45:00">18:45</option>
				  <option value="19:30:00">19:30</option>
				  <option value="20:30:00">20:30</option>
				  <option value="21:15:00">21:15</option>
				  <option value="22:00:00">22:00</option>
				  <option value="22:45:00">22:45</option>
				  </select>
					</div>
			  </div>
			  
			  </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="actualizar_materia">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

	<?php
		}
	?>