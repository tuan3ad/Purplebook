Purple Book Sportsbook v2

What it does
- FanDuel-style multi-page sportsbook
- Dark purple luxury palette
- Name + PIN login
- First login prompts each user to set their own numeric PIN
- Admin page with PIN 7651
- Command center for JSON updates from screenshots
- Manual Win / Loss / Void / Push buttons
- Week and season boards with lots of legs
- Private pending bets per user on the same browser/device

Important limitation
- This version stores data in browser localStorage
- It is great for testing, commissioner control, and local use
- It is not a shared live backend across devices yet

Workflow
1. You send screenshots of stats
2. ChatGPT sends JSON commands
3. Paste them into Admin > Command Center
4. The board updates with new weekly/season legs
