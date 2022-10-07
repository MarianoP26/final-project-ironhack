
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
Changed taskitem size to be able to show more of them (including responsiveness)  
Change how the timestamp value is shown with de idea to show how many days/hours/minutes passed since the creation of the task.  
Polished some styles.  
Changed navbar and home backgrounds

## Day 4
Created a FilterPanel Component. Current capabilities:  
  · Sort based on complete / no complete.  
  · Sort based on private / public.   
  · Sort based on time descending / ascending.  
  . Sort based on title A - Z / Z - A
  · All the above can be active at the same time (some bugs to be fixed tho gimme time).  
Refactored some come in Home component due to new logic incorporated from the filters.  
Added icons, mostly placeholders, for each filter (off, desc, asc).  
Gave some layout css to these filters (shitty atm).  

## Day 5, 6 & 7 (saturday, sunday, monday)
If a plan has "(?)" at the end of it means those are ideas and im not sure if i will end up doing it.
Plan for day 5, 6 & 7:  
  · Upon task completion, show how many minutes/hours/days took to complete it since its creation.(new column on db).    
  · Add searchbar filter in filter section.  
  · Fix all issues regarding filters.  
  · Style the shit out of those filters.  
  · Create UserPanel component.  
  · Show data from that particular User in the UserPanel as follows:  
    · Total tasks created (including deleted).  
    · Total tasks.  
    · Total tasks completed.    
    · Total tasks pending.  
    · Max time a task has been pending.  
    · Min time a task has been pending.  
    · Average time to complete a task.(?)    
    · Total task public.  
    · Total task private.  
  · Add a signout link in the UserPanel.  

## Future: TODO
  - Ability to be able to see other user tasks (only public ones).  
  - Ability to be able to see other user panels and look at their stats.  
  - Add timer to a task (?).  
    · Add in UserPanel total succeded tasks (before timer) and total failed tasks (timer ran out).(?)  
  - Add priorities to a task and be able to sort based on it (?).  