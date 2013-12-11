define(["dojo/has",
	"storymaps/utils/Helper",
	"storymaps/playlist/core/mobile/Layout",
	"storymaps/playlist/ui/Map",
	"storymaps/playlist/ui/List",
	"lib/jquery/jquery-1.10.2.min",
	"lib/audio.min"],
	function(has,
		Helper,
		MobileLayout,
		Map,
		List){

		/**
		* Core
		* @class Core
		*
		* Main class for story map application
		*
		* Dependencies: Jquery 1.10.2
		*/

		var _embed = (top != self) ? true : false,
		_mobile = has("touch"),
		_mobileLayout,
		_readyState = {
			map: false,
			list: false
		},
		_layersReady = 0,
		_map,
		_list,
		_audioTour = false,
		_currentPlayer,
		_lastTourItem;

		function init ()
		{
			if (_embed){
				$("#banner").hide();
			}
			if (_mobile){
				_mobileLayout = new MobileLayout(onMobileListOpen);
			}

			Helper.enableRegionLayout();

			if (configOptions.sharingUrl && location.protocol === "https:"){
				configOptions.sharingUrl = configOptions.sharingUrl.replace('http:', 'https:');
			}

			if (configOptions.geometryServiceUrl && location.protocol === "https:"){
				configOptions.geometryServiceUrl = configOptions.geometryServiceUrl.replace('http:', 'https:');
			}

			var urlObject = esri.urlToObject(document.location.href);
			urlObject.query = urlObject.query || {};

			if(urlObject.query.webmap){
				configOptions.webmap = urlObject.query.webmap;
			}

			_map = new Map(_mobile,configOptions.geometryServiceUrl,configOptions.bingMapsKey,configOptions.webmap,configOptions.excludedLayers,configOptions.dataFields,configOptions.playlistLegend.visible,configOptions.playlistLegend,"map","playlist-legend","legend","#side-pane",onMapLoad,onMapLegendHide,onLayersUpdate,onMarkerOver,onMarkerOut,onMarkerSelect,onMarkerRemoveSelection,onMapItemSelect),
			_list = new List("#playlist","#search","#filter-content",configOptions.dataFields,onListLoad,onListGetTitleAttr,onListSelect,onListHighlight,onListRemoveHighlight,onListSearch);

			loadMap();

			audiojs.settings.css = "";
		}


		// MAP FUNCTIONS
		
		function loadMap()
		{
			Helper.updateLoadingMessage("Loading map");
			_map.init();
		}

		function onMapLoad(item)
		{
			if (!_readyState.map){
				updateText(item.title,item.snippet,item.description);
				_readyState.map = true;
				if (_layersReady === _map.getLayerCount()){
					_readyState.list = true;
				}
				checkReadyState();
			}
		}

		function onMapLegendHide()
		{
			$("#legend-wrapper").hide();
			$(".toggle-legend").hide();
		}

		function onLayersUpdate(graphics)
		{
			if (_list){
				updatePlaylist(graphics);
			}
		}

		function onMarkerOver(item)
		{
			if(_list){
				_list.highlight(item);
			}
		}

		function onMarkerOut(item)
		{
			if(_list){
				_list.removeHighlight(item);
			}
		}

		function onMarkerSelect(item)
		{
			if(_list){
				_list.select(item);
			}
		}

		function onMarkerRemoveSelection()
		{
			if(_list){
				_list.removeSelection();
			}
		}


		// LIST FUNCTIONS

		function onListLoad()
		{
			if (!_readyState.list){
				_layersReady++;
				if (_layersReady === _map.getLayerCount()){
					_readyState.list = true;
					checkReadyState();
				}
			}
		}

		function onListGetTitleAttr(titleObj)
		{
			if(_map){
				_map.setTitleAttr(titleObj);
			}
		}

		function onListSelect(item,sameItem)
		{
			if(_map && !sameItem){
				_map.select(item);
			}
			if(_mobile && sameItem){
				_mobileLayout.hideList();
			}
		}

		function onListHighlight(item)
		{
			if(_map){
				_map.highlight(item);
			}
		}

		function onListRemoveHighlight()
		{
			if(_map){
				_map.removeHighlight();
			}
		}

		function onListSearch(items)
		{
			if(_map){
				_map.filterGraphics(items);
			}
		}

		function updatePlaylist(graphics)
		{
			Helper.updateLoadingMessage("Updating Playlist");
			_list.update(graphics);
		}

		// Mobile events
		function onMobileListOpen()
		{
			if(_map){
				_map.resizeMap();
			}
		}

		// Christmas Music Addon

		function onMapItemSelect(graphic,isHighlight,mobilePopup,item)
		{
			if (graphic){
				if (!isHighlight){
					$(".popup-audio-wrapper").remove();
					var audioEl = '<div class="popup-audio-wrapper"><audio id="popup-audio" style="display:none;" controls src="'+ graphic.attributes.Audio_Link +'" type="audio/mpeg"></audio></div>';
					var mobileAudioEl = '<div class="popup-audio-wrapper"><audio id="popup-audio" controls src="'+ graphic.attributes.Audio_Link +'" type="audio/mpeg"></audio></div>';
					if (mobilePopup){
						if ($(".esriMobileInfoView").is(":visible")){
							$(".esriMobileInfoView .mainSection").append(mobileAudioEl);
						}
						else{
							$("body").append(mobileAudioEl);							
						}
					}
					else if(has("touch")){
						alert("test");
						$(".esriPopup .mainSection").append(mobileAudioEl);
					}
					else{
						$(".esriPopup .mainSection").append(audioEl);
					}
					setTimeout(function(){
						if(graphic.attributes.Audio_Link === $("#popup-audio").attr("src") && !mobilePopup){
							var player = audiojs.create(document.getElementById("popup-audio"),{
								imageLocation: "http://storymaps.esri.com/stories/2013/holiday-music/resources/tools/audiojs/player-graphics.gif",
								swfLocation: "http://storymaps.esri.com/stories/2013/holiday-music/resources/tools/audiojs/audiojs.swf",
								trackEnded: function(){
									if (_audioTour && $(".playlist-item.selected").length > 0){
										startAudioTour();
									}
									else if (_audioTour){
										_list.select(item);
										startAudioTour();
									}
								}
							});
							_currentPlayer = player;
							_lastTourItem = item;
							setTimeout(function(){
								$(".popup-audio-wrapper .audiojs .scrubber").css({
									width: $(".popup-audio-wrapper").width() - $(".popup-audio-wrapper .audiojs .play-pause").outerWidth() - 20
								});
								player.play();
							},200);
						}
					},200);					
				}
			}
			else{
				if (mobilePopup){
					setTimeout(function(){
						if (!$(".esriMobileInfoView").is(":visible")){
							$(".popup-audio-wrapper").remove();
						}
						else{
							setTimeout(function(){
								$(".esriMobileInfoView .mainSection").append($(".popup-audio-wrapper"));
							},500);
						}
					},100);
				}
				else {
					$(".popup-audio-wrapper").remove();
					setTimeout(function(){
						if (!$(".popup-audio-wrapper").is(":visible")){
							pausetAudioTour();
						}
					},500);
				}
			}

		}

		function startAudioTour(){
			_audioTour = true;
			if (_lastTourItem && $(".playlist-item.selected").length < 1){
				_list.select(_lastTourItem);
			}
			_list.selectNext();
			$("#audio-tour").html("Pause audio tour");
		}

		function pausetAudioTour(){
			_audioTour = false;
			_currentPlayer.pause();
			$("#audio-tour").html("Start Audio Tour");
		}

		// Christmas music end

		function updateText(title,subtitle,description)
		{
			var descriptionText = configOptions.description || description || "";
			document.title = configOptions.title || title || "";
			$(".title-text").html(configOptions.title || title || "");
			$(".subtitle-text").html(configOptions.subtitle || subtitle || "");
			$("#description").html(descriptionText);

			if (descriptionText){
				$("body").addClass("show-description");
			}
			else{
				$("#side-pane-controls .toggle-description").hide();
			}

			if(!has("touch") && $("body").width() >= 768){
				$("#description").append('<button id="audio-tour" class="btn small">Start audio tour</button>');
				$("#audio-tour").click(function(){
					if (!_audioTour){
						startAudioTour();
					}
					else{
						pausetAudioTour();
					}
				});
			}

			$(".esriMobileNavigationItem.left").click(function(){
				$(".popup-audio-wrapper").remove();
				$(".playlist-item").removeClass("selected");
			});
		}

		function checkReadyState()
		{
			var ready = true;

			for (var i in _readyState){
				if (!_readyState[i]){
					ready = false;
				}
			}
			appReady(ready);
		}

		function appReady(ready)
		{
			if (ready){
				Helper.resetRegionLayout();
				Helper.removeLoadScreen();

				addSidePaneEvents();
			}
		}

		function addSidePaneEvents()
		{
			$(".playlist-control").click(function(){
				if ($(this).hasClass("toggle-side-pane")){
					$("#side-pane").toggleClass("minimized");
				}
				else if ($(this).hasClass("toggle-legend")){
					$("body").toggleClass("show-legend");
					if ($("body").hasClass("show-description")){
						$("body").removeClass("show-description");
					}
				}
				else if ($(this).hasClass("toggle-description")){
					$("body").toggleClass("show-description");
					if ($("body").hasClass("show-legend")){
						$("body").removeClass("show-legend");
					}
				}
				Helper.resetRegionLayout();
			});
		}

		return {
			init: init
		};
});