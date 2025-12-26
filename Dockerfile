FROM node:20-alpine
#Alpine is a very lightweight Linux distribution. I used it because it’s small in size,
#which makes the Docker image smaller and faster to build and deploy.
#It's also more secure and efficient for running applications like Node.js


WORKDIR /app

COPY package*.json ./
RUN npm install
#package.json contains all the dependencies and scripts for the project,
#while package-lock.json locks the exact versions of the dependencies.
#I included them in the Dockerfile to ensure that the application has all the required libraries and versions installed correctly,
#and to speed up the build process by caching the installation step."

COPY . .
#This command copies all files and folders from my local project (the directory where your Dockerfile is)
#into the current working directory inside the container (/app in this case) line 3.



# Here we define the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Dockerfile.
# The values for these variables are passed through Docker Compose during the build process and container runtime...

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
#ARG DEFINES build-time variables, like `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
#ENV sets these variables as environment variables inside the container so the app can use them (e.g., for connecting to Supabase).




RUN npm run build
# Build the production version of the application


EXPOSE 3000
# The port 3000 is what the app uses.


CMD ["npm", "start"]
# Set the default command to start the application