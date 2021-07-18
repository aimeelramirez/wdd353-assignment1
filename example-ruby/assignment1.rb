
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

def main 
showStudent = Grader.new(@name, @assignment, @grade)
showStudent.display_student(@grade.to_f.round(2))
showStudent.display_details()
end

class Object
  def is_number?
    to_f.to_s == to_s || to_i.to_s == to_s
  end
  def numeric?    
    Float(self) != nil rescue false
  end
end


if @grade.numeric?
    puts "grade is a number."
    main
else 
    puts "Not a number"
    puts "Please enter a number."
 end




