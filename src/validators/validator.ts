import { Employee } from '../models/employee';
import { Assignment } from '../parsers/interfaces';

export class Validator {
  static validateEmployees(employees: Employee[]): void {
    if (employees.length === 0) {
      throw new Error('No employees found in the input file.');
    }

    const emails = new Set<string>();
    for (const employee of employees) {
      if (!employee.name || !employee.email) {
        throw new Error('Employee data is incomplete.');
      }
      if (emails.has(employee.email)) {
        throw new Error(`Duplicate email found: ${employee.email}`);
      }
      emails.add(employee.email);
    }
  }

  static validateNoSelfAssignments(assignments: Assignment[]): void {
    for (const assignment of assignments) {
      if (assignment.employeeEmail === assignment.secretChildEmail) {
        throw new Error('Self-assignment detected.');
      }
    }
  }
}