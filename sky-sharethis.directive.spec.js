(function() {

	describe('Directive: skySharethis', function() {
		var element,
			$compile,
			$rootScope,
			$window;


		beforeEach(module('skySharethis'));

		beforeEach(inject(function(_$compile_, _$rootScope_, _$window_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$window = _$window_;
		}));

		beforeEach(function() {
			element = angular.element('<button sky-sharethis="facebook">Del</button>');

			$compile(element)($rootScope);

			$rootScope.$digest();
		});

		it('should call $window.open with correct destination when clicked', function() {
			var spy = spyOn($window,'open');

			expect(spy).not.toHaveBeenCalled();

			element.triggerHandler('click');

			expect(spy).toHaveBeenCalled();

			expect(spy.calls.mostRecent().args[0].match(/destination=([a-z]+)/i)[1]).toBe('facebook');

		});


	});

})();
