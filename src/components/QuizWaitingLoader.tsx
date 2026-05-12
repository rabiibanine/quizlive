import React from "react";

const QuizWaitingLoader: React.FC = () => {
  return (
    <>
      <style>
        {`
          .quiz-loader {
            width: 44px;
            height: 44px;
            animation: rotate 2s infinite ease-in-out;
          }

          .quiz-loader svg {
            width: 100%;
            height: 100%;
            stroke: white;
            stroke-width: 6;
            fill: transparent;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .quiz-loader.triangle {
            animation-delay: 0.3s;
          }

          .quiz-loader:nth-child(3) {
            animation-delay: 0.6s;
          }

          @keyframes rotate {
            0% {
              transform: scale(0.8) rotate(0deg);
              opacity: 0.5;
            }

            50% {
              transform: scale(1) rotate(180deg);
              opacity: 1;
            }

            100% {
              transform: scale(0.8) rotate(360deg);
              opacity: 0.5;
            }
          }
        `}
      </style>

      <div className="mt-10 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="quiz-loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" />
            </svg>
          </div>

          <div className="quiz-loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72" />
            </svg>
          </div>

          <div className="quiz-loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64" />
            </svg>
          </div>
        </div>

        <p className="text-lg font-semibold text-white/80">
          Waiting for Quiz to start...
        </p>
      </div>
    </>
  );
};

export default QuizWaitingLoader;