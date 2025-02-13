# 🎄 Secret Santa Assigner 🎅

A TypeScript-based solution for automating Secret Santa gift assignments within a company. This tool ensures fairness by adhering to rules like no self-gifting and no repeats from previous years.

---

## ✨ Features

- **CSV Input/Output**: Reads employee data and previous assignments from CSV files and writes new assignments to a CSV file.
- **Fair Assignments**:
  - No employee is assigned to themselves.
  - Avoids repeating previous year's assignments.
  - Ensures every employee gets exactly one secret child.
- **Validation**: Checks for duplicates, incomplete data, and invalid assignments.
- **Modular Design**: Follows object-oriented programming (OOP) principles for extensibility.
- **Testing**: Includes unit tests for reliability and correctness.

---

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/secret-santa.git
   cd secret-santa
2. Install dependencies:
   ```bash
   npm install
  

🚀 Usage
1. Prepare Input Files
Place the following files in the data folder:

`data/employees.csv`
Contains the list of employees. Format:
```csv
Employee_Name,Employee_EmailID
Hamish Murray,hamish.murray@acme.com
Layla Graham,layla.graham@acme.com
...
```

`data/previous_assignments.csv`
Contains previous year's assignments (if applicable). Format:
```csv
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Hamish Murray,hamish.murray@acme.com,Layla Graham,layla.graham@acme.com
...
```

2. Run the Program
```bash
npx ts-node src/main.ts
```
3. Check Output
The new assignments will be saved to `data/assignments.csv`. Format:
```csv
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Hamish Murray,hamish.murray@acme.com,Charlie Ross,charlie.ross@acme.com
...
```

📂 Project Structure
```
secret-santa/
├── data/                   # CSV files (input/output)
├── src/                    # Source code
│   ├── assigners/          # Assignment logic
│   ├── models/             # Data models (e.g., Employee)
│   ├── parsers/            # CSV parsing/writing
│   ├── validators/         # Input validation
│   └── main.ts             # Entry point
├── test/                   # Unit tests
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
└── README.md               # Project documentation
```
🧪 Testing

```bash
npm test
```
Test Cases
- Valid Employee Data: Ensures employees are parsed correctly.
- Fair Assignments: Ensures no self-gifting and no repeats from previous years.
- Error Handling: Ensures errors are thrown for invalid inputs.

🚨 Error Handling
The program validates:

- Missing or empty CSV files.
- Duplicate employee emails.
- Self-assignments in previous assignments.
- Invalid CSV formats.

If an error occurs, the program will log the error and stop execution.



