class OperacionesGen {
    static ObtieneOpcionesSeleccionados(idTabla, classOpt = "opt", attrNamedataTarget = "data-target") {
        //idTabla  : Id de la tabla que contendrá los checkboxs
        //classOpt : Clase de los checkboxs
        //attrNamedataTarget: Data a retornar para los checkbox con attr checked
        return $('#' + idTabla + ' input.' + classOpt + ':checkbox:checked').map(function () {
            if ($(this).is(':checked')) {
                return $(this).attr(attrNamedataTarget);
            }
        }).get();
    }
    static Obtienefilastabla(idTabla, classOpt = "opt", attrNamedataTarget = "data-target") {
        //idTabla  : Id de la tabla que contendrá los checkboxs
        //classOpt : Clase de los checkboxs
        //attrNamedataTarget: Data a retornar para los checkbox con attr
        return $('#' + idTabla + ' input.' + classOpt +':checkbox' ).map(function () {
            return $(this).attr(attrNamedataTarget);
        }).get();
    }
    static ObtienAttrElemtnos(selector, attrNamedataTarget) {
        //selector : Selector de elementos  a obtener
        //attrNamedataTarget: Data a retornar para los elementos
        return $(selector).map(function () {
            return $(this).attr(attrNamedataTarget);
        }).get();
    }
    static mostrar_modal(tipo, mensaje, tiempo = false) {
        $('#msg-modal-' + tipo).text(mensaje);
        $('#modal-' + tipo).modal('show');
        if (tiempo) {
            setTimeout(function () { $('#modal-' + tipo).modal('hide'); }, 1000)
        }
    }
    static agregaFiltroMultiSelect() {
        //Incluye filtro de multiple selección,
        /*
        attrFlagHtmlCol : Nombre del atributo que indica si el campo es de tipo html o no, es decir si la celda 
                          contiene una etiqueta html o no. Por ejemplo : attrFlagHtmlCol="html-filter" 
                                <td html-filter="1"><p>Buscar</p><td>
                                <td html-filter="0">Buscar<td>                                        
        */
        var count = 0;
        var attrFlagHtmlCol = "html-filter";//Type Bool
        this.api().columns().every(function () {
            var title = this.header();
            var header = this.header();
            var isColwithHhtml = $(header).attr(attrFlagHtmlCol) == "1" ? true : false;
            //replace spaces with dashes
            title = $(title).html().replace(/[\W]/g, '-');
            var column = this;
            var select = $('<select id="' + title + '" multiple="multiple"  class="multiselect active"  ></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function () {
                    //Get the "text" property from each selected data 
                    //regex escape the value and store in array                                
                    var data = $.map($(this).val(), function (value, key) {
                        if (isColwithHhtml) {
                            return value ? '^(?=.*?' + $.fn.dataTable.util.escapeRegex(value) + ').*$' : null;//Search in cell if this include the value
                        } else {
                            return value ? '^' + $.fn.dataTable.util.escapeRegex(value) + '$' : null;//Strict search in cell
                        }
                    });
                    //if no data selected use ""

                    if (data.length === 0) {
                        data = [""];
                    }
                    //join array into string with regex or (|)
                    var val = data.join('|');

                    //search for the option(s) selected
                    column
                        .search(val ? val : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
            });

            //use column title as selector and placeholder
            $('#' + title).multiselect({
                columns: 1,
                placeholder: 'Seleccione',
                search: true,
                searchOptions: {
                    'default': 'Buscar',
                },
                texts: {
                    selectAll: '✓ Todos',
                    unselectAll: '✓ Ninguno',   // unselect all text
                },
                selectAll: true
            });
            //initially clear select otherwise first option is selected
            $('.multiselect').val(null).trigger('change');

        });
        $('tfoot.datatable').each(function () {
            $(this).insertAfter($(this).siblings('thead'));
        });

    }
    static format_arrayStrings(arrayString) {

        if (arrayString == "[]") {
            return ""
        } else {
            return arrayString.replace('[', '').replace(']', '').replaceAll(',', ', ')
        }
    }
    static deshabilita_caracter (cod_tecla,idinput){
        $("#"+idinput).on({
            keydown: function(e) {
              if (e.which === cod_tecla)//32 Espacio
                return false;
            },
            change: function() {
              this.value = this.value.replace(/\s/g, "");
            }
          });
    }
    static onlyAlphaNumericAndSpaces(idinput){
        $('#'+idinput).keyup(function() {
            if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
              this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
            } 
          });              
          $('#'+idinput).focusout(function() {
            this.value = this.value.trim();
        });
    }    
    static simpleSeleccion(idtable,inputClass=''){
        if (inputClass != '') {inputClass='.'+inputClass }
        $(`#${idtable} tbody tr ,#${idtable} tbody tr td input${inputClass}`).click(function () {
            if ($(this).is('tr')) {
                $(`#${idtable}`).find(`tbody td:nth-child(1) input${inputClass}[type='checkbox']:not(:disabled):checked`).prop("checked", false).trigger("change");
                selector_input = $(this).find(`input${inputClass}`).prop("checked", true)
            } else if ($(this).is('input')) {
                $(`#${idtable}`).find(`tbody td:nth-child(1) input${inputClass}[type='checkbox']:not(:disabled):checked`).prop("checked", false).trigger("change");
                selector_input = $(this).attr('data-target')
                $(`#${idtable} input${inputClass}[data-target='${selector_input}']`).prop("checked", true);
            }
        })
    }
    static simpleSeleccionSimple(idtable,inputClass=''){
        if (inputClass != '') {inputClass='.'+inputClass }
        $(`#${idtable} tbody tr td input${inputClass}`).click(function () {
            console.log(this)
            var selector_input = $(this).attr('data-target')
            $(`#${idtable}`).find(`input${inputClass}[type='checkbox']:not(:disabled):checked`)
                            .prop("checked", false)
                            .trigger("change");            
            $(`#${idtable} input${inputClass}[data-target='${selector_input}']`).prop("checked", true);
        })
    }
    static unselectAllInput(idContaniner,inputClass=''){
        if (inputClass != '') {inputClass='.'+inputClass }
        $(`#${idtable}`).find(`input${inputClass}[type='checkbox']:not(:disabled):checked`)
                            .prop("checked", false)
                            .trigger("change"); 
    }
    static changeOrder(evt){
        $this=$(evt.currentTarget);
        var Des = parseInt($this.val());
        var RowNum = parseInt($this.attr('rownum'));
      
        $this.parent().parent().data("sort",Des)
      
      
        var divList = $("tbody").find("tr").sort(function (a, b) {
         return (parseInt($(a).data("sort")) - parseInt($(b).data("sort")))
        });
      
        $("tbody").html(divList);
      
        $('.m').on('change', function (evt) {
          changeOrder(evt);
        })
      
      }
    static SortTableRows(bodyid){
        var divList = $(`#${bodyid}`).find("tr").sort(function (a, b) {
            return (parseInt($(a).data("sort")) - parseInt($(b).data("sort")))
           });
        $(`#${bodyid}`).html(divList);
    }
     
}