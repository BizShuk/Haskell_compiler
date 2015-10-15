var interpreter = function (parseTree){

    var json_tree = JSON.parse(parseTree);
// app
// lam
// var

    var finish_tag = 1;
    var output = ""

    function recur ( json ){
        var op = json[0];
        if ( op == "var") return json;
        var v1 = json[1],
            v2 = json[2];
        if ( op == "app" ) {
            if ( v1[0] == "lam" ){
                finish_tag = 1;
                v1 = apply(v1[2],v1[1],v2);
                v1 = recur(v1)
                // v2 applied to v1
                return v1;
            }else{
                v1[0] == "var" ? v1 : v1 = recur(v1);
                v2[0] == "var" ? v2 : v2 = recur(v2);
                return ["app",v1,v2];
            }

        }else if ( op == "lam"){
            if( v2[0] != "var") v2 = recur(v2)
            return ["lam",v1,v2];
        }


    }

    // json[0] => app , json[1][0] => lam  , json[2]
    function apply (expr,operand,replacement) {

        // 如果lam  != operand apply recursively replace $var to replacement
        if( expr[0] == "lam" && expr[1] == operand){
            return expr;
        }
        if( expr[0] == "var" && expr[1] == operand ){
            return replacement;
        }

        if( expr[0] == "var" ){
            return expr;
        }else if( expr[0] == "app" ){
            return ["app",apply(expr[1],operand,replacement),apply(expr[2],operand,replacement)];
        }else if( expr[0] == "lam" ){
            return ["lam",expr[1],apply(expr[2],operand,replacement)];
        }

    }
    output = json_tree;
    while (finish_tag == 1){
        finish_tag = 0;
        output = recur(output);
    }
    return output;
 }


// console.log(interpreter('["lam","x",["var","x"]]'))
// console.log(interpreter('["lam","x",["app",["var","x"],["var","y"]]]'))
// console.log(interpreter('["lam","x",["lam","z",["var","y"]]]'))

// console.log(interpreter('["app",["var","x"],["var","x"]]'))
// console.log(interpreter('["app",["app",["var","x"],["app",["var","x"],["var","y"]]],["var","w"]]'))

console.log(interpreter('["app",["lam","x",["app",["var","x"],["var","z"]]],["var","y"]]'));
console.log(interpreter('["app",["app",["lam","Q",["lam","x",["app",["var","Q"],["var","x"]]]],["lam","y",["app",["var","P"],["var","y"]]]],["var","j"]]'))


















