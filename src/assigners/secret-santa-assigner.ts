import { Employee } from '../models/employee';
import { Assignment } from '../parsers/interfaces';

export class SecretSantaAssigner {
	constructor(
		private employees: Employee[],
		private previousAssignments: Assignment[]
	) { }

	assign(): Assignment[] {
		const assignments: Assignment[] = [];
		const remainingEmployees = [...this.employees];

		for (const employee of this.employees) {
			const previousChild = this.getPreviousChild(employee);
			const candidates = remainingEmployees.filter(
				(e) => !e.equals(employee) && (!previousChild || !e.equals(previousChild))
			);

			if (candidates.length === 0) {
				throw new Error(`No valid secret child for ${employee.name}`);
			}

			const secretChild = candidates[Math.floor(Math.random() * candidates.length)];
			assignments.push(this.createAssignment(employee, secretChild));
			remainingEmployees.splice(remainingEmployees.indexOf(secretChild), 1);
		}

		return assignments;
	}

	private getPreviousChild(employee: Employee): Employee | null {
		const prevAssignment = this.previousAssignments.find(
			(a) => a.employeeEmail === employee.email
		);
		return prevAssignment
			? new Employee(prevAssignment.secretChildName, prevAssignment.secretChildEmail)
			: null;
	}

	private createAssignment(employee: Employee, secretChild: Employee): Assignment {
		return {
			employeeName: employee.name,
			employeeEmail: employee.email,
			secretChildName: secretChild.name,
			secretChildEmail: secretChild.email,
		};
	}
}