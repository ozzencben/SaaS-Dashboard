import TopBar from "../topbar/TopBar";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};

export default DashBoardLayout;
