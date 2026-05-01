import {
  UIConfigProvider,
  UIProvider,
  type ButtonProps,
} from "@jamsr-ui/react";

type Props = {
  children: React.ReactNode;
};

const getButtonClassName = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "outlined":
      return `
        bg-black text-white border-1 border-black backdrop-blur-[10px] 
        hover:!bg-white
        transition-all duration-300
      `;
    case "light":
      return `
      bg-white text-black border-1 border-black backdrop-blur-[10px] 
      hover:!bg-black hover:!text-white
      transition-all duration-300
      `;
    default:
      return "bg-black text-background transition-all duration-300 hover:!text-black";
  }
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <UIProvider>
      <UIConfigProvider
        //
        button={{
          radius: "full",
          size: "lg",
          props: ({ variant }) => {
            const buttonClassName = getButtonClassName(variant);
            return {
              className: `font-normal ${buttonClassName}`,
            };
          },
        }}
        //
        header={{
          className:
            "flex h-[60px] max-w-[90%] backdrop-blur-[10px] lg:max-w-screen-lg absolute rounded-full border border-black top-10 container bg-black justify-between px-6 text-white",
        }}
        //
        link={{
          className: "text-foreground text-md hover:text-foreground/80 text-white hover:bg-black hover:text-[#ffffffa3] transition-all duration-300",
        }}
      >
        {children}
      </UIConfigProvider>
    </UIProvider>
  );
};
