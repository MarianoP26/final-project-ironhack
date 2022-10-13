
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

## Day 5(monday the tenth)
Created searchbar filter in filter section.  
Searchbar works alongside other active filters.  
Improved UI,UX in filter component.  
Fixed all known issues regarding filters.  
Refactor code @Navbar:  
.-> Improved responsiveness  
.-> Added burger menu  
.-> Added emits  
Refactor @Home now toggles between Tasks / Stats views.  
Created UserStats component mounted @Home.  

## Day 6:
- Deploy to Vercel.  
- Style only layout UserStats Component.  
- Apply logic to UserStats.  
- Refactor @Home due to new logic coming from @UserStats.  
- Refactor @Navbar due to new logic coming from @UserStats.  
- Changed almost all placeholder icons to the build version icons instead.  
- @UserStats redirects to @Home with filters applied based on stat clicked to show @TaskItems meeting the criteria.  
- Added new filters @UserStats.  

## Day 7:
- Changed placeholders icons / text styles to build version ones.  
- Improved general responsiveness in almost all components.  
- Changed backgrounds images and stylings.  
- Basically, improved in general the UI/UX.  
- Signout logic.  

## Day 8:
- Body background image now tileable.  
- Minor fixes @Navbar on responsiveness.  
- Now when entering editMode will scroll into view to @NewTask and put focus on input.  
- @NewTask component now also shows @TaskItem component when editMode is active.  
- Minor tweaks to styles @NewTask @TaskItem to improve UX.  
- Refactor onUpdate methods to watch methods to improve performance and clean code.  

## Ending plans  
- Add Logo Title @Signin & @Signup.  
- Create Tooltip component.  
- @TaskItem if timestamp = (0 minutes ago) then > "Just now" || "Less than a minute".  
- If tasks is empty then show text to user > "Currently you have no tasks".  
- Switch checkbox @NewTask to a padlock icon.  
