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


console.log(1,interpreter('["lam","x",["var","x"]]'))
console.log(2,interpreter('["lam","x",["app",["var","x"],["var","y"]]]'))
console.log(3,interpreter('["lam","x",["lam","z",["var","y"]]]'))
console.log(4,interpreter('["app",["var","x"],["var","x"]]'))
console.log(5,interpreter('["app",["app",["var","x"],["app",["var","x"],["var","y"]]],["var","w"]]'))
console.log(6,interpreter('["app",["lam","x",["app",["var","x"],["var","z"]]],["var","y"]]'));
console.log(7,interpreter('["app",["app",["lam","Q",["lam","x",["app",["var","Q"],["var","x"]]]],["lam","y",["app",["var","P"],["var","y"]]]],["var","j"]]'))
console.log(8,interpreter('["app",["lam","true",["app",["lam","false",["app",["lam","and",["app",["app",["var","and"],["var","true"]],["var","true"]]],["lam","a",["lam","b",["app",["app",["var","a"],["var","b"]],["var","false"]]]]]],["lam","a",["lam","b",["var","b"]]]]],["lam","a",["lam","b",["var","a"]]]]'))
console.log(9,interpreter('["app",["lam","true",["app",["lam","false",["app",["lam","not",["app",["var","not"],["var","true"]]],["lam","p",["lam","a",["lam","b",["app",["app",["var","p"],["var","b"]],["var","a"]]]]]]],["lam","a",["lam","b",["var","b"]]]]],["lam","a",["lam","b",["var","a"]]]]'))


//console.log(interpreter('["app",["lam","+1",["app",["lam","0",["app",["lam","1",["app",["lam","2",["app",["lam","3",["app",["lam","4",["app",["lam","5",["app",["lam","6",["app",["lam","7",["app",["lam","8",["app",["lam","9",["app",["lam","-1",["app",["var","-1"],["app",["var","-1"],["app",["var","-1"],["app",["var","+1"],["app",["var","+1"],["app",["var","+1"],["app",["var","-1"],["app",["var","-1"],["app",["var","-1"],["app",["var","-1"],["var","9"]]]]]]]]]]]],["lam","n",["app",["app",["var","n"],["lam","n-",["var","n-"]]],["var","0"]]]]],["app",["var","+1"],["var","8"]]]],["app",["var","+1"],["var","7"]]]],["app",["var","+1"],["var","6"]]]],["app",["var","+1"],["var","5"]]]],["app",["var","+1"],["var","4"]]]],["app",["var","+1"],["var","3"]]]],["app",["var","+1"],["var","2"]]]],["app",["var","+1"],["var","1"]]]],["app",["var","+1"],["var","0"]]]],["lam","s",["lam","z",["var","z"]]]]],["lam","n",["lam","s",["lam","z",["app",["var","s"],["var","n"]]]]]]'))

















