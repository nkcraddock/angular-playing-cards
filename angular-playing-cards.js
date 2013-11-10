var playingCards = angular.module('ngPlayingCards', ['ngSanitize']);
playingCards.directive('playingCard', function($compile, $sce) {

    var ranks = {
        ace: {
            name: 'ace',
            symbol: 'A',
            template: '<div  class="card card-ace {{suit.name}}">\n    <div class="corner top"><span class="number">A</span><span ng-bind-html="suit.symbol"></span></div><span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">A</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        two: {
            name: 'two',
            symbol: '2',
            template: '<div class="card card-two {{suit.name}}">\n    <div class="corner top"><span class="number">2</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">2</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        three: {
            name: 'three',
            symbol: '3',
            template: '<div class="card card-three {{suit.name}}">\n    <div class="corner top"><span class="number">3</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">3</span><span ng-bind-html-unsafe="suit.symbol"></span></div>\n</div>'
        },
        four: {
            name: 'four',
            symbol: '4',
            template: '<div  class="card card-four {{suit.name}}">\n    <div class="corner top"><span class="number">4</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">4</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        five: {
            name: 'five',
            symbol: '5',
            template: '<div class="card card-five {{suit.name}}">\n    <div class="corner top"><span class="number">5</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_left" ng-bind-html="suit.symbol"></span>\n    <span class="suit top_right" ng-bind-html="suit.symbol"></span>\n    <span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_left" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">5</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        six: {
            name: 'six',
            symbol: '6',
            template: '<div class="card card-six {{suit.name}}">\n    <div class="corner top"><span class="number">6</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">6</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        seven: {
            name: 'seven',
            symbol: '7',
            template: '<div class="card card-seven {{suit.name}}">\n    <div class="corner top"><span class="number">7</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">7</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        eight: {
            name: 'eight',
            symbol: '8',
            template: '<div class="card card-eight {{suit.name}}">\n    <div class="corner top"><span class="number">8</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">8</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        nine: {
            name: 'nine',
            symbol: '9',
            template: '<div class="card card-nine {{suit.name}}">\n    <div class="corner top"><span class="number">9</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_top_left" ng-bind-html="suit.symbol"></span><span class="suit middle_center" ng-bind-html="suit.symbol"></span><span class="suit middle_top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_left" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">9</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        ten: {
            name: 'ten',
            symbol: '10',
            template: '<div class="card card-ten {{suit.name}}">\n    <div class="corner top"><span class="number">10</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_top_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top_center" ng-bind-html="suit.symbol"></span><span class="suit middle_top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_center" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_left" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">10</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        jack: {
            name: 'jack',
            symbol: 'J',
            template: '<div class="card card-jack {{suit.name}}">\n    <div class="corner top"><span class="number">J</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">J</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        queen: {
            name: 'queen',
            symbol: 'Q',
            template: '<div class="card card-queen {{suit.name}}">\n    <div class="corner top"><span class="number">Q</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">Q</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        king: {
            name: 'king',
            symbol: 'K',
            template: '<div class="card card-king {{suit.name}}">\n    <div class="corner top"><span class="number">K</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">K</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        little: {
            name: 'little joker',
            template: '<div class="card card-little-joker">\n    <span class="face middle_center"></span>\n</div>'
        },
        big: {
            name: 'big joker',
            template: '<div class="card card-big-joker">\n    <span class="face middle_center"></span>\n</div>'
        },
        back: {
            name: 'card back',
            template: '<div class="card card-back"><span class="face"></span></div>'
        }
    };
    var suits = {
        club: {
            name: 'club',
            symbol: '&#9827;',
            color: 'black'
        },
        diamond: {
            name: 'diamond',
            symbol: '&diams;',
            color: 'red'
        },
        spade: {
            name: 'spade',
            symbol: '&spades;',
            color: 'black'
        },
        heart: {
            name: 'heart',
            symbol: '&hearts;',
            color: 'red'
        },
        joker: {
            name: 'joker',
            symbol: 'J',
            color: 'black'
        }
    };
    angular.forEach(suits, function(suit) {
        $sce.trustAsHtml(suit.symbol);
    });


    return {
        scope: {},
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.rank = ranks[attrs.rank] || ranks.back;
            scope.suit = suits[attrs.suit] || suits.heart;
            element.replaceWith($compile(scope.rank.template)(scope));
        }
    };
});


