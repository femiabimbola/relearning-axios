import ReduxProvider from "@/app/providers";

export const List = () => {
  console.log("HEY BRO")

  return (
    <ReduxProvider>
      <div>
        <p className="text-white"> The list component</p>
      </div>
    </ReduxProvider>
  );
};
