import { Employee } from '../src/models/employee';
import { SecretSantaAssigner } from '../src/assigners/secret-santa-assigner';
import { Assignment } from '../src/parsers/interfaces';

describe('SecretSantaAssigner', () => {
    let employees: Employee[];
    let previousAssignments: Assignment[];

    beforeEach(() => {
        // Initialize employees and previous assignments
        employees = [
            new Employee('Alice', 'alice@example.com'),
            new Employee('Bob', 'bob@example.com'),
            new Employee('Charlie', 'charlie@example.com'),
        ];

        previousAssignments = [
            {
                employeeName: 'Alice',
                employeeEmail: 'alice@example.com',
                secretChildName: 'Bob',
                secretChildEmail: 'bob@example.com',
            },
        ];
    });

    it('should assign secret children without repeats', () => {
        const assigner = new SecretSantaAssigner(employees, previousAssignments);
        const assignments = assigner.assign();

        // Check that each employee has a unique secret child
        expect(assignments.length).toBe(employees.length);

        assignments.forEach((assignment) => {
            // Ensure no employee is assigned to themselves
            expect(assignment.employeeEmail).not.toBe(assignment.secretChildEmail);

            // Ensure the secret child is one of the employees
            const secretChild = employees.find(
                (e) => e.email === assignment.secretChildEmail
            );
            expect(secretChild).toBeDefined();
        });

        // Ensure no two employees have the same secret child
        const secretChildren = assignments.map((a) => a.secretChildEmail);
        const uniqueSecretChildren = new Set(secretChildren);
        expect(uniqueSecretChildren.size).toBe(secretChildren.length);
    });

    it('should avoid repeating previous assignments', () => {
        const assigner = new SecretSantaAssigner(employees, previousAssignments);
        const assignments = assigner.assign();

        // Ensure Alice is not assigned Bob again
        const aliceAssignment = assignments.find(
            (a) => a.employeeEmail === 'alice@example.com'
        );
        expect(aliceAssignment?.secretChildEmail).not.toBe('bob@example.com');
    });

    it('should throw an error if no valid secret child is found', () => {
        // Only two employees, and one is already assigned in previous assignments
        const limitedEmployees = [
            new Employee('Alice', 'alice@example.com'),
            new Employee('Bob', 'bob@example.com'),
        ];
        const assigner = new SecretSantaAssigner(limitedEmployees, previousAssignments);

        // Alice cannot be assigned Bob (previous assignment), and cannot assign herself
        expect(() => assigner.assign()).toThrow('No valid secret child for Alice');
    });
});