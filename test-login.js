import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: "fddzvthqqduogjuckzov", 
  region: "ap-south-1"
})

// Sign in user
const { session, error } = await nhost.auth.signIn({
  email: "asdf@gmail.com",
  password: "qwerty1234"
})

if (error) {
  console.error(error)
} else {
  console.log("JWT:", session.accessToken) // <--- THIS is the token
}
