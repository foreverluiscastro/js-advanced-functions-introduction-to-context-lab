// Your code here
function createEmployeeRecord(array) {
    const employeeObject = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObject 
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employeeObject, dateStamp) {
    let splitStamp = dateStamp.split(" ")
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(splitStamp[1]),
        date: splitStamp[0]
    })
    return employeeObject
}

function createTimeOutEvent(employeeObject, dateStamp) { 
    const splitStamp = dateStamp.split(" ")
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitStamp[1]),
        date: splitStamp[0]
    })
    return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {
    let timeInDay = employeeObject.timeInEvents.find(record => record.date === date)
    let timeOutDay = employeeObject.timeOutEvents.find(record => record.date === date)
    let timeIn = timeInDay.hour
    let timeOut = timeOutDay.hour
    return (timeOut -= timeIn) / 100
}

function wagesEarnedOnDate(employeeObject, date) {
    let hours = hoursWorkedOnDate(employeeObject, date)
    let hourlyRate = employeeObject.payPerHour
    return hours * hourlyRate
}

function allWagesFor(employeeObject) {
    return employeeObject.timeInEvents.reduce((accumulator, currentValue) => {
        return accumulator + wagesEarnedOnDate(employeeObject, currentValue.date)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((accumulator, currentValue) => {
        return accumulator + allWagesFor(currentValue)
    }, 0)
}