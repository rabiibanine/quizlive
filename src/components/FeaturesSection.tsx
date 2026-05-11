import Card from "./Card";

const features = [
	{
		title: "AI-Powered Generation",
		description:
			"Generate engaging quizzes instantly with advanced AI, or take full control by building manually or importing JSON files.",
		icon: "/icons/add.svg",
	},
	{
		title: "Live Interactive Quizzes",
		description:
			"Host real-time sessions where students can participate and compete directly from their devices.",
		icon: "/icons/launch.svg",
	},
	{
		title: "Instant Analytics",
		description:
			"Get immediate insights into student performance and identify areas that need more attention.",
		icon: "/icons/down.svg",
	},
];

function FeaturesSection() {
	return (
		<section className="relative w-full md:py-20">
			<div className="mx-auto w-full max-w-6xl px-4">
				<div className="text-center">
					<p className="text-sm uppercase tracking-[0.2em] text-purple-200">
						Features
					</p>
					<h2 className="mt-3 text-2xl md:text-4xl font-semibold text-white">
						Built for fast, engaging classes
					</h2>
					<p className="mt-3 text-sm md:text-base text-white/60">
						Everything you need to create, host, and analyze live quizzes in one
						place.
					</p>
				</div>

				<div className="mt-10 grid gap-5 md:grid-cols-3">
					{features.map((feature) => (
						<Card
							key={feature.title}
							variant="none"
							padding="lg"
							rounded="2xl"
							shadow="light"
							className="relative flex h-full flex-col gap-4 border border-white/10 bg-white/5 backdrop-blur"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20">
								<img
									src={feature.icon}
									alt=""
									className="h-6 w-6 invert"
								/>
							</div>
							<div className="space-y-2">
								<h3 className="text-lg font-semibold text-white">
									{feature.title}
								</h3>
								<p className="text-sm text-white/60">
									{feature.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default FeaturesSection;

