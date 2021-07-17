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
        elif self.grade < 70.00 & self.grade >= 60.00:
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
  showStudent = Grader( requestName, requestAssignment, requestGrade)
  showStudent.displayStudent()

#get the true on value if not right
res = True
while res:
  try : 
    requestGrade = float(requestGrade)
    requestGrade = round(requestGrade,2)
    
    res = True
    getMain()
    res = False
  except ValueError:
    print("Not a float")
    print("Please enter a number.")
    res = False



     