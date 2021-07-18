## File Operations with Python

Python is object oriented and you don't need to declare variables or define types before using them.

```
var a = "Joe";
var b = 1;
print(a); //print is used to output the information on the screen.
Python is written very similar to JavaScript, try converting a simple function.

function myFunction(){
alert("test");
}
def myFunction():
print("Test")
Python lists are also written just like JavaScript

myList = [1,"Apples"]
print(myList[0])
#prints out 1,"Apples"
for x in mylist:
print(x)
This is what Python conditionals look like

name = "John"
if name in ["John", "Rick"]:
print("Your name is either John or Rick.")
Little bit of OOP with Python

class Dog:
def **init**(self): #this is a constructor
age=24
def getAge(self): #this is a method
return self.age
myDog = Dog()
print(myDog.getAge())
You can get into the python command line by typing

> > python
> > and then start writing code. Exit the command line by

exit()
or create a file with the extension "myfile.py". Get this file executing by typing

> > python myfile.py
```

## File Operations with Ruby

```
Ruby is extremely similar in syntax compare to JavaScript. Don't forget tough Ruby is a server-side language, meaning that it doesn't run on the browser like JavaScript. It runs on the server. You do not have specify a variable type.

a = "Joe";
b = 1.5;
puts a; //print or puts is used to output the information on the screen.
Try converting a simple function.
function myFunction(){
  alert("test");
}
def myFunction()
  print("Test")
end #ending tags are required in Ruby.
Ruby lists are also written just like JavaScript

myList = [1,"Apples"]
puts myList[0]
#prints out 1
for i in myList do
  pus i
end
This is what Ruby conditionals look like

x = 5
if x > 2
  puts "x is greater than 2"
elsif x <= 2 and x!=0
  puts "x is 1"
else
  puts "Don't know"
end
Little bit of OOP with Ruby

class Dog
  def initialize()
    @age=24 #@this is an instance variable
end
def getAge
    return @age
end
end
myDog = Dog.new
print(myDog.getAge())
Let's parse a file with Ruby and add some logic to make it useful. You can get into the Ruby command line by typing

>>irb
and then start writing code. Exit the command line by

exit()
or create a file with the extension "myfile.rb". Get this file executing by typing

>>ruby myfile.rb
```

## File Operations with Node

Nodejs is JavaScript that is designed to run on the server. It is a server-side JavaScript engine provided by Google.

JavaScript is loose in syntax so you still do not have to define types just like Python,PHP, or Ruby.

```
var myarr = ["joe","mike"];
console.log(myarr);
var myassoc = {"name":"mike","last":"stuff","more":[{"name":"joe"}]}
console.log(myassoc["more"][0]["name"]);
//with es6 you can actually use "class" and "require" for external classes
//require("perons.js");
class Car{
  doors = function(type){
  this.number=0;
  if(type=="Toyota"){
  this.number=4;
  }else{
  this.number = 2;
  }
  return this.number;
  }
}
module.exports = Car;
mycar = new Car();
console.log(mycar.doors("Honda"));
//you can run nodejs on the terminal by just typing node and the file you have created
>>node myfile.js

```
