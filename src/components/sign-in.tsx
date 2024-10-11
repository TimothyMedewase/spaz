import { signIn } from "@/auth";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify", { redirectTo: "/" });
      }}
    >
      <button type="submit">Signin with Spotify</button>
    </form>
  );
}