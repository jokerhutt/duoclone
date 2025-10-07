<br />

![Image](https://github.com/user-attachments/assets/4f4c682e-f350-4e2c-8839-4bc75ff858f7)

<p align="center">
  Duolingo clone built with ReactJS, Typescript, Tailwind CSS, and Java Spring boot on the backend.
</p>

## Preview 🎬

https://github.com/user-attachments/assets/a8027165-e932-4d14-a1b0-4be864bd2ee3

## Setup and Installation

1. Clone the project using `git clone <https://github.com/jokerhutt/duoclone.git`>
2. Run `npm i`
3. Fill the src/constants/env.ts directory with your backend api path and google client id
4. Adjust the src/constants/paths.ts API paths as needed
5. Run `npm run dev`

## Features

- Courses, Sections, and Units
- Google OAuth
- Caching with Tanstack Query
- Fill in the blank exercises
- Translate the sentence exercises
- Leaderboards
- Lesson Accuracy
- Scroll to current lesson button
- Popovers and Modals
- Skipping lessons
- Profiles and Avatars
- Follow System
- Streaks
- Daily Quests & Monthly Challenges

## Technologies Used

- React
- Typescript
- TailwindCSS
- Tanstack Query
- Framer Motion
- Spring Boot (backend)
- MySQL (database)

## Structure and Notes

### **Content Hierarchy**
Course → Section → Unit → Lesson → Exercise

### **Mutations (POST REQUESTS)**

Mutations can be found under src/queries/mutations

**There are 4 main mutations:**
| Mutation | Hook |
| ----------- | ----------- |
| Submitting an exercise attempt | useSubmitExercise |
| Submitting a lesson completion | useLessonComplete |
| Changing course | useChangeCourse |
| Follow / Unfollow | useFollowUser |

