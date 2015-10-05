var lex = require("../ez_parser.js");


var chai = require('chai');
var assert = chai.assert;

describe('Test mocha  ',function() {

    before(function(done) {
        // Create something before testing
        // then using done() to finish
        done();
    });

    it('should equal test',function() {
        assert.equal( 'test' , 'test' );
    });

    it('lex test',function() {
        assert.deepEqual( lex("\\x y") ,
            [
                {"type":"lambda","token":"\\"},
                {"type":"id","token":"x"},
                {"type":"id","token":"y"},
                {"type":"end","token":"(end)"}
            ]
        );

        // [lambda x [app y y]]
        assert.deepEqual( lex("\\x y y") ,
            [
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'y' },
                { type: 'end', token: '(end)' }
            ]
        );

        // ["app",["app",["lam","a",["lam","b",["var","a"]]],["lam","a",["var","b"]]],["lam","b",["var","b"]]]
        assert.deepEqual( lex("(\\a \\b a)(\\a a)(\\b b)") ,
            [
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'a' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'b' },
                { type: 'id', token: 'a' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'a' },
                { type: 'id', token: 'a' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'b' },
                { type: 'id', token: 'b' },
                { type: 'right', token: ')' },
                { type: 'end', token: '(end)' }
            ]
        );

        // ["app",["app",["lam","Q",["lam","x",["app",["var","Q"],["var","x"]]]],["var","P"]],["var","j"]]
        assert.deepEqual( lex("(( (\\Q (\\x (Q x))) P) j)") ,
            [
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'Q' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'left', token: '(' },
                { type: 'id', token: 'Q' },
                { type: 'id', token: 'x' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'P' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'j' },
                { type: 'right', token: ')' },
                { type: 'end', token: '(end)' }
            ]
        );

        // ["lam","x",["app",["app",["app",["lam","y",["app",["var","y"],["var","y"]]],["var","z"]],["lam","w",["var","w"]]],["var","x"]]]
        assert.deepEqual( lex("\\x (\\y y y) z (\\w w) x") ,
            [
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'y' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'z' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'w' },
                { type: 'id', token: 'w' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'x' },
                { type: 'end', token: '(end)' }
            ]
        );

        assert.deepEqual( lex("((((\\GQ  (\\L (\\x ((GQ L) x)))) (\\Q (\\x (Q x)))) P) j)") ,
            [
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'G' },
                { type: 'id', token: 'Q' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'L' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'left', token: '(' },
                { type: 'left', token: '(' },
                { type: 'id', token: 'G' },
                { type: 'id', token: 'Q' },
                { type: 'id', token: 'L' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'x' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'Q' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'left', token: '(' },
                { type: 'id', token: 'Q' },
                { type: 'id', token: 'x' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'P' },
                { type: 'right', token: ')' },
                { type: 'id', token: 'j' },
                { type: 'right', token: ')' },
                { type: 'end', token: '(end)' }
            ]
        );

        assert.deepEqual( lex("(\\x (\\y (\\z  (x z) (y z)))) (\\x \\y x) (\\x \\y x)") ,
            [
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'y' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'z' },
                { type: 'left', token: '(' },
                { type: 'id', token: 'x' },
                { type: 'id', token: 'z' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'z' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'x' },
                { type: 'right', token: ')' },
                { type: 'left', token: '(' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'x' },
                { type: 'lambda', token: '\\' },
                { type: 'id', token: 'y' },
                { type: 'id', token: 'x' },
                { type: 'right', token: ')' },
                { type: 'end', token: '(end)' }
            ]
        );

    });

});