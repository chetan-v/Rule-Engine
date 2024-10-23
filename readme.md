# Rule Engine Application

This project is a rule engine application that uses an Abstract Syntax Tree (AST) to evaluate user eligibility based on certain attributes. It consists of a backend server built with Node.js and Express, a frontend client built with React, and a MongoDB database for storing rules.

## Features

- **Create Rule**: Define rules using a string format and store them in the database.
- **Evaluate Rule**: Evaluate a rule against user data to determine eligibility.
- **Combine Rules**: Combine existing rules with new conditions to create more complex rules.

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Getting Started

### Running the Application

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Start the Application**:
   Use Docker Compose to build and run the application:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - The frontend client will be available at `http://localhost:3000`.
   - The backend server will be running at `http://localhost:5000`.

### Example Usage

#### Create a Rule

1. Navigate to the "Create Rule" section in the frontend.
2. Enter the following details:
   - **Rule Name**: `rule1`
   - **Rule String**: `((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)`
3. Click "Create Rule" to save the rule.

#### Evaluate a Rule

1. Navigate to the "Evaluate Rule" section in the frontend.
2. Enter the following details:
   - **Rule Name**: `rule1`
   - **JSON Data**: `{"age": 35, "department": "Marketing", "salary": 60000, "experience": 7}`
3. Click "Evaluate Rule" to check the result.
4. **Expected Outcome**: `true`

#### Combine Rules

1. Navigate to the "Combine Rules" section in the frontend.
2. Enter the following details:
   - **New Rule Name**: `rule2`
   - **Existing Rule Name**: `rule1`
   - **New Rule String**: `(score > 10 OR Marks > 90)`
3. Click "Combine Rules" to create a new combined rule.

### Running on Different Machines

To run this application on different machines, ensure that Docker and Docker Compose are installed on each machine. Follow the same steps as above to clone the repository and start the application using Docker Compose.
## Pic
![image](https://github.com/user-attachments/assets/99bf40dc-5d6b-4576-9067-e60ab9b7b9a5)

## Author

Chetan Verma
