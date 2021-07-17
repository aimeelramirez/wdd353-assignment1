// 100){} - 90=A, 80 - 89=B, 79 - 70=C, 69 - 60=D, < 60=F

const readln = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

class Grader {
    constructor(student, assignment, grade) {
        // super(props);
        this.grades = []
        this.student = student
        this.assignment = assignment
        this.grade = grade

    }

    displayStudents = (grade) => {
        if (grade >= 90.00) {
            this.grades.push('A')
        } else if (grade >= 80.00) {
            this.grades.push('B')
        } else if (grade >= 80.00) {
            this.grades.push('C')
        }
        else if (grade >= 60.00) {
            this.grades.push('D')
        }
        else if (grade < 60.00) {
            this.grades.push('F')
        }
    }

}
class Colors {
    constructor() {
        this.props = {
            bg: "\x1b[40m",
            txt: "\x1b[33m"
        }
    }
    displayColors() {
        // const { bg, txt } = { ...this.props }
        return this.props

    }
}
//get the answer
let readAnswer = ""
let readGrade = ""
let readAssignment = ""
let question = function (q) {
    return new Promise((res, rej) => {
        readln.question(q, answer => {
            res(answer);
            readAnswer = answer
        })

    });
};
let questionAssignment = function (q) {
    return new Promise((res, rej) => {
        readln.question(q, answer => {
            res(answer);
            readAssignment = answer
        })
    });
};
let questionGrade = function (q) {
    return new Promise((res, rej) => {
        readln.question(q, answer => {
            res(answer);
            readGrade = answer
        })

    });
};


(async function main() {
    let answer, assignment, grade;
    if (answer === undefined) {
        answer = await question("Please enter student's name \n");

    }
    if (assignment === undefined) {
        assignment = await questionAssignment("Please enter student's assignment \n");


    }
    if (grade === undefined) {
        grade = await questionGrade("Please enter student's grade \n")


    }

    let checkNaN = Number.isNaN(parseFloat(readGrade));
    while (checkNaN) {
        //verify number
        console.log("Please input a number to decimal")
        grade = await questionGrade("Please input a number for student's grade \n")
        checkNaN = Number.isNaN(parseFloat(readGrade));

    }
    let color = new Colors()
    let student1 = new Grader(readAnswer, readAssignment, readGrade)
    //run method
    student1.displayStudents(readGrade)
    console.log(color.displayColors().bg + color.displayColors().txt, `Student's Name: ${readAnswer} \n Student's Assignment: ${readAssignment} \n Student's Grade: ${student1.grades[0]}`)
    // console.log('closing');
    readln.close()
})();


