# 100-90=A, 80-89=B, 79-70=C, 69-60=D, <60=F
class Grader:
    def __init__(self, student, assignment, grade):
        self.grades = []
        self.student = student
        self.assignment = assignment
        self.grade = grade
    
    def displayStudent(self):
        if self.grade >= 90.00:
         self.grades.append('A')
        elif self.grade >= 80.00:
          self.grades.append('B')
        elif self.grade >= 70.00:
          self.grades.append('C')
        elif self.grade >= 60.00:
          self.grades.append('D')
        elif self.grade < 60.00:
          self.grades.append('F')
        print("Student's Name: ", self.student,  "\nAssignment: ",
              self.assignment,  "\nGrade: ", str(self.grades[0]))
     
# commandline requests

requestName = input("Please enter student's name: ")
requestAssignment = input("Please enter student's assignment: ")
requestGrade = input("Please enter grade:")

def getMain():
  showStudent = Grader(requestName, requestAssignment, requestGrade)
#   showStudent = Grader( requestName, requestAssignment, requestGrade)
  showStudent.displayStudent()

#get the true on value if not right
res = True
while res:
  try : 
    requestGrade = float(requestGrade)
    requestGrade = round(requestGrade,2)
    # res = True
    getMain()
    res = False
  except ValueError:
    print("Not a float")
    print("Please enter a number.")
    requestGrade = input("Please enter grade:")
    # res = False

"""

Local Machine:

aimeelynnramirez@Aimees-MBP example-python % python assignment1.py
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:94
Student's Name:  aimee 
Assignment:  test 
Grade:  A
aimeelynnramirez@Aimees-MBP example-python % python assignment1.py
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:54
Student's Name:  aimee 
Assignment:  test 
Grade:  F
aimeelynnramirez@Aimees-MBP example-python % python assignment1.py
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:89.9
Student's Name:  aimee 
Assignment:  test 
Grade:  B
aimeelynnramirez@Aimees-MBP example-python % python assignment1.py
Please enter student's name: aimee
Please enter student's assignment: test 
Please enter grade: 60.01
Student's Name:  aimee 
Assignment:  test 
Grade:  D
aimeelynnramirez@Aimees-MBP example-python % python assignment1.py
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:102.1
Student's Name:  aimee 
Assignment:  test 
Grade:  A

SSH Machine:
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:94
Student's Name:  aimee 
Assignment:  test 
Grade:  A
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: 54
Please enter student's assignment: 54
Please enter grade:54
Student's Name:  54 
Assignment:  54 
Grade:  F
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:94
Student's Name:  aimee 
Assignment:  test 
Grade:  A
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:54
Student's Name:  aimee 
Assignment:  test 
Grade:  F
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:89.9
Student's Name:  aimee 
Assignment:  test 
Grade:  B
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: test
Please enter student's assignment: test1
Please enter grade:60.01
Student's Name:  test 
Assignment:  test1 
Grade:  D
vagrant@ubuntu-focal:/var/www/html/wdd353-grader/example-python$ python3 assignment1.py 
Please enter student's name: aimee
Please enter student's assignment: test
Please enter grade:102.01
Student's Name:  aimee 
Assignment:  test 
Grade:  A

"""