# **mcfscript**

not to be confused with a ripoff of mcscript

mcscripts is a libary to generate minecraft mcfunctions using typescript

## **installation**

fork this repo and let typescript do its things

## **example**

```
fNamed("load",b=>{
  b.run("tp @s ~~~")
},saveOpt)
```

output:
```
[load.mcfunction]
tp @s ~~~
```
<br><br>
```
fNamed("load",b=>{
  b.run(new Execute().as(select("a")).run("say hi"))
},saveOpt)
```

output:
```
[load.mcfunction]
execute as @a run say hi
```
