import { CsvParser } from './parsers/csv-parser';
import { Validator } from './validators/validator';
import { SecretSantaAssigner } from './assigners/secret-santa-assigner';

async function main() {
    try {
        // Read input files
        const employees = await CsvParser.readEmployees('./data/employees.csv');
        const previousAssignments = await CsvParser.readAssignments(
            './data/previous_assignments.csv'
        );

        // Validate input
        Validator.validateEmployees(employees);

        // Assign secret children
        const assigner = new SecretSantaAssigner(employees, previousAssignments);
        const newAssignments = assigner.assign();

        // Write output
        await CsvParser.writeAssignments('./data/assignments.csv', newAssignments);
        console.log('Secret Santa assignments generated successfully!');
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
    }
}

main();