(function($) {

  	$.fn.slidrTo = function(options){
			var elemento=this;
			var enlace=$(elemento);
			var settings ={
				recipiente 	: '#slider',
				fallo 		: '#fallo',
				carga 		: '#carga',
				data_attr 	: 'link',
				callback 	: null,
				repetir_c 	: 0,
				repetir_f   : null,
				repetir_s	: null
			};

			Bindr=function(){
			

				Bindr.settings;
				Bindr.selector;
				

				Bindr.prototype.init = function(selector,options){
					Bindr.settings=options;
					Bindr.selector=selector;
					console.log(Bindr.settings.repetir_f);
					console.log(Bindr.selector);
				};
				Bindr.prototype.on = function(){
					var options = Bindr.settings;
					console.log(options.repetir_f);
					console.log(options);
					$(Bindr.settings.repetir_s).on('click',function(){
						console.log(options);
						$(this).slidrTo(options);
						return false;
					});
				}

			}

			function slideTo(){
				console.log(settings);
				var enlace=$(elemento);
				var width = parseInt($(settings.recipiente).css('width'));
				var transfer = $('<div class="transfer"></div>').css({ 'width': (2 * width) + 'px'});
				var current = $('<div class="current"></div>').css({ 'width': width + 'px', 'left': '0', 'float': 'left' })
				.html($(settings.recipiente).html());
			    var next = $('<div class="next"></div>').css({ 'width': width + 'px', 'left': width + 'px', 'float': 'left' })
			    .html('').html($(settings.carga).html());

			    transfer.append(current).append(next);
		    	$(settings.recipiente).html('').append(transfer);
		    	history.pushState('', "hola", enlace.data(settings.data_attr));

		    	var jqxhr= $.get(enlace.data(settings.data_attr));
		    	transfer.animate({ 'margin-left': '-' + width + 'px' }, 300, function () {

		    		jqxhr.done(function(data){$(settings.recipiente).html(data);})
		    		.fail(function(){$(settings.recipiente).html('').html($(settings.fallo).html());})
		    		.always(function(){
		    			if ( $.isFunction( settings.repetir_f ) ) {
	        				settings.repetir_f.call();
	        				console.log('repetir_f');
	        			}
	        			if ( $.isFunction( settings.callback ) ) {
	        				settings.callback.call(elemento);
	        			}
        			});
		    	});
		    	return this;
			}

			if(options) {
            	$.extend(settings, options);
        	}
        	if(settings.repetir_c ==1){
        		if(!(settings.repetir_s)){
            		settings.repetir_s = settings.recipiente + " a";
            	}
        		//if(!(settings.repetir_f)){
        			leBind = new Bindr();
	        		settings.repetir_f=leBind.on;
	        		console.log(leBind.on);
	        		console.log(settings.repetir_f);
	        		leBind.init(settings.repetir_s,settings);
	        		//settings.repetir_f.on();
	        	//}

        	}
        	slideTo();
        	return elemento;

		}
		

}(jQuery));
