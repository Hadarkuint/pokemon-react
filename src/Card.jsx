const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "2px solid #ddf",
        borderRadius: 23,
        padding: 16,
        backgroundColor: "white",
        CardShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: 16,
        width: 200,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
