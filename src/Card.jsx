const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "2px solid #ddf",
        borderRadius: 23,
        padding: 16,
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
