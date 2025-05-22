A React-based UI that displays a list of campaigns in a table format.
Each campaign should have:
Name ✅
Start & End Date ✅
Clicks ✅
Cost ✅
Revenue ✅
Profit (Revenue - Cost) ✅
Users should be able to:
Add a new campaign via a form. ✅
Delete a campaign from the list. ✅
See calculated profit per campaign dynamically. ✅
Bonus
Implement basic styling for a clean UI. ✅
Allow sorting campaigns by name, date, or profit. ✅
Persist data in local storage 👀

Well, the first thing I did was copy and paste a template folder that I use when starting a new project, since it already includes common React dependencies as well as others like Tailwind, ESLint, etc.

Starting from that base, I began laying out the form with its input fields, giving the required property to all elements. Once that was done, I continued working on the form functions, using AI in some parts to save time.

After that, I moved on to the top cards to display the total number of clicks, costs, etc.

I added a friendly message for the user in case there are no campaigns to display.

And finally, I built the dashboard to show the requested data.

"I would have liked to have more time to improve several aspects, such as better modularization, scaffolding or architecture. 😅

## Available Scripts

In the project directory, run:

### `npm install`

And now you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
