import userService from "../_services/userService";

const adminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isAdmin = await userService.isAdmin();

  if (!isAdmin)
    return (
      <div className="bg-background/95">
        <p>Access denied!</p>
      </div>
    );

  return (
    <div className="bg-background/95 max-w-[90%] mx-auto min-w-[50%] p-8 rounded-lg">
      {children}
    </div>
  );
};

export default adminLayout;
