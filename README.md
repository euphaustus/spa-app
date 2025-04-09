--Here is my current Web 2 Project--

Running instructions:
To get this running locally, you'll need the Netlify cli:
npm install netlify-cli -g

and to start it, run:
netlify dev

and that should start the client & server


Requirements for this submission:
- complete instructions.txt or equivalent to run the code locally
    this is here, and should be enough to get it running locally.

- implement the repository pattern to backend as well as frontent
    in progress, I'm working on refactoring right now

- get the backend running on an EC2
    the Netlify functions are set up and running, you can check the live deploy at
    https://boisterous-medovik-b28e78.netlify.app/
    though there will be a couple of discrepencies until I get it hooked up to a database


Site description:
This is a personal digital display- like a personal home page. The home page on the site implements a weather api, the neat little NASA image api, and a login form that unlocks the today and calendar pages. The background page just has a nice wallpaper that can be used to look pretty. The today page holds a to do list and a "today's events" style calendar view. The calendar page is a very simple month-view calendar, with the ability to add and remove events.

Features implemented in this submission:
- all API calls are implemented in the backend and are working locally and on the deploy
- User authentication has been implemented, and I have a user list .json (to log in use testuser / password to view all pages)
- my calendar is working, with the ability to add & remove events (locally)

Features I am currently working on:
- my "today" page with the to-do list & a today calendar display
- the monthly calendar view is not dynamic, and only shows a set month. That's last on the list right now

