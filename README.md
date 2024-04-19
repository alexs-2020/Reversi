# Reversi Game - Milestone 2

Welcome to the Reversi Game repository! This is Milestone 2, where we have set up the MVC (Model-View-Controller) architecture for our game.

## Getting Started

To start working with the project, follow these steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/alexs-2020/Reversi.git
   ```

2. **Install Node.js and npm:**
   Make sure you have Node.js and npm installed on your machine. If not, you can download and install them from [https://nodejs.org/](https://nodejs.org/).

3. **Install Yarn:**
   Install Yarn globally by running the following command in your terminal:
   ```
   npm install -g yarn
   ```

4. **Install Node Modules:**
   Inside the project directory, run the following command to install all necessary node modules:
   ```
   yarn install
   ```
5. **Install Node Modules:**
   Inside the project directory, run the following command to install all necessary node modules:
   ```
   yarn add all 
   ```
*** make sure to run the next part on two terminals simultaneously
## Frontend

1. ** navigating to the directory**
  ```
   cd reversi-game/frontend  
   ```
## backend
1. ** navigating to the directory**
  ```
   cd reversi-game/backend 
  ```
2. **Running the frontend code :**
   ```
(cd reversi-game/frontend  && yarn start)

   ```
2. **Running the backend code :**
   ```
(cd reversi-game/backend  && yarn start)

   ```
You have run both backend and frontend at the same 


2. **Running the code :**
   ```
   node index.js
   ```
## Code Formatting

To maintain consistent code formatting, we use Prettier. Run the following command to format the files:
   ```
   yarn prettier
   ```

## Git Commands Cheat Sheet

A quick reference for common Git commands used in everyday development.

### 1. Create and Switch to a New Branch

```bash
git checkout -b new_branch_name

```

### 2. Switch to another Branch

```bash
git checkout branch_name
```


### 3. Interactive Rebase Main

```bash
git rebase origin/main
```
### 4. Interactive Other Branch

```bash
git rebase <branch> 
```

### 5. Add Changes to Staging Area

```bash
git add filename  # for specific files
git add .         # add all changes
```

### 6. Pull from Remote Repository

```bash
git pull origin branch_name 
```
### 6. Pull from Remote main 

```bash
git pull origin main 
```

### 7. Push to Remote Repository

```bash
git push
```

## 8. Add a Remote Repository

```bash
git remote add remote_name remote_url
```

## 9. Remove a Remote Repository

```bash
git remote remove remote_name
```

## 10. Commit Changes

```bash
git commit -m "Your commit message"
```

## 11. Commit All Changes (including untracked)

```bash
git commit -am "Your commit message"
```

## 12. Stash Changes

```bash
git stash
```
## 13. Stash with message Changes

```bash
git stash -m "your stash message"
```

## 14 To view ply stashed changes:

```bash
git stash list
```
### 15 apply git stash based off the stash number 
``` bash
git stash apply <stash@{#}> 
```
Happy coding!
