// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to create a TimeIn event
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // Function to create a TimeOut event
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
  }
  
  // Function to calculate payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Example Usage
  const employeeData = [
    ["John", "Doe", "Engineer", 50],
    ["Jane", "Smith", "Manager", 60]
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2024-07-15 0800");
  createTimeOutEvent(employees[0], "2024-07-15 1600");
  createTimeInEvent(employees[1], "2024-07-15 0900");
  createTimeOutEvent(employees[1], "2024-07-15 1700");
  
  console.log(calculatePayroll(employees)); // Outputs the total payroll for all employees