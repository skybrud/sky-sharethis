/* global angular, window*/
(function() {
	'use strict';
	/**
	 * This is the skySharethis directive
	 * Usage <button sky-sharethis="facebook" apikey="rtqsa3gsn5td9u6uvb43cvyh">share on facebook</button>
	 *
	 * The value of the attribute "sky-sharethis" is the sharing destination
	 * List of available destinations here: http://sharethis.com/publishers/services-directory
	 *
	 * Uses current url unless attribute "shareurl" is defined
	 * 
	 * The (optional) value of the attribute "apikey" is the users apikey for sharethis
	 * Sign up for apikey here: http://developer.sharethis.com/apps/register
	 *
	 * Tools:
	 * http://developer.sharethis.com/io-docs
	 */

	angular.module('skySharethis').directive('skySharethis',skySharethis);

	skySharethis.$inject = ['sharethisapi','$window'];

	function skySharethis(sharethisapi, $window) {
		var directive = {
			restrict:'A',
			link:link
		};

		function link(scope,element,attrs) {
			element[0].title=attrs.skySharethis;
			element.on('click', function() {
				var apikey = attrs.apikey || sharethisapi;
				var shareurl = attrs.shareurl || $window.location.href;
				
				if(attrs.skySharethis === "email") {
					return $window.location.href = 'mailto:?body='+shareurl;
				}
				
				$window.open(
					'http://rest.sharethis.com/v1/share/share?destination='+encodeURIComponent(attrs.skySharethis)+
						'&url='+encodeURIComponent(shareurl)+
						'&api_key='+encodeURIComponent(apikey),
					'Share this',
					'status=0,toolbar=0,width=500,height=400'
				);
			});
		}

		return directive;
	}
})();
