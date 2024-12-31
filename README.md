
# Google Map integration

This project demanded to make a website which will have the following things:

1.Popup if location is turned off\
2.Use Google map api to store the address through input or markup\
3.Manually Adding address & selecting the type of the address

# What I was able to complete

1.Popup if location is turned off\
2.Signin & Signup option which is fully functional

# Issue I Faced
1.failed to integrate google maps api\
Reason: Firstly API KEY was not working after then again rewritten code to fix everything created billing account etc. but again didn't work as the backend is not able to verify cookie

# Process to run locally
First clone the repo locally by forking

1. There are 2 folders:
frontend\
backend


cd mapIntegration\
For frontend do the following\
cd frontend\
npm init\
npm run dev\

For backend do the following\
cd backend\
npm init\
nodemon server.js

.env of backend\
PORT = 8282\
GOOGLE_MAPS_API= "AIzaSyCLZfdmb3MOzIpVNfE-cIaXDQ-SxKM-Uh8"\
JWT_SECRET = "Secret"\
NODE_ENV= "development"\
DATABASE_URL="postgresql://postgres:Messi10@localhost:5432/Google_Maps_API?schema=public"

.env of frontend\
VITE_BASE_URL = http://localhost:8282