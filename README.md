# Invoicer - Professional Invoice Management System

## Overview

Invoicer is a full-stack web application that helps freelancers and businesses create, manage, and track invoices efficiently. Built with Next.js, TypeScript, and Express, it provides a modern, responsive interface for professional invoice management.

## Features

### Invoice Management

- **Create Invoices**: Generate professional invoices with customizable fields
- **Edit & Update**: Modify existing invoices as needed
- **Delete**: Remove unwanted invoices from the system
- **Status Tracking**: Track invoice status (Paid/Pending)
- **PDF Generation**: Automatically generate downloadable PDF invoices
- **Filter System**: Sort and filter invoices by status

### User Interface

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Modern UI**: Clean, professional interface with smooth animations
- **Real-time Updates**: Changes reflect immediately across the interface

### Security

- **Authentication**: Secure user authentication system
- **Protected Routes**: Authenticated access to invoice management
- **JWT Tokens**: Secure API communication using JSON Web Tokens

## Technical Stack

### Frontend

- Next.js 13+ with App Router
- TypeScript
- Framer Motion for animations
- SCSS for styling
- Context API for state management
- Axios for API communication

### Backend

- Express.js
- Firebase Realtime database for database
- JWT for authentication
- CORS enabled
- RESTful API architecture

## API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Invoices

- `GET /invoices` - Fetch all invoices
- `POST /invoices` - Create new invoice
- `PUT /invoices/:id` - Update invoice
- `DELETE /invoices/:id` - Delete invoice
- `PATCH /invoices/:id/status` - Update invoice status

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
