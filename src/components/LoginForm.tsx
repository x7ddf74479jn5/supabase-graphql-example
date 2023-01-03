import { supabase } from "../lib/supabase";

export const LoginForm = () => {
  const sendMagicLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = Object.fromEntries(new FormData(event.currentTarget));
    if (typeof email !== "string") return;

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert("Check your email inbox");
    }
  };

  return (
    <form className="flex flex-col justify-center space-y-2 max-w-md px-4 h-full" onSubmit={sendMagicLink}>
      <input
        className="border-green-300 border rounded p-2 bg-transparent text-white"
        type="email"
        name="email"
        placeholder="Email"
      />
      <button type="submit" className="py-1 px-4 text-lg bg-green-400 rounded text-black">
        Send Magic Link
      </button>
    </form>
  );
};
