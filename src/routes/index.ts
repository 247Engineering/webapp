export const AUTH = {
  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",
};

export const PLAY = {
  GET_STARTED: "/get-started",
  HURRAY: "/hurray",
  PLAY_GAME: "/play",
  PICK_GAME: "/pick-game",
  START_GAME: "/game/start",
  START_GAME_GUEST: "/game/start?player=participant",
  BEGIN_GAME_FOR: (gameTitle: string, gameSession: string) =>
    `/${gameTitle}/game/${gameSession}`,
  LEADERBOARD: "/:gameTitle/game/:gameSession/leaderboard",
  LEADERBOARD_FOR: (gameTitle: string, gameSession: string) =>
    `/${gameTitle}/game/${gameSession}/leaderboard`,
  JOIN_GAME: "/join",
};

export const DASHBOARD = {
  PROFILE: "/profile",
};

export const SCRAMBLED_WORDS = {
  CATEGORY: "/scrambled-words/category",
  DIFFICULTY: "/scrambled-words/difficulty",
  CREATE_GAME: "/scrambled-words/create-game",
  NEW_GAME: "/scrambled-words/new-game",
  CREATE_QUESTIONS: "/scrambled-words/create-questions",
  GAME: "/scrambled-words/game/:gameSession",
};
