import userService from "../_services/userService";

const adminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isAdmin = await userService.isAdmin();

  if (!isAdmin)
    return (
      <div>
        <p>Access denied!</p>
      </div>
    );

  return children;
};

export default adminLayout;
