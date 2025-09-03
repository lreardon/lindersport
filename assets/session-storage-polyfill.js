/*
 * Based on: http://www.quirksmode.org/js/cookies.html
 * and https://github.com/wojodesign/local-storage-js/blob/master/storage.js
 * and https://gist.github.com/350433
 * License: http://www.opensource.org/licenses/MIT
 */

(function(window) {
	// console.log('HEY');
    'use strict';
		if (window.sessionStorage) {
			// console.log(window.sessionStorage);
			return;
		}
    window.sessionStorage = {
        length: 0,
        setItem: function(key, value) {
            document.cookie = key + '=' + value + '; path=/';
            this.length++;
        },
        getItem: function(key) {
            var keyEQ = key + '=';
            var ca = document.cookie.split(';');
            for (var i = 0, len = ca.length; i < len; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(keyEQ) === 0) return c.substring(keyEQ.length, c.length);
            }
            return null;
        },
        removeItem: function(key) {
            this.setItem(key, '', -1);
            this.length--;
        },
        // clear: function() {
        //     // Caution: will clear all persistent cookies as well
        //     var ca = document.cookie.split(';');
        //     for (var i = 0, len = ca.length; i < len; i++) {
        //         var c = ca[i];
        //         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        //         var key = c.substring(0, c.indexOf('='));
        //         this.removeItem(key);
        //     }
        //     this.length = 0;
        // },
        key: function(n) {
            var ca = document.cookie.split(';');
            if (n >= ca.length || isNaN(parseFloat(n)) || !isFinite(n)) return null;
            var c = ca[n];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            return c.substring(0, c.indexOf('='));
        }
    };
})(this);
