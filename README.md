--Here is my current Web 2 Project--

I have this updated for the local submission as well as the database assignment.

local running instructions:
To get this running locally, you'll need the Netlify cli:
npm install netlify-cli -g

and to start it, run:
netlify dev

and that should start the client & server

I also included the .env file for the local submission, though this is running remotely now.


Requirements for local submission:
- complete instructions.txt or equivalent to run the code locally
    this is here, and should be enough to get it running locally.

- implement the repository pattern to backend as well as frontent
    I think I have the pattern down well enough, with the requirements I
    have to follow for Netlify. Correct me if I've got anything wrong though

- get the backend running on an EC2
    the Netlify functions are set up and running, you can check the live deploy.
    However the calendar and to-do list are not editable until I get them onto a 
    database


Database submission:


Here is the remote deploy
https://boisterous-medovik-b28e78.netlify.app/


Site description:
This is a personal digital display- like a personal home page. The home page on the site implements a weather api, the neat little NASA image api, and a login form that unlocks the today and calendar pages. The background page just has a nice wallpaper that can be used to look pretty. The today page holds a to do list and a "today's events" style calendar view. The calendar page is a very simple month-view calendar, with the ability to add and remove events.

Features implemented in this submission:
- all API calls are implemented in the backend and are working locally and on the deploy
- User authentication has been implemented, and I have a user list .json (to log
    in use testuser / password)
- my calendar is working and dynamic to the current date, with the ability to add
    & remove events (locally till we add database)
- A proper to do list, to go along with the calendar
- Today's events view in the Today page, pulling from the monthly calendar. Add
    an event there and it will show on this view as well
- Database access has been implemented, I am using a postgres server through Supabase (they have a really nice free tier)

