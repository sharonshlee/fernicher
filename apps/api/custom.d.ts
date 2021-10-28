declare namespace Express {
  export interface Request {
     session?: Record<string, unknown>
  }
}
