export class Employee {
    constructor(public readonly name: string, public readonly email: string) { }

    equals(other: Employee): boolean {
        return this.email === other.email;
    }
}
