--Here is my current Web 2 Project--

Running instructions:
To get this running locally, you'll need the Netlify cli:
npm install netlify-cli -g

and to start it, run:
netlify dev

and that should start the client & server

I included the .env file for this submission, specifically because it's meant to
be run locally. It should work fine, but I included the link to the live deploy
as well just in case you need it:
https://boisterous-medovik-b28e78.netlify.app/


Requirements for this submission:
- complete instructions.txt or equivalent to run the code locally
    this is here, and should be enough to get it running locally.

- implement the repository pattern to backend as well as frontent
    in progress, I'm working on refactoring right now

- get the backend running on an EC2
    the Netlify functions are set up and running, you can check the live deploy.
    However the calendar and to-do list are not editable until I get them onto a 
    database


Site description:
This is a personal digital display- like a personal home page. The home page on the site implements a weather api, the neat little NASA image api, and a login form that unlocks the today and calendar pages. The background page just has a nice wallpaper that can be used to look pretty. The today page holds a to do list and a "today's events" style calendar view. The calendar page is a very simple month-view calendar, with the ability to add and remove events.

Features implemented in this submission:
- all API calls are implemented in the backend and are working locally and on the deploy
- User authentication has been implemented, and I have a user list .json (to log in use testuser / password)
- additionally, passwords are all hashed inside the user list.
- my calendar is working, with the ability to add & remove events (locally for now)
- A proper to do list, to go along with the calendar

Features I am currently working on / not complete:
- the monthly calendar view is not dynamic, and only shows a set month. That's last on the list right now

