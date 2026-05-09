const steps = [
  {
    title: "Create",
    description: "Upload your material or provide a topic. We generate a complete quiz in seconds.",
  },
  {
    title: "Share",
    description: "Send the join code to students so they can connect from any device.",
  },
  {
    title: "Export",
    description: "Download results as CSV for grading and quick analysis.",
  },
];

function HowItWorksSection() {
  return (
    <section className="w-full md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-black">How It Works</h2>
          <p className="mt-2 text-sm md:text-base text-zinc-600">
            Get started in minutes. Our intuitive platform makes creating and hosting quizzes a breeze.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3 relative">
          <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-violet-200 md:block" />
          {steps.map((step, index) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-semibold">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 max-w-[26ch]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
