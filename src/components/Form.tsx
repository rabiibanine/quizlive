export default function Form({ children }) {
  return (
    <>
      <div className="min-h-screen opacity-60 backdrop-blur-xs">
        <form>{children}</form>
      </div>
    </>
  );
}
