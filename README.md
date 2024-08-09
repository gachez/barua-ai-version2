# Barua AI

Welcome to the **Barua AI** repository! This is the frontend codebase for the Barua AI application, a powerful tool for generating AI-driven sales emails, DMs, and personalized messages that convert. Built with Next.js, this project is designed to offer a seamless user experience, allowing users to interact with our AI and manage their outreach campaigns effectively.

![Deepgram Image](https://deepgram.com/_next/image?url=https%3A%2F%2Fv1.whalesyncusercontent.com%2Fv1%2F054166ee54f426e9cd3e081e%2F05e3eabfffb2b8e543b01ca3%2Fe2deda43ebf3826118325a3b%2F2a32ea36-bae1-4ac9-97d8-8a239d01746a.jpeg&w=828&q=75)


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)


## Features

- **AI-Powered Email & DM Generation**: Easily generate personalized emails and messages using our advanced AI by providing simple inputs.
- **User-Friendly Interface**: Intuitive and easy-to-navigate UI built with Next.js.
- **Save & Manage Content**: Save generated emails, offers, and prospect lists for future use.
- **Fine-Tuning**: Edit and refine generated content to match your brand’s voice.
- **Quick Access**: Load saved offers and prospect lists for faster message generation.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v12.x or later)
- **npm** (v6.x or later) or **yarn** (v1.x or later)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/barua-ai-frontend.git
   cd barua-ai-frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   Or if you prefer yarn:

   ```bash
   yarn install
   ```

### Configuration

Before running the application, you'll need to configure the connection to the Barua AI API.

1. **API Configuration:**

   The configuration file is located at `src/config.js`. You will need to update this file with the correct API base URL.

   ```javascript
   // src/config.js
   const config = {
     API_BASE_URL: <API URL>
   };

   export default config;
   ```

   Replace the `API_BASE_URL` value with the correct URL to connect to the Barua AI API.

## Running the Application

### Development

To run the application in development mode, use:

```bash
npm run dev
```

This will start a development server at `http://localhost:3000`. The application will automatically reload if you make changes to the code.

### Production

To build the application for production, run:

```bash
npm run build
```

Once the build is complete, you can start the server with:

```bash
npm start
```

This will start the application on the production server.

## Contributing

We welcome contributions from the community! To contribute, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Clone Your Fork**: Clone the forked repository to your local machine.
   ```bash
   git clone https://github.com/yourusername/barua-ai-frontend.git
   ```
3. **Create a New Branch**: Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make Your Changes**: Implement your feature or bug fix.
5. **Commit Your Changes**: Commit your changes with a clear message.
   ```bash
   git commit -m "Add new feature XYZ"
   ```
6. **Push to Your Fork**: Push your changes to your forked repository.
   ```bash
   git push origin my-feature-branch
   ```
7. **Open a Pull Request**: Go to the original repository and open a Pull Request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for your interest in contributing to Barua AI Frontend! We’re excited to work together and improve our application.

