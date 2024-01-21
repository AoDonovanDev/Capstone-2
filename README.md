# Soundrake

## a Next.js app that allows users to search Spotify to like, rate, and review music. 


Full Stack used:  
-PostgreSQL hosted on ElephantSQL  
-Node/Express server hosted on Render. This API handles all Spotify API endpoints and DB queries. DB is managed with Sequelize ORM.  
-Next.js/React front-end. Serves UI and makes requests to dedicated backend. Soundrake takes full advantage of some of the newer features of Next.js, such as server actions and form actions.  
-Styling and layout is accomplished with Tailwind and DaisyUI plugin.

Features:  
  -Authentication secured with bcrypt and JWT  
  -Search tracks, artists, or albums  
  -View album and artist detail pages  
  -Like, rate, and/or review any track, artist, or album  
  -Reviews are aggregated to show an average user score  
  -'Reviews' tab on your dashboard presents all of your reviews along with an 'Update' button if you want to change star rating or add some thoughts.  
  -If you have a Spotify premium account, you are also able to play tracks by clicking the 'Enable Player' button.  


I felt these were the most important features to communicate the idea of the project.


**PLEASE NOTE**  
The backend API is running on a free tier Render instance, and as such spins down with inactivity.  
If logging in or signing up does not appear to be working, simply wait 2 minutes and try again.  
In this case, your original request restarted the API and you will be able to use it shortly.  
Of course this is not ideal, but it is a personal project and it doesn't make sense to spend any additional money on it at this time.
Future versions may be upgraded to paid tier instance to eliminate this issue. TBD.  
## Soundrake is live @ https://soundrake-fe.vercel.app/  
You can view the backend API here -> https://github.com/AoDonovanDev/Capstone-2-be  
Spotify Web Api docs -> https://developer.spotify.com/documentation/web-api  


