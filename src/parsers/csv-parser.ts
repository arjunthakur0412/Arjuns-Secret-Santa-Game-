import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { Employee } from '../models/employee';
import { Assignment } from '../parsers/interfaces';

export class CsvParser {
    static async readEmployees(filePath: string): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            const employees: Employee[] = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row: any) => {
                    employees.push(new Employee(row.Employee_Name, row.Employee_EmailID));
                })
                .on('end', () => resolve(employees))
                .on('error', (error) => reject(error));
        });
    }

    static async readAssignments(filePath: string): Promise<Assignment[]> {
        return new Promise((resolve, reject) => {
            const assignments: Assignment[] = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row: any) => {
                    assignments.push({
                        employeeName: row.Employee_Name,
                        employeeEmail: row.Employee_EmailID,
                        secretChildName: row.Secret_Child_Name,
                        secretChildEmail: row.Secret_Child_EmailID,
                    });
                })
                .on('end', () => resolve(assignments))
                .on('error', (error) => reject(error));
        });
    }

    static async writeAssignments(
        filePath: string,
        assignments: Assignment[]
    ): Promise<void> {
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: 'employeeName', title: 'Employee_Name' },
                { id: 'employeeEmail', title: 'Employee_EmailID' },
                { id: 'secretChildName', title: 'Secret_Child_Name' },
                { id: 'secretChildEmail', title: 'Secret_Child_EmailID' },
            ],
        });
        await csvWriter.writeRecords(assignments);
    }
}