define(["dojo/_base/array",
	"esri/symbols/PictureMarkerSymbol",
	"esri/renderers/UniqueValueRenderer"], 
	function(array,
		PictureMarkerSymbol,
		UniqueValueRenderer){
	/**
	* Playlist List
	* @class Playlist List
	* 
	* Class to define a new item list in the playlist app
	*/

	return function MapConfig()
	{

		var useDefaultRenderer = false;

		var maxAllowablePoints = 1000;

		var markerPostionDefault = {
			height: 24,
			width: 21,
			xOffset: 2,
			yOffset: 5
		};

		var markerPostionHighlight = {
			height: 29,
			width: 25,
			xOffset: 2,
			yOffset: 7
		};

		var _tempRendererField;

		this.getMaxAllowablePoints = function(){
			return maxAllowablePoints;
		};

		this.getMarkerPosition = function()
		{
			return markerPostionDefault;
		};

		this.getMarkerPositionHighlight = function()
		{
			return markerPostionHighlight;
		};

		this.getRenderer = function(layer,features,colorAttr,orderAttr)
		{
			if (useDefaultRenderer){

				_tempRendererField = layer.objectIdField;
				
				var defaultSymbol = new PictureMarkerSymbol("resources/images/markers/indexed/red/NumberIcon1.png", markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset);
				var renderer = new UniqueValueRenderer(defaultSymbol, _tempRendererField);

				array.forEach(features,function(grp,i){
					if (i < maxAllowablePoints){

						if (!isNaN(grp.attributes[orderAttr]) && isFinite(grp.attributes[orderAttr]) && grp.attributes[orderAttr] % 1 === 0){
							i = grp.attributes[orderAttr];
						}
						
						var symbol = getSymbolForDefaultRenderer(grp,colorAttr,i);
						renderer.addValue(grp.attributes[_tempRendererField], symbol);
					}
				});

				return renderer;
			}
			else{
				_tempRendererField = "TemplateText";
				
				var sym = new PictureMarkerSymbol(configOptions.playlistLegend.items.custom.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset);
				var rend = new UniqueValueRenderer(sym, _tempRendererField);

				rend.addValue("Basic", new PictureMarkerSymbol(configOptions.playlistLegend.items.basic.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Compare", new PictureMarkerSymbol(configOptions.playlistLegend.items.compare.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Countdown", new PictureMarkerSymbol(configOptions.playlistLegend.items.countdown.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));				
				rend.addValue("Map Tour", new PictureMarkerSymbol(configOptions.playlistLegend.items.mapTour.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Playlist", new PictureMarkerSymbol(configOptions.playlistLegend.items.playlist.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Shortlist", new PictureMarkerSymbol(configOptions.playlistLegend.items.shortlist.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Side Accordion", new PictureMarkerSymbol(configOptions.playlistLegend.items.sideAccordion.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Swipe/Spyglass", new PictureMarkerSymbol(configOptions.playlistLegend.items.swipeSpyglass.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));
				rend.addValue("Text and Legend", new PictureMarkerSymbol(configOptions.playlistLegend.items.textLegend.iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset));

				return rend;
			}
		};

		function getSymbolForDefaultRenderer(graphic,colorAttr,index)
		{
			var iconURL;

			if(graphic.attributes[colorAttr]){
				if (graphic.attributes[colorAttr].toLowerCase === "b" || graphic.attributes[colorAttr].toLowerCase === "blue"){
					iconURL = "resources/images/markers/indexed/blue/NumberIconb" + (index + 1) + ".png";
				}
				else if (graphic.attributes[colorAttr].toLowerCase === "g" || graphic.attributes[colorAttr].toLowerCase === "green"){
					iconURL = "resources/images/markers/indexed/green/NumberIcong" + (index + 1) + ".png";
				}
				else if (graphic.attributes[colorAttr].toLowerCase === "p" || graphic.attributes[colorAttr].toLowerCase === "purple"){
					iconURL = "resources/images/markers/indexed/purple/IconPurple" + (index + 1) + ".png";
				}
				else{
					iconURL = "resources/images/markers/indexed/red/NumberIcon" + (index + 1) + ".png";
				}
			}
			else{
				iconURL = "resources/images/markers/indexed/red/NumberIcon" + (index + 1) + ".png";
			}

			var symbol = new PictureMarkerSymbol(iconURL, markerPostionDefault.width, markerPostionDefault.height).setOffset(markerPostionDefault.xOffset,markerPostionDefault.yOffset);

			return symbol;
		}
	};

});