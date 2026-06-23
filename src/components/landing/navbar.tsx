import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    // Make a navbar with logo, Login & Signup Button & Waitlist button
    <div className="border mt-4 p-4 flex justify-between items-center mx-auto max-w-5xl">
      <div>Logo</div>
      <div>
        <Button>Login</Button>
        <Button>Signup</Button>
        <Button>Waitlist</Button>
      </div>
    </div>
  );
};
