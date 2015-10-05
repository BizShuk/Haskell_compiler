/*
exp →   
|   ID
|   ( exp )
|   λ ID . exp  // abstraction
|   exp exp     // application
*/

var lex = function( input ){    
    var tokens = [],
        i_input= 0,     // index of input
        c; 

    console.log("input:",input);

    var is_whitespace  = function (c){ return / /.test(c);   },
        is_left_quote  = function (c){ return /\(/.test(c);  },
        is_right_quote = function (c){ return /\)/.test(c);  },
        is_lambda      = function (c){ return /\\/.test(c);  },
        is_id          = function (c){ return /[a-zA-Z]/.test(c); };


    var get_char = function (){
        return c = input[++i_input];    
    };

    var add_token = function ( type , token ){
        tokens.push({
            type:type,
            token:token    
        });
    }

    while( i_input < input.length ){
        c = input[i_input];
        if( is_whitespace(c) ){
            get_char();    
        }else if( is_lambda(c) ){
            add_token("lambda",c);          
            get_char();    
        }else if( is_id(c) ){
            var id = c;
            while( is_id( get_char() ) && i_input < input.lenght ){
                id += c;
            }
            add_token("id",id);
        }else if( is_left_quote(c) ){
            add_token("left",c);
            get_char();    
        }else if( is_right_quote(c) ){
            add_token("right",c);
            get_char();    
        }else{ 
            throw "unregonized token."; 
        }
    }
    add_token("end","(end)");
    return tokens;    
}

// [lambda x [app y y]]
var tokens = lex("\\x y y"); 
console.log(tokens);

// ["app",["app",["lam","a",["lam","b",["var","a"]]],["lam","a",["var","b"]]],["lam","b",["var","b"]]]
var tokens = lex("(\\a \\b a)(\\a a)(\\b b)"); 
console.log(tokens);

// ["app",["app",["lam","Q",["lam","x",["app",["var","Q"],["var","x"]]]],["var","P"]],["var","j"]]
var tokens = lex("(( (\\Q (\\x (Q x))) P) j)"); 
console.log(tokens);

// ["lam","x",["app",["app",["app",["lam","y",["app",["var","y"],["var","y"]]],["var","z"]],["lam","w",["var","w"]]],["var","x"]]]
var tokens = lex("\\x (\\y y y) z (\\w w) x"); 
console.log(tokens);

var tokens = lex("((((\\GQ  (\\L (\\x ((GQ L) x)))) (\\Q (\\x (Q x)))) P) j)"); 
console.log(tokens);

var tokens = lex("(\\x (\\y (\\z  (x z) (y z)))) (\\x \\y x) (\\x \\y x)"); 
console.log(tokens);
