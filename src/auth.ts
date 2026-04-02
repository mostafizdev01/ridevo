import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "./server/module/models/user/user.model"
import connectDb from "./server/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },

            async authorize(credentials, request) {
                if (!credentials.email || !credentials.password) {
                    throw Error("missing credentials")
                }

                await connectDb()
                const user = await User.findOne(credentials.email)

                if (!user) {
                    throw Error("user does't exist!")
                }

                const isMatch = await bcrypt.compare(credentials.password as string, user.password)

                if(!isMatch){
                    throw Error("incorrect Password")
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
        })
    ],
})