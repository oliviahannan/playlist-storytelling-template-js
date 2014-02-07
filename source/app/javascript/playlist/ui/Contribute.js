define(["esri/tasks/locator",
	"esri/graphic",
	"lib/jquery/jquery-1.10.2.min"], 
	function(Locator,Graphic){
	/**
	* Playlist List
	* @class Playlist List
	* 
	* Class to define a new item list in the playlist app
	*
	* Dependencies: Jquery 1.10.2
	*/

	return function Contribute(layer)
	{

		// CREATE NEW ADDRESS LOCATOR

		var _locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
		_locator.on("address-to-locations-complete", uploadPoint);

		// APPEND CONTRIBUTION FORM TO HTML BODY

		$("body").append('<div id="contribute-modal" class="modal" style="height:auto; overflow: visible; margin-top:-300px;">\
			<a id="close-login" class="icon-close right" onclick="$(\'#contribute-modal\').removeClass(\'visible\');"></a>\
			<div id="vacation-form">\
				<h4 style="font-weight:bold; size: 16px;">Add Location</h4>\
				<label style="margin-top: 15px;">\
					Name\
					<input style="margin-top: 10px; line-height: 1.8;" id="vacation-name" class="form-item" type="text">\
				</label>\
				<label style="margin-top: 15px;">\
					Type\
					<select style="margin-top: 10px; line-height: 1.8;" id="vacation-type">\
						<option value="Beach">Beach</option>\
						<option value="City">City</option>\
						<option value="Mountains">Mountains</option>\
						<option value="Other">Other</option>\
					</select>\
				</label>\
				<label style="margin-top: 15px;">\
					Description\
					<textarea style="margin-top: 10px; line-height: 1.8;" id="vacation-description" class="form-item"></textarea>\
				</label>\
				<label style="margin-top: 15px;">\
					Photo URL\
					<input style="margin-top: 10px; margin-bottom: 15px; line-height: 1.8;" id="vacation-photo" class="form-item" type="text">\
				</label>\
				<label style="margin-top: 15px;">\
					Address\
					<input style="margin-top: 10px; margin-bottom: 15px; line-height: 1.8;" id="vacation-address" class="form-item" type="text">\
				</label>\
				<div class="alert error icon-alert" style="display:none;">\
					Make sure to fill in all fields.\
				</div>\
				<button class="btn primary" name="button" onclick="$(\'#contribute-modal\').removeClass(\'visible\');">Cancel</button>\
				<button id="add-location" class="btn primary" name="button">Add</button>\
			</div>\
		</div>');

		// ADD EVENT TO OPEN CONTRIBUTION FORM WHEN BUTTON IS CLICKED

		$("#contribute").click(function(){
			$(".form-item").val("");
			$("#contribute-modal").addClass('visible');
			$("#contribute-modal .alert").hide();
		});

		// VERIFY THAT ALL FIELDS IN FORM ARE FILLED IN

		$("#add-location").click(function(){
			var error = false;
			$(".form-item").each(function(){
				if($(this).val() === ""){
					$("#contribute-modal .alert").show();
					error = true;
				}
			});
			if (!error){
				$("#contribute-modal").removeClass('visible');
				$("#contribute-modal .alert").hide();
				queryAddress($("#vacation-address").val());
			}
		});

		// RUN GEOCODER TO FIND THE LATITUDE AND LONGITUDE OF OUR ADRESS

		function queryAddress(loc) {
			var address = {
				"SingleLine": loc
			};

			var options = {
				address: address
			};

			_locator.addressToLocations(options);
		}

		// EDIT FEATURE SERVICE TO ADD NEW LOCATION

		function uploadPoint(results) {
			var point;
			if (results.addresses.length > 0){
				point = results.addresses[0].location;
			}

			var attr = {
				name: $("#vacation-name").val(),
				description: $("#vacation-description").val(),
				photo: $("#vacation-photo").val(),
				category: $("#vacation-type").val()
			};

			var graphic = new Graphic(point,null,attr);

			layer.applyEdits([graphic],null,null,function(){
			});
		}
	};

});