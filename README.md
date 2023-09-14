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

[wireframe](https://www.figma.com/file/NWM3WYLjabemQoPtnqAN8K/Project-4?type=design&node-id=0-1&mode=design&t=39kbaRwaSjQICmmH-0)
[database plans](https://drawsql.app/teams/practice-26/diagrams/project4)

A supply chain inventory management app.

***
<a name="platform"></a>
## The Platform

show platform

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
