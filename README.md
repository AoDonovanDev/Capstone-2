# Soundrake

### Rate and review music. Listen to your favorite tracks and discover new tunes.
## Soundrake is live @ https://soundrake-fe.vercel.app/  
Feel free to take the app for a spin with username: testuser, password: password. Or sign up and create your own profile!


Full Stack used:  
- PostgreSQL hosted on ElephantSQL  
- Node/Express server hosted on Render. This API handles all Spotify API endpoints and DB queries. DB is managed with Sequelize ORM.  
- Next.js/React front-end. Serves UI and makes requests to dedicated backend. Soundrake takes full advantage of some of the newer features of Next.js, such as server actions and form actions.  
- Styling and layout is accomplished with Tailwind and DaisyUI plugin.

Features:  
  - Authentication secured with bcrypt and JWT  
  - Search tracks, artists, or albums  
  - View album and artist detail pages  
  - Like, rate, and/or review any track, artist, or album  
  - Reviews are aggregated to show an average user score  
  - 'Reviews' tab on your dashboard presents all of your reviews along with an 'Update' button if you want to change star rating or add some thoughts.  
  
Planned Feature:  
  - If you have a Spotify premium account, you are also able to play tracks by clicking the 'Enable Player' button.  
  This app is in development mode and access to this feature is currently limited. A request has been made to extend this feature to all users with Spotify, and is currently under review.


I felt these were the most important features to communicate the idea of the project.

## Running this project locally  
You can also start this repo in a local environment if you wish. 
1. Clone the repository into your machine.
2. `npm install` in the repository root directory.
3. Create a `.env` file and set a environment variable called `BASE_URL` to `https://soundrake-api.onrender.com` in it. 
4. Specify the port for the NextJS project as `3001`.  
*step 4 is required to use the 'Enable Player' feature, it can be skipped.*  
5. `npm run dev`  




🎉 Backend API now has 100% up time 🥳
You can view the backend API here -> https://github.com/AoDonovanDev/Capstone-2-be  
Spotify Web Api docs -> https://developer.spotify.com/documentation/web-api  


