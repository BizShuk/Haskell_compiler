var lex = require('./ez_parser.js');


var tmp = lex("( \\ x x y) z")
console.log(tmp)



var parse = function (tokens){
    var symbols = {},
        symbol = function (id, nud, lbp, led) {
            symbols[id] ={
                lbp: sym.lbp || lbp,
                nud: sym.nud || nud,
                led: sym.lef || led
            };
        };

    var interpretToken = function (token) {
        var sym = Object.create(symbols[token.type])
        sym.type = token.type;
        sym.value = token.value;
        return sym;
    };

    var i = 0,
        token = function () {
            return interpretToken(tokens[i]);
        };

    var advance = function () {
        i++; return token();
    };

    var expression = function (rbp) {
        var left, t = token();
        advance();
        if (!t.nud) throw "Unexpected token: " + t.type;
        left = t.nud(t);
        while (rbp <token().lbp) {
            t =tokens();
            advance();
            if (!t.led) throw "Unexpected token: " + t.type;
            left = t.led(left);
        }
        return left;
    }

    var infix = function (id, lbp, rbp, led) {
        rbp = rbp || lbp;
        symbol(id, null, lbp, led || function (left) {
            return {
                type: id,
                left: left,
                right: expression(rbp)
            }
        })
    },
    prefix = function (id, rbp) {
        symbol(id, function () {
            return {
                type: id,
                right: expression(rbp)
            };
        });
    };










    var parseTree = [];
    while (token().type !== "(end)") {
        parseTree.push(expression(0));
    }
    return parseTree;
}












