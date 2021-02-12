interface Auth {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET || "default",
    expiresIn: "1d",
  },
} as Auth;
