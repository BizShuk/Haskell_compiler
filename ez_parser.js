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

module.exports = lex;