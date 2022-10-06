
## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project
```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY 
```
#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```
## Day 1
Applied CSS to SignIn & SignUp components with some transitions.
Created a placeholder navbar & footer.
Created the main layout for the Home page.
Completed the task.js store to have all the functionalities ready to be used.
Added NewTask component to the Home page with its styles and logic fully working.
## Day 2
Added Delete logic and its styles.
Also added a functionality to confirm the delete action before actually deleting.
Added ToggleComplete logic and its styles.
Ended the CRUD functionality with some bugs in Edit mode.
## Day 3
Fixed the Edit mode bug (before 9:00 am).
Plan for today:
  · Change taskitem size to be able to show more of them (including responsiveness)
  · Refactor Home component:
    - Create a filter to show/hide tasks based on if its completed.
    - Create a sorter to sort tasks ascending/descending based on its tamestamp
  · Change how the timestamp value is shown with de idea to show how many minutes/hours/days passed since the creation of the task.
  · Upon task completion, show how many minutes/hours/days took to complete it since its creation.
  · If free time: Polish styles.
