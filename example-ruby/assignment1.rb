class Grader
   def initialize(name, assignment, grade)
    @read_grade = ""
    @grades = []
    # @letter_grade =""
    @student = name
    @student_assignment = assignment
    @student_grade = grade
   end

   def display_student(grade)
    @student_grade = grade
     if @student_grade >= 90.00
      @read_grade =  @grades.push('A')      
     elsif @student_grade >= 80.00
        @read_grade =  @grades.push('B')
     elsif  @student_grade >= 80.00
        @read_grade =  @grades.push('C')
     elsif @student_grade >= 60.00
        @read_grade =  @grades.push('D')
     elsif @student_grade < 60.00
         @read_grade = @grades.push('F')

     end
   end
    def display_details()
      puts "Student's Name:  #@student"
      puts "student's assignment: #@student_assignment"
      puts "student's grade: #@read_grade" 
    #   puts "student's grades: #@letter_grade" 
   end
 end
puts "Please enter student's name \n"
@name = gets
puts "Please enter student's assignment \n"
@assignment = gets
puts "Please enter student's grade \n"
@grade = gets
@convertGrade = @grade.to_f


def main 
showStudent = Grader.new(@name, @assignment, @convertGrade)
showStudent.display_student(@convertGrade.round(2))
showStudent.display_details()
end
  if @convertGrade.is_a? Float 
    puts "grade is a float."
    main
  else 
    puts "Not a float"
    puts "Please enter a number."
 end

