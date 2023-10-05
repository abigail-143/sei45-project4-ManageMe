<a name="readme-top"></a>
<h1 align="center">ManageMe</h1>

## Table of Contents
1. [Introduction](#intro)
2. [The Platform](#platform)
3. [How to use](#use)
4. [Languages & Technology & Packages & Frameworks](#languages)
5. [Resources & References](#resources)

***
<a name="intro"></a>
## Introduction

ManageMe is a supply chain inspired app. It allows users to track products in a warehouse and in store locations. It also allows users to raise and track purchase orders and delivery orders. The app allows 2 types of roles. Manager roles and Staff role.

Managers will be allowed to add products to the inventory, track warehouse and store products, raise purchase orders and delivery orders.

Staffs will only be allowed to raise delivery orders and track store products.

Planned vision. 
[wireframe](https://www.figma.com/file/NWM3WYLjabemQoPtnqAN8K/Project-4?type=design&node-id=0-1&mode=design&t=39kbaRwaSjQICmmH-0)

Planned ERD. 
[database plans](https://drawsql.app/teams/practice-26/diagrams/project4)

***
<a name="platform"></a>
## The Platform

### Dashboard
<img width="1678" alt="Screenshot 2023-09-15 at 13 24 23" src="https://github.com/abigail-143/sei45-project4/assets/106907059/4ffdf403-1542-4017-bcc7-bcb81bcf1678">

Users can login with their username and password, which will bring them into the site. They will automatically be lead to either the Manager site or Staff site base on their login credentials.

### Manager Site Dashboard
<img width="1678" alt="Screenshot 2023-09-15 at 13 24 39" src="https://github.com/abigail-143/sei45-project4/assets/106907059/769bbe3d-e321-426c-9f84-3068305b5abc">

Manager roles will have data on purchase orders, delivery orders, warehouse stock levels and store stock levels on their dashboard. They can click into the delivery orders or purchase orders to take a closer look at the order details.

### Add Product
<img width="1678" alt="Screenshot 2023-09-15 at 13 24 55" src="https://github.com/abigail-143/sei45-project4/assets/106907059/2547bdc3-2575-401f-9e96-a88ac709e213">

Only Manager roles users will have the ability to add new products to the database.

### Stock Levels
<img width="1678" alt="Screenshot 2023-09-15 at 13 30 33" src="https://github.com/abigail-143/sei45-project4/assets/106907059/241027af-6480-4ebf-9b01-90f0b69cb9ea">
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 05" src="https://github.com/abigail-143/sei45-project4/assets/106907059/2ecc027c-d303-4dbd-b32e-66f665bf2db3">

Managers will be able to track basic datasets in graph forms.

### Store Deliveries
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 12" src="https://github.com/abigail-143/sei45-project4/assets/106907059/f5432ca8-2990-4046-9c48-413c3239fc1c">
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 42" src="https://github.com/abigail-143/sei45-project4/assets/106907059/6bab19c3-924c-4a5a-9a3e-273d6cda9050">
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 58" src="https://github.com/abigail-143/sei45-project4/assets/106907059/8277c3d1-7d3f-4262-83d7-c56dab9641db">

Managers can create new store deliveires which can consists of multiple product items. By default, the delivery date will be set as 2 days after the date of order placed (current date). The user can edit the date of delivery to their desired date. Managers can also mark a delivery order as complete which will amend the store product stock level automatically.

### Warehouse Purchase Orders
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 18" src="https://github.com/abigail-143/sei45-project4/assets/106907059/1b19df4b-d7ff-410b-a058-e2801adf11a4">
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 31" src="https://github.com/abigail-143/sei45-project4/assets/106907059/f0eca483-ad85-495f-b89d-46d64eff9b76">
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 49" src="https://github.com/abigail-143/sei45-project4/assets/106907059/d1fd4d4a-0790-4c01-b96b-267d1135e925">

Managers can raise purchase orders for individual items as well. They can also mark the purchase order as complete which will amend the warehouse stock level automatically.

### Register User
<img width="1678" alt="Screenshot 2023-09-15 at 13 25 25" src="https://github.com/abigail-143/sei45-project4/assets/106907059/3c1ac8a5-4b78-45ef-992a-a2fb19e400bf">

Managers will also have the access to add new users, with either a role of Staff or Manager. By default, the role will be a Staff.

### Staff Site
<img width="1678" alt="Screenshot 2023-09-15 at 13 26 15" src="https://github.com/abigail-143/sei45-project4/assets/106907059/3982aa14-e216-49c7-b6be-6c3eda2c29c7">

Staff sites essentailly will only have access to store details and delivery orders.



***
<a name="use"></a>
## How to Use / View
1. Download frontend folder, backend folder and .gitignore
2. Add individual .env files to both frontend folder and backend folder
3. .env file for frontend folder should include:
   >
   > VITE_SERVER=http://localhost:[port]
5. .env file for backend folder should include:
   >
   > PORT=[port]
   > 
   > DATABASE=postgres://127.0.0.1:5432/[database]
   >
   >USER=db_user
   >
   >PASSWORD=example
   >
   > ACCESS_SECRET=[any alphanumerical string]
7. npm install then npm run dev for both frontend and backend folders.
8. create psql database
   >
   > psql in terminal
   >
   > create a database
   >> CREATE DATABASE [name]
   >> \c [name]
   >
   > seed tables and contents using the sql file in the backend folder
   >> \i database.sql
***
<a name="languages"></a>
## Languages & Technology & Packages & Frameworks
- HTML
- CSS
- Typescript
- React (VITE)
- Express
- Postgresql

***
<a name="resources"></a>
## Resources & References

- [https://www.postgresql.org/docs/current/dml-returning.html](https://www.postgresql.org/docs/current/dml-returning.html)
- [https://www.geeksforgeeks.org/how-to-update-multiple-columns-in-single-update-statement-in-sql/](https://www.geeksforgeeks.org/how-to-update-multiple-columns-in-single-update-statement-in-sql/)
- [https://stackoverflow.com/questions/23568977/date-trunc-by-month-postgresql](https://stackoverflow.com/questions/23568977/date-trunc-by-month-postgresql)
- [https://stackoverflow.com/questions/14667713/how-to-convert-a-string-to-number-in-typescript](https://stackoverflow.com/questions/14667713/how-to-convert-a-string-to-number-in-typescript)
- [https://bobbyhadz.com/blog/typescript-convert-string-to-date](https://bobbyhadz.com/blog/typescript-convert-string-to-date)
- [https://dirask.com/posts/TypeScript-compare-two-dates-1yKeMp](https://dirask.com/posts/TypeScript-compare-two-dates-1yKeMp)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
- [https://stackoverflow.com/questions/3818193/how-to-add-number-of-days-to-todays-date](https://stackoverflow.com/questions/3818193/how-to-add-number-of-days-to-todays-date)
- [https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-date_trunc/](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-date_trunc/)
- [https://css-tricks.com/the-checkbox-hack/](https://css-tricks.com/the-checkbox-hack/)
- [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text/Wrapping_breaking_text](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text/Wrapping_breaking_text)
- [https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight](https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight)
- [https://www.youtube.com/watch?v=RF57yDglDfE](https://www.youtube.com/watch?v=RF57yDglDfE)
- [https://www.youtube.com/watch?v=Kusjm26vYc0](https://www.youtube.com/watch?v=Kusjm26vYc0)
- [https://stackoverflow.com/questions/53872165/cant-resize-react-chartjs-2-doughnut-chart](https://stackoverflow.com/questions/53872165/cant-resize-react-chartjs-2-doughnut-chart)
- [https://react-chartjs-2.js.org/examples/vertical-bar-chart](https://react-chartjs-2.js.org/examples/vertical-bar-chart)
- [https://react-chartjs-2.js.org/examples/line-chart/](https://react-chartjs-2.js.org/examples/line-chart/)
- [https://www.digitalocean.com/community/tutorials/css-root-pseudo-class](https://www.digitalocean.com/community/tutorials/css-root-pseudo-class)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
