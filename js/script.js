/*	Author:
		Fabz - Fabian Andrade 
*/
/**
 * debounce
 * @param {integer} milliseconds This param indicates the number of milliseconds
 *     to wait after the last call before calling the original function .
 * @return {function} This returns a function that when called will wait the
 *     indicated number of milliseconds after the last call before
 *     calling the original function.
 */
var cw = window.innerWidth;
var ch = window.innerHeight;
var rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}

var particleString = '';
var particleCount = 50;
var maxVelocity = 2;

while(particleCount--){
	particleString += '\
	<div \
  	class="particle"\
		data-x="'+cw/2+'"\
		data-y="'+ch/2+'"\
		data-vx="0"\
		data-vy="0"\
  ></div>';
}

$('body').append(particleString);    
var particles = $('.client-logo');


var update = function(){
  var $this = $(this);
  
  $this.data('vx', $this.data('vx') + (rand(0, 10)-5)/10);
  $this.data('vy', $this.data('vy') + (rand(0, 10)-5)/10);
  
  if(Math.abs($this.data('vx')) > maxVelocity){
    var vx = ($this.data('vx') < 0) ? -maxVelocity : maxVelocity;
    $this.data('vx', vx);
  }
  if(Math.abs($this.data('vy')) > maxVelocity){
    var vy = ($this.data('vy') < 0) ? -maxVelocity : maxVelocity;
    $this.data('vy', vy);
  }
  
  $this.data('x', $this.data('x') + $this.data('vx'));
  $this.data('y', $this.data('y') + $this.data('vy'));
  
  if($this.data('y') < -12){
    $this.data('y', ch);
	}
  if($this.data('x') > cw){
    $this.data('x', -12);
  }
  if($this.data('y') > ch){
    $this.data('y', -12);
  }		
	if($this.data('x') < -12){
    $this.data('x', cw);
  }
  
  $this.css({
    /*left: $this.data('x')+'px',
    top: $this.data('y')+'px'*/
    '-webkit-transform': 'translate3d(' + $this.data("x") + 'px, ' + $this.data("y") + 'px, 0)'
  });
}







Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

/**
* throttle
* @param {integer} milliseconds This param indicates the number of milliseconds
*     to wait between calls before calling the original function.
* @return {function} This returns a function that when called will wait the
*     indicated number of milliseconds between calls before
*     calling the original function.
*/
Function.prototype.throttle = function (milliseconds) {
    var baseFunction = this,
        lastEventTimestamp = null,
        limit = milliseconds;

    return function () {
        var self = this,
            args = arguments,
            now = Date.now();

        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
            lastEventTimestamp = now;
            baseFunction.apply(self, args);
        }
    };
};


//// end throttle proto 



// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function(KO, $) {

		//vimeo controllers (they need to be outside the closure to work )
		var $iframe = $('.vimeo-video');
		var $player = $($iframe);
		var url = window.location.protocol + $player.attr('src').split('?')[0];
		var $status = $('.status');

	$(function() {


	});// END DOC READY


	$(window).load(function() {

			KO.Config.init();
		})// on Page loaded

	// WINDOW.RESIZE
	
	$(window).resize(function() {

		KO.Config.setStageSize();
		KO.Config.indexSections();
		KO.Config.adjustSideBarElements();
		KO.Config.resizeSections();
		KO.Config.moveBackToPosition();

	}.debounce(150));

	KO.Config = {

		$window:$(window),
		isAndroidNativeBrowserBoolean: false,
		sideLogo:{},
		arrowTooltip:{},
		socialIcons:{},
		stateObj : {},
		$fabzLogo : $(".fabz-logo-romboid-container"),
		$sectionsAmount : $('.section').length,
		currentSection : 0,
		$navigation : $('.nav-content-btn'),
		$navigationContainer : $('.nav-content'),
		$sections : $('.section'),
		$showcaseWrapper : $(".showcase-wrapper"),
		$content  : $(".content"),
		$graphicsSlides : $(".graphics-slide"),
		$loaderBg : $(".loader-bg"),
		$loaderSpinner : $(".loader"),
		$wrapper : $(".wrapper"),
		$sideBar : $(".sidebar-wrapper"),
		currentAnchorTag:{},
		storeTemporaryAnchorTag:{},
		// arrows 
		$arrowRight: $(".arrow_right"),
		$arrowUp: $(".arrow_top"),
		$arrowDown: $(".arrow_down"),
		$arrowLeft: $(".arrow_left"),
		$socialIconsContainer: $(".social-icons-container"),
		shareIconsArray:[],
		navToggle:document.querySelector(".nav-toggle"),
		shareToggle:document.querySelector(".share-toggle"),
		historySupported : false,
		scrollerFlag: true,
		verticalMode:false,
		swapToVerticalBreakpoint:768,
		mobileNavToggleActiveBoolean:false,
		mobileShareToggleActiveBoolean:false,
		verticalSideBarBreakpoint: 600,
		canvasFillValue: 0,
		ScrollerSpeed : 1000,
	// 	$clientVanishingPoint:$(".vanishing-point"),
		$clientsContainer:$(".clients-container"),
		$clientLogo:$(".client-logo"),
		totalLogoClientsCount:54,


		// 3js stuff 

		////// clients section /// threee JS include 
		camera:{}, 
		scene3D:{},
		renderer:{},
		cube:{}, 
		cubeMaterial:{},
		cubeMesh:{},
		sphere:{},
		sphereMaterial:{}, 
		sphereMesh:{}, 
		mouseX : 0, 
		mouseY : 0,
		stats:{},
		clientsLogoGroup:{},

		init : function () {

			console.debug('Fabz.tv is running on clouds');
			// read stage size 
			// create nav
			KO.Config.setStageSize();
			KO.Config.indexNavigation();
			KO.Config.indexSVGs();
			KO.Config.indexSections();
			// resize to fit
			KO.Config.resizeSections();
			// hide the sidebar elements
			KO.Config.hideAndShowSidebar("none");
			// add controllers
			KO.Config.scrollerControl();
			KO.Config.arrowControl();
			KO.Config.clickToMove();
			KO.Config.reEvaluteImages();
			KO.Config.detectingHistorySupport();
			KO.Config.onLostfocusManager();
			KO.Config.activateMobileNavButtons();
			KO.Config.adjustSideBarElements();
			KO.Config.fadeOutLoader();
			KO.Config.initClients();
			KO.Config.swipeControl();
		},

		swipeControl:function ()  {	

			
			    $showcaseWrapper.on('swipeleft',  function(){ /*...*/ })
				                .on('swiperight', function(){ /*...*/ })
				                .on('swipeup',    function(){ /*...*/ })
				                .on('swipedown',  function(){ /*...*/ });

	 			$.detectSwipe.enabled // true on touch devices, false otherwise

				//Global setting:

    			$.detectSwipe.threshold // The number of pixels your finger must move to trigger a swipe event.  Defaults is 20.
   				$.detectSwipe.preventDefault // Should touchmove events be prevented?  Defaults to true.
		},

		onContentVisible:function() { 
			KO.Config.animateSideBarIn();
		},

		hideAndShowSidebar:function(displayValue) {


				KO.Config.$fabzLogo.css("display",displayValue);
				KO.Config.$navigationContainer.css("display",displayValue);
				KO.Config.$socialIconsContainer.css("display", displayValue);

		},

		activateMobileNavButtons:function() {

			// add the functionality to Nav toggle
			KO.Config.navToggle.addEventListener( "click",KO.Config.openMobileNavToggle);
			// add the functionality to Share toggle
			KO.Config.shareToggle.addEventListener( "click",KO.Config.openMobileShareToggle);
		},
		adjustSideBarElements:function() { 

			if (KO.Config.verticalMode === false ) {

				// all relevant elements
				var sideBarH 				= KO.Config.$sideBar.height();
				var fabzLogoH 				= KO.Config.$fabzLogo.height();
				var navigationH 			= KO.Config.$navigationContainer .height();
				var socialIconsContainerH	= KO.Config.$socialIconsContainer.height();


				var sideBarW 				= KO.Config.$sideBar.width();
				var fabzLogoW 				= KO.Config.$fabzLogo.width();
				var navigationW 			= KO.Config.$navigationContainer.width();
				var socialIconsContainerW	= KO.Config.$socialIconsContainer.width();

				var objectsTotal = fabzLogoH + navigationH + socialIconsContainerH;
				var differenceH 	= sideBarH-objectsTotal;

			//	console.log("$sideBar H :",sideBarH);
			//	console.log("$fabzLogo H:",	fabzLogoH);
			//	console.log("$navigationContainer H:",	navigationH	); 
			///	console.log("$socialIconsContainer H:",	socialIconsContainerH	);
			//	console.log("objT",objectsTotal ,"SB : ",sideBarH,"dif : ",differenceH);
			//	console.log("///////////////////");
			//	console.log("$sideBar W :",sideBarW);
			//	console.log("$fabzLogo W:",	fabzLogoW);
			//	console.log("$navigationContainer W:",	navigationW	); 
			//	console.log("$socialIconsContainer W:",	socialIconsContainerW	);
			//	console.log("///////////////////");

					if(sideBarH < KO.Config.verticalSideBarBreakpoint) { 
						// if the vertical sidebar is too small hardcoded value defined on top 
			//			KO.Config.$sideBar.addClass(".scrollable");
						console.log("breakpoint meet");
					}else {

						if( KO.Config.$sideBar.hasClass(".scrollable")) {
				//			KO.Config.$sideBar.removeClass(".scrollable");

						}
					}


				if (sideBarH < objectsTotal ) {

					//  to small
				}else { 
		//			console.log("sidebar extend");
				}

				if(sideBarH > KO.Config.verticalSideBarBreakpoint) { 
					// grab the sidebar elements and resize them to match the sidebar 
					KO.Config.$fabzLogo.height(sideBarH*.3);
					KO.Config.$socialIconsContainer.height(sideBarH*.3);
					KO.Config.$navigationContainer.height(sideBarH*.4);
					// put the socialIcons back
					KO.Config.$socialIconsContainer.toggleClass("active");
					}

				}else { 

					KO.Config.$fabzLogo.height("100px");
					KO.Config.$socialIconsContainer.height("auto");
					KO.Config.$navigationContainer.height("auto");
				}
		},
		openMobileNavToggle:function () {

			//if share toggle is open close it
			KO.Config.closeMobileShareToggle();
			// activate toggle 
			this.classList.toggle("active");
			KO.Config.$navigationContainer.find("li").addClass("active");

			// if the control flag is false change it to true
			if(KO.Config.mobileNavToggleActiveBoolean === false) {

				KO.Config.mobileNavToggleActiveBoolean = true;
				KO.Config.$navigationContainer.css("opacity",1);

			}else{

				KO.Config.mobileNavToggleActiveBoolean = false;
				KO.Config.$navigationContainer.css("opacity",0);
			}
		},

		closeMobileNavToggle:function () {

			if (KO.Config.mobileNavToggleActiveBoolean === true) {

				KO.Config.navToggle.classList.toggle("active");
				KO.Config.$navigationContainer.find("li").toggleClass("active");
				KO.Config.$navigationContainer.css("opacity",0);
			}
				KO.Config.mobileNavToggleActiveBoolean = false;
		},

		openMobileShareToggle:function () { 


				KO.Config.closeMobileNavToggle();
				this.classList.toggle("active");
				KO.Config.navToggle.classList.toggle("active");
				KO.Config.$socialIconsContainer.toggleClass("active");

				KO.Config.navToggle.removeEventListener("click",KO.Config.openMobileNavToggle);
				KO.Config.shareToggle.removeEventListener("click",KO.Config.openMobileShareToggle);

				KO.Config.navToggle.addEventListener("click",KO.Config.closeMobileShareToggle);
				KO.Config.shareToggle.addEventListener( "click",KO.Config.closeMobileShareToggle);

				if(KO.Config.mobileShareToggleActiveBoolean === false) { 
					KO.Config.mobileShareToggleActiveBoolean = true;
				}
				KO.Config.$socialIconsContainer.css("opacity",1);
				KO.Config.$socialIconsContainer.css("height",(KO.Config.$window.stageH - KO.Config.getDimensionsHeight(KO.Config.$navigationContainer))+"px");
		},

		closeMobileShareToggle:function () {

			if(KO.Config.mobileShareToggleActiveBoolean === true ) {

				KO.Config.navToggle.removeEventListener("click",KO.Config.closeMobileShareToggle);
				KO.Config.shareToggle.removeEventListener( "click",KO.Config.closeMobileShareToggle);

				KO.Config.mobileShareToggleActiveBoolean = false;

				KO.Config.shareToggle.classList.toggle("active");
				KO.Config.$socialIconsContainer.toggleClass("active");

				KO.Config.navToggle.classList.toggle("active");
				// reactivate the Nav Buttons
				KO.Config.activateMobileNavButtons();

			}
		},

		isAndroidNativeBrowser: function() {

			// Detects if is android native browser
			KO.Config.isAndroidNativeBrowserBoolean = (function () {
				var ua = navigator.userAgent.toLowerCase();
				return ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1 && ua.indexOf('chrome') == -1;
			})();
		//	console.log(KO.Config.isAndroidNativeBrowserBoolean);
		},

		disableFontSmooothing: function () {

			if (KO.isAndroidNativeBrowserBoolean === true) {
				// FORCES ANDROID ONLY FONT SMOOTHING
				$("h1,h2,h3,h4,h5,h6").addClass("is-android");
			}
		},

		detectingHistorySupport: function () {

			KO.Config.$historySupported = KO.Config.isSupportedBrowserHistory();
				if(KO.Config.$historySupported) {
					//console.log("history is supported");
					KO.Config.gotoCorrectURL();
				}else {
				//	console.log("history is NOT supported");
			}
		},

		isSupportedBrowserHistory: function () {

			return!!(window.history && history.pushState);

		},

		historyReplaceValue: function (name) {

			if(KO.Config.$historySupported) {
				//	console.log("historyPushValue");
				history.pushState(KO.Config.stateObj,"", "#!/"+name);
			}
		},

		gotoCorrectURL: function () {

			//check if the URL is home and if not go to it. 
			var currentURL = window.location.hash;

			if(currentURL !== "" && currentURL !== "#!/home") { 

				//	console.log("not initial section");
				KO.Config.gotoSectionByURL(currentURL);

			} else {
				// home change to home 
				KO.Config.historyReplaceValue("home");
				KO.Config.updateArrowsVisibility();
			}
		},


		gotoSectionByURL: function (currentURL) {

			// find the section name match it with the exisitng ones and goes there.
			var sectionURL = currentURL.replace(/^.*#!/,'');
			var matchedNumber;
				for(var i=0 ; i < KO.Config.$sectionsAmount ; i++ ) { 
			//	console.log($sections[i].currentArticleName, sectionURL);
				if ("/"+KO.Config.$sections[i].currentArticleName == sectionURL ) {
					KO.Config.currentSection = i;
					matchedNumber = i;
					break;
					}
				}
				KO.Config.moveContentByIndexVertically(matchedNumber);
		},

		// pause vimeo player 
		stopPlayingvideos: function() { 
			// post pause action
			KO.Config.post("pause");
		},


		// Helper function for sending a message to the vimeo player
		post:function (action, value) {
			var data = {
				method: action
			};

			if (value) {
				data.value = value;
			}

			var message = JSON.stringify(data);
			$player[0].contentWindow.postMessage(data, url);
		},

		onLostfocusManager:function () { 

			KO.Config.$window.blur(function() {
			console.log( "Handler for .blur() called." );
			// Focus the parent
				KO.Config.$window.focus();
			});

			$("vimeo-video").focus(function() {
	//				console.log( "Handler for .blur() called." );
				});
		},

		ready: function () {

			console.log(ready);
		},

		fadeOutLoader: function () { 

		KO.Config.$loaderBg.css({"opacity":0});

			KO.Config.$loaderBg.on('transitionend webkitTransitionEnd', function(e){

				KO.Config.$loaderBg.hide();
				KO.Config.onContentVisible();
				KO.Config.hideAndShowSidebar("block");
			});
		},

		reEvaluteImages: function() { 

			picturefill( {
				reevaluate: true
			});
		},

		indexSVGs : function () {

			KO.Config.sideLogo = Snap.select('.side-logo');
			KO.Config.sideLogo.square1 = KO.Config.sideLogo.select(".square1");
			KO.Config.sideLogo.square2 = KO.Config.sideLogo.select(".square2");
			KO.Config.sideLogo.arrows = KO.Config.sideLogo.select(".arrows");
			KO.Config.sideLogo.arrows.topA = KO.Config.sideLogo.arrows.select(".arrow_top");
			KO.Config.sideLogo.arrows.rightA = KO.Config.sideLogo.arrows.select(".arrow_right");
			KO.Config.sideLogo.arrows.downA = KO.Config.sideLogo.arrows.select(".arrow_down");
			KO.Config.sideLogo.arrows.leftA = KO.Config.sideLogo.arrows.select(".arrow_left");
			KO.Config.sideLogo.letters = KO.Config.sideLogo.select(".letters");
			KO.Config.sideLogo.letters.f  = KO.Config.sideLogo.letters.select(".f");
			KO.Config.sideLogo.letters.a  = KO.Config.sideLogo.letters.select(".a");
			KO.Config.sideLogo.letters.b  = KO.Config.sideLogo.letters.select(".b");
			KO.Config.sideLogo.letters.z  = KO.Config.sideLogo.letters.select(".z");

			KO.Config.arrowTooltip = Snap.select('.arrow-keys-info');
			KO.Config.arrowTooltip.topA = KO.Config.arrowTooltip.select(".arrow_top");
			KO.Config.arrowTooltip.rightA = KO.Config.arrowTooltip.select(".arrow_right");
			KO.Config.arrowTooltip.downA = KO.Config.arrowTooltip.select(".arrow_down");
			KO.Config.arrowTooltip.leftA = KO.Config.arrowTooltip.select(".arrow_left");

			KO.Config.arrowTooltip.topA.path   =  KO.Config.arrowTooltip.topA.select(".arrow_path");
			KO.Config.arrowTooltip.rightA.path = KO.Config.arrowTooltip.rightA.select(".arrow_path");
			KO.Config.arrowTooltip.downA.path  = KO.Config.arrowTooltip.downA.select(".arrow_path");
			KO.Config.arrowTooltip.leftA.path  = KO.Config.arrowTooltip.leftA.select(".arrow_path");

			KO.Config.arrowTooltip.topA.tapArea   =  KO.Config.arrowTooltip.topA.select(".tapArea");
			KO.Config.arrowTooltip.rightA.tapArea = KO.Config.arrowTooltip.rightA.select(".tapArea");
			KO.Config.arrowTooltip.downA.tapArea  = KO.Config.arrowTooltip.downA.select(".tapArea");
			KO.Config.arrowTooltip.leftA.tapArea  = KO.Config.arrowTooltip.leftA.select(".tapArea");

			KO.Config.socialIcons = Snap.select('.social-icons');

			KO.Config.socialIcons.twitter = KO.Config.socialIcons.select(".twitter");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.twitter,"https://twitter.com/fabzhole","_blank"]);

			KO.Config.socialIcons.facebook = KO.Config.socialIcons.select(".facebook");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.facebook,"https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/pages/Fabz/136712463026919","_blank"]);
			
			KO.Config.socialIcons.tumblr = KO.Config.socialIcons.select(".tumblr");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.tumblr,"http://fabzenegger.tumblr.com/","_blank"]);

			KO.Config.socialIcons.flickr = KO.Config.socialIcons.select(".flickr");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.flickr,"https://www.flickr.com/photos/fabzfabzfabz/","_blank"]);
			
			KO.Config.socialIcons.instagram = KO.Config.socialIcons.select(".instagram");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.instagram,"http://instagram.com/fabzhole/","_blank"]);

			KO.Config.socialIcons.googlePlus = KO.Config.socialIcons.select(".googlePlus");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.googlePlus,"https://plus.google.com/+fabianandrade/","_blank"]);

			KO.Config.socialIcons.behance = KO.Config.socialIcons.select(".behance");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.behance,"https://www.behance.net/FavFabz","_blank"]);

			KO.Config.socialIcons.github = KO.Config.socialIcons.select(".github");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.github,"https://github.com/fabzl","_blank"]);

			KO.Config.socialIcons.linkedIn = KO.Config.socialIcons.select(".linkedIn");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.linkedIn,"uk.linkedin.com/pub/fabian-andrade/25/254/1a4/","_blank"]);

			KO.Config.socialIcons.soundcloud = KO.Config.socialIcons.select(".soundcloud");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.soundcloud,"https://soundcloud.com/fabz-vs-fabz","_blank"]);

			KO.Config.socialIcons.vimeo = KO.Config.socialIcons.select(".vimeo");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.vimeo,"https://vimeo.com/fabzfabzfabz","_blank"]);

			KO.Config.socialIcons.pinterest = KO.Config.socialIcons.select(".pinterest");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.pinterest,"http://uk.pinterest.com/fabzfabzfabz","_blank"]);

			KO.Config.socialIcons.dribble = KO.Config.socialIcons.select(".dribble");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.dribble,"https://dribbble.com/fabz","_blank"]);

			KO.Config.socialIcons.ello = KO.Config.socialIcons.select(".ello");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.ello,"https://ello.co/fabzfabz","_blank"]);

			KO.Config.socialIcons.skype = KO.Config.socialIcons.select(".skype");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.skype,"skype:fabzfabzfabz?call","_blank"]);

			KO.Config.socialIcons.mail = KO.Config.socialIcons.select(".mail");
			KO.Config.shareIconsArray.push([KO.Config.socialIcons.mail,"mailto:fabian@fabz.tv?subject=Ask%20me%20whatever&amp;body=Contact%20from%20fabz.tv","_self"]);

		//	console.log(sideLogo);
			KO.Config.addLinksToShareIcons();
			KO.Config.colourInSVGs();
			KO.Config.animateSideLogo();

		},
		addLinksToShareIcons:function () {
			var i=0;
			for(i;i < KO.Config.shareIconsArray.length; i++) {
			//	console.log(i);
				KO.Config.shareIconsArray[i][0].linkUrl = KO.Config.shareIconsArray[i][1];
				KO.Config.shareIconsArray[i][0].windowTarget = KO.Config.shareIconsArray[i][2];
				// we use snap to add the click instance to 
				KO.Config.shareIconsArray[i][0].click(KO.Config.jumpToShareURL);
			}
		},
		jumpToShareURL:function () {

				// open a new tab according to the url stored on this object
				window.open(this.linkUrl,this.windowTarget);
		},

		colourInSVGs: function () { 


			KO.Config.colorObjectHelper(KO.Config.sideLogo.square1,"#FFF");
			KO.Config.colorObjectHelper(KO.Config.sideLogo.square2,"#FFF");
			KO.Config.colorObjectHelper(KO.Config.sideLogo.arrows,"#FFF");

			KO.Config.colorObjectHelper(KO.Config.sideLogo.letters,"#001"); 
			KO.Config.colorObjectHelper(KO.Config.arrowTooltip.topA.path,"#FFF");
			KO.Config.colorObjectHelper(KO.Config.arrowTooltip.rightA.path,"#FFF");
			KO.Config.colorObjectHelper(KO.Config.arrowTooltip.downA.path,"#FFF");
			KO.Config.colorObjectHelper(KO.Config.arrowTooltip.leftA.path,"#FFF");
		},

		animateSideLogo : function () { 
			//	sideLogo.square1.stop().animate({ opacity: .0}, 00,animateSideLogoCompleted);
			//	sideLogo.square2.stop().animate({ opacity: .0}, 00,animateSideLogoCompleted);
			//	sideLogo.letters.stop().animate({ fill: "#000"}, 1000,animateSideLogoCompleted);	
		},

		displayObjectHelper: function(obj,bool,time) {

			if (bool) {
				obj.stop().animate({ opacity: 1}, time);
			}else {
				obj.stop().animate({ opacity: 0}, time);
			}
		},

		colorObjectHelper: function (obj,colour) { 

			obj.attr({
				fill: colour,
			});
	},

	strokeObjectHelper: function (obj,colour,strokeWidth) { 

		obj.attr({
			stroke: colour,
			strokeWidth: strokeWidth
		});
	},

		animateSideLogoCompleted: function() {
			console.log("animate thissss completed ");
		},

	arrowControl: function () {

		// key listener 
		$(window).keydown(function(e) {

		//	console.log("KEY DOWN");
			switch(e.which) {
				case 37: // right
					KO.Config.moveContentHorizontally(1);
				break;

				case 38: // up
					KO.Config.moveContentVertically(1);
				break;

				case 39: // left
					KO.Config.moveContentHorizontally(-1);
				break;

				case 40: // down
					KO.Config.moveContentVertically(-1);
				break;

				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});
		// on click events for stage arrows and side logo arrows

			//right
			KO.Config.$arrowLeft.click(function () { KO.Config.moveContentHorizontally(1) });
			//up
			KO.Config.$arrowUp.click(function () { KO.Config.moveContentVertically(1) });
			//down
			KO.Config.$arrowDown.click(function () { KO.Config.moveContentVertically(-1) });
			//left
			KO.Config.$arrowRight.click(function () { KO.Config.moveContentHorizontally(-1) });

			// if we click on the logo will take you to next section
			KO.Config.sideLogo.square2.click(function () { KO.Config.moveContentHorizontally(-1); });
			KO.Config.sideLogo.letters.click(function () { KO.Config.moveContentHorizontally(-1) });
		},

		updateArrowsVisibility:function () {

		//	this hide and show the arrows accordingly 
			if(KO.Config.currentSection === 0) {
				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.topA,false,.5);
			}else{ 
				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.topA,true,.5);
			}
			if(KO.Config.currentSection < KO.Config.$sectionsAmount-1 ) {
				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.downA,true,.5);
			}else{
				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.downA,false,.5);
			}

			if(KO.Config.$sections[KO.Config.currentSection].totalArticle === 0 ) {
		//		console.log("totalArticle 0 ");

				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.rightA,false,.5);
				KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.leftA,false,.5);

			} else {
		//		console.log('it has slider');

				if (KO.Config.$sections[KO.Config.currentSection].currentArticle === 0 )	{

					KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.leftA,false,.5);

			//		console.log("first article");
				}else {

			//		console.log("not the first article");
					KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.leftA,true,.5);
				}

				if(KO.Config.$sections[KO.Config.currentSection].currentArticle === KO.Config.$sections[KO.Config.currentSection].totalArticle-1) {
				//	console.log("end of the slider");
					KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.rightA,false,.5);
				}else {
				//	console.log("not end of the slider");
					KO.Config.displayObjectHelper(KO.Config.sideLogo.arrows.rightA,true,.5);
				}
			}
		},


	moveContentVertically: function(direction) {

		//	console.log("moveContentVertically");
		if(direction != -1) {

		//		console.log("moving up");

			if(KO.Config.currentSection != 0) {

				KO.Config.moveContentByIndexVertically(KO.Config.currentSection - direction ); 
			}
		}

		if(direction != 1 ) {

	//		console.log("moving down");

		//	console.log(KO.Config.currentSection, KO.Config.$sectionsAmount);
			if(KO.Config.currentSection < KO.Config.$sectionsAmount-1 ) { 
				KO.Config.moveContentByIndexVertically(KO.Config.currentSection - direction ); 
			}
		}
	},

	moveContentHorizontally:function(direction) {

	//	console.log("moveContentHorizontally");
	var $currentArticle = KO.Config.$sections[KO.Config.currentSection].currentArticle;
	var $totalArticles  =  KO.Config.$sections[KO.Config.currentSection].totalArticle;

	if(direction != 1) { 

	//	console.log("direction -1 ");

			if ($currentArticle < $totalArticles-1)	{

					KO.Config.$sections[KO.Config.currentSection].currentArticle ++;
				//	console.log($sections[currentSection].currentArticle)
				//	console.log("move left");
					KO.Config.moveContentByIndexHorizontally(KO.Config.$sections[KO.Config.currentSection].currentArticle); 
			}else { 

				//if the section finish move down to keep going
				KO.Config.moveContentVertically(-1);
			}

		}else {

	//	console.log("direction 1 ");

			if (KO.Config.$sections[KO.Config.currentSection].currentArticle > 0 )	{

					KO.Config.$sections[KO.Config.currentSection].currentArticle --;
				//	console.log("move right");
					KO.Config.moveContentByIndexHorizontally(KO.Config.$sections[KO.Config.currentSection].currentArticle); 
			}else {
				//if the section finish keep move up to keep going 
				KO.Config.moveContentVertically(1);
			}
		}
	},

	moveBackToPosition:function() {
		KO.Config.moveContentHorizontally(KO.Config.$sections[KO.Config.currentSection].currentArticle);
		KO.Config.moveContentByIndexVertically(KO.Config.currentSection);
	},

	resizeSections:function() {

		var i = 0;
		var currentHeight = KO.Config.$window.stageH;

	//	console.log(currentHeight);
		for(i; i < KO.Config.$sections.length ; i++ ) { 

			KO.Config.$sections[i].style.height = KO.Config.$window.stageH + "px";
			KO.Config.$sections[i].style.width = KO.Config.$window.stageW+ "px";
			KO.Config.$sections[i].style.top = (KO.Config.$window.stageH*i)+ "px";
			//$sections[i].css('top', currentHeight);
		}
	},

	indexSections:function() {

		// to detect if the content wrapper is an vertical rectangle to set an offest value
		if ( KO.Config.$window.stageH > KO.Config.$window.stageW) {

	//		console.log("more taller than wide for ",KO.Config.canvasFillValue);
			KO.Config.canvasFillValue =  KO.Config.$window.stageH - KO.Config.$window.stageW;

		}else { 
		// if not the value will be 0 so nothing is changes
			KO.Config.canvasFillValue = 0;
		}


		var i = 0;

		for(i; i < KO.Config.$sections.length ; i++ ) { 

			// define the current acticule
			KO.Config.$sections[i].currentArticle = 0;

			var $currentSection   = KO.Config.$sections.eq(i);
			var $currentContainer = $currentSection.find(".slider-container");
			var $currentSlides    = $currentContainer.find(".slide");
			var $currentImages 	  = $currentSlides.find(".dynamicImage");
			// define the current acticule name
			KO.Config.$sections[i].currentArticleName =  KO.Config.$navigation[i].getAttribute("href").toString();
			//	console.log(KO.Config.$sections[i].currentArticleName);

			// define the amount of articles
			KO.Config.$sections[i].totalArticle = $currentSlides.length;


			if(KO.Config.$sections[i].totalArticle !== 0 ) { 

				var scaleValue = 0; 

				//slide size is set to stage size 
				$currentSlides.css("width", KO.Config.$window.stageW+KO.Config.canvasFillValue);
				$currentSlides.css("height", KO.Config.$window.stageH+KO.Config.canvasFillValue);
				// analize the canvas to detect gaps
				// and slide container is set to full size 
				$currentContainer.css("width", (KO.Config.$window.stageW+KO.Config.canvasFillValue)*(KO.Config.$sections[i].totalArticle+1));
			//	$currentImages.css("width", KO.Config.$window.stageW);
				
				// we calculate the offset value based on the elements size
				var imageOffsetValueNumberY = -($currentImages.height() - KO.Config.$window.stageH)*.5;
				var imageOffsetValueNumberX = -($currentImages.width() - KO.Config.$window.stageW)*.5;

				if(KO.Config.canvasFillValue===0) {
					imageOffsetValueNumberX = 0;
				}
				var imageOffsetValueStringY = "translateY("+imageOffsetValueNumberY+"px)";
				var imageOffsetValueStringX = "translateX("+imageOffsetValueNumberX+"px)";


	//			console.log("$currentImages : ",$currentImages.width(),"$currentSection : ",$currentSection.width(),$currentContainer.width(),"canvasFillValue : ",KO.Config.canvasFillValue);

				var scaleValue = $currentSlides.width()+KO.Config.canvasFillValue;
				$currentImages.width(scaleValue);
			//	console.log("$currentImages.widthafter",$currentImages.width());

				// apply the offset to 
				$currentImages.css({

					//adding the mixins
					transform: imageOffsetValueStringY +" "+ imageOffsetValueStringX,
					MozTransform: imageOffsetValueStringY+" "+  imageOffsetValueStringX,
					WebkitTransform: imageOffsetValueStringY +" "+ imageOffsetValueStringX,
					msTransform: imageOffsetValueStringY+" "+ imageOffsetValueStringX
				});
				// detect if there is overlayers 

				if($currentContainer.find(".overlayer")) { 
					
					//console.log("overlayer detected", i);
					// define the overlayers width based on the screen width
					$currentContainer.find(".overlayer-description").css("width", KO.Config.$window.stageW);

					// add the on click display for the info toggle 

					// define the horizontal position of overlayers
					$currentContainer.find(".overlayer-description").each(

								function (i) { 
									$(this).find(".description-content-holder").on("click",KO.Config.onClickInfoToggle);

									$(this).css("left", (KO.Config.$window.stageW+KO.Config.canvasFillValue)*(i+1)-(KO.Config.$window.stageW+KO.Config.canvasFillValue));
								//	$(this).find("description-content-holder").css("opacity",0);
								});
					};

					$currentImages.css("left", (KO.Config.$window.stageW+KO.Config.canvasFillValue)*(i+1)-(KO.Config.$window.stageW+KO.Config.canvasFillValue));

				// detect if there is vimeo iframes 

				if ($currentSlides.find(".vimeo-video")) {
			//		console.log("vimeo video found",$currentSlides.find(".vimeo-video"));
					$currentSlides.find(".vimeo-video").attr("width",KO.Config.$window.stageW);
					$currentSlides.find(".vimeo-video").attr("height",KO.Config.$window.stageH);
					$currentSlides.find(".vimeo-video").on("click",KO.Config.onKeyDownHandler);
				}
				if ($currentSlides.find(".iframe-insert")) {

					$currentSlides.find(".iframe-insert").attr("width",KO.Config.$window.stageW);
					$currentSlides.find(".iframe-insert").attr("height",KO.Config.$window.stageH);
				}
			}
		}
	},

	onClickInfoToggle : function (e) {
		// stop the event propagation
		e.stopPropagation();

		// create the players
		var $contentHolder = $(e.currentTarget);
		var $toggleContainer= $contentHolder.parent().find(".more-info-toggle-container");
		var toogleSVG = e.currentTarget.querySelector(".more-info-toggle"); 
		var $tdescriptionTooltip =  $(e.currentTarget).find(".description-tooltip");
		var displacementToogleInfo;
		var displacementToogleInfoString;
		var	toggleDisplayOffset = -67;

		// activate the toggles
		$contentHolder.toggleClass("active");
		$toggleContainer.toggleClass("active");
		toogleSVG.classList.toggle("active");
		console.log($contentHolder, $toggleContainer, toogleSVG );


		// jquery callback
		$toggleContainer.on('transitionend webkitTransitionEnd', function(o){
		/* Rather than log on screen, we'll alert the information */
		//	console.log(o.originalEvent.propertyName);
		//	console.log(o.originalEvent.elapsedTime + 's');
			if ($toggleContainer.hasClass( "active") ) {
			//	console.log("activeClass");

				displacementToogleInfo = $contentHolder.height()+toggleDisplayOffset; 
		//		console.log("displacementToogleInfo :",displacementToogleInfo);
			}else{

				displacementToogleInfo = 0;
			//	console.log(" not active Class");
			 }

		//	displacementToogleInfoString =  "translateY("+-displacementToogleInfo+"px)";
			//console.log(displacementToogleInfoString);
			$toggleContainer.css({

						transform: displacementToogleInfoString,
						MozTransform: displacementToogleInfoString,
						WebkitTransform: displacementToogleInfoString,
						msTransform: displacementToogleInfoString
			});

	});
	//	console.log($(e).parent().find("description-content-holder"));
	//	console.log(e.parent().find("description-content-holder"));

	},
	displayDescription : function (e) {
	//	console.log($(e).parent().find("description-content-holder"));
		
	},

	 onKeyDownHandler :function () { 
	},

	//	console.log("vimeo keydown");
	indexNavigation :function() {

		KO.Config.$navigation.on("click",KO.Config.onClickNavigationHandler);
	},

	onClickNavigationHandler:function(event) {

		event.preventDefault();
		var clickedItem = $(this);
		var clickedItemIndex =  KO.Config.$navigation.index(clickedItem);
		KO.Config.moveContentByIndexVertically(clickedItemIndex);
	//	console.log("vertical mode :" , KO.Config.verticalMode)
		if( KO.Config.verticalMode === true ) {
			KO.Config.closeMobileNavToggle();
		//	console.log("closeMobileNavToggle");
		}
	},
	updateCurrentSection :function (currentSection) {

		//	console.log("currentSection",currentSection);
		KO.Config.currentSection  = currentSection;
		KO.Config.updateArrowsVisibility();
		KO.Config.historyReplaceValue(KO.Config.$sections[KO.Config.currentSection].currentArticleName);
		KO.Config.stopPlayingvideos();

	//	console.log("section: ",currentSection,"article: ", KO.Config.$sections[currentSection].currentArticle,"total: ",KO.Config.$sections[KO.Config.currentSection].totalArticle);
		KO.Config.moveContentByIndexHorizontally(KO.Config.$sections[KO.Config.currentSection].currentArticle);
	},

	updateCurrentArticleHorizontal :function(currentArticle) {

//		console.log("section: ",KO.Config.currentSection,"article: ", KO.Config.$sections[KO.Config.currentSection].currentArticle,"total: ",KO.Config.$sections[KO.Config.currentSection].totalArticle);
//		KO.Config.$sections[currentSection].currentArticle = KO.Config.$sections[currentSection].currentArticle;

		KO.Config.updateArrowsVisibility();
	},

	moveContentByIndexVertically:function(index) {

	//	console.log("move Obj by index");
		var newPos = -((KO.Config.$window.stageH)* index);
		KO.Config.$content.css("top",newPos);
		KO.Config.updateCurrentSection(index);
		KO.Config.updateContentTopPosition(newPos);
	},

	moveContentByIndexHorizontally:function(index) { 

		//	console.log("move Obj by index horzontally", index);
		var newPos = -((KO.Config.$window.stageW+KO.Config.canvasFillValue) * index);
		//	KO.Config.$sections[currentSection].currentArticle.css("left",newPos);
		KO.Config.$sections.eq(KO.Config.currentSection).find(".slider-container").css("left",newPos);
		KO.Config.updateContentTopPosition(newPos);
		KO.Config.updateCurrentArticleHorizontal(index);
	},

	updateContentLeftPosition:function(leftPosX) {

		KO.Config.$currentContentLeft = leftPosX;
	},

	updateContentTopPosition:function(topPosY) {

		KO.Config.$currentContentTop = topPosY;
		//		console.log(topPosY,KO.Config.currentSection,KO.Config.$sections[KO.Config.currentSection].currentArticleName);
	},

////////////////STAGE STUFF

	setStageSize:function() {

		// Returns height of HTML document

		KO.Config.$window.stageH = KO.Config.getDimensionsHeight(KO.Config.$window);

		KO.Config.$window.stageW = KO.Config.getDimensionsWidth(KO.Config.$window);

		// if the breakpoint conditions is met activate vertical move 
		if(KO.Config.$window.stageW < KO.Config.swapToVerticalBreakpoint) {

			// boolean to control the vertical positioning
			KO.Config.verticalMode = true;
			// if the Height is than the min height will 100. 
			var navigationHeight = 100;
			
			
			KO.Config.$window.stageH -= navigationHeight;
			// bug fix to show the navigation again when things are changed in the main
			KO.Config.$navigationContainer.css("opacity",1); 
			KO.Config.closeMobileShareToggle();
		}else{

			KO.Config.$window.stageW -= KO.Config.getDimensionsWidth(KO.Config.$navigationContainer);
			KO.Config.verticalMode = false;
		}


		console.log("nav analized",navigationHeight, KO.Config.verticalMode ); 

		// bug fix for the navigation
		KO.Config.hideAndShowSidebar("none");

		console.log("stage size is H : ", KO.Config.$window.stageH,"W : ",KO.Config.$window.stageW);

	},

	getDimensionsHeight:function (obj) {

		var value = obj.height();
		return value;
	},

	 getDimensionsWidth :function(obj) {

		var value = obj.width();
		return value;
	},

	 scrollerControl:function () {

		$(window).bind('mousewheel', function(event) {

			if (event.originalEvent.wheelDelta >= 0) {
				console.log('Scroll up')
				//move content up
				KO.Config.scrollRestrictor(1);
			} else {
				console.log('Scroll down');
				//move content down
				KO.Config.scrollRestrictor(-1);
			}
		});
	},

	scrollRestrictor:function (direction) { 

		if(KO.Config.scrollerFlag) { 

			KO.Config.scrollerFlag = false;

			KO.Config.moveContentHorizontally(direction);
			var timeRestictionInterval =  setInterval( function(){
				KO.Config.scrollerFlag = true;
				clearInterval(timeRestictionInterval);
				}, KO.Config.scrollerSpeed);
			}
	},

	clickToMove:function() {

		KO.Config.$showcaseWrapper.click(function() {
			//console.log( "Handler for .click() called." );
			console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );

			var clickValueX = event.pageX;

			var clickValueY = event.pageY ;

		//		if(clickValueY  < (KO.Config.$window.stageH)*.25 || clickValueY > (KO.Config.$window.stageH)*.75 )

			if(clickValueY < (KO.Config.$window.stageH)*.30 ) { 

		//	console.log("move up");
				KO.Config.moveContentVertically(1);

			}else if(clickValueY > (KO.Config.$window.stageH)*.70 )
			{
		//	console.log("move down");
				KO.Config.moveContentVertically(-1);

			}else if(clickValueX < (KO.Config.$window.stageW)*.30 )
			{
		//	console.log("move left");
				KO.Config.moveContentHorizontally(1);
			}else if(clickValueX > (KO.Config.$window.stageW)*.70 )
			{
		//	console.log("move rigth");
				KO.Config.moveContentHorizontally(-1);
			}

			//console.log( KO.Config.getDimensionsHeight(KO.Config.$showcaseWrapper), KO.Config.getDimensionsWidth(KO.Config.$showcaseWrapper));
		});

	},


/// 3d js insert for clients section

			initClients:function () {

				KO.Config.create3DScene();
				KO.Config.createLights();
		//		KO.Config.createCube();
		//		KO.Config.createSky();

		//		KO.Config.createSphere();
		//		KO.Config.create3DAxis();
		//		KO.Config.createStats();
				KO.Config.createFloatingClientLogo();

				KO.Config.animate();
				KO.Config.createMouseController();

			},


			create3DScene:function() {

				KO.Config.scene3D = new THREE.Scene();
				KO.Config.clientsLogoGroup = new THREE.Object3D();

				KO.Config.camera = new THREE.PerspectiveCamera(75,KO.Config.$window.stageW/KO.Config.$window.stageH, 1, 10000);				
				KO.Config.camera.position.z = 1000;
				KO.Config.scene3D.add(KO.Config.camera);

				KO.Config.renderer = new THREE.WebGLRenderer();
				KO.Config.renderer.setSize(KO.Config.$window.stageW,KO.Config.$window.stageH);
				document.querySelector(".clients3dcontainer").appendChild(KO.Config.renderer.domElement);

			//	window.addEventListener( 'resize', onWindowResize, false );

			},

			createFloatingClientLogo:function() { 

				var i = 1;
				var totalObjects = KO.Config.totalLogoClientsCount;
				var center3D = new THREE.Vector3(0,0,0);
				var controlShiftX = 0;
				var controlShiftY = 0;
				var controlShiftZ = 0;
				var planeHeight = 140;
				var planeWidth	= 180;
				var angleIncrement = 360/totalObjects;
				var initialRadius =KO.Config.$window.stageW*.75;
				var radius = initialRadius;
				var angle = 10;
				var meshHeight = 20;
				
				for ( i ; i <= totalObjects  ; i ++ ) {

					// create the urls to load te images
					var textureFront, textureBack, materials, plane, planeMesh;
					var urltoLoadClientLogo = "000"+i;
					var dir = "../img/clients/";
					var extension = ".jpg";

					// striping the extra zeros out 
					while(urltoLoadClientLogo.toString().length > 4) {
						urltoLoadClientLogo = urltoLoadClientLogo.substr(1);
					}

					// adding the rest of the path
					urltoLoadClientLogo = dir+urltoLoadClientLogo+extension;
					// we create 2 textures fron and back  
					textureFront = THREE.ImageUtils.loadTexture(urltoLoadClientLogo);
					textureBack  = THREE.ImageUtils.loadTexture(urltoLoadClientLogo);
					//   which is probably why your example wasn't working
					textureFront.repeat.set( 1, 1 ); 
					// for the back texture we reverse it and offset it 
					textureBack.repeat.set(-1, 1);
					textureBack.offset.set( 1, 0);
					// create an obj for the mat 
					materials = [
								new THREE.MeshBasicMaterial({map: textureFront, side: THREE.FrontSide}),
								new THREE.MeshBasicMaterial({map: textureBack, side: THREE.BackSide})
								];

					// create the geometry 
					plane = new THREE.PlaneGeometry(planeWidth, planeHeight);

					// for each face we add the texture
					for (var e = 0, len = plane.faces.length; e < len; e++) {
						var face = plane.faces[e].clone();
						face.materialIndex = 1;
						plane.faces.push(face);
						plane.faceVertexUvs[0].push(plane.faceVertexUvs[0][e].slice(0));
					};
					// we weld all together in a new mesh 
					planeMesh = new THREE.Mesh(plane, new THREE.MeshFaceMaterial(materials));
					// calculate the pos of the obj according to pi formula 
					controlShiftX = radius * Math.cos(angle);
					controlShiftZ = radius * Math.sin(angle);
					angle += angleIncrement;
					// position the elements in Y 
					planeMesh.position.y = (meshHeight)*i  - ((meshHeight)*totalObjects*.5);
					planeMesh.position.x = controlShiftX;
					planeMesh.position.z = controlShiftZ;
					// make the objects look center
					planeMesh.lookAt(center3D);
					// add the final stuff to a container 
					KO.Config.clientsLogoGroup.add(planeMesh);
				}

				KO.Config.scene3D.add(KO.Config.clientsLogoGroup);

			},

			create3DAxis:function() { 

				// axes
				var axes = new THREE.AxisHelper(100);
				KO.Config.scene3D.add( axes );

			},

			createCube:function() {

				KO.Config.cube = new THREE.CubeGeometry(300,300,300);


				KO.Config.cubeMaterial = new THREE.MeshLambertMaterial( {
									color: 0xFFFFFF,
									shading: THREE.FlatShading,
									side: THREE.DoubleSide
								} );
				KO.Config.cubeMesh = new THREE.Mesh(KO.Config.cube,KO.Config.cubeMaterial);
				KO.Config.scene3D.add(KO.Config.cubeMesh);
			},


			createSphere:function() {

 				// set up the sphere vars
				var radius = 30, 
					segments = 12,
					rings = 12;

				// create a new mesh with
				KO.Config.sphereMaterial =  new THREE.MeshLambertMaterial(  { color: 0xFFFFFF  });
				KO.Config.sphereMesh = new THREE.Mesh(new THREE.SphereGeometry( radius, segments, rings ), KO.Config.sphereMaterial);

				// add the sphere to the scene
				KO.Config.scene3D.add(KO.Config.sphereMesh);
				KO.Config.sphereMesh.position.x +=300;

			},


			createLights:function () {

				var light1 = new THREE.PointLight( 0xff8844, 3, 300 );
			//	KO.Config.scene3D.add( light1 );

				var light2 = new THREE.PointLight( 0x8844ff, 3, 300 );
			//	KO.Config.scene3D.add( light2 );

				var ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
				KO.Config.scene3D.add( ambient );

				// create a point light
				var pointLight =  new THREE.PointLight(0xFFFFFF);

				// set its position
				pointLight.position.x = 100;
				pointLight.position.y = 500;
				pointLight.position.z = 1500;

				// add to the scene
				KO.Config.scene3D.add(pointLight);
			 },


			// fot the camara animation in clients
			animate:function() {

				requestAnimationFrame(KO.Config.animate);

				KO.Config.camera.position.x += ( KO.Config.mouseX - KO.Config.camera.position.x ) * .05;
				KO.Config.camera.position.y += ( - KO.Config.mouseY - KO.Config.camera.position.y ) * .05;
				KO.Config.camera.lookAt( KO.Config.scene3D.position );
				KO.Config.renderer.render(KO.Config.scene3D,KO.Config.camera);
			},

			createStats:function () { 
				// STATS
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.bottom = '0px';
				stats.domElement.style.zIndex = 100;
				document.body.appendChild( stats.domElement );

			},

			onWindowResizeClients:function () {
 
				KO.Config.camera.aspect = KO.Config.$window.stageW / KO.Config.$window.stageH;
				KO.Config.camera.updateProjectionMatrix();

				KO.Config.renderer.setSize( KO.Config.$window.stageW, wKO.Config.$window.stageH );

			},

			createMouseController:function() {

				document.addEventListener( 'mousemove', KO.Config.onDocumentMouseMove, false );

			},

			onDocumentMouseMove:function (event) {

				KO.Config.mouseX = ( event.clientX - window.innerWidth *.5 ) * 10;
				KO.Config.mouseY = ( event.clientY - window.innerHeight *.5 ) * 10;

			}

	// closure end
	}

//sidelogo.square1.animate({ry:1}, 220, function(){
//     ellipse.animate({ry: 90}, 300);
//   });

// // Add fill color and opacity to circle and apply
// // the mask
// circles.attr({
//   fill: 'coral',
//   fillOpacity: .6,
//   mask: ellipse
// });
 
// ellipse.attr({
//   fill: '#fff',
//   opacity: .8
// });
 
// 
// Create a blink effect by modifying the rx value
// // for ellipse from 90px to 1px and backwards
 
// function blink(){
//   ellipse.animate({ry:1}, 220, function(){
//     ellipse.animate({ry: 90}, 300);
//   });
// };

})(window.KO = window.KO || {}, jQuery);
