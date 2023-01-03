import { supabase } from "../lib/supabase";

export const Header = ({ isSignedIn }: { isSignedIn: boolean }) => {
  console.log({ isSignedIn });
  return (
    <header className="bg-black shadow shadow-green-400 px-4">
      <div className="flex max-w-4xl mx-auto items-center h-16">
        <div className=" text-white text-lg flex-grow">Supabase pg_graphql Example</div>
        {isSignedIn && (
          <button className="py-1 px-2 text-white border border-white rounded" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};
