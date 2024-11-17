# Warehouse Management Admin Panel

This project is a Warehouse Management Admin Panel, built to simulate an admin interface for managing goods. It allows for user authentication, efficient data handling, and provides customized notification messages. The project is developed with React, Vite, and React Query, and is connected to a backend server running on a live domain.

## Features

- **User Authentication**: Includes secure login and registration using JWTs stored as cookies.
- **Item Management**: Create, update, delete, and manage items in the warehouse.
- **Search Functionality**: Search for items by name within the warehouse inventory.
- **Pagination**: Seamless pagination for browsing through large lists of items.
- **Error Handling**: Specific error messages for cases like duplicate usernames, invalid credentials, and form validation errors.
- **Optimized API Requests**: Configured with React Query for efficient data management, retries set to zero for API calls to ensure stability.
- **Notifications**: Real-time feedback for actions such as successful login, registration, and form validation using React-Hot-Toast.
- **Protected Routes**: Smart route management to ensure authenticated access to protected pages.

## Technologies Used

- **React 18**: Frontend framework
- **Vite 5**: Fast build tool
- **React Query**: Data fetching and caching
- **Axios**: HTTP client for API requests
- **react-hot-toast**: User notification system
- **CSS Modules**: Scoped and modular CSS styling
- **Persian Locale Support**: Handling Persian dates and numbers
- **Backend**: Hosted API on Vercel, delivering structured JSON data.

## Demo

You can view the live demo of the project here:

[WareHouse Demo](https://ware-house-app.vercel.app)

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/matador7495/WareHouse-App.git

#Navigate to the project directory

cd warehouse-admin-panel
```

### 2. Install dependencies

Make sure you have Node.js installed, then run the following command:

```bash
npm install
```

### 3. Set up environment variables

Create a .env file in the root directory with the following content:

```bash
VITE_BASE_URL=https://ware-house-api.vercel.app
```

### 4. Run the application locally

```bash
npm run dev
```

The app should now be running at http://localhost:xxxx.

## Usage

The admin panel requires user authentication. Upon successful login, users are redirected to the Admin panel. Access to pages is controlled by SmartRoute components, which check the authentication status via cookies and allow or redirect as necessary.

## License

This project is open-source and available under the [MIT License](./LICENSE).

## Acknowledgments

- Special thanks to **Vercel** for providing seamless deployment solutions.
