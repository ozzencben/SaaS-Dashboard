const Spacer = ({ horizontal = false, size = 10 }) => {
  return (
    <div
      style={
        horizontal ? { width: size, height: 1 } : { height: size, width: 1 }
      }
    />
  );
};

export default Spacer;
