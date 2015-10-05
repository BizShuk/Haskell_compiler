### tutorial
1. easy , http://www.nyu.edu/projects/barker/Lambda/#binding
2. for all basic concept , http://www.cs.umd.edu/class/spring2012/cmsc330/lectures/22-lambda.pdf
3. structure explain , http://pages.cs.wisc.edu/~horwitz/CS704-NOTES/1.LAMBDA-CALCULUS.html

### question


### gramar
exp →   
|   ID
|   ( exp )
|   λ ID . exp  // abstraction
|   exp exp // application


### Lamba function with function desc.:
    
    λx.λy.x
    => 
    f(x){
        return function(y){
            return x;
        }
    }



### condition example:
=> \condition \then \else cond then else



##### samples

```
### 1
((\x (it x)) works)
=>(it works)


### 2
((\var ((fn1 var) & (fn2 var))) argument)
=>(fn1 argument) & (fn2 argument)


### 3
(\a \b a)(\a a)(\b b)
=>  (\b (\a a))(\b b)
=> (\a a)


### 4
(( (\Q (\x (Q x))) P) j) 
=> \y (P y) j
=> P j


### 5
\x . (\y . y y) z (\w . w) x 
=> (\y . (y y)) (\x .x)
=> (\x . x)(\x . x)
=> (\x . x)


### 6
((((\GQ  (\L (\x ((GQ L) x)))) (\Q (\x (Q x)))) P) j)
=> (( (\L (\x (( (\Q (\x (Q x))) L) x)))  P) j)
=> ( (\x (( (\Q (\x (Q x))) P) x)) j)
=> ((\Q (\x (Q x))) P) j
=> (\x (P x)) j
=> (P j)



### 7
(\x (\y (\z  (x z) (y z)))) (\x \y x) (\x \y x)
=> 
... ???


=> \z z


### true false
true:  \a \b a => \a a
false: \a \b b => \a b


```




