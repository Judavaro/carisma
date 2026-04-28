var app = angular.module('carisma', ['ionic','ngCordova'])
//aplicationID = liEFKMzOUyLktJwiF197aJ282XOSGCVytzxjcBVc
//JavascriptKey = GgpEtihMrip0c6LCnxVgeCuikfyLwdew9KQW69Bc
//clienteID = bwnSWjmighIBgOW4T7d1bP2pbfCe0zR6kaeWlWLx


//var popularidad;
app.run(function(){

	//Parse.initialize(APP_ID, JS_KEY);
	Parse.initialize("liEFKMzOUyLktJwiF197aJ282XOSGCVytzxjcBVc", "GgpEtihMrip0c6LCnxVgeCuikfyLwdew9KQW69Bc"); 

});

app.config(function($stateProvider, $urlRouterProvider) {

  	$urlRouterProvider.otherwise('/')
  	
	$stateProvider.state('ppal', {
	  url: '/',
	  templateUrl: 'vistas/ppal.html'
	})

	$stateProvider.state('padrenuestro', {
	  url: '/padrenuestro',
	  templateUrl: 'vistas/padrenuestro.html'
	})	

	$stateProvider.state('avemaria', {
	  url: '/avemaria',
	  templateUrl: 'vistas/avemaria.html'
	})	

	$stateProvider.state('magnificat', {
	  url: '/magnificat',
	  templateUrl: 'vistas/magnificat.html'
	})	

	$stateProvider.state('gloria', {
	  url: '/gloria',
	  templateUrl: 'vistas/gloria.html'
	})	

	$stateProvider.state('scruz', {
	  url: '/scruz',
	  templateUrl: 'vistas/scruz.html'
	})	

	$stateProvider.state('sreina', {
	  url: '/sreina',
	  templateUrl: 'vistas/sreina.html'
	})

	$stateProvider.state('yconfieso', {
	  url: '/yconfieso',
	  templateUrl: 'vistas/yconfieso.html'
	})

	$stateProvider.state('smarcangel', {
	  url: '/smarcangel',
	  templateUrl: 'vistas/smarcangel.html'
	})

	$stateProvider.state('Pdelcielo', {
	  url: '/Pdelcielo',
	  templateUrl: 'vistas/Pdelcielo.html'
	})

	$stateProvider.state('aguarda', {
	  url: '/aguarda',
	  templateUrl: 'vistas/aguarda.html'
	})

	$stateProvider.state('cdapostoles', {
	  url: '/cdapostoles',
	  templateUrl: 'vistas/cdapostoles.html'
	})

	$stateProvider.state('esanto', {
	  url: '/esanto',
	  templateUrl: 'vistas/esanto.html'
	})
});

//creamos nuestro servicio
app.service('oraciones', function($location,$ionicLoading, $cordovaMedia, $ionicPopup, $cordovaSocialSharing){
    var self = this;

	//Mensaje de audio
	var mensaje = function(status) {
		if (status == 3 ) {
			$ionicLoading.show({template: 'Pausado',duration:1500,animation: 'fade-in'});
		}else{
			if (status == 1) {
				$ionicLoading.show({template: 'Reproduciendo...',duration:1500,animation: 'fade-in'});	
			}
		};
	}
	
	var my_media;
	self.empezar = function() {

		var url = "audio/a1.mp3";
		if(device.platform.toLowerCase() === "android"){
		
			url = "/android_asset/www/"+url;
		} 

	    my_media = new Media(url,null,function (err) {
	            $ionicLoading.show({template: 'Error Reproduciendo. '+err,duration:1500,animation: 'fade-in'});	console.log("playAudio():Audio Error: " + err);
	        }, mensaje);
	    my_media.play();
	}

	self.parar = function(){ 
       	my_media.stop();
	}

	self.pausar = function(){ 
       	my_media.pause();
	}

	self.CompartirRedesSociales = function(mensaje,titulo,logo,url) {        
        $cordovaSocialSharing.share(mensaje,titulo,logo,url);
    }

    var popularidad = Parse.Object.extend("Popularidad");		
	var c1 = new Parse.Query(popularidad);			

	self.AumentarPopularidad =  function($scope, IdContenido, IdUsuario){

		c1.equalTo("IdContenido", IdContenido);
		c1.equalTo("IdUsuario", IdUsuario);
		c1.find().then(function(data){

			if (data.length == 0){

				var objPopularidad = new popularidad();
		    	objPopularidad.set("IdUsuario", IdUsuario);
		    	objPopularidad.set("IdContenido", IdContenido);
		    	objPopularidad.save(); 

		    	$scope.cantidadPopularidad++;
		    	$scope.popularidad = 'icon ion-ios-heart';		    	
			}else{
				data[0].destroy();

				$scope.cantidadPopularidad--;
				$scope.popularidad = 'icon ion-ios-heart-outline';
			}
			$scope.$apply();

		}, function(error){
             console.log("Error: "+error);
		});
	}

	self.ConsultarPopularidad = function($scope, IdContenido, IdUsuario){

		c1.equalTo("IdContenido", IdContenido);
		c1.equalTo("IdUsuario", IdUsuario);
		c1.find().then(function(data){		    
		    
	    	c1.count().then(function(count) {
	    		$scope.cantidadPopularidad = count;	
	    	}); 	    	

    		if(data.length == 0){
    			$scope.popularidad = "icon ion-ios-heart-outline";
			}else{
				$scope.popularidad = "icon ion-ios-heart";		       
		    }	
		    $scope.$apply();
		}, function(error){
	        console.log("Error: "+error);
		});
	}
});

app.controller('ppal',function($scope, oraciones){
	
	var IdUsuario = "332";
	var controlador = "Carisma App";
 
	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando "+controlador+" y quiere que tu la mires. \n\n Aumenta tu oración y compartela en familia.\n\n Descárgala en: \n\n ",
			"Carisma App",
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}
});
















app.controller('padrenuestro',function($scope, oraciones){
	
	var IdUsuario = "332";
	var controlador = "Padre Nuestro Católico";

 	$scope.$apply($scope.cantidadPopularidad);
 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});























app.controller('avemaria',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Avemaría Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('magnificat',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Magnificat Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia la "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('gloria',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Gloria Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('scruz',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Señal De La Santa Cruz Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia la "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('sreina',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Salve Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('yconfieso',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Yo Confieso Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});


app.controller('smarcangel',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "San Miguel Árcangel Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});


app.controller('Pdelcielo',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Protección Del Cielo Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia la "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('aguarda',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Ángel De La Guarda Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('cdapostoles',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Credo Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});

app.controller('esanto',function($scope,oraciones){
	
	var IdUsuario = "332";
	var controlador = "Espíritu Santo Católico";

 	oraciones.ConsultarPopularidad($scope, controlador, IdUsuario);

	$scope.CompartirRedesSociales = function(){
		oraciones.CompartirRedesSociales(
			IdUsuario+" esta utilizando Carisma App y quiere que tu la mires. \n\n Aumenta tu oración y comparte con tu familia el "+controlador+". \n\n Descárgala en: \n\n ",
			"Carisma App: "+controlador,
			"www/img/logo.png",
			"http://tuideapp.com/apps/carisma");
	}

	$scope.empezar = function() {        
        oraciones.empezar();
    }

	$scope.pararaudio = function(){
     	oraciones.parar();
	}

	$scope.pausar = function(){
       	oraciones.pausar();
	}

	$scope.AumentarPopularidad = function(){
		oraciones.AumentarPopularidad($scope, controlador, IdUsuario);
	}
});