
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

#ask requests
puts "Please enter student's name \n"
@name = gets
puts "Please enter student's assignment \n"
@assignment = gets
puts "Please enter student's grade \n"
@grade = gets

#get main 
def main 
showStudent = Grader.new(@name, @assignment, @grade)
showStudent.display_student(@grade.to_f.round(2))
showStudent.display_details()
end

#get the valid number
class Object
  def numeric?    
    Float(self) != nil rescue false
  end
  def validate
    while  @grade.numeric? == false
    puts "Not a number"
    puts "Please enter a number."
    @grade = gets
      if @grade.numeric?
        puts "grade is a number."
         main
      end
    end
  end
end

##get number initally to check
if @grade.numeric?
    puts "grade is a number."
    main
else 
  validate()
end
