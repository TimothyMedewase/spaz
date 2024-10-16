import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-email user-top-read user-read-private",
        },
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.refreshToken = account.refresh_token
  //       token.expiresAt = account.expires_at * 1000 // Convert to milliseconds
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     session.accessToken = token.accessToken
  //     return session
  //   },
  // },
};

export default NextAuth(authOptions);
