# Web Calculator

A simple web application that allows users to perform basic arithmetic calculations. Built with React, Vite, TypeScript, and Tailwind CSS for the frontend, and Express, TypeScript, and MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Perform basic arithmetic calculations.
- View history of calculations.
- Clear calculation history.

## Technologies

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - Tailwind CSS

- **Backend:**
  - Express
  - TypeScript
  - MongoDB
  - Zod for input validation

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   
2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up your environment variables by copying the `.env.example` to `.env` and filling in the required values.

## Usage

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the calculator.

## API Endpoints

### POST /api/calculate

Accepts a calculation request and returns the result.

**Request Body:**
{
  "expression": "2 + 2"
}
```

**Response:**
```json
{
  "result": 4
}
```

### GET /api/history

Retrieves the history of calculations.

**Response:**
```json
[
  {
    "expression": "2 + 2",
    "result": 4,
    "timestamp": "2023-10-01T12:00:00Z"
  }
]
```

### DELETE /api/history

Clears the history of calculations.

**Response:**
```json
{
  "message": "History cleared"
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.