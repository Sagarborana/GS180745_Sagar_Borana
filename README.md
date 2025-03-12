GSynergy Frontend Challenge

## 🚀 Project Overview
This project is a Progressive Web App (PWA) built with **React, TypeScript, AG-Grid, and Redux**. It allows users to manage Stores and SKUs, plan sales data, and visualize data using charts.

## 🛠️ Features Implemented
### ✅ Core Features
- **Store Management:** Add, remove, and update stores with persistent data.
- **SKU Management:** Add, remove, and update SKUs, including price and cost.
- **Planning Page:**
  - Displays a cross-join of Stores & SKUs along rows and Calendar Weeks along columns.
  - Supports editable **Sales Units** and calculated fields for **Sales Dollars, GM Dollars, and GM %**.
  - **Conditional formatting** applied based on GM %.
- **Charts Page:** Displays **GM Dollars & GM %** using a dual-axis bar chart.
- **Routing:** Implemented using `react-router-dom`.
- **State Management:** Fully integrated with **Redux** for persistence.
- **CI/CD:** GitHub Actions workflow for automated testing and deployment.
- **Authentication:** Basic authentication with dummy credentials.

## 🏃‍♂️ Running the Project

### Installation
```sh
# Clone the repository
git clone https://github.com/Sagarborana/GS180745_Sagar_Borana.git
cd GS180745_Sagar_Borana

# Install dependencies
npm install  # or yarn install
```

### Running Locally
```sh
npm run dev  # or yarn dev
```
Visit **http://localhost:5173** in your browser.


## 🚀 Deployment
This project is deployed on **Github Pages**.

**Live URL:** [https://sagarborana.github.io/GS180745_Sagar_Borana](https://sagarborana.github.io/GS180745_Sagar_Borana)

### CI/CD Pipeline
A GitHub Actions workflow is set up to:
- **Run tests and build the project** on every push to `main`.
- **Automatically deploy to Github Pages** after a successful build.

## ✅ Things Done Well
### 1️⃣ **Efficient State Management**
- Used **Redux Toolkit** to manage state across multiple pages efficiently.
- Ensured **persistence** of SKU and Store data, reflecting changes across pages.

### 2️⃣ **Optimized AG-Grid Usage**
- Implemented **auto-sizing** for better UI.
- Applied **conditional formatting** to highlight GM % values.

### 3️⃣ **Responsive & Performant UI**
- Used **Tailwind CSS** for styling.
- Ensured **grid and charts** fit well within the layout.

### 4️⃣ **Automated CI/CD Pipeline**
- Integrated GitHub Actions for **automated testing & Netlify deployment**.

## ⏳ Future Improvements (If Given More Time)
### 🛠️ **Enhancements & Improvements**

1. **Improve Authentication:** Implement JWT-based authentication for better security.
2. **Automated Tests:** Increase Jest & React Testing Library coverage to ensure reliability..
3. **Data Import Feature:** Allow bulk import of sample data.
4. **Enhanced UI/UX:** Improve animations, transitions, and accessibility.


