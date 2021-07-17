print("hello world")
studentCount = 0
# 100-90=A, 80-89=B, 79-70=C, 69-60=D, <60=F
class Grader:
    'Common base class all grades'
    gradeCount = 0

    def __init__(self, student, assignment, grade):
        # self.students = []
        self.grades = []
        self.student = student
        self.assignment = assignment
        self.grade = grade
        # self.myDict = myDict.copy()
        # Grader.gradeCount = 0

    # def add_student(self, addStudent):
    #     self.student.append(addStudent)
        
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

    # def displayDict(self):
    #     oneDict = {'id %d': studentCount, 'student': self.students}
    #     print(oneDict)
    #     for key in self.myDict:
    #         print("dict[count]: ", key)

    # def displayCount(self):
    #     print("Total Grades %d" % Grader.gradeCount)
     
# commandline requests




requestName = input("Please enter student's name: ")
requestAssignment = input("Please enter student's assignment: ")
requestGrade = input("Please enter grade:")

def getMain():
  student = {'Name': requestName,
           'Assignment': requestAssignment, 'Grade': requestGrade}
#   s1 = str(student)
#   students = []
#   students.append(s1)
  student1 = Grader(students, requestName, requestAssignment, requestGrade)

  student1 = Grader( requestName, requestAssignment, requestGrade)
  student1.displayStudent()
#   student1.displayDict()

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



     