import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { query as q } from "faunadb";
import { fauna } from '../../../services/fauna';
import { session } from "next-auth/client";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],

  callbacks: {

    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                'active'
              )
            ])
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      }
      catch (error) {
        return { ...session, activeSubscription: null }
      }
    },

    async signIn(user, account, profile) {

      try {
        const { name, email } = user;

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { name, email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      }

      catch {
        return false;
      }
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },

    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  },

  jwt: {
    signingKey: process.env.JWT_SIGN_KEY
  }
})