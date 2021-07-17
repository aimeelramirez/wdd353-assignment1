
class Example
  #constructor
  def initialize
    @word = 'Hello world.'
    
  end
  # display method
  def display
    puts "Value of First instance variable is: #{@word}"
  end
end 
newExample = Example.new
puts newExample.display


class Customer
   @@no_of_customers = 0
   def initialize(id, name, addr)
      @cust_id = id
      @cust_name = name
      @cust_addr = addr
   end
    def display_details()
      puts "Customer id #@cust_id"
      puts "Customer name #@cust_name"
      puts "Customer address #@cust_addr"
   end
end
cust1 = Customer.new("1", "Aimee", "Slow but rusty")
puts cust1.display_details()

(0..5).each do |i|
  puts i
end

def test(a1 = "Ruby", a2 = "Perl")
   puts "The programming language is #{a1}"
   puts "The programming language is #{a2}"
end
test "C", "C++"
test

