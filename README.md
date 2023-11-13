# Snackbar Stack Component

## Demo

https://stacked-snackbar.vercel.app/

## Overview

This project introduces the `Snackbar Stack` component, designed to enhance user interfaces with an efficient and visually appealing notification system. Integrating seamlessly with React-based projects, it utilizes MUI (Material-UI) Snackbar to provide a consistent and accessible user experience.

## Features

### Stacked Notifications

The component enables multiple snackbars to stack, offering an organized way to display multiple notifications.

### Interactivity

-   **Visibility:** Users can view hidden Snackbar instances by clicking a button or hovering over the stack.
-   **Focus Management:** Snackbars stay open while focused and collapse when focus is moved away.
-   **Close Button:** Each snackbar includes a close button for manual dismissal.
-   **Auto-hide (Optional):** Snackbars can be configured to automatically close after a set duration, compliant with [WCAG 2.2.1](https://www.w3.org/TR/WCAG21/#enough-time).

### Transitions

Snackbars appear and disappear with graceful animations, enhancing the visual experience.

### Dark Mode Support

The component is designed to support both light and dark modes, adapting to the user's preference or system settings.

## Getting Started

To get started with the Snackbar Stack component:

1. **Clone the repository:**

`git clone <repository-url>`

2. **Install dependencies:**

`yarn`

3. **Start the development server:**

-   For a development environment:
    ```
    yarn dev
    ```
-   For a production build:
    ```
    yarn build
    ```
-   To start the production server:
    ```
    yarn start
    ```

4. **Open the application:**
   Visit `http://localhost:3000` in your browser.

## Bugs and future fixes

Currently there is an ongoing bug with the position of the parent of the snackbars which obstructs the transition. Contributions and suggestions are welcome.

Thank you for being a part of this project!

