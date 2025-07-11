import SignupForm from '@/components/SignupForm';

export const revalidate = 60;

export default function SignupPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-100">
  {/* background image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('/images/background.jpg')" }}
  ></div>

  {/* card on top */}
  <div className="relative bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
    {/*form here */}
    <SignupForm />
  </div>
</section>
  );
}
