const { gql } = require('apollo-server')

module.exports = gql`
  interface User {
    id: ID!
    email: Email!
    name: String!
    isAdmin: Boolean!
  }

  interface Leaderboard {
    id: ID!
    athletes: [Athlete]
    category: String
    competition: Competition
    division: LEADERBOARD_DIVISION
    gender: ATHLETE_GENDER
    locked: Boolean
    name: String
    slug: String
    workouts: [Workout]
  }

  input CreateAthleteInput {
    box: String!
    dateOfBirth: Date!
    email: Email!
    gender: ATHLETE_GENDER!
    name: String!
    password: String!
  }

  input CreateScoreInput {
    athlete: ID!
    value: Float
    workout: ID!
  }

  input QueryWhereInput {
    id: ID
    slug: String
  }

  input UpdateProfileInput {
    box: String
    name: String
    size: ATHLETE_SIZE
  }

  input UpdateScoreInput {
    score: ID!
    value: Float
  }

  scalar Date
  scalar Email

  union Me = Athlete | Admin

  type Admin implements User {
    id: ID!
    email: Email!
    isAdmin: Boolean!
    name: String!
  }

  type Athlete implements User {
    id: ID!
    age: Int
    box: String
    dateOfBirth: Date
    email: Email!
    finalsLeaderboards: [FinalsLeaderboard]
    gender: ATHLETE_GENDER
    isAdmin: Boolean!
    name: String!
    qualifiersLeaderboards: [QualifiersLeaderboard]
    scores: [Score]
    size: ATHLETE_SIZE
  }

  type ScoreboardAthlete {
    box: String
    name: String
    rank: Int
    scores: [Score]
    total: Int
  }

  type Competition {
    id: ID!
    finalsDate: Date
    finalsLeaderboards: [FinalsLeaderboard]
    name: String
    qualifiersEndDate: Date
    qualifiersLeaderboards: [QualifiersLeaderboard]
    qualifiersStartDate: Date
    registrationEndDate: Date
    registrationStartDate: Date
    slug: String
    venue: Venue
  }

  type FinalsLeaderboard implements Leaderboard {
    id: ID!
    athletes: [Athlete]
    category: String
    competition: Competition
    division: LEADERBOARD_DIVISION
    gender: ATHLETE_GENDER
    locked: Boolean
    name: String
    qualifiedAthletes: [Athlete]
    slug: String
    workouts: [Workout]
    meta: FinalsLeaderboardMeta
  }

  type FinalsLeaderboardMeta {
    athletesCount: Int!
    qualifiedAthletesCount: Int!
  }

  type Order {
    id: ID!
  }

  type QualifiersLeaderboard implements Leaderboard {
    id: ID!
    athletes: [Athlete]
    category: String
    competition: Competition
    division: LEADERBOARD_DIVISION
    gender: ATHLETE_GENDER
    locked: Boolean
    name: String
    slug: String
    workouts: [Workout]
    meta: QualifiersLeaderboardMeta
  }

  type QualifiersLeaderboardMeta {
    athletesCount: Int!
  }

  type Score {
    id: ID!
    athlete: Athlete
    rank: Int
    value: Float
    workout: Workout
    meta: ScoreMeta!
  }

  type ScoreMeta {
    createdAt: Date
    updatedAt: Date
  }

  type Scoreboard {
    athletes: [ScoreboardAthlete]
    workouts: [Workout]
  }

  type Venue {
    id: ID!
    address: String
    latitude: String
    longitude: String
    name: String
  }

  type Workout {
    id: ID!
    description: String
    standards: String
    name: String
    scores(sort: SCORES_SORT, dir: SORT_DIR): [Score]
    type: WORKOUT_TYPE
  }

  type AuthToken {
    token: String!
  }

  type ForgotPasswordPayload {
    id: ID!
  }

  type Query {
    athletes(limit: Int, offset: Int): [Athlete]
    athlete(id: ID!): Athlete
    competitions(limit: Int, offset: Int): [Competition]
    competition(where: QueryWhereInput!): Competition
    getRelevantFinalsLeaderboards(competitionId: ID!): [FinalsLeaderboard]
    getRelevantQualifiersLeaderboard(
      competitionId: ID!
      division: LEADERBOARD_DIVISION!
    ): QualifiersLeaderboard
    competitionQualifiersLeaderboards(
      competitionId: ID!
    ): [QualifiersLeaderboard]
    competitionFinalsLeaderboards(competitionId: ID!): [FinalsLeaderboard]
    me: Me!
    getQualifiersLeaderboardScoreboard(leaderboardId: ID!): Scoreboard
    scores(workoutId: ID!, sort: SCORES_SORT, dir: SORT_DIR): [Score]
    venues(limit: Int, offset: Int): [Venue]
    venue(id: ID!): Venue
    workouts(leaderboardId: ID!): [Workout]
    workout(id: ID!): Workout
  }

  type Mutation {
    addAthletesToFinalsLeaderboard(
      leaderboardId: ID!
      athletes: [ID!]
    ): FinalsLeaderboard
    authenticateAdmin(email: Email!, password: String!): AuthToken!
    authenticateAthlete(email: Email!, password: String!): AuthToken!
    createAthleteAccount(athlete: CreateAthleteInput!): Athlete!
    createWorkoutScore(score: CreateScoreInput!): Score!
    forgotPassword(email: Email!): ForgotPasswordPayload!
    lockCompetitionQualifiersLeaderboards(
      competitionId: ID!
    ): [QualifiersLeaderboard]!
    resetPassword(password: String!, token: String!): ForgotPasswordPayload!
    unlockCompetitionQualifiersLeaderboards(
      competitionId: ID!
    ): [QualifiersLeaderboard]!
    updateAthleteProfile(athleteId: ID!, profile: UpdateProfileInput!): Athlete!
    updateWorkoutScore(score: UpdateScoreInput!): Score!
  }

  enum LEADERBOARD_DIVISION {
    rx
    scaled
  }

  enum ATHLETE_GENDER {
    female
    male
  }

  enum ATHLETE_SIZE {
    xs
    small
    medium
    large
    xl
    xxl
  }

  enum WORKOUT_TYPE {
    amrap
    time
    weight
  }

  enum SCORES_SORT {
    rank
    scaled
    value
  }

  enum SORT_DIR {
    asc
    desc
  }
`
